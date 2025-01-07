import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function feilds(type: any ) {
  switch (type) {
    case 'text':
      return {
        id: `field-${Date.now()}`,
        type,
        label: `New ${type} field`,
        name: `name_${Date.now()}`,
        required: false,
        disabled: false,
        description: 'This is your public display name.',
      }
    case 'textarea':
      return {
        id: `field-${Date.now()}`,
        type,
        label: `New ${type} field`,
        name: `name_${Date.now()}`,
        required: false,
        disabled: false,
      }
    case 'checkbox':
      return {
        id: `field-${Date.now()}`,
        type,
        label: `New ${type} field`,
        name: `name_${Date.now()}`,
        required: false,
        disabled: false,
      }
    case 'radio':
      return {
        id: `field-${Date.now()}`,
        type,
        label: `New ${type} field`,
        name: `name_${Date.now()}`,
        required: false,
        disabled: false,
      }
    case 'select':
      return {
        id: `field-${Date.now()}`,
        type,
        label: `New ${type} field`,
        name: `name_${Date.now()}`,
        required: false,
        disabled: false,
      }
    default:
      return {
        id: `field-${Date.now()}`,
        type,
        label: `New ${type} field`,
        name: `name_${Date.now()}`,
        required: false,
        disabled: false,
      }
  }
  
}
