const navItems = [
  { label: 'Dashboard', icon: '/assets/logo1.png', href: '#' },
  { label: 'Add Customer', icon: '/assets/logo18.png', href: '#' },
  { label: 'All Customer', icon: '/assets/logo17.png', href: '#' },
  { label: 'Pending Installment', icon: '/assets/logo3.png', href: '#' },
  { label: 'Paid Installment', icon: '/assets/logo4.png', href: '#' },
  { label: 'Inventory', icon: '/assets/logo2.png', href: '#' },
  {
    label: 'Products', icon: '/assets/logo10.png', submenu: [
      { label: 'Products', href: '#' },
      { label: 'Product Category', href: '#' },
      { label: 'Product Units', href: '#' },
    ]
  },
  { label: 'Vendors', icon: '/assets/logo5.png', href: '#' },
  { label: 'Employees', icon: '/assets/logo14.png', href: '#' },
  {
    label: 'Expenses', icon: '/assets/logo19.png', submenu: [
      { label: 'Expenses', href: '#' },
      { label: 'Expense Heads', href: '#' },
    ]
  },
]

export default navItems
