import React from 'react'
import DataTable from '../components/table/DataTable.jsx'



const AllCustomer = () => {
  return (
    <div>
      {/* Header */}
      <div>
        <h2 className='text-primary text-xl font-semibold'>
          All Customers
        </h2>
        <p className='text-secondary text-base mt-1'>
          List of all registered customers
        </p>
      </div>

      {/* Search + Filter */}
      <div className='flex flex-col md:flex-row justify-between gap-3 mt-6'>
        {/* Search Input with Icon */}
        <div className='relative w-full md:w-[552px]'>

          {/* SVG Icon */}
          <div className='absolute left-3 top-1/2 -translate-y-1/2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
              <path d="M14.75 14.75L11.3721 11.3721M11.3721 11.3721C11.9499 10.7944 12.4083 10.1084 12.721 9.35349C13.0337 8.59856 13.1946 7.78944 13.1946 6.97231C13.1946 6.15519 13.0337 5.34606 12.721 4.59114C12.4083 3.83621 11.9499 3.15027 11.3721 2.57247C10.7944 1.99468 10.1084 1.53635 9.35349 1.22365C8.59856 0.910945 7.78944 0.75 6.97231 0.75C6.15519 0.75 5.34606 0.910945 4.59114 1.22365C3.83621 1.53635 3.15027 1.99468 2.57247 2.57247C1.40556 3.73938 0.75 5.32205 0.75 6.97231C0.75 8.62257 1.40556 10.2052 2.57247 11.3721C3.73938 12.5391 5.32205 13.1946 6.97231 13.1946C8.62257 13.1946 10.2052 12.5391 11.3721 11.3721Z"
                stroke="#65758B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Search by Name, Phone, CNIC, Product"
            className='w-full h-11 pl-10 pr-4 rounded-lg border border-[#E1E7EF] bg-white outline-none shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] placeholder:text-[#65758B] placeholder:text-sm'
          />
        </div>

        {/* Filter Button */}
        <button className='flex items-center gap-2 px-4 h-11 rounded-xl border border-[#E1E7EF] bg-[#FFFFFF] shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] text-[#64748B]'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
            <path d="M0.5 0.5H9.83333L6.5 4.83333V11.1667L3.83333 8.5V4.83333L0.5 0.5Z" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Filter
        </button>

      </div>
      {/* data-table */}
      <div className='mt-4'>
      <DataTable/>
      </div>


      {/* Footer */}
      <div className='mt-6 text-xs text-gray-400 flex flex-col md:flex-row justify-between gap-2'>
        <p>Copyright © 2025 All rights reserved</p>
        <div className='flex gap-4'>
          <p>Privacy Policy</p>
          <p>Term and Conditions</p>
          <p>Contact</p>
        </div>
      </div>

    </div>
  )
}

export default AllCustomer