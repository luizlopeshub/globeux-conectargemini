import { useState, useEffect } from 'react'
import { Role, Template, Audit, User, EntityDef, EntityRecord } from '@/types'

interface AppState {
  users: User[]
  currentUser: User | null
  templates: Template[]
  audits: Audit[]
  drafts: Record<string, Record<string, any>>
  entityDefs: EntityDef[]
  entityRecords: EntityRecord[]
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
    id: 'products',
    name: 'Produtos',
    slug: 'produtos',
    fields: [
      { id: 'name', name: 'Nome do Produto', type: 'text' },
      { id: 'sku', name: 'SKU / Código', type: 'text' },
      { id: 'category', name: 'Categoria', type: 'text' },
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
    id: 'c2',
    entityId: 'clients',
    name: 'Transportes Beta',
    cnpj: '98.765.432/0001-10',
    address: 'Rua Augusta, 500',
  },
  {
    id: 'p1',
    entityId: 'products',
    name: 'Caixa de Papelão 50x50',
    sku: 'CX-50',
    category: 'Embalagens',
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
    templateName: 'Expedição de Carga',
    operatorId: 'u3',
    operatorName: 'João (Recebimento)',
    operatorAvatar: mockUsers[2].avatar,
    timestamp: new Date().toISOString(),
    location: '-23.5505, -46.6333',
    status: 'Concluído',
    approvalStatus: 'Pendente',
    answers: { f1: 'c1', f2: 't1' },
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
    saveEntityDef: (def: EntityDef) => {
      const exists = globalState.entityDefs.find((d) => d.id === def.id)
      update({
        entityDefs: exists
          ? globalState.entityDefs.map((d) => (d.id === def.id ? def : d))
          : [...globalState.entityDefs, def],
      })
    },
    deleteEntityDef: (id: string) =>
      update({
        entityDefs: globalState.entityDefs.filter((d) => d.id !== id),
        entityRecords: globalState.entityRecords.filter((r) => r.entityId !== id),
      }),
    saveEntityRecord: (rec: EntityRecord) => {
      const exists = globalState.entityRecords.find((r) => r.id === rec.id)
      update({
        entityRecords: exists
          ? globalState.entityRecords.map((r) => (r.id === rec.id ? rec : r))
          : [...globalState.entityRecords, rec],
      })
    },
    deleteEntityRecord: (id: string) =>
      update({ entityRecords: globalState.entityRecords.filter((r) => r.id !== id) }),
  }
}
