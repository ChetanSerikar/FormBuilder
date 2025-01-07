import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Field } from '@/app/types/formFields'
import { useController } from 'react-hook-form'

interface FileFieldProps {
  field: Field
  control: any
}

export const FileField: React.FC<FileFieldProps> = ({ field, control }) => {
  const { field: formField } = useController({
    name: field.name,
    control,
    defaultValue: null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    formField.onChange(file)
  }

  return (
    <FormItem>
      <FormLabel>{field.label}</FormLabel>
      <FormControl>
        <Input
          type="file"
          className={field.className}
          disabled={field.disabled}
          onChange={handleFileChange}
        />
      </FormControl>
      {field.description && <FormDescription>{field.description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

