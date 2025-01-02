import React from 'react'
import { Field } from './FormBuilder'

interface CodeViewProps {
  fields: Field[]
}

const CodeView: React.FC<CodeViewProps> = ({ fields }) => {
  const generateCode = (fields: Field[]) => {
    return `
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  ${fields.map(field => {
    let schema = `${field.name}: z.string()`
    if (field.required) {
      schema += '.min(1, { message: "This field is required" })'
    } else {
      schema += '.optional()'
    }
    return schema
  }).join(',\n  ')}
})

export function GeneratedForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${fields.map(field => `${field.name}: "",`).join('\n      ')}
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        ${fields.map((field) => {
          let fieldJSX = ''
          switch (field.type) {
            case 'text':
            case 'number':
            case 'email':
              fieldJSX = `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Input type="${field.type}" placeholder="${field.placeholder || ''}" {...field} className="${field.className || ''}" disabled={${field.disabled}} />
              </FormControl>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
              break
            case 'textarea':
              fieldJSX = `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Textarea placeholder="${field.placeholder || ''}" {...field} className="${field.className || ''}" disabled={${field.disabled}} />
              </FormControl>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
              break
            case 'select':
              fieldJSX = `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="${field.className || ''}" disabled={${field.disabled}}>
                    <SelectValue placeholder="${field.placeholder || ''}" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  ${field.options?.map((option, index) => `<SelectItem key={${index}} value="${option}">${option}</SelectItem>`).join('\n                  ')}
                </SelectContent>
              </Select>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
              break
            case 'checkbox':
              fieldJSX = `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={${field.disabled}}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>${field.label}</FormLabel>
                ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              </div>
            </FormItem>
          )}
        />`
              break
            case 'radio':
              fieldJSX = `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                  disabled={${field.disabled}}
                >
                  ${field.options?.map((option, index) => `
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="${option}" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      ${option}
                    </FormLabel>
                  </FormItem>`).join('\n                  ')}
                </RadioGroup>
              </FormControl>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
              break
          }
          return fieldJSX
        }).join('\n        ')}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default GeneratedForm
`
  }

  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
      {generateCode(fields)}
    </pre>
  )
}

export default CodeView

