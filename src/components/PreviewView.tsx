'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Field } from '@/types/formFields'
import { TextField } from './formFields/TextField'
import { NumberField } from './formFields/NumberField'
import { EmailField } from './formFields/EmailField'
import { TextareaField } from './formFields/TextareaField'
import { SelectField } from './formFields/SelectField'
import { CheckboxField } from './formFields/CheckboxField'
import { RadioField } from './formFields/RadioField'
import { PasswordField } from './formFields/PasswordField'
import { ComboboxField } from './formFields/ComboboxField'
import { DateField } from './formFields/DateField'
import { OtpField } from './formFields/OtpField'
import { FileField } from './formFields/FileField'
import { SwitchField } from './formFields/SwitchField'
import { toast } from 'sonner'

interface PreviewViewProps {
  fields: Field[]
}

const PreviewView: React.FC<PreviewViewProps> = ({ fields }) => {
  const formSchema = z.object(
    fields.reduce((acc, field) => {
      if (!field || !field.name) return acc;

      let schema: z.ZodTypeAny = z.string()
      
      switch (field.type) {
        case 'number':
          schema = z.number()
          break
        case 'checkbox':
        case 'switch':
          schema = z.boolean()
          break
        case 'date':
          schema = z.string().nullable().refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Invalid date format",
          })
          break
        case 'file':
          schema = z.instanceof(File).nullable()
          break
        case 'otp':
          schema = z.string().length(field.validation?.maxLength || 6, "Invalid OTP length")
          break
      }

      if (field.required) {
        if (schema instanceof z.ZodString || schema instanceof z.ZodNumber) {
          schema = schema.min(1, { message: "This field is required" })
        } else if (schema instanceof z.ZodBoolean) {
          schema = schema.refine((val) => val === true, { message: "This field is required" })
        } else if (field.type === 'file') {
          schema = schema.refine((file) => file !== null, {
            message: "Please select a file",
          })
        }
      } else {
        schema = schema.optional()
      }

      if (field.validation) {
        if (field.validation.pattern && schema instanceof z.ZodString) {
          schema = schema.regex(new RegExp(field.validation.pattern), { message: "Invalid format" })
        }
        if (field.validation.minLength && schema instanceof z.ZodString) {
          schema = schema.min(field.validation.minLength, { message: `Minimum ${field.validation.minLength} characters` })
        }
        if (field.validation.maxLength && schema instanceof z.ZodString) {
          schema = schema.max(field.validation.maxLength, { message: `Maximum ${field.validation.maxLength} characters` })
        }
        if (field.type === 'number' && schema instanceof z.ZodNumber) {
          if (field.validation.min !== undefined) {
            schema = schema.min(field.validation.min, { message: `Minimum value is ${field.validation.min}` })
          }
          if (field.validation.max !== undefined) {
            schema = z.number().max(field.validation.max, { message: `Maximum value is ${field.validation.max}` })
          }
        }
      }

      return { ...acc, [field.name]: schema }
    }, {} as Record<string, z.ZodTypeAny>)
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      if (!field || !field.name) return acc;

      switch (field.type) {
        case 'checkbox':
        case 'switch':
          acc[field.name] = false
          break
        case 'date':
        case 'file':
          acc[field.name] = null
          break
        default:
          acc[field.name] = ''
      }
      return acc
    }, {} as Record<string, any>),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
   toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
  }

  const renderField = (field: Field) => {
    if (!field || !field.name) return null;

    switch (field.type) {
      case 'text':
        return <TextField field={field} formField={form.register(field.name)} />
      case 'number':
        return <NumberField field={field} formField={form.register(field.name, { valueAsNumber: true })} />
      case 'email':
        return <EmailField field={field} formField={form.register(field.name)} />
      case 'textarea':
        return <TextareaField field={field} formField={form.register(field.name)} />
      case 'select':
        return <SelectField field={field}  control={form.control} />
      case 'checkbox':
        return <CheckboxField field={field} formField={form.register(field.name)} />
      case 'radio':
        return <RadioField field={field} formField={form.register(field.name)} control={form.control} />
      case 'password':
        return <PasswordField field={field}  formField={form.register(field.name)} />
      case 'combobox':
        // return <ComboboxField field={field}  control={form.control} />
        return <ComboboxField field={field} formField={form.register(field.name)} control={form.control} />
      case 'date':
        return <DateField field={field} control={form.control} />
      case 'otp':
        return <OtpField field={field} control={form.control} />
      case 'file':
        return <FileField field={field} control={form.control} />
      case 'switch':
        return <SwitchField field={field} formField={form.register(field.name)} control={form.control} />
      default:
        return null
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field : Field) => (
          field && field.name ? (
            <FormField
              key={field.id}
              control={form.control}
              name={field.name}
              render={() => renderField(field) ?? <div>Fallback content</div>}
            />
          ) : null
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PreviewView

