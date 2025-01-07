import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Field } from '@/types/formFields'
import { useController } from 'react-hook-form'

interface OtpFieldProps {
  field: Field
  control: any
}

export const OtpField: React.FC<OtpFieldProps> = ({ field, control }) => {
  const { field: formField } = useController({
    name: field.name,
    control,
    defaultValue: '',
  })

  const otpLength = field.validation?.maxLength || 6 // Default to 6 if not specified

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = formField.value.split('')
      newOtp[index] = value
      formField.onChange(newOtp.join(''))
      if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
        e.target.nextElementSibling.focus()
      }
    }
  }

  return (
    <FormItem>
      <FormLabel>{field.label}</FormLabel>
      <FormControl>
        <div className="flex gap-2">
          {Array.from({ length: otpLength }).map((_, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              className="w-10 text-center"
              value={formField.value[index] || ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !e.currentTarget.value && e.currentTarget.previousElementSibling instanceof HTMLInputElement) {
                  e.currentTarget.previousElementSibling.focus()
                }
              }}
            />
          ))}
        </div>
      </FormControl>
      {field.description && <FormDescription>{field.description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

