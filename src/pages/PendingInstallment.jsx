import React from 'react'
import DataTable from '../components/table/DataTable.jsx'
import VisibilityIcon from "@mui/icons-material/Visibility";


const PendingInstallment = () => {
    const dummypendingrows = [
        {
            id: 1,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Umar",
            phone: "03024425829",
            installment: "52000",
            status: "Due",
        },
        {
            id: 2,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Umar",
            phone: "03024425829",
            installment: "52000",
            status: "Due",
        },
        {
            id: 3,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Umar",
            phone: "03024425829",
            installment: "52000",
            status: "Due",
        },
        {
            id: 4,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Umar",
            phone: "03024425829",
            installment: "52000",
            status: "Due",
        },
        {
            id: 5,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Umar",
            phone: "03024425829",
            installment: "52000",
            status: "Due",
        },
        {
            id: 6,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Umar",
            phone: "03024425829",
            installment: "52000",
            status: "Due",
        },
        {
            id: 7,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Umar",
            phone: "03024425829",
            installment: "52000",
            status: "Due",
        },
    ];

    const dummycolumns = [
        { key: 'date', label: 'Date' },
        { key: 'cn', label: 'CN#' },
        { key: 'name', label: 'Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'installment', label: 'Installment' },
        {
            key: 'status', label: 'Status',
            render: (rows) => (
                <span className="px-5 py-1 text-base font-medium rounded-full border border-[#FF0000] text-[#FF0000] bg-[#FFFFFF]">
                    {rows.status}
                </span>
            )
        },
        {
            key: 'action', label: 'Action',
            render: (rows) => (
                <button>
                    <VisibilityIcon fontSize="small" />
                </button>
            )
        },
    ];
    return (
        <div>
            {/* header */}
            <div className='bg-[#FFFFFF] w-full rounded-xl shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] h-auto border-1 border-[#E1E7EF] '>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-8 gap-2 sm:gap-0'>
                    <div className='flex flex-col sm:gap-y-3'>
                        <h1 className='text-[#0F1729] text-base sm:text-[22px] font-semibold'>Paid Installments</h1>
                        <p className='text-secondary text-base'>View all paid installments</p>
                    </div>
                    <div>
                        <h1 className='text-[#FF0000] text-3xl sm:text-6xl font-medium'>65 / 665,580</h1>
                    </div>
                </div>
            </div>
            {/* table */}
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
                <DataTable rows={dummypendingrows} columns={dummycolumns} />
            </div>
        </div>
    )
}

export default PendingInstallment
