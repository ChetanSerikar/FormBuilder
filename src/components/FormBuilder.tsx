'use client'

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
import { Field, FieldType } from '@/types/formFields'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Github } from 'lucide-react'
import { ModeToggle } from './mode-toggle'

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

    if (active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const addField = (type: FieldType) => {
    const newField: Field = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      name: `name-${Date.now()}`,
      required: false,
      disabled: false,
    }

    // Add specific properties for certain field types
    switch (type) {
      case 'select':
      case 'radio':
      case 'combobox':
        newField.options = ['Option 1', 'Option 2', 'Option 3']
        break
      case 'otp':
        newField.validation = { minLength: 6, maxLength: 6 }
        break
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
    const fieldToEdit = fields.find(field => field.id === id)
    if (fieldToEdit) {
      setEditingField(fieldToEdit)
    }
  }

  const closeEditDialog = () => {
    setEditingField(null)
  }

  // <div className="container mx-auto p-4">
  // <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
  // <div className="flex gap-4">
  //   <div className="w-1/4">
  //     <FieldOptions addField={addField} />
  //   </div>
  //   <div className="w-1/2">

  return (
    <div className="container mx-auto p-2 md:p-4">
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

