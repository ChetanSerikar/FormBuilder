import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Field } from '@/types/formFields'
import { useController } from 'react-hook-form'

interface RadioFieldProps {
  field: Field
  formField?: any
  control?: any
}

export const RadioField: React.FC<RadioFieldProps> = ({ field, control  }) => {
  const { field: formField } = useController({
    name: field.name,
    control,
    defaultValue: '',
  })
  
  return(
  <FormItem className="space-y-3">
    <FormLabel>{field.label}</FormLabel>
    <FormControl>
      <RadioGroup
        onValueChange={formField.onChange}
        defaultValue={formField.value}
        className="flex flex-col space-y-1"
        disabled={field.disabled}
      >
        {field.options?.map((option : string, index : number) => (
          <FormItem key={index} className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value={option}  />
            </FormControl>
            <FormLabel className="font-normal">
              {option}
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </FormControl>
    {field.description && <FormDescription>{field.description}</FormDescription>}
    <FormMessage />
  </FormItem>
)}

