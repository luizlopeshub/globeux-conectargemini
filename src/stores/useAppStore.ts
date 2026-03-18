import { useState, useEffect } from 'react'
import { Role, Template, Audit, User, Client, Product, Carrier } from '@/types'

interface AppState {
  users: User[]
  currentUser: User | null
  templates: Template[]
  audits: Audit[]
  drafts: Record<string, Record<string, any>>
  clients: Client[]
  products: Product[]
  carriers: Carrier[]
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

const mockClients: Client[] = [
  { id: 'c1', name: 'Logística Alfa', cnpj: '12.345.678/0001-90', address: 'Av. Paulista, 1000' },
  { id: 'c2', name: 'Transportes Beta', cnpj: '98.765.432/0001-10', address: 'Rua Augusta, 500' },
]

const mockProducts: Product[] = [
  { id: 'p1', name: 'Caixa de Papelão 50x50', sku: 'CX-50', category: 'Embalagens' },
  { id: 'p2', name: 'Fita Adesiva 45mm', sku: 'FT-45', category: 'Insumos' },
]

const mockCarriers: Carrier[] = [
  { id: 't1', name: 'Expresso Rápido', fleetType: 'Caminhão Baú', contact: 'contato@expresso.com' },
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
    name: 'Expedição de Carga',
    description: 'Verificação de transportadora e cliente.',
    createdAt: '2023-10-02T10:30:00Z',
    assignedUsers: ['u3'],
    fields: [
      {
        id: 'f1',
        type: 'lookup',
        label: 'Cliente Destino',
        lookupSource: 'clients',
        required: true,
      },
      {
        id: 'f2',
        type: 'lookup',
        label: 'Transportadora',
        lookupSource: 'carriers',
        required: true,
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
  clients: mockClients,
  products: mockProducts,
  carriers: mockCarriers,
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
    addTemplate: (t: Template) => update({ templates: [...globalState.templates, t] }),
    updateTemplate: (t: Template) =>
      update({ templates: globalState.templates.map((x) => (x.id === t.id ? t : x)) }),
    saveDraft: (tid: string, answers: Record<string, any>) =>
      update({ drafts: { ...globalState.drafts, [tid]: answers } }),
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
    addEntity: (type: 'clients' | 'products' | 'carriers', item: any) =>
      update({ [type]: [...globalState[type], item] }),
    updateEntity: (type: 'clients' | 'products' | 'carriers', item: any) =>
      update({ [type]: (globalState[type] as any[]).map((i) => (i.id === item.id ? item : i)) }),
    deleteEntity: (type: 'clients' | 'products' | 'carriers', id: string) =>
      update({ [type]: (globalState[type] as any[]).filter((i) => i.id !== id) }),
  }
}
