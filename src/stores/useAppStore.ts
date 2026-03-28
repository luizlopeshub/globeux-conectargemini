import { useState, useEffect } from 'react'
import {
  Role,
  Template,
  Audit,
  User,
  EntityDef,
  EntityRecord,
  Schedule,
  Task,
  ActionPlan,
} from '@/types'

interface DraftState {
  answers: Record<string, any>
  step: number
}

interface AppState {
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
}

const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin Master',
    email: 'admin@logiaudit.com',
    role: 'admin',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
  },
  {
    id: 'u2',
    name: 'Supervisora Ana',
    email: 'ana@logiaudit.com',
    role: 'supervisor',
    department: 'Expedição',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
  },
  {
    id: 'u3',
    name: 'João (Recebimento)',
    email: 'joao@logiaudit.com',
    role: 'operator',
    department: 'Recebimento',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
  },
]

const mockEntityDefs: EntityDef[] = [
  {
    id: 'clients',
    name: 'Clientes',
    slug: 'clientes',
    fields: [
      { id: 'name', name: 'Nome do Cliente', type: 'text' },
      { id: 'cnpj', name: 'CNPJ / Documento', type: 'text' },
      { id: 'address', name: 'Endereço Completo', type: 'text' },
    ],
  },
  {
    id: 'carriers',
    name: 'Transportadoras',
    slug: 'transportadoras',
    fields: [
      { id: 'name', name: 'Razão Social', type: 'text' },
      { id: 'fleetType', name: 'Tipo de Frota', type: 'text' },
      { id: 'contact', name: 'Contato', type: 'text' },
    ],
  },
]

const mockEntityRecords: EntityRecord[] = [
  {
    id: 'c1',
    entityId: 'clients',
    name: 'Logística Alfa',
    cnpj: '12.345.678/0001-90',
    address: 'Av. Paulista, 1000',
  },
  {
    id: 't1',
    entityId: 'carriers',
    name: 'Expresso Rápido',
    fleetType: 'Caminhão Baú',
    contact: 'contato@expresso.com',
  },
]

const mockTemplates: Template[] = [
  {
    id: 't1',
    name: 'Expedição de Carga',
    description: 'Verificação de transportadora e cliente.',
    createdAt: '2023-10-02T10:30:00Z',
    blocks: [
      { id: 'b1', name: 'Bloco 1: Cadastro' },
      { id: 'b2', name: 'Bloco 2: Verificação de Carga' },
    ],
    fields: [
      {
        id: 'f1',
        blockId: 'b1',
        type: 'lookup',
        label: 'Cliente Destino',
        lookupSource: 'clients',
        required: true,
      },
      {
        id: 'f2',
        blockId: 'b1',
        type: 'lookup',
        label: 'Transportadora',
        lookupSource: 'carriers',
        required: true,
      },
      {
        id: 'f3',
        blockId: 'b2',
        type: 'radio',
        label: 'Condição da Carga',
        options: 'Perfeita, Avariada',
        required: true,
      },
    ],
  },
]

const mockAudits: Audit[] = [
  {
    id: 'a1',
    templateId: 't1',
    templateName: 'Expedição de Carga',
    operatorId: 'u3',
    operatorName: 'João (Recebimento)',
    operatorAvatar: mockUsers[2].avatar,
    timestamp: new Date().toISOString(),
    location: '-23.5505, -46.6333',
    status: 'Concluído',
    approvalStatus: 'Pendente',
    answers: { f1: 'c1', f2: 't1', f3: 'Perfeita' },
  },
]

const mockSchedules: Schedule[] = [
  {
    id: 's1',
    recurrence: 'weekly',
    template_id: 't1',
    assigned_to: 'u3',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
]

const mockTasks: Task[] = [
  {
    id: 'tsk1',
    status: 'pending',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: 'u3',
    title: 'Verificar extintores',
    description: 'Realizar checagem semanal dos extintores no armazém',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
]

const mockActionPlans: ActionPlan[] = [
  {
    id: 'ap1',
    field_id: 'f3',
    responsible_id: 'u2',
    status: 'open',
    description: 'Corrigir avarias encontradas na carga',
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
]

let globalState: AppState = {
  users: mockUsers,
  currentUser: mockUsers[0],
  templates: mockTemplates,
  audits: mockAudits,
  drafts: {},
  entityDefs: mockEntityDefs,
  entityRecords: mockEntityRecords,
  schedules: mockSchedules,
  tasks: mockTasks,
  actionPlans: mockActionPlans,
}

let listeners: Array<(state: AppState) => void> = []

export default function useAppStore() {
  const [state, setState] = useState<AppState>(globalState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      listeners = listeners.filter((l) => l !== setState)
    }
  }, [])

  const update = (partial: Partial<AppState>) => {
    globalState = { ...globalState, ...partial }
    listeners.forEach((l) => l(globalState))
  }

  return {
    ...state,
    setCurrentUser: (user: User) => update({ currentUser: user }),
    addTemplate: (t: Template) => update({ templates: [...globalState.templates, t] }),
    updateTemplate: (t: Template) =>
      update({ templates: globalState.templates.map((x) => (x.id === t.id ? t : x)) }),
    saveDraft: (tid: string, data: DraftState) =>
      update({ drafts: { ...globalState.drafts, [tid]: data } }),
    submitAudit: (a: Audit) => {
      const nd = { ...globalState.drafts }
      delete nd[a.templateId]
      update({ audits: [a, ...globalState.audits], drafts: nd })
    },
    approveAudit: (id: string, s: 'Aprovado' | 'Rejeitado', approver: string) => {
      update({
        audits: globalState.audits.map((a) =>
          a.id === id ? { ...a, approvalStatus: s, approverName: approver } : a,
        ),
      })
    },
    addSchedule: (s: Schedule) => update({ schedules: [...globalState.schedules, s] }),
    updateSchedule: (s: Schedule) =>
      update({ schedules: globalState.schedules.map((x) => (x.id === s.id ? s : x)) }),
    deleteSchedule: (id: string) =>
      update({ schedules: globalState.schedules.filter((x) => x.id !== id) }),
    addTask: (t: Task) => update({ tasks: [...globalState.tasks, t] }),
    updateTask: (t: Task) =>
      update({ tasks: globalState.tasks.map((x) => (x.id === t.id ? t : x)) }),
    deleteTask: (id: string) => update({ tasks: globalState.tasks.filter((x) => x.id !== id) }),
    addActionPlan: (ap: ActionPlan) => update({ actionPlans: [...globalState.actionPlans, ap] }),
    updateActionPlan: (ap: ActionPlan) =>
      update({ actionPlans: globalState.actionPlans.map((x) => (x.id === ap.id ? ap : x)) }),
    deleteActionPlan: (id: string) =>
      update({ actionPlans: globalState.actionPlans.filter((x) => x.id !== id) }),
  }
}
