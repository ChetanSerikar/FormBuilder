import FormBuilder from './components/FormBuilder'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle'
import { Github } from 'lucide-react'



// import './App.css'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div>
          <div className='px-4 py-2 flex justify-between items-center mb-4 border-b-2'>
            <h1 className="text-2xl font-bold">Form Builder</h1>
            <div className=' flex gap-4 items-center'>
              <ModeToggle/>
              <Github className=''/>
            </div>
          </div>
          <FormBuilder/>
          <Toaster />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
