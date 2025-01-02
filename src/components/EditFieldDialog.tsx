import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from './FormBuilder'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setEditedField(prev => ({
      ...prev!,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = () => {
    onSave(editedField)
    onClose()
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
          <div className="">
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
          <div className="">
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
          <div className="">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={editedField.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="">
            <Label htmlFor="placeholder" className="text-right">
              Placeholder
            </Label>
            <Input
              id="placeholder"
              name="placeholder"
              value={editedField.placeholder}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="">
            <Label htmlFor="className" className="text-right">
              Class Name
            </Label>
            <Input
              id="className"
              name="className"
              value={editedField.className}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className='grid grid-cols-2 items-center gap-4'>
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

        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditFieldDialog

