import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/dashboard/Dashboard'
import NewCustomer from './pages/NewCustomer'
import AllCustomer from './pages/AllCustomer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ViewCustomer from './pages/ViewCustomer.jsx'


const App = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar collapsed={collapsed} />
          <div className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/add-customer' element={<NewCustomer />} />
              <Route path='/all-Customer' element={<AllCustomer />} />
              <Route path='/view-Customer/:id' element={<ViewCustomer />} />
            </Routes>

          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
