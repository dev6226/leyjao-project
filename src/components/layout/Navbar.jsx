import { useState } from 'react'
import navItems from '../../data/navItems'

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.04699 3.22C6.42599 3.388 5.84599 3.651 5.44199 4.015C4.33899 5.01 3.88999 6.358 3.88999 8.788C3.88999 10.52 2.90399 12.16 2.19399 13.222C2.03999 13.454 1.99199 13.675 2.00099 13.808C2.00499 13.868 2.01899 13.896 2.02499 13.906C2.02899 13.913 2.04099 13.932 2.08899 13.958C2.78099 14.328 3.82499 14.598 5.03199 14.769C6.19378 14.9249 7.36479 15.0021 8.53699 15C8.80221 15 9.05656 15.1054 9.2441 15.2929C9.43164 15.4804 9.53699 15.7348 9.53699 16C9.53699 16.2652 9.43164 16.5196 9.2441 16.7071C9.05656 16.8946 8.80221 17 8.53699 17C7.40899 17 6.05299 16.935 4.75099 16.75C3.46899 16.567 2.14799 16.257 1.14599 15.722C0.408993 15.328 0.0529929 14.642 0.00599288 13.943C-0.0400071 13.284 0.182993 12.633 0.530993 12.112C1.24799 11.038 1.88999 9.853 1.88999 8.788C1.88999 6.127 2.38199 4.081 4.10299 2.53C4.82799 1.876 5.73899 1.503 6.52199 1.29C7.17857 1.10792 7.85572 1.01046 8.53699 1C8.80221 1 9.05656 1.10536 9.2441 1.29289C9.43164 1.48043 9.53699 1.73478 9.53699 2C9.53699 2.26522 9.43164 2.51957 9.2441 2.70711C9.05656 2.89464 8.80221 3 8.53699 3C8.23099 3 7.66099 3.052 7.04699 3.22Z" fill="#64748B" />
    <path fillRule="evenodd" clipRule="evenodd" d="M10.0252 3.22C10.6462 3.388 11.2262 3.651 11.6302 4.015C12.7332 5.01 13.1822 6.358 13.1822 8.788C13.1822 10.52 14.1682 12.16 14.8782 13.222C15.0322 13.454 15.0802 13.675 15.0712 13.808C15.0717 13.8422 15.0634 13.8759 15.0472 13.906C15.0432 13.913 15.0312 13.932 14.9832 13.958C14.2912 14.328 13.2472 14.598 12.0402 14.769C10.8784 14.9249 9.70736 15.0021 8.53516 15C8.26994 15 8.01559 15.1054 7.82805 15.2929C7.64051 15.4804 7.53516 15.7348 7.53516 16C7.53516 16.2652 7.64051 16.5196 7.82805 16.7071C8.01559 16.8946 8.26994 17 8.53516 17C9.66316 17 11.0182 16.935 12.3212 16.75C13.6032 16.567 14.9242 16.257 15.9262 15.722C16.6632 15.328 17.0192 14.642 17.0662 13.943C17.1122 13.284 16.8892 12.633 16.5412 12.112C15.8242 11.038 15.1822 9.853 15.1822 8.788C15.1822 6.127 14.6902 4.081 12.9692 2.53C12.2442 1.876 11.3332 1.503 10.5502 1.29C9.89358 1.10792 9.21643 1.01046 8.53516 1C8.26994 1 8.01559 1.10536 7.82805 1.29289C7.64051 1.48043 7.53516 1.73478 7.53516 2C7.53516 2.26522 7.64051 2.51957 7.82805 2.70711C8.01559 2.89464 8.26994 3 8.53516 3C8.84116 3 9.41116 3.052 10.0252 3.22Z" fill="#64748B" />
    <path d="M11.1836 1.68C11.1836 2.375 9.78759 1.722 8.68359 1.722C7.57959 1.722 6.18359 2.375 6.18359 1.679C6.18359 0.984 7.18359 0 8.68359 0C10.1836 0 11.1836 0.984 11.1836 1.68Z" fill="#64748B" />
    <path fillRule="evenodd" clipRule="evenodd" d="M6.53516 16C6.53516 16.5304 6.74587 17.0391 7.12094 17.4142C7.49602 17.7893 8.00472 18 8.53516 18C9.06559 18 9.5743 17.7893 9.94937 17.4142C10.3244 17.0391 10.5352 16.5304 10.5352 16H12.5352C12.5352 17.0609 12.1137 18.0783 11.3636 18.8284C10.6134 19.5786 9.59602 20 8.53516 20C7.47429 20 6.45687 19.5786 5.70673 18.8284C4.95658 18.0783 4.53516 17.0609 4.53516 16H6.53516Z" fill="#64748B" />
  </svg>
)

const MobileNavItem = ({ item }) => {
  const [open, setOpen] = useState(false)

  if (item.submenu) {
    return (
      <li className="relative">
        <button onClick={() => setOpen(!open)} className="group flex h-[60px] w-full items-center gap-3 rounded-lg bg-white px-3 text-sm font-medium text-[#0F172A] transition-all duration-200 hover:bg-[#BD2F30] hover:text-white">
          <span className="flex-1 text-left text-[14px] font-medium">{item.label}</span>
          <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <ul className="ml-10 mt-1 space-y-1">
            {item.submenu.map(sub => (
              <li key={sub.label}>
                <a href={sub.href} className="block rounded-md px-3 py-2 text-sm text-[#0F172A] hover:bg-[#BD2F30] hover:text-white">{sub.label}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li>
      <a href={item.href} className="group flex h-[60px] w-full items-center gap-3 rounded-lg bg-[#FFFFFF] px-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-[#BD2F30] hover:text-white">
        <span className="text-[14px] font-medium text-[#0F172A] group-hover:text-white">{item.label}</span>
      </a>
    </li>
  )
}

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden lg:flex w-full items-center bg-[#FFFFFF] shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] px-6 py-4 sticky top-0 z-30">
        <div className="bg-[#FFFFFF] w-full h-[62px] border-[1px] border-[#CBD5E1] rounded-[12px]">
          <div className="flex items-center justify-between px-4 h-full">
            <h1 className="text-[20px] font-semibold text-[#0F172A]">Dashboard</h1>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="flex h-[38px] border-[#E2E8F0] border-[1px] items-center rounded-lg bg-[#FFFFFF]">
                <input type="search" placeholder="Search..." className="ml-2 bg-transparent text-[12px] text-[#000000] w-[241px] placeholder:text-slate-400 focus:outline-none border-0" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197M15.803 15.803A6.75 6.75 0 1010.5 17.25a6.75 6.75 0 005.303-1.447z" />
                </svg>
              </div>

              {/* Notification */}
              <button type="button" className="relative h-[38px] w-[38px] flex items-center justify-center rounded-[8px] bg-[#F1F5F9]">
                <span className="absolute -top-2 -right-1 flex h-[16px] w-[16px] items-center justify-center rounded-[3px] bg-[#BD2F30] text-[10px] font-semibold text-white">2</span>
                <BellIcon />
              </button>

              {/* Profile */}
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 px-3 py-1 focus:outline-none">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-indigo-100">
                    <img src="/assets/company-img.png" alt="Profile" className="h-full w-full object-cover" />
                  </div>
                  <div className="hidden text-left sm:block">
                    <p className="text-[13.72px] font-semibold text-[#000000]">Naya Food Comp.</p>
                    <p className="text-[11.76px] text-[#A7ABAE]">Admin</p>
                  </div>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navbar */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 lg:hidden sticky top-0 z-40 bg-white">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
            <img src="/assets/nayafoodlogo.png" alt="Naya Food logo" className="h-full w-full object-contain" />
          </span>
          <span className="text-lg font-semibold text-slate-800">Naya Food</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white">
            <span className="absolute -top-1 -right-1 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#BD2F30] text-[10px] font-semibold text-white">2</span>
            <BellIcon />
          </button>
          <div className="h-10 w-10 overflow-hidden rounded-full bg-indigo-100">
            <img src="/assets/company-img.png" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <button onClick={() => setDrawerOpen(true)} type="button" className="flex h-10 w-10 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M1 11H19M1 6H19M1 1H19" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {drawerOpen && <div onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden" />}

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 lg:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
              <img src="/assets/nayafoodlogo.png" alt="Naya Food logo" className="h-full w-full object-contain" />
            </span>
            <span className="text-lg font-semibold text-slate-800">Naya Food</span>
          </div>
          <button onClick={() => setDrawerOpen(false)} className="flex h-10 w-10 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 20L4 4.00003M20 4L4.00002 20" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="h-[calc(100%-64px)] overflow-y-auto px-6 py-5">
          <ul className="space-y-2">
            {navItems.map(item => <MobileNavItem key={item.label} item={item} />)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
