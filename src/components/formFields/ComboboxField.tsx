
import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Field } from '@/types/formFields'
import { useController } from 'react-hook-form'

interface ComboboxFieldProps {
  field: Field
  control: any
  formField?: any
}

export const ComboboxField: React.FC<ComboboxFieldProps> = ({ field, control }) => {
  const { field: formField } = useController({
    name: field.name,
    control,
    defaultValue: '',
  })

  console.log('ComboboxFieldProps', formField)

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{field.label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                !formField.value && "text-muted-foreground"
              )}
              // {...formField}
            >
              {formField.value
                ? field.options?.find((option) => option === formField.value)
                : field.placeholder || "Select option"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={field.placeholder || "Search option..."} />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {field.options?.map((option) => (
                  <CommandItem
                    value={option}
                    key={option}
                    onSelect={(currentValue) => {
                      console.log('currentValue', currentValue)
                      console.log('option', option)
                      formField.onChange(option)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        option === formField.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {field.description && <FormDescription>{field.description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

