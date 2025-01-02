import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { Field } from './FormBuilder'

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
      <CardContent className="flex justify-between items-center p-4">
        <div  >
          <h3 className="font-semibold">{field.label}</h3>
          <p className="text-sm text-gray-500">{field.type}</p>
        </div>
        <div className="flex space-x-2" onPointerDown={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" onClick={() => onEdit(field.id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(field.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FormField

