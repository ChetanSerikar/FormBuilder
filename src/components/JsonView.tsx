import React from 'react'
import { Field } from '@/types/formFields'
interface JsonViewProps {
  fields: Field[]
}

const JsonView: React.FC<JsonViewProps> = ({ fields }) => {
  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
      {JSON.stringify(fields, null, 2)}
    </pre>
  )
}

export default JsonView

