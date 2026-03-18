export type Role = 'admin' | 'supervisor' | 'operator'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  department?: string
  avatar: string
}

export interface Client {
  id: string
  name: string
  cnpj: string
  address: string
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
}

export interface Carrier {
  id: string
  name: string
  fleetType: string
  contact: string
}

export type LookupSource = 'clients' | 'products' | 'carriers'

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
  // Lookup
  lookupSource?: LookupSource
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
