import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/dashboard/Dashboard'
import NewCustomer from './pages/NewCustomer'
import AllCustomer from './pages/AllCustomer'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import ViewCustomer from './pages/ViewCustomer.jsx'
import Paidinstallment from './pages/Paidinstallment.jsx'
import InstallmentPayscreen from './pages/InstallmentPayscreen.jsx'
import PendingInstallment from './pages/PendingInstallment.jsx'
import SubmitInstallment from './pages/SubmitInstallment.jsx'
import BrandList from './pages/BrandList.jsx'
import Addbrand from './pages/Addbrand.jsx'
import Protectedroute from './pages/auth/Protectedroute.jsx'
import AddCategory from './pages/AddCategory.jsx'
import Categorylist from './pages/Categorylist.jsx'
const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const hideLayout = location.pathname.startsWith('/auth')

  // routes
  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">

      {/* Sidebar */}
      {!hideLayout && (
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      )}

      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Navbar */}
        {!hideLayout && <Navbar collapsed={collapsed} />}

        <div className="flex-1 overflow-y-auto p-3 md:p-6">
          <Routes>
            <Route path='/' element={<Protectedroute><Dashboard /></Protectedroute>} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/add-customer' element={<Protectedroute><NewCustomer /></Protectedroute>} />
            <Route path='/all-Customer' element={<Protectedroute><AllCustomer /></Protectedroute>} />
            <Route path='/view-Customer/:id' element={<Protectedroute><ViewCustomer /></Protectedroute>} />
            <Route path='/paid-installments' element={<Protectedroute><Paidinstallment /></Protectedroute>} />
            <Route path='/installment-payscreen' element={<Protectedroute><InstallmentPayscreen /></Protectedroute>} />
            <Route path='/pending-installments' element={<Protectedroute><PendingInstallment /></Protectedroute>} />
            <Route path='/submit-installment' element={<Protectedroute><SubmitInstallment /></Protectedroute>} />
            <Route path='/brand-list' element={<Protectedroute><BrandList /></Protectedroute>} />
            <Route path='/category-list' element={<Protectedroute><Categorylist /></Protectedroute>} />
            <Route path='/add-brand' element={<Protectedroute><Addbrand /></Protectedroute>} />
            <Route path='/add-category' element={<Protectedroute><AddCategory /></Protectedroute>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  return (

    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
