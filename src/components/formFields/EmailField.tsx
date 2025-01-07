import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Field } from '@/app/types/formFields'

interface EmailFieldProps {
  field: Field
  formField: any
}

export const EmailField: React.FC<EmailFieldProps> = ({ field, formField }) => (
  <FormItem>
    <FormLabel>{field.label}</FormLabel>
    <FormControl>
      <Input
        type="email"
        placeholder={field.placeholder}
        className={field.className}
        disabled={field.disabled}
        {...formField}
      />
    </FormControl>
    {field.description && <FormDescription>{field.description}</FormDescription>}
    <FormMessage />
  </FormItem>
)

