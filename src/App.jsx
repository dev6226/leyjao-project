import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'

const App = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar collapsed={collapsed} />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">

        </main>
      </div>
    </div>
  )
}

export default App
