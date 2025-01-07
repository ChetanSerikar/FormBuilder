import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/app/types/formFields'

interface CheckboxFieldProps {
  field: Field
  formField: any
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ field, formField }) => (
  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
    <FormControl>
      <Checkbox
        checked={formField.value}
        onCheckedChange={formField.onChange}
        disabled={field.disabled}
      />
    </FormControl>
    <div className="space-y-1 leading-none">
      <FormLabel>{field.label}</FormLabel>
      {field.description && <FormDescription>{field.description}</FormDescription>}
    </div>
    <FormMessage />
  </FormItem>
)

