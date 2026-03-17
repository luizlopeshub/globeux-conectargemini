export type Role = 'admin' | 'operator'

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
  options?: string // Comma separated for radio/checkbox
  required?: boolean
  logicDependsOn?: string // ID of another field
  logicValue?: string // Expected value to show this field
  calculation?: string // Math formula string
  repeatsBasedOn?: string // ID of a numeric field to repeat this component
}

export interface Template {
  id: string
  name: string
  description: string
  fields: FormField[]
  createdAt: string
}

export interface Audit {
  id: string
  templateId: string
  templateName: string
  operatorName: string
  answers: Record<string, any>
  timestamp: string
  location?: string
  status: 'Concluído' | 'Rascunho'
}
