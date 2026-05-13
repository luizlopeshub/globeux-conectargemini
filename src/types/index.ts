export type Role = 'admin' | 'supervisor' | 'operator' | 'user'

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
  searchableFields?: string[]
}

export interface EntityRecord {
  id: string
  entityId: string
  [key: string]: any
}

export interface MasterDataEntry {
  id: string
  entity_id: string
  data: Record<string, any>
  created: string
  updated: string
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
  alwaysVisible?: boolean
  /** @deprecated Use logicRules instead */
  relatedFieldId?: string
  /** @deprecated Use logicRules instead */
  expectedValue?: string | string[]
  /** @deprecated Use logicRules instead */
  logicDependsOn?: string
  /** @deprecated Use logicRules instead */
  logicValue?: string | string[]
  /** @deprecated Use logicRules instead */
  logicOperator?: LogicCondition
  repeatsBasedOn?: string
  calcOperation?: 'sum' | 'average'
  calcSourceFields?: string[]
  hardValidation?: boolean
  hardValidationMin?: number
  hardValidationMax?: number
  hardValidationMessage?: string
  lookupSource?: string
  formula?: string
  unit_category?: 'mass' | 'length' | 'temp'
  unit_source?: string
  unit_target?: string
  triggers?: Array<'require_photo' | 'create_action_plan' | 'send_notification'>
  dataSourceType?: 'internal' | 'external_api' | 'master_data'
  apiUrl?: string
  apiMapping?: string
  lookupEntitySlug?: string
  settings?: {
    entitySlug?: string
    source?: string
  }
  logicRules?: LogicRule[]
}

export interface FormBlock {
  id: string
  name: string
  logicDependsOn?: string
  logicValue?: string
}

export interface Subject {
  id: string
  name: string
  created: string
  updated: string
}

export interface Department {
  id: string
  name: string
  created: string
  updated: string
}

export interface PdfSettings {
  logo_url?: string
  primary_color?: string
  header_text?: string
  footer_text?: string
  layout_mode?: 'standard' | 'detailed'
  show_photos?: boolean
}

export interface Template {
  id: string
  name: string
  description: string
  subject: string
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
  pdf_settings?: PdfSettings
}

export interface Schedule {
  id: string
  recurrence: 'daily' | 'weekly' | 'monthly' | 'custom'
  template_id: string
  assigned_to: string
  time?: string
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
  template_id?: string
  created: string
  updated: string
}

export type LogicCondition =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'greater_than_or_equal'
  | 'less_than_or_equal'
  | 'eq'
  | 'neq'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
export type LogicAction =
  | 'SHOW_FIELD'
  | 'HIDE_FIELD'
  | 'SET_VISIBLE'
  | 'SET_HIDDEN'
  | 'SET_REQUIRED'
  | 'REQUIRE_PHOTO'
  | 'REQUIRE_ATTACHMENT'
  | 'DISPLAY_ALERT'
  | 'BLOCK_SUBMIT'
  | 'CREATE_ACTION_PLAN'
  | 'CREATE_SCHEDULE'
  | 'ESCALATE_APPROVAL'

export interface LogicRule {
  id: string
  sourceFieldId: string
  condition: LogicCondition
  targetValue?: any
  value?: any
  action: LogicAction
  targetId?: string
  message?: string
  responsibleId?: string
}

export interface ActionPlan {
  id: string
  field_id: string
  responsible_id: string
  status: 'open' | 'pending' | 'resolved'
  description: string
  due_date?: string
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
