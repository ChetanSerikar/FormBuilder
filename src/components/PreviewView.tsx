'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Field } from './FormBuilder'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from './ui/button'

interface PreviewViewProps {
  fields: Field[]
}

const PreviewView: React.FC<PreviewViewProps> = ({ fields }) => {
  const form = useForm({
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.type === 'checkbox' ? false : '';
      return acc;
    }, {} as Record<string, any>)
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                {field.type !== "checkbox" ? <FormLabel>{field.label}</FormLabel> : null }
                <FormControl >
                  <>
                  {field.type === 'text' && (
                    <Input 
                      type="text" 
                      placeholder={field.placeholder} 
                      className={field.className} 
                      disabled={field.disabled} 
                      {...formField} 
                    />
                  )}
                  {field.type === 'number' && (
                    <Input 
                      type="number" 
                      placeholder={field.placeholder} 
                      className={field.className} 
                      disabled={field.disabled} 
                      {...formField} 
                      onChange={(e) => formField.onChange(e.target.valueAsNumber)}
                    />
                  )}
                  {field.type === 'email' && (
                    <Input 
                      type="email" 
                      placeholder={field.placeholder} 
                      className={field.className} 
                      disabled={field.disabled} 
                      {...formField} 
                    />
                  )}
                  {field.type === 'textarea' && (
                    <Textarea 
                      placeholder={field.placeholder} 
                      className={field.className} 
                      disabled={field.disabled} 
                      {...formField} 
                    />
                  )}
                  {field.type === 'select' && (
                    <Select 
                      onValueChange={formField.onChange} 
                      defaultValue={formField.value} 
                      disabled={field.disabled}
                    > 
                        <SelectTrigger className={field.className}>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                  )}
                  {field.type === 'checkbox' && (
                    <>
                    <Checkbox 
                      checked={formField.value} 
                      onCheckedChange={formField.onChange} 
                      disabled={field.disabled} 
                      className='mr-2'
                    />
                    <FormLabel>{field.label}</FormLabel>
                    </>
                  )}
                  {field.type === 'radio' && (
                    <RadioGroup 
                      onValueChange={formField.onChange} 
                      value={formField.value} 
                      disabled={field.disabled}
                    >
                      {field.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                          <FormLabel htmlFor={`${field.id}-${index}`}>{option}</FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  </>
                </FormControl>
                {field.description && <FormDescription>{field.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
         {fields.length > 0 ? <Button type="submit">Submit</Button> : null}
      </form>
    </Form>
  )
}

export default PreviewView

