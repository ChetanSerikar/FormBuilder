import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Field } from '@/types/formFields'

interface NumberFieldProps {
  field: Field
  formField: any
}

export const NumberField: React.FC<NumberFieldProps> = ({ field, formField }) => (
  <FormItem>
    <FormLabel>{field.label}</FormLabel>
    <FormControl>
      <Input
        type="number"
        placeholder={field.placeholder}
        className={field.className}
        disabled={field.disabled}
        {...formField}
        onChange={(e) => formField.onChange(e.target.valueAsNumber)}
      />
    </FormControl>
    {field.description && <FormDescription>{field.description}</FormDescription>}
    <FormMessage />
  </FormItem>
)

