import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { Field } from '@/types/formFields'

interface FormFieldProps {
  field: Field
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const FormField: React.FC<FormFieldProps> = ({ field, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4">
      <CardContent className="flex justify-between items-center py-2 px-3">
        <div className=' flex'>
          <div className="font-semibold text-sm">{field.label}</div>
          {/* <p className="text-sm  text-gray-500">{field.type}</p> */}
          {/* <p className="text-sm font-semibold">{field.type}</p> */}
        </div>
        <div className="flex space-x-2" onPointerDown={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" onClick={() => onEdit(field.id)}>
            <Pencil className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(field.id)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FormField

