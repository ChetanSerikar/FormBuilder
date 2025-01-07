import React from 'react'
import { Field } from '@/types/formFields'

interface CodeViewProps {
  fields: Field[]
}

const CodeView: React.FC<CodeViewProps> = ({ fields }) => {
  const generateCode = (fields: Field[]) => {
    const imports = `
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
import { Switch } from '@/components/ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
`

    const formSchema = `
const formSchema = z.object({
  ${fields.map(field => {
    let schema = `${field.name}: z.string()`
    if (field.required) {
      schema += '.min(1, { message: "This field is required" })'
    } else {
      schema += '.optional()'
    }
    switch (field.type) {
      case 'number':
        schema = `${field.name}: z.number()`
        if (field.required) {
          schema += '.min(-Infinity, { message: "This field is required" })'
        }
        break
      case 'checkbox':
      case 'switch':
        schema = `${field.name}: z.boolean()`
        break
      case 'date':
        schema = `${field.name}: z.date()`
        break
      case 'file':
        schema = `${field.name}: z.instanceof(File)`
        break
      case 'combobox':
        schema = `${field.name}: z.string()`
        if (field.required) {
          schema += '.min(1, { message: "Please select an option" })'
        }
        break
    }
    return schema
  }).join(',\n  ')}
})
`

    const formComponent = `
export function GeneratedForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${fields.map(field => {
        switch (field.type) {
          case 'checkbox':
          case 'switch':
            return `${field.name}: false,`
          case 'date':
          case 'file':
            return `${field.name}: undefined,`
          default:
            return `${field.name}: "",`
        }
      }).join('\n      ')}
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        ${fields.map(field => {
          switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
              return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Input type="${field.type}" placeholder="${field.placeholder || ''}" {...field} />
              </FormControl>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
            case 'textarea':
              return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Textarea placeholder="${field.placeholder || ''}" {...field} />
              </FormControl>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
            case 'select':
              return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="${field.placeholder || 'Select an option'}" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  ${field.options?.map(option => `<SelectItem value="${option}">${option}</SelectItem>`).join('\n                  ')}
                </SelectContent>
              </Select>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
            case 'checkbox':
              return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  ${field.label}
                </FormLabel>
                ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              </div>
            </FormItem>
          )}
        />`
            case 'radio':
              return `
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
                >
                  ${field.options?.map(option => `
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="${option}" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      ${option}
                    </FormLabel>
                  </FormItem>`).join('')}
                </RadioGroup>
              </FormControl>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
            case 'switch':
              return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  ${field.label}
                </FormLabel>
                ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />`
            case 'date':
              return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>${field.label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
            case 'file':
              return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
            case 'combobox':
              return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>${field.label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? ${JSON.stringify(field.options)}?.find(
                            (option) => option === field.value
                          )
                        : "${field.placeholder || 'Select option'}"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="${field.placeholder || 'Search option...'}" />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {${JSON.stringify(field.options)}?.map((option) => (
                        <CommandItem
                          value={option}
                          key={option}
                          onSelect={() => {
                            form.setValue("${field.name}", option)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              option === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ''}
              <FormMessage />
            </FormItem>
          )}
        />`
            default:
              return ''
          }
        }).join('\n        ')}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
`

    return `${imports}\n${formSchema}\n${formComponent}`
  }

  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[600px] text-sm">
      <code>{generateCode(fields)}</code>
    </pre>
  )
}

export default CodeView

