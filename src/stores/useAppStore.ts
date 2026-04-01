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

let initialDrafts = {}
try {
  const stored = localStorage.getItem('@globeux_drafts')
  if (stored) initialDrafts = JSON.parse(stored)
} catch (e) {
  // ignore parsing error
}

let globalState: AppState = {
  isInitializing: true,
  isLoading: false,
  isAuthenticated: pb.authStore.isValid,
  users: [],
  currentUser: (pb.authStore.record as any) || null,
  templates: [],
  audits: [],
  drafts: initialDrafts,
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

export const getGlobalState = () => globalState

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
    entityDefs: [],
    entityRecords: [],
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
    saveDraft: (tid: string, data: DraftState) => {
      const newDrafts = { ...globalState.drafts, [tid]: data }
      update({ drafts: newDrafts })
      localStorage.setItem('@globeux_drafts', JSON.stringify(newDrafts))
    },
    clearDraft: (tid: string) => {
      const newDrafts = { ...globalState.drafts }
      delete newDrafts[tid]
      update({ drafts: newDrafts })
      localStorage.setItem('@globeux_drafts', JSON.stringify(newDrafts))
    },

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
        await pb.collection('users').authRefresh()
      } catch (err: any) {
        console.error('Auth refresh error:', err)
        if (err.status === 401 || err.status === 403 || err.status === 404) {
          performLogout()
          toast({
            title: 'Sessão Inválida',
            description: 'Sua sessão expirou ou é inválida. Por favor, faça login novamente.',
            variant: 'destructive',
          })
          update({ isInitializing: false })
          return
        }
      }

      try {
        const currentUserRole = pb.authStore.record?.role || 'operator'
        const isAdmin = currentUserRole === 'admin'
        const currentUserId = pb.authStore.record?.id

        // 1. Global Data (always fetched for all authenticated users)
        const [templatesRes, subjectsRes, departmentsRes, entityDefsRes, masterDataRes] =
          await Promise.all([
            pb.collection('templates').getFullList(),
            pb.collection('subjects').getFullList(),
            pb.collection('departments').getFullList(),
            pb.collection('entity_definitions').getFullList(),
            pb.collection('master_data_entries').getFullList(),
          ])

        // 2. Operational Data (filtered for non-admins)
        const [schedulesRes, tasksRes, actionPlansRes, responsesRes, usersRes, apiSettingsRes] =
          await Promise.all([
            pb
              .collection('schedules')
              .getFullList(isAdmin ? {} : { filter: `assigned_to = "${currentUserId}"` }),
            pb
              .collection('tasks')
              .getFullList(isAdmin ? {} : { filter: `user_id = "${currentUserId}"` }),
            pb
              .collection('action_plans')
              .getFullList(isAdmin ? {} : { filter: `responsible_id = "${currentUserId}"` }),
            pb.collection('responses').getFullList({
              expand: 'task_id,user_id',
              filter: isAdmin ? '' : `user_id = "${currentUserId}"`,
            }),
            isAdmin
              ? pb.collection('users').getFullList()
              : Promise.resolve(pb.authStore.record ? [pb.authStore.record] : []),
            isAdmin ? pb.collection('api_settings').getFullList() : Promise.resolve([]),
          ])
        const mappedAudits: Audit[] = responsesRes.map((r) => {
          const answers = { ...(r.data?.answers || {}) }
          const files = r.files || []

          Object.keys(answers).forEach((k) => {
            const val = answers[k]
            if (typeof val === 'string' && val.startsWith('file:img_')) {
              const baseName = val.replace('file:', '').split('.')[0]
              const actualFilename = files.find((f: string) => f.startsWith(baseName))
              if (actualFilename) {
                answers[k] = pb.files.getUrl(r, actualFilename)
              }
            }
          })

          return {
            id: r.id,
            taskId: r.task_id || r.expand?.task_id?.id || undefined,
            templateId: r.data?.templateId || '',
            templateName: r.data?.templateName || 'Checklist',
            operatorId: r.user_id || '',
            operatorName: r.expand?.user_id?.name || 'Desconhecido',
            operatorAvatar: r.expand?.user_id?.avatar
              ? pb.files.getUrl(r.expand.user_id, r.expand.user_id.avatar)
              : undefined,
            timestamp: r.data?.timestamp || r.created || new Date().toISOString(),
            location: r.data?.location || '',
            status: r.status || 'completed',
            approvalStatus: r.data?.approvalStatus || 'Pendente',
            answers,
          }
        })

        update({
          users: usersRes as any,
          templates: templatesRes as any,
          schedules: schedulesRes as any,
          tasks: tasksRes as any,
          actionPlans: actionPlansRes as any,
          audits: mappedAudits,
          subjects: subjectsRes as any,
          departments: departmentsRes as any,
          entityDefs: entityDefsRes as any,
          entityRecords: masterDataRes as any,
          apiSettings: (apiSettingsRes[0] as any) || null,
          currentUser: (pb.authStore.record as any) || null,
        })
      } catch (err: any) {
        console.error('Initial data fetch error:', err)
        if (err.status === 401 || err.status === 403) {
          performLogout()
          toast({
            title: 'Sessão Inválida',
            description: 'Sua sessão expirou ou é inválida. Por favor, faça login novamente.',
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
    updateUser: async (id: string, u: Partial<User>) => {
      await withLoading(async () => {
        const record = await pb.collection('users').update(id, u)
        update({ users: globalState.users.map((x) => (x.id === id ? (record as any) : x)) })
      }, 'Usuário atualizado com sucesso!')
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

        const template = globalState.templates.find((t) => t.id === a.templateId)

        const formData = new FormData()
        formData.append('task_id', task.id)
        formData.append('user_id', a.operatorId)
        formData.append('status', a.status)

        const finalAnswers = { ...a.answers }
        Object.entries(finalAnswers).forEach(([key, val]) => {
          if (val instanceof File) {
            const safeName = `img_${key}.jpg`
            const fileWithKey = new File([val], safeName, { type: val.type || 'image/jpeg' })
            formData.append('files', fileWithKey)
            finalAnswers[key] = `file:${safeName}`
          }
        })

        formData.append(
          'data',
          JSON.stringify({
            templateId: a.templateId,
            templateName: a.templateName,
            location: a.location,
            answers: finalAnswers,
            approvalStatus: a.approvalStatus,
            timestamp: a.timestamp,
            pdf_settings: template?.pdf_settings || null,
          }),
        )

        const response = await pb.collection('responses').create(formData)

        // Quick map for local state to show immediately
        const mappedAnswers = { ...finalAnswers }
        Object.keys(mappedAnswers).forEach((k) => {
          if (typeof mappedAnswers[k] === 'string' && mappedAnswers[k].startsWith('file:')) {
            mappedAnswers[k] = 'https://img.usecurling.com/p/400/300?q=processing' // Temporary placeholder until re-fetched
          }
        })

        const mappedAudit = { ...a, id: response.id, taskId: task.id, answers: mappedAnswers }
        const nd = { ...globalState.drafts }
        delete nd[a.templateId]

        localStorage.setItem('@globeux_drafts', JSON.stringify(nd))

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
        try {
          await pb.collection('audit_logs').create({
            user_id: pb.authStore.record?.id,
            action: 'create',
            entity_name: 'subjects',
            payload: { name },
          })
        } catch (e) {
          console.error(e)
        }
        update({ subjects: [...globalState.subjects, record as any] })
      }, 'Assunto criado com sucesso!')
    },
    updateSubject: async (id: string, name: string) => {
      await withLoading(async () => {
        const record = await pb.collection('subjects').update(id, { name })
        try {
          await pb.collection('audit_logs').create({
            user_id: pb.authStore.record?.id,
            action: 'update',
            entity_name: 'subjects',
            payload: { id, name },
          })
        } catch (e) {
          console.error(e)
        }
        update({ subjects: globalState.subjects.map((x) => (x.id === id ? (record as any) : x)) })
      }, 'Assunto atualizado!')
    },
    deleteSubject: async (id: string) => {
      await withLoading(async () => {
        await pb.collection('subjects').delete(id)
        try {
          await pb.collection('audit_logs').create({
            user_id: pb.authStore.record?.id,
            action: 'delete',
            entity_name: 'subjects',
            payload: { id },
          })
        } catch (e) {
          console.error(e)
        }
        update({ subjects: globalState.subjects.filter((x) => x.id !== id) })
      }, 'Assunto removido!')
    },

    addDepartment: async (name: string) => {
      await withLoading(async () => {
        const record = await pb.collection('departments').create({ name })
        try {
          await pb.collection('audit_logs').create({
            user_id: pb.authStore.record?.id,
            action: 'create',
            entity_name: 'departments',
            payload: { name },
          })
        } catch (e) {
          console.error(e)
        }
        update({ departments: [...globalState.departments, record as any] })
      }, 'Departamento criado com sucesso!')
    },
    updateDepartment: async (id: string, name: string) => {
      await withLoading(async () => {
        const record = await pb.collection('departments').update(id, { name })
        try {
          await pb.collection('audit_logs').create({
            user_id: pb.authStore.record?.id,
            action: 'update',
            entity_name: 'departments',
            payload: { id, name },
          })
        } catch (e) {
          console.error(e)
        }
        update({
          departments: globalState.departments.map((x) => (x.id === id ? (record as any) : x)),
        })
      }, 'Departamento atualizado!')
    },
    deleteDepartment: async (id: string) => {
      await withLoading(async () => {
        await pb.collection('departments').delete(id)
        try {
          await pb.collection('audit_logs').create({
            user_id: pb.authStore.record?.id,
            action: 'delete',
            entity_name: 'departments',
            payload: { id },
          })
        } catch (e) {
          console.error(e)
        }
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
