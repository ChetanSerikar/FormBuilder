import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Field } from '@/types/formFields'
import { useController } from 'react-hook-form'

interface SwitchFieldProps {
  field: Field
  formField: any
}

export const SwitchField: React.FC<SwitchFieldProps> = ({ field, formField }) => {
  const { field: controlledField } = useController({
    name: field.name,
    defaultValue: false,
  })

  return (
    <FormItem className="rounded-lg border p-4">
      <div className="space-y-0.5 flex flex-row items-center justify-between ">
        <FormLabel className="text-base">{field.label}</FormLabel>
        {field.description && <FormDescription>{field.description}</FormDescription>}
      </div>
      <FormControl>
        <Switch
          checked={controlledField.value}
          onCheckedChange={controlledField.onChange}
          disabled={field.disabled}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

