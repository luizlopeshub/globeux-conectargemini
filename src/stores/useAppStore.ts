import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { toast } from '@/hooks/use-toast'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import type {
  Role,
  Template,
  Audit,
  User,
  EntityDef,
  EntityRecord,
  Schedule,
  Task,
  ActionPlan,
  Subject,
  Department,
} from '@/types'
import type { ApiSettings } from '@/services/api_settings'

interface DraftState {
  answers: Record<string, any>
  step: number
}

interface AppState {
  isInitializing: boolean
  isLoading: boolean
  isAuthenticated: boolean
  users: User[]
  currentUser: User | null
  templates: Template[]
  audits: Audit[]
  drafts: Record<string, DraftState>
  entityDefs: EntityDef[]
  entityRecords: EntityRecord[]
  schedules: Schedule[]
  tasks: Task[]
  actionPlans: ActionPlan[]
  subjects: Subject[]
  departments: Department[]
  apiSettings: ApiSettings | null
}

let globalState: AppState = {
  isInitializing: true,
  isLoading: false,
  isAuthenticated: pb.authStore.isValid,
  users: [],
  currentUser: (pb.authStore.record as any) || null,
  templates: [],
  audits: [],
  drafts: {},
  entityDefs: [],
  entityRecords: [],
  schedules: [],
  tasks: [],
  actionPlans: [],
  subjects: [],
  departments: [],
  apiSettings: null,
}

let listeners: Array<(state: AppState) => void> = []

const performLogout = () => {
  pb.authStore.clear()
  update({
    currentUser: null,
    isAuthenticated: false,
    audits: [],
    templates: [],
    schedules: [],
    tasks: [],
    actionPlans: [],
    subjects: [],
    departments: [],
  })
}

const update = (partial: Partial<AppState>) => {
  globalState = { ...globalState, ...partial }
  listeners.forEach((l) => l(globalState))
}

pb.authStore.onChange((token, record) => {
  update({
    isAuthenticated: pb.authStore.isValid,
    currentUser: record as any,
  })
})

const withLoading = async (action: () => Promise<void>, successMsg?: string) => {
  update({ isLoading: true })
  try {
    await action()
    if (successMsg) toast({ title: 'Sucesso', description: successMsg })
  } catch (err: any) {
    console.error(err)
    toast({ title: 'Erro', description: getErrorMessage(err), variant: 'destructive' })
    throw err
  } finally {
    update({ isLoading: false })
  }
}

export default function useAppStore() {
  const [state, setState] = useState<AppState>(globalState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      listeners = listeners.filter((l) => l !== setState)
    }
  }, [])

  return {
    ...state,
    setCurrentUser: (user: User | null) => update({ currentUser: user }),
    saveDraft: (tid: string, data: DraftState) =>
      update({ drafts: { ...globalState.drafts, [tid]: data } }),

    login: async (email: string, pass: string) => {
      await withLoading(async () => {
        const authData = await pb.collection('users').authWithPassword(email, pass)
        update({ currentUser: authData.record as any, isAuthenticated: true })
      }, 'Login efetuado com sucesso!')
    },
    logout: performLogout,

    fetchInitialData: async () => {
      update({ isInitializing: true })
      if (!pb.authStore.isValid) {
        update({ isInitializing: false })
        return
      }

      try {
        // Hydration logic: explicitly verify user session on server
        try {
          await pb.collection('users').authRefresh()
        } catch (authErr) {
          throw authErr
        }

        const currentUserRole = pb.authStore.record?.role || 'operator'
        const isAdmin = currentUserRole === 'admin'

        const queries: Promise<any>[] = [
          pb.collection('templates').getFullList(),
          pb.collection('schedules').getFullList(),
          pb.collection('tasks').getFullList(),
          pb.collection('action_plans').getFullList(),
          pb.collection('responses').getFullList({ expand: 'task_id,user_id' }),
          pb.collection('subjects').getFullList(),
          pb.collection('departments').getFullList(),
        ]

        if (isAdmin) {
          queries.push(pb.collection('users').getFullList())
          queries.push(pb.collection('api_settings').getFullList())
        } else {
          queries.push(Promise.resolve(pb.authStore.record ? [pb.authStore.record] : []))
          queries.push(Promise.resolve([]))
        }

        const [
          templatesRes,
          schedulesRes,
          tasksRes,
          actionPlansRes,
          responsesRes,
          subjectsRes,
          departmentsRes,
          usersRes,
          apiSettingsRes,
        ] = await Promise.all(queries)

        const mappedAudits: Audit[] = responsesRes.map((r) => ({
          id: r.id,
          templateId: r.data?.templateId || '',
          templateName: r.data?.templateName || 'Checklist',
          operatorId: r.user_id,
          operatorName: r.expand?.user_id?.name || 'Desconhecido',
          operatorAvatar: r.expand?.user_id?.avatar
            ? pb.files.getUrl(r.expand.user_id, r.expand.user_id.avatar)
            : undefined,
          timestamp: r.data?.timestamp || r.created,
          location: r.data?.location || '',
          status: r.status,
          approvalStatus: r.data?.approvalStatus || 'Pendente',
          answers: r.data?.answers || {},
        }))

        update({
          users: usersRes as any,
          templates: templatesRes as any,
          schedules: schedulesRes as any,
          tasks: tasksRes as any,
          actionPlans: actionPlansRes as any,
          audits: mappedAudits,
          subjects: subjectsRes as any,
          departments: departmentsRes as any,
          apiSettings: (apiSettingsRes[0] as any) || null,
          currentUser: (pb.authStore.record as any) || null,
        })
      } catch (err: any) {
        console.error('Initial data fetch error:', err)
        if (err.status === 401 || err.status === 403 || err.status === 400 || err.status === 404) {
          performLogout()
          toast({
            title: 'Sessão Inválida',
            description: 'Sua sessão expirou ou é inválida. Por favor, faça login novamente.',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Erro de Conexão',
            description: getErrorMessage(err),
            variant: 'destructive',
          })
        }
      } finally {
        update({ isInitializing: false })
      }
    },

    addUser: async (u: Partial<User>) => {
      await withLoading(async () => {
        const record = await pb.collection('users').create({
          ...u,
          role: u.role || 'operator',
          password: 'securepassword123',
          passwordConfirm: 'securepassword123',
        })
        update({ users: [...globalState.users, record as any] })
      }, 'Usuário adicionado com sucesso!')
    },

    addTemplate: async (t: Partial<Template>) => {
      await withLoading(async () => {
        const record = await pb.collection('templates').create(t)
        update({ templates: [...globalState.templates, record as any] })
      }, 'Template criado com sucesso!')
    },
    updateTemplate: async (t: Template) => {
      await withLoading(async () => {
        const record = await pb.collection('templates').update(t.id, t)
        update({
          templates: globalState.templates.map((x) => (x.id === t.id ? (record as any) : x)),
        })
      }, 'Template atualizado!')
    },
    deleteTemplate: async (id: string) => {
      await withLoading(async () => {
        await pb.collection('templates').delete(id)
        update({ templates: globalState.templates.filter((x) => x.id !== id) })
      }, 'Template removido!')
    },

    submitAudit: async (a: Audit) => {
      await withLoading(async () => {
        const task = await pb.collection('tasks').create({
          title: `Auditoria: ${a.templateName}`,
          status: 'completed',
          user_id: a.operatorId,
          due_date: new Date().toISOString(),
        })
        const response = await pb.collection('responses').create({
          task_id: task.id,
          user_id: a.operatorId,
          status: a.status,
          data: {
            templateId: a.templateId,
            templateName: a.templateName,
            location: a.location,
            answers: a.answers,
            approvalStatus: a.approvalStatus,
            timestamp: a.timestamp,
          },
        })
        const mappedAudit = { ...a, id: response.id }
        const nd = { ...globalState.drafts }
        delete nd[a.templateId]
        update({
          audits: [mappedAudit, ...globalState.audits],
          drafts: nd,
          tasks: [...globalState.tasks, task as any],
        })
      }, 'Checklist enviado com sucesso!')
    },
    approveAudit: async (id: string, s: 'Aprovado' | 'Rejeitado', approver: string) => {
      await withLoading(async () => {
        const record = await pb.collection('responses').getOne(id)
        const newData = { ...record.data, approvalStatus: s, approverName: approver }
        await pb.collection('responses').update(id, { data: newData })
        update({
          audits: globalState.audits.map((a) =>
            a.id === id ? { ...a, approvalStatus: s, approverName: approver } : a,
          ),
        })
      }, `Checklist ${s.toLowerCase()}!`)
    },

    addSubject: async (name: string) => {
      await withLoading(async () => {
        const record = await pb.collection('subjects').create({ name })
        update({ subjects: [...globalState.subjects, record as any] })
      }, 'Assunto criado com sucesso!')
    },
    updateSubject: async (id: string, name: string) => {
      await withLoading(async () => {
        const record = await pb.collection('subjects').update(id, { name })
        update({ subjects: globalState.subjects.map((x) => (x.id === id ? (record as any) : x)) })
      }, 'Assunto atualizado!')
    },
    deleteSubject: async (id: string) => {
      await withLoading(async () => {
        await pb.collection('subjects').delete(id)
        update({ subjects: globalState.subjects.filter((x) => x.id !== id) })
      }, 'Assunto removido!')
    },

    addDepartment: async (name: string) => {
      await withLoading(async () => {
        const record = await pb.collection('departments').create({ name })
        update({ departments: [...globalState.departments, record as any] })
      }, 'Departamento criado com sucesso!')
    },
    updateDepartment: async (id: string, name: string) => {
      await withLoading(async () => {
        const record = await pb.collection('departments').update(id, { name })
        update({
          departments: globalState.departments.map((x) => (x.id === id ? (record as any) : x)),
        })
      }, 'Departamento atualizado!')
    },
    deleteDepartment: async (id: string) => {
      await withLoading(async () => {
        await pb.collection('departments').delete(id)
        update({ departments: globalState.departments.filter((x) => x.id !== id) })
      }, 'Departamento removido!')
    },

    addSchedule: async (s: Partial<Schedule>) => {
      await withLoading(async () => {
        const record = await pb.collection('schedules').create(s)
        update({ schedules: [...globalState.schedules, record as any] })
      }, 'Agendamento criado com sucesso!')
    },
    updateSchedule: async (s: Schedule) => {
      await withLoading(async () => {
        const record = await pb.collection('schedules').update(s.id, s)
        update({
          schedules: globalState.schedules.map((x) => (x.id === s.id ? (record as any) : x)),
        })
      }, 'Agendamento atualizado!')
    },
    deleteSchedule: async (id: string) => {
      await withLoading(async () => {
        await pb.collection('schedules').delete(id)
        update({ schedules: globalState.schedules.filter((x) => x.id !== id) })
      }, 'Agendamento removido!')
    },

    addTask: async (t: Partial<Task>) => {
      await withLoading(async () => {
        const record = await pb.collection('tasks').create(t)
        update({ tasks: [...globalState.tasks, record as any] })
      }, 'Tarefa criada com sucesso!')
    },
    updateTask: async (t: Task) => {
      await withLoading(async () => {
        const record = await pb.collection('tasks').update(t.id, t)
        update({ tasks: globalState.tasks.map((x) => (x.id === t.id ? (record as any) : x)) })
      }, 'Tarefa atualizada!')
    },
    deleteTask: async (id: string) => {
      await withLoading(async () => {
        await pb.collection('tasks').delete(id)
        update({ tasks: globalState.tasks.filter((x) => x.id !== id) })
      }, 'Tarefa removida!')
    },

    addActionPlan: async (ap: Partial<ActionPlan>) => {
      await withLoading(async () => {
        const record = await pb.collection('action_plans').create(ap)
        update({ actionPlans: [...globalState.actionPlans, record as any] })
      }, 'Plano de ação criado com sucesso!')
    },
    updateActionPlan: async (ap: ActionPlan) => {
      await withLoading(async () => {
        const record = await pb.collection('action_plans').update(ap.id, ap)
        update({
          actionPlans: globalState.actionPlans.map((x) => (x.id === ap.id ? (record as any) : x)),
        })
      }, 'Plano de ação atualizado!')
    },
    deleteActionPlan: async (id: string) => {
      await withLoading(async () => {
        await pb.collection('action_plans').delete(id)
        update({ actionPlans: globalState.actionPlans.filter((x) => x.id !== id) })
      }, 'Plano de ação removido!')
    },
  }
}
