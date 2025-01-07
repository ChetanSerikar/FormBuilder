import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const Text = ( {field : any , form : any}) => {
  return (
   <FormField
    key={field.id}
    control={form.control}
    name={field.name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>New text field</FormLabel>
        <FormControl>
          <Input type="text" placeholder="" {...field} className="" disabled={false} />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default Text