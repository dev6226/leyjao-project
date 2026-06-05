import { useState, useEffect } from 'react'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/dashboard/Dashboard'
import NewCustomer from './pages/NewCustomer'
import AllCustomer from './pages/AllCustomer'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
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
import Series from './pages/Series.jsx'
import SeriesList from './pages/SeriesList.jsx'
import ProductModle from './pages/ProductModle'
import ModelsList from './pages/ModelsList.jsx'
import AddProduct from './pages/AddProduct.jsx'
import ProductList from './pages/ProductList.jsx'
import Addemployee from './pages/Addemployee.jsx'
import { Toaster } from 'react-hot-toast'
import EmployeeList from './pages/EmployeeList.jsx'
import EmployeeView from './pages/EmployeeView.jsx'
import CreatejobTitle from './pages/CreatejobTitle.jsx'
import Sellproducts from './pages/Sellproducts.jsx'
import Payinstallment from './pages/Payinstallment.jsx'

// ==========================================
// GLOBALLY NAVIGATION GUARD COMPONENT (Native Fix)
// ==========================================
const GlobalNavigationGuard = () => {
  const [isDirty, setIsDirty] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleGlobalInput = (e) => {
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        setIsDirty(true)
      }
    }

    const handleGlobalSubmit = () => {
      setIsDirty(false)
    }

    window.addEventListener('input', handleGlobalInput)
    window.addEventListener('submit', handleGlobalSubmit)

    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('input', handleGlobalInput)
      window.removeEventListener('submit', handleGlobalSubmit)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty])

  useEffect(() => {
    setIsDirty(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isDirty) return

    window.history.pushState(null, null, window.location.pathname)

    const handlePopState = (e) => {
      if (isDirty) {
        const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave this page?")
        if (confirmLeave) {
          setIsDirty(false)
          window.history.back()
        } else {
          window.history.pushState(null, null, window.location.pathname)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isDirty])

  return null
}

// ==========================================
// DYNAMIC BREADCRUMBS COMPONENT
// ==========================================
const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  // Agar user dashboard par hai to breadcrumb khali rakhein ya simple "Dashboard" dikhayein
  if (location.pathname === '/') return null

  return (
    <nav className="flex items-center space-x-2 text-xs sm:text-sm text-[#64748B] mb-4 font-medium" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-[#0062BD] transition-colors">
        Dashboard
      </Link>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        // Agar segment dynamic number/ID hai to use 'Detail' ya generic name de dein
        const isParamId = !isNaN(value)
        let label = value.replace(/-/g, ' ')

        if (isParamId) {
          label = 'View Details'
        }

        // Label ka first letter capital karne ke liye
        label = label.charAt(0).toUpperCase() + label.slice(1)

        return (
          <div key={to} className="flex items-center space-x-2">
            <span className="text-[#CBD5E1] select-none">/</span>
            {last ? (
              <span className="text-[#0F172A] font-semibold">{label}</span>
            ) : (
              <Link to={to} className="hover:text-[#0062BD] transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const hideLayout = location.pathname.startsWith('/auth')

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">

      {/* Sidebar */}
      {!hideLayout && (
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      )}

      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Navbar */}
        {!hideLayout && <Navbar collapsed={collapsed} />}
        <>
          <Toaster position="top-right" />

          <div className="flex-1 overflow-y-auto p-3 md:p-6">

            {/* ── BREADCRUMBS GLOBAL INJECTION ── */}
            {!hideLayout && <Breadcrumbs />}

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
              <Route path='/products-list' element={<Protectedroute><ProductList /></Protectedroute>} />
              <Route path='/category-list' element={<Protectedroute><Categorylist /></Protectedroute>} />
              <Route path='/series-list' element={<Protectedroute><SeriesList /></Protectedroute>} />
              <Route path='/models-list' element={<Protectedroute><ModelsList /></Protectedroute>} />
              <Route path='/add-brand' element={<Protectedroute><Addbrand /></Protectedroute>} />
              <Route path='/add-category' element={<Protectedroute><AddCategory /></Protectedroute>} />
              <Route path='/add-series' element={<Protectedroute><Series /></Protectedroute>} />
              <Route path='/add-models' element={<Protectedroute><ProductModle /></Protectedroute>} />
              <Route path='/add-products' element={<Protectedroute><AddProduct /></Protectedroute>} />
              <Route path='/add-employee/:id' element={<Protectedroute><Addemployee /></Protectedroute>} />
              <Route path='/add-employee' element={<Protectedroute><Addemployee /></Protectedroute>} />
              <Route path='/create-job-title' element={<Protectedroute><CreatejobTitle /></Protectedroute>} />
              <Route path='/employee-list' element={<Protectedroute><EmployeeList /></Protectedroute>} />
              <Route path='/employee/:id' element={<Protectedroute><EmployeeView /></Protectedroute>} />
              <Route path='/sell-products/:id' element={<Protectedroute><Sellproducts /></Protectedroute>} />
              <Route path="/pay-installment" element={<Payinstallment />} />
            </Routes>
          </div>
        </>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <GlobalNavigationGuard />
      <Layout />
    </BrowserRouter>
  )
}

export default App