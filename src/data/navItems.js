import Dashboard from "../assets/dashboard.png"
import Customer from "../assets/customer.png"
import AllCustomer from "../assets/allcustomer.png"
import Pending from "../assets/pending.png"
import Paid from "../assets/paid.png"
import Inventory from "../assets/inventory.png"
import Expense from "../assets/expense-image.png"
import Employee from "../assets/employee-image.png"

const navItems = [
  {
    label: 'Dashboard', icon: Dashboard, href: '/'
  },
  { label: 'Add Customer', icon: Customer, href: '/add-customer' },
  { label: 'All Customer', icon: AllCustomer, href: '/all-Customer' },
  { label: 'Pending Installment', icon: Pending, href: '/pending-installments' },
  { label: 'Paid Installment', icon: Paid, href: '/paid-installments' },
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

export default navItems
