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
            <Route path='/' element={<Dashboard />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/add-customer' element={<NewCustomer />} />
            <Route path='/all-Customer' element={<AllCustomer />} />
            <Route path='/view-Customer/:id' element={<ViewCustomer />} />
            <Route path='/paid-installments' element={<Paidinstallment />} />
            <Route path='/installment-payscreen' element={<InstallmentPayscreen />} />
            <Route path='/pending-installments' element={<PendingInstallment />} />
            <Route path='/submit-installment' element={<SubmitInstallment />} />
            <Route path='/brand-list' element={<BrandList />} />
            <Route path='/add-brand' element={<Addbrand />} />
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
