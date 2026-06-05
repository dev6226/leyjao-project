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

  // ── CUSTOMERS ──────────────────────────────
  { label: 'Add Customer', icon: Customer, href: '/add-customer' },
  { label: 'All Customer', icon: AllCustomer, href: '/all-Customer' },
  { label: 'Pending Installment', icon: Pending, href: '/pending-installments' },
  { label: 'Paid Installment', icon: Paid, href: '/paid-installments' },

  // ── INVENTORY ──────────────────────────────
  {
    label: 'Inventory', icon: Inventory, href: '#', submenu: [
      { label: 'Add Product', href: '/add-products' },
      { label: 'Products List', href: '/products-list' },
    ]
  },

  // ── CATALOGUE ──────────────────────────────
  {
    label: 'Catalogue', icon: '/assets/logo10.png', submenu: [
      { label: 'Add Brand', href: '/add-brand' },
      { label: 'Brand List', href: '/brand-list' },
      { label: 'Add Category', href: '/add-category' },
      { label: 'Category List', href: '/category-list' },
      { label: 'Add Series', href: '/add-series' },
      { label: 'Series List', href: '/series-list' },
      { label: 'Add Models', href: '/add-models' },
      { label: 'Models List', href: '/models-list' },
    ]
  },

  // ── EMPLOYEES ──────────────────────────────
  {
    label: 'Employees', icon: Employee, submenu: [
      { label: 'Add Employee', href: '/add-employee' },
      { label: 'Employee List', href: '/employee-list' },
      { label: 'Job Titles', href: '/create-job-title' },
    ]
  },
]

export default navItems
