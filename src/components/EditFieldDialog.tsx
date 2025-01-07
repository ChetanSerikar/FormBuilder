import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldType } from '@/types/formFields'
import { Textarea } from '@/components/ui/textarea'

interface EditFieldDialogProps {
  field: Field | null
  isOpen: boolean
  onClose: () => void
  onSave: (field: Field) => void
}

const EditFieldDialog: React.FC<EditFieldDialogProps> = ({ field, isOpen, onClose, onSave }) => {
  const [editedField, setEditedField] = React.useState<Field | null>(field)

  React.useEffect(() => {
    setEditedField(field)
  }, [field])

  if (!editedField) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setEditedField(prev => ({
      ...prev!,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const options = e.target.value.split('\n').map(option => option.trim()).filter(option => option !== '')
    setEditedField(prev => ({
      ...prev!,
      options
    }))
  }

  const handleSave = () => {
    if (editedField) {
      onSave(editedField)
    }
    onClose()
  }

  const renderFieldSpecificInputs = (type: FieldType) => {
    switch (type) {
      case 'select':
      case 'radio':
      case 'combobox':
        return (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="options" className="text-right">
              Options
            </Label>
            <Textarea
              id="options"
              name="options"
              value={editedField.options?.join('\n') || ''}
              onChange={handleOptionsChange}
              className="col-span-3"
              placeholder="Enter each option on a new line"
            />
          </div>
        )
      case 'number':
        return (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="min" className="text-right">
                Min
              </Label>
              <Input
                id="min"
                name="min"
                type="number"
                value={editedField.validation?.min ?? ''}
                onChange={(e) => setEditedField(prev => ({
                  ...prev!,
                  validation: { ...prev!.validation, min: Number(e.target.value) }
                }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="max" className="text-right">
                Max
              </Label>
              <Input
                id="max"
                name="max"
                type="number"
                value={editedField.validation?.max ?? ''}
                onChange={(e) => setEditedField(prev => ({
                  ...prev!,
                  validation: { ...prev!.validation, max: Number(e.target.value) }
                }))}
                className="col-span-3"
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Field</DialogTitle>
          <DialogDescription>
            Make changes to your form field here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input
              id="label"
              name="label"
              value={editedField.label}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={editedField.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={editedField.description || ''}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="placeholder" className="text-right">
              Placeholder
            </Label>
            <Input
              id="placeholder"
              name="placeholder"
              value={editedField.placeholder || ''}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="className" className="text-right">
              Class Name
            </Label>
            <Input
              id="className"
              name="className"
              value={editedField.className || ''}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          {renderFieldSpecificInputs(editedField.type)}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="required"
              name="required"
              checked={editedField.required}
              onCheckedChange={(checked) => setEditedField(prev => ({ ...prev!, required: checked as boolean }))}
            />
            <Label htmlFor="required">Required</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="disabled"
              name="disabled"
              checked={editedField.disabled}
              onCheckedChange={(checked) => setEditedField(prev => ({ ...prev!, disabled: checked as boolean }))}
            />
            <Label htmlFor="disabled">Disabled</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditFieldDialog

