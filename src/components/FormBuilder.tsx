import React, { useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import FieldOptions from './FieldOptions'
import FormField from './FormField'
import ViewSwitcher from './ViewSwitcher'
import JsonView from './JsonView'
import PreviewView from './PreviewView'
import CodeView from './CodeView'
import EditFieldDialog from './EditFieldDialog'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Separator } from './ui/separator'

export type FieldType = 'text' | 'number' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio'

export interface Field {
  id: string
  type: FieldType
  label: string
  name: string
  description?: string
  placeholder?: string
  className?: string
  required: boolean
  disabled: boolean
  options?: string[]
}

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([])
  const [currentView, setCurrentView] = useState<'json' | 'preview' | 'code'>('preview')
  const [editingField, setEditingField] = useState<Field | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active?.id !== over?.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item?.id === active?.id)
        const newIndex = items.findIndex((item) => item?.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const addField = (type: FieldType) => {
    const newField: Field = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      name: `name_${Date.now()}`,
      required: false,
      disabled: false,
    }
    setFields([...fields, newField])
  }

  const updateField = (updatedField: Field) => {
    setFields(fields.map(field => field.id === updatedField.id ? updatedField : field))
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const openEditDialog = (id: string) => {
    const fieldToEdit = fields.find(field => field.id == id)
    if (fieldToEdit) {
      setEditingField(fieldToEdit)
    }
  }

  const closeEditDialog = () => {
    setEditingField(null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white bg-black px-4 py-2">Form Builder</h1>
      <div className="flex gap-4 md:flex-row flex-col">
        <ScrollArea  className="w-full md:w-1/5 whitespace-nowrap rounded-md border py-2 px-3 md:max-h-screen">
          <FieldOptions addField={addField} />
          <ScrollBar orientation='horizontal' className='md:hidden h-1' />
          <ScrollBar orientation='horizontal' className='sm:hidden h-1' />
        </ScrollArea>
        <Separator className='md:hidden h-1' orientation='horizontal' />
        <div className=" w-full md:w-1/2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fields} strategy={verticalListSortingStrategy}>
              {fields.map((field) => (
                <FormField
                  key={field?.id}
                  field={field}
                  onEdit={openEditDialog}
                  onDelete={removeField}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <Separator className='md:hidden h-1' orientation='horizontal' />
        <div className="w-full md:w-1/3">
          <ViewSwitcher currentView={currentView} setCurrentView={setCurrentView} />
          {currentView === 'json' && <JsonView fields={fields} />}
          {currentView === 'preview' && <PreviewView fields={fields} />}
          {currentView === 'code' && <CodeView fields={fields} />}
        </div>
      </div>
      <EditFieldDialog
        field={editingField}
        isOpen={!!editingField}
        onClose={closeEditDialog}
        onSave={updateField}
      />
    </div>
  )
}

export default FormBuilder

