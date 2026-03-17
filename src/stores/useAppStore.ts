import { useState, useEffect } from 'react'
import { Role, Template, Audit } from '@/types'

interface AppState {
  role: Role
  templates: Template[]
  audits: Audit[]
  drafts: Record<string, Record<string, any>>
}

const mockTemplates: Template[] = [
  {
    id: 't1',
    name: 'Inspeção Diária de Empilhadeira',
    description: 'Checklist obrigatório antes do início do turno.',
    createdAt: '2023-10-01T08:00:00Z',
    fields: [
      { id: 'f1', type: 'text', label: 'ID do Veículo', required: true },
      {
        id: 'f2',
        type: 'radio',
        label: 'Estado dos Pneus',
        options: 'Bom,Avariado',
        required: true,
      },
      {
        id: 'f3',
        type: 'camera',
        label: 'Foto da Avaria (Pneus)',
        logicDependsOn: 'f2',
        logicValue: 'Avariado',
      },
      { id: 'f4', type: 'number', label: 'Nível de Combustível (%)', required: true },
      { id: 'f5', type: 'signature', label: 'Assinatura do Operador', required: true },
    ],
  },
  {
    id: 't2',
    name: 'Recebimento de Carga com Lógica',
    description: 'Verificação de integridade dos pallets e notas fiscais.',
    createdAt: '2023-10-02T10:30:00Z',
    fields: [
      {
        id: 'f1',
        type: 'number',
        label: 'Quantas notas fiscais possui essa entrada?',
        required: true,
      },
      { id: 'f2', type: 'text', label: 'Número da NF', required: true, repeatsBasedOn: 'f1' },
      {
        id: 'f3',
        type: 'radio',
        label: 'Material com controle de temperatura?',
        options: 'Sim,Não',
        required: true,
      },
      {
        id: 'f4',
        type: 'number',
        label: 'Registro de temperatura',
        logicDependsOn: 'f3',
        logicValue: 'Sim',
      },
      {
        id: 'f5',
        type: 'camera',
        label: 'Foto do termômetro',
        logicDependsOn: 'f3',
        logicValue: 'Sim',
      },
    ],
  },
]

const mockAudits: Audit[] = [
  {
    id: 'a1',
    templateId: 't1',
    templateName: 'Inspeção Diária de Empilhadeira',
    operatorName: 'João Silva',
    timestamp: new Date().toISOString(),
    location: '-23.5505, -46.6333',
    status: 'Concluído',
    answers: { f1: 'EMP-04', f2: 'Bom', f4: '80' },
  },
]

let globalState: AppState = {
  role: 'admin',
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
    setRole: (role: Role) => update({ role }),
    addTemplate: (template: Template) =>
      update({ templates: [...globalState.templates, template] }),
    updateTemplate: (template: Template) =>
      update({
        templates: globalState.templates.map((t) => (t.id === template.id ? template : t)),
      }),
    saveDraft: (templateId: string, answers: Record<string, any>) =>
      update({
        drafts: { ...globalState.drafts, [templateId]: answers },
      }),
    submitAudit: (audit: Audit) => {
      const newDrafts = { ...globalState.drafts }
      delete newDrafts[audit.templateId]
      update({ audits: [audit, ...globalState.audits], drafts: newDrafts })
    },
  }
}
