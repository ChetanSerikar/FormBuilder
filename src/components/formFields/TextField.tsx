import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Field } from '@/types/formFields'

interface TextFieldProps {
  field: Field
  formField: any
}

export const TextField: React.FC<TextFieldProps> = ({ field, formField }) => (
  <FormItem>
    <FormLabel>{field.label}</FormLabel>
    <FormControl>
      <Input
        type="text"
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

