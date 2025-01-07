export type FieldType = 
  'text' | 
  'number' | 
  'email' | 
  'textarea' | 
  'select' | 
  'checkbox' | 
  'radio' |
  'password' |
  'combobox' |
  'date' |
  'otp' |
  'file' |
  'switch'

export interface Field {
  id: string
  type: FieldType
  label: string
  name: string
  description?: string
  placeholder?: string
  className?: string
  required: boolean
  disabled: boolean
  options?: string[]
  validation?: {
    pattern?: string
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }
}

