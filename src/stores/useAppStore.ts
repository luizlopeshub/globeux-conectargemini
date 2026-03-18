import { useState, useEffect } from 'react'
import { Role, Template, Audit, User } from '@/types'

interface AppState {
  users: User[]
  currentUser: User | null
  templates: Template[]
  audits: Audit[]
  drafts: Record<string, Record<string, any>>
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
  {
    id: 'u4',
    name: 'Carlos (Químicos)',
    email: 'carlos@logiaudit.com',
    role: 'operator',
    department: 'Químicos',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
  },
]

const mockTemplates: Template[] = [
  {
    id: 't1',
    name: 'Inspeção Diária de Empilhadeira',
    description: 'Checklist obrigatório antes do início do turno.',
    createdAt: '2023-10-01T08:00:00Z',
    assignedDepartments: ['Recebimento', 'Expedição'],
    fields: [
      { id: 'f1', type: 'text', label: 'ID do Veículo', required: true },
      {
        id: 'f4',
        type: 'number',
        label: 'Nível de Combustível (%)',
        required: true,
        hardValidation: true,
        hardValidationMin: 20,
        hardValidationMax: 100,
        hardValidationMessage: 'Combustível muito baixo para operar.',
      },
      { id: 'f5', type: 'signature', label: 'Assinatura do Operador', required: true },
    ],
  },
  {
    id: 't2',
    name: 'Cálculo de Carga Total',
    description: 'Verificação com cálculos automáticos.',
    createdAt: '2023-10-02T10:30:00Z',
    assignedUsers: ['u3'],
    fields: [
      { id: 'f1', type: 'number', label: 'Peso Pallet 1 (kg)', required: true },
      { id: 'f2', type: 'number', label: 'Peso Pallet 2 (kg)', required: true },
      {
        id: 'f3',
        type: 'calculation',
        label: 'Peso Total',
        calcOperation: 'sum',
        calcSourceFields: ['f1', 'f2'],
      },
    ],
  },
]

const mockAudits: Audit[] = [
  {
    id: 'a1',
    templateId: 't1',
    templateName: 'Inspeção Diária de Empilhadeira',
    operatorId: 'u3',
    operatorName: 'João (Recebimento)',
    operatorAvatar: mockUsers[2].avatar,
    timestamp: new Date().toISOString(),
    location: '-23.5505, -46.6333',
    status: 'Concluído',
    approvalStatus: 'Pendente',
    answers: { f1: 'EMP-04', f4: '80', f5: 'signed' },
  },
]

let globalState: AppState = {
  users: mockUsers,
  currentUser: mockUsers[0],
  templates: mockTemplates,
  audits: mockAudits,
  drafts: {},
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
    setUsers: (users: User[]) => update({ users }),
    addTemplate: (template: Template) =>
      update({ templates: [...globalState.templates, template] }),
    updateTemplate: (template: Template) =>
      update({
        templates: globalState.templates.map((t) => (t.id === template.id ? template : t)),
      }),
    saveDraft: (templateId: string, answers: Record<string, any>) =>
      update({ drafts: { ...globalState.drafts, [templateId]: answers } }),
    submitAudit: (audit: Audit) => {
      const newDrafts = { ...globalState.drafts }
      delete newDrafts[audit.templateId]
      update({ audits: [audit, ...globalState.audits], drafts: newDrafts })
    },
    approveAudit: (auditId: string, status: 'Aprovado' | 'Rejeitado', approverName: string) => {
      update({
        audits: globalState.audits.map((a) =>
          a.id === auditId ? { ...a, approvalStatus: status, approverName } : a,
        ),
      })
    },
  }
}
