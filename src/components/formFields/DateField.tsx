import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Field } from '@/app/types/formFields'
import { useController } from 'react-hook-form'

interface DateFieldProps {
  field: Field
  control: any
}

export const DateField: React.FC<DateFieldProps> = ({ field, control }) => {
  const { field: formField } = useController({
    name: field.name,
    control,
    defaultValue: null,
  })

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{field.label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal",
                !formField.value && "text-muted-foreground"
              )}
            >
              {formField.value ? (
                format(new Date(formField.value), "PPP")
              ) : (
                <span>{field.placeholder || "Pick a date"}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={formField.value ? new Date(formField.value) : undefined}
            onSelect={(date) => formField.onChange(date?.toISOString())}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {field.description && <FormDescription>{field.description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

