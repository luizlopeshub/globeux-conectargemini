export type Role = 'admin' | 'supervisor' | 'operator'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  department?: string
  avatar: string
}

export type EntityFieldType = 'text' | 'number' | 'date'

export interface EntityFieldDef {
  id: string
  name: string
  type: EntityFieldType
}

export interface EntityDef {
  id: string
  name: string
  slug: string
  fields: EntityFieldDef[]
}

export interface EntityRecord {
  id: string
  entityId: string
  [key: string]: any
}

export type FieldType =
  | 'text'
  | 'number'
  | 'radio'
  | 'checkbox'
  | 'gps'
  | 'camera'
  | 'signature'
  | 'calculation'
  | 'lookup'

export interface FormField {
  id: string
  blockId: string
  type: FieldType
  label: string
  options?: string
  required?: boolean
  logicDependsOn?: string
  logicValue?: string
  repeatsBasedOn?: string
  calcOperation?: 'sum' | 'average'
  calcSourceFields?: string[]
  hardValidation?: boolean
  hardValidationMin?: number
  hardValidationMax?: number
  hardValidationMessage?: string
  lookupSource?: string
  triggers?: Array<'require_photo' | 'create_action_plan' | 'send_notification'>
}

export interface FormBlock {
  id: string
  name: string
  logicDependsOn?: string
  logicValue?: string
}

export interface Template {
  id: string
  name: string
  description: string
  subject?: string
  attachments?: string[]
  blocks: FormBlock[]
  fields: FormField[]
  createdAt: string
  assignedUsers?: string[]
  assignedDepartments?: string[]
  exportOptions?: Array<'PDF' | 'CSV' | 'API'>
  approvalWorkflow?: {
    enabled: boolean
    sla_days: number
  }
}

export interface Schedule {
  id: string
  recurrence: 'daily' | 'weekly' | 'monthly' | 'custom'
  template_id: string
  assigned_to: string
  created: string
  updated: string
}

export interface Task {
  id: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  due_date: string
  user_id: string
  title: string
  description: string
  created: string
  updated: string
}

export interface ActionPlan {
  id: string
  field_id: string
  responsible_id: string
  status: 'open' | 'resolved'
  description: string
  created: string
  updated: string
}

export interface Audit {
  id: string
  templateId: string
  templateName: string
  operatorId: string
  operatorName: string
  operatorAvatar?: string
  answers: Record<string, any>
  timestamp: string
  location?: string
  status: 'Concluído' | 'Rascunho'
  approvalStatus?: 'Pendente' | 'Aprovado' | 'Rejeitado'
  approverName?: string
}

export type ActiveItem = { id: string; type: 'block' | 'field' } | null
