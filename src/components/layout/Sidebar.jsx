import { useState } from 'react'
import Logo from "../../assets/logo.png"
import Dashboard from "../../assets/dashboard.png"
import Customer from "../../assets/customer.png"
import AllCustomer from "../../assets/allcustomer.png"
import Pending from "../../assets/pending.png"
import Paid from "../../assets/paid.png"
import Inventory from "../../assets/inventory.png"
import Expense from "../../assets/expense-image.png"
import Employee from "../../assets/employee-image.png"

const navItems = [
    {
        label: 'Dashboard', icon: Dashboard, href: '#'
    },
    { label: 'Add Customer', icon: Customer, href: '#' },
    { label: 'All Customer', icon: AllCustomer, href: '#' },
    { label: 'Pending Installment', icon: Pending, href: '#' },
    { label: 'Paid Installment', icon: Paid, href: '#' },
    { label: 'Inventory', icon: Inventory, href: '#' },
    {
        label: 'Products', icon: '/assets/logo10.png', submenu: [
            { label: 'Add Vendor', href: '#' },
            { label: 'Vendor List', href: '#' },
        ]
    },
    { label: 'Vendors', icon: '/assets/logo5.png', href: '#' },
    {
        label: 'Expenses', icon: Expense, submenu: [
            { label: 'Expenses', href: '#' },
            { label: 'Expense Heads', href: '#' },
        ]
    },
    { label: 'Employees', icon: Employee, href: '#' },
    
]

const NavItem = ({ item, collapsed }) => {
    const [open, setOpen] = useState(false)

    const linkClass = "group flex h-[60px] w-full items-center gap-3 rounded-lg bg-[#FFFFFF] px-3 text-sm font-medium  transition-all duration-200 hover:bg-[#0062BD] hover:text-[#FFFFFF]"

    if (item.submenu) {
        return (
            <li className="relative">
                <button onClick={() => setOpen(!open)} className={linkClass + " cursor-pointer"}>
                    <img src={item.icon} alt="" className="h-[17px] w-[17px] transition duration-200 group-hover:brightness-0 group-hover:invert " />
                    {!collapsed && (
                        <>
                            <span className="flex-1 text-left text-[14px] font-medium custom-gray group-hover:text-white">{item.label}</span>

                            {/* Updated SVG */}
                            <svg
                                className={`w-3 h-[7px] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 12 7"
                                fill="none"
                            >
                                <path
                                    d="M10.9917 -0.00188446L11.97 0.977312L6.63841 6.31074C6.55298 6.39672 6.45139 6.46495 6.33949 6.5115C6.22759 6.55806 6.10759 6.58203 5.98638 6.58203C5.86518 6.58203 5.74518 6.55806 5.63328 6.5115C5.52138 6.46495 5.41979 6.39672 5.33436 6.31074L0 0.977312L0.978273 -0.000961304L5.985 5.00484L10.9917 -0.00188446Z"
                                    fill="#898989"
                                />
                            </svg>
                        </>
                    )}
                </button>
                {!collapsed && open && (
                    <ul className="ml-10 mt-1 space-y-1">
                        {item.submenu.map(sub => (
                            <li key={sub.label}>
                                <a href={sub.href} className="block rounded-md px-3 py-2 text-sm custom-gray hover:text-[#0062BD] font-semibold">
                                    {sub.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        )
    }

    return (
        <li className="relative">
            <a href={item.href} className={linkClass}>

                {/* ICON */}
                <img
                    src={item.icon}
                    alt=""
                    className="h-[17px] w-[17px] transition duration-200 group-hover:brightness-0 group-hover:invert"
                />

                {/* TEXT */}
                {!collapsed && (
                    <span className="flex-1 text-sm font-medium custom-gray group-hover:text-white transition duration-200">
                        {item.label}
                    </span>
                )}

            </a>
        </li>
    )
}

const Sidebar = ({ collapsed, onToggle }) => {
    return (
        <aside className={`hidden lg:flex flex-col flex-shrink-0 bg-white shadow-[12.67px_0px_22.52px_0px_rgba(208,210,218,0.15)] sticky top-0 h-screen transition-all duration-300 ease-in-out ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>

            {/* Header */}
            <div className="flex items-center justify-center gap-x-1">

                <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl transition-all duration-300">
                    <img src={Logo} alt="LeyJao logo" />
                </span>

                <button
                    onClick={onToggle}
                    type="button"
                    aria-label="Toggle sidebar"
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
                        <path d="M1 11H19M1 6H19M1 1H19" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-x-hidden overflow-y-auto px-3 py-5">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <NavItem key={item.label} item={item} collapsed={collapsed} />
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
