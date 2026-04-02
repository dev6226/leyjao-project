import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import NewCustomer from './pages/NewCustomer'

const App = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar collapsed={collapsed} />
        <div className="flex-1 overflow-y-auto p-6">
          <NewCustomer />
        </div>
      </div>
    </div>
  )
}

export default App
