import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Field } from '@/app/types/formFields'

interface TextareaFieldProps {
  field: Field
  formField: any
}

export const TextareaField: React.FC<TextareaFieldProps> = ({ field, formField }) => (
  <FormItem>
    <FormLabel>{field.label}</FormLabel>
    <FormControl>
      <Textarea
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

