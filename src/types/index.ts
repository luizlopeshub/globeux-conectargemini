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
  blocks: FormBlock[]
  fields: FormField[]
  createdAt: string
  assignedUsers?: string[]
  assignedDepartments?: string[]
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
