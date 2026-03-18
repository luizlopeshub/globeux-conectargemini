export type Role = 'admin' | 'supervisor' | 'operator'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  department?: string
  avatar: string
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

export interface FormField {
  id: string
  type: FieldType
  label: string
  options?: string
  required?: boolean
  logicDependsOn?: string
  logicValue?: string
  repeatsBasedOn?: string
  // Calculation
  calcOperation?: 'sum' | 'average'
  calcSourceFields?: string[]
  // Hard Validation
  hardValidation?: boolean
  hardValidationMin?: number
  hardValidationMax?: number
  hardValidationMessage?: string
}

export interface Template {
  id: string
  name: string
  description: string
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
