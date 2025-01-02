import React from 'react'
import { Button } from '@/components/ui/button'

interface ViewSwitcherProps {
  currentView: 'json' | 'preview' | 'code'
  setCurrentView: (view: 'json' | 'preview' | 'code') => void
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <Button
        variant={currentView === 'json' ? 'default' : 'outline'}
        onClick={() => setCurrentView('json')}
      >
        JSON
      </Button>
      <Button
        variant={currentView === 'preview' ? 'default' : 'outline'}
        onClick={() => setCurrentView('preview')}
      >
        Preview
      </Button>
      <Button
        variant={currentView === 'code' ? 'default' : 'outline'}
        onClick={() => setCurrentView('code')}
      >
        Code
      </Button>
    </div>
  )
}

export default ViewSwitcher

