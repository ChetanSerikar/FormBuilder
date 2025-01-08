import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Field } from '@/types/formFields'
import { useController } from 'react-hook-form'

interface SelectFieldProps {
  field: Field
  formField?: any,
  control?: any
}

export const SelectField: React.FC<SelectFieldProps> = ({ field , control }) => {
    const { field: formField } = useController({
      name: field.name,
      control,
      defaultValue: '',
    })

  return(
  <FormItem>
    <FormLabel>{field.label}</FormLabel>
    <Select onValueChange={formField.onChange} defaultValue={formField.value} disabled={field.disabled}>
      <FormControl>
        <SelectTrigger className={field.className}>
          <SelectValue placeholder={field.placeholder || "Select an option"} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {field.options?.map((option, index) => (
         option == '' ? null : <SelectItem key={index} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    {field.description && <FormDescription>{field.description}</FormDescription>}
    {/* {<pre>{formField}</pre>} */}
    <FormMessage />
  </FormItem>
  )
}

