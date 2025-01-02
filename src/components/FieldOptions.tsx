import React from 'react'
import { Button } from '@/components/ui/button'
import { FieldType } from './FormBuilder'

interface FieldOptionsProps {
  addField: (type: FieldType) => void
}

const FieldOptions: React.FC<FieldOptionsProps> = ({ addField }) => {
  const fieldTypes: FieldType[] = ['text', 'number', 'email', 'textarea', 'select', 'checkbox', 'radio' ]

  return (
    <div className=" flex flex-row w-full  md:flex-col gap-2 ">
      {/* <h2 className="text-lg font-semibold mb-2">Add Field</h2> */}
      {fieldTypes.map((type) => (
        <Button  key={type} onClick={() => addField(type)} className="w-full rounded-3xl">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      ))}
    </div>
  )
}

export default FieldOptions

