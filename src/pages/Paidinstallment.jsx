import React, { useState, useEffect } from 'react';
import DataTable from '../components/table/DataTable.jsx';
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close"; // Material UI Close Icon
import api from '../api/api.js';

const Paidinstallment = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({ count: 0, total_amount: 0 });

    // Popup (Modal) States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchPaidInstallments = async () => {
            try {
                setLoading(true);
                const response = await api.get('/sale?per_page=-1');

                if (response.data.success && isMounted) {
                    const salesArray = response.data.data || [];

                    const allInstallments = salesArray.flatMap(sale => {
                        if (!sale || !sale.installments) return [];

                        return sale.installments.map(inst => ({
                            ...inst,
                            customer_name: sale.customer?.full_name ? String(sale.customer.full_name).trim() : 'N/A',
                            customer_phone: sale.customer?.phone || 'N/A',
                            customer_cnic: sale.customer?.cnic || 'N/A',
                            product_name: sale.product?.name || 'Item',
                            cn_number: sale.cn_number || 'N/A',
                            total_sale_amount: parseFloat(sale.total_amount) || 0
                        }));
                    });

                    const uniqueInstallments = Array.from(
                        new Map(allInstallments.map(item => [item.id, item])).values()
                    );

                    const paidOnlyInstallments = uniqueInstallments.filter(
                        item => item.status === 'paid' || item.status === 'completed'
                    );

                    setSalesData(paidOnlyInstallments);

                    const totalPaidAmount = paidOnlyInstallments.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

                    setSummary({
                        count: paidOnlyInstallments.length,
                        total_amount: totalPaidAmount
                    });
                }
            } catch (error) {
                console.error("Error fetching paid installment data:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPaidInstallments();
        return () => { isMounted = false; };
    }, []);

    // Esc key dabane par modal close karne ke liye useEffect
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        if (isModalOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    // Modal Open Handler
    const openModal = (row) => {
        setSelectedData(row);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Background scroll stop karne ke liye
    };

    // Modal Close Handler
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
        document.body.style.overflow = 'unset'; // Background scroll restore karne ke liye
    };

    const columns = [
        {
            key: 'updated_at',
            label: 'Date',
            render: (row) => <span className="text-gray-600">{row.updated_at ? row.updated_at.split(' ')[0] : row.due_date?.split(' ')[0] || '-'}</span>
        },
        // {
        //     key: 'cn_number',
        //     label: 'CN#',
        //     render: (row) => <span className="font-medium text-gray-700">{row.cn_number}</span>
        // },
        {
            key: 'customer_name',
            label: 'Name',
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{row.customer_name}</span>
                    <span className="text-xs text-gray-400">{row.customer_phone}</span>
                </div>
            )
        },
        { key: 'customer_phone', label: 'Phone' },
        {
            key: 'amount',
            label: 'Installment',
            render: (row) => <span className="font-bold text-gray-900">Rs. {parseFloat(row.amount).toLocaleString()}</span>
        },
        {
            key: 'action', label: 'Action',
            render: (row) => (
                <button
                    onClick={() => openModal(row)} // 🔥 Eye icon par click karne se popup open hoga
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    title="View Details"
                >
                    <VisibilityIcon fontSize="small" />
                </button>
            )
        },
        {
            key: 'status', label: 'Status',
            render: (row) => (
                <span className="px-4 py-1 text-xs sm:text-sm font-semibold rounded-full border tracking-wide uppercase border-emerald-500 text-emerald-600 bg-emerald-50">
                    {row.status}
                </span>
            )
        },
    ];

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen relative">
            <div>
                {/* Header Section */}
                <div className='bg-[#FFFFFF] w-full rounded-xl shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] h-auto border border-[#E1E7EF]'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-8 gap-2 sm:gap-0'>
                        <div className='flex flex-col sm:gap-y-3'>
                            <h1 className='text-[#0F1729] text-base sm:text-[22px] font-bold'>Paid Installments</h1>
                            <p className='text-gray-500 text-sm sm:text-base'>View all successfully processed collection records</p>
                        </div>
                        <div className='bg-emerald-50 border border-emerald-100 rounded-2xl p-4 sm:px-6 sm:py-3 text-left sm:text-right w-full sm:w-auto min-w-[220px]'>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">Total Received</span>
                            <h1 className='text-emerald-600 text-2xl sm:text-3xl font-extrabold flex items-baseline gap-2 justify-start sm:justify-end'>
                                {summary.count}
                                <span className="text-sm font-medium text-emerald-400">records</span>
                            </h1>
                            <p className='text-emerald-700 text-sm font-bold mt-1'>
                                Rs. {summary.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search + Filter Layout */}
                <div className='flex flex-col md:flex-row justify-between gap-3 mt-6'>
                    <div className='relative w-full md:w-[552px]'>
                        <div className='absolute left-3 top-1/2 -translate-y-1/2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                <path d="M14.75 14.75L11.3721 11.3721M11.3721 11.3721C11.9499 10.7944 12.4083 10.1084 12.721 9.35349C13.0337 8.59856 13.1946 7.78944 13.1946 6.97231C13.1946 6.15519 13.0337 5.34606 12.721 4.59114C12.4083 3.83621 11.9499 3.15027 11.3721 2.57247C10.7944 1.99468 10.1084 1.53635 9.35349 1.22365C8.59856 0.910945 7.78944 0.75 6.97231 0.75C6.15519 0.75 5.34606 0.910945 4.59114 1.22365C3.83621 1.53635 3.15027 1.99468 2.57247 2.57247C1.40556 3.73938 0.75 5.32205 0.75 6.97231C0.75 8.62257 1.40556 10.2052 2.57247 11.3721C3.73938 12.5391 5.32205 13.1946 6.97231 13.1946C8.62257 13.1946 10.2052 12.5391 11.3721 11.3721Z"
                                    stroke="#65758B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Name, Phone, CNIC..."
                            className='w-full h-11 pl-10 pr-4 rounded-xl border border-[#E1E7EF] bg-white text-gray-800 outline-none shadow-sm placeholder:text-[#65758B] placeholder:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-50'
                        />
                    </div>

                    <button className='flex items-center gap-2 px-4 h-11 rounded-xl border border-[#E1E7EF] bg-[#FFFFFF] shadow-sm text-[#64748B] hover:bg-gray-50 active:scale-98 transition-all text-sm font-medium'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                            <path d="M0.5 0.5H9.83333L6.5 4.83333V11.1667L3.83333 8.5V4.83333L0.5 0.5Z" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Filter
                    </button>
                </div>

                {/* Table Component Element */}
                <div className='mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-48 text-gray-400 gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
                            <span className="text-sm font-medium">Loading collection records...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <DataTable rows={salesData} columns={columns} />
                        </div>
                    )}
                </div>
            </div>

            {/* 🔥 DETAILED PREMIUM POPUP MODAL */}
            {isModalOpen && selectedData && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
                    onClick={closeModal} // Outside click closure handler
                >
                    <div
                        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[90vh] transform scale-100 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()} // Stop bubbling taake popup ke andar click krne pe close na ho
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Installment Verification Details</h3>
                                {/* <p className="text-xs text-gray-500 mt-0.5">CN Number: <span className="font-semibold text-gray-700">{selectedData.cn_number}</span></p> */}
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 rounded-xl transition-all"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto space-y-6 text-sm">

                            {/* Section 1: Customer Profile */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Customer Information</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div>
                                        <span className="text-gray-400 block text-xs">Full Name</span>
                                        <span className="font-semibold text-gray-800 text-base">{selectedData.customer_name}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-xs">Phone Number</span>
                                        <span className="font-medium text-gray-800">{selectedData.customer_phone}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-xs">CNIC Card Number</span>
                                        <span className="font-medium text-gray-800">{selectedData.customer_cnic}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Product & Deal Info */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Product & Sale Info</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div>
                                        <span className="text-gray-400 block text-xs">Product Purchased</span>
                                        <span className="font-semibold text-gray-800">{selectedData.product_name}</span>
                                    </div>
                                    {/* <div>
                                        <span className="text-gray-400 block text-xs">Total Sale Value</span>
                                        <span className="font-bold text-gray-800">Rs. {selectedData.total_sale_amount?.toLocaleString()}</span>
                                    </div> */}
                                </div>
                            </div>

                            {/* Section 3: Installment Parameters */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Installment Audit</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border border-gray-100 p-4 rounded-xl">
                                    <div>
                                        <span className="text-gray-400 block text-xs">Installment No.</span>
                                        <span className="font-semibold text-gray-700"># {selectedData.installment_number}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-xs">Amount Received</span>
                                        <span className="font-bold text-emerald-600">Rs. {parseFloat(selectedData.amount).toLocaleString()}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-xs">Collection Status</span>
                                        <span className="inline-block mt-0.5 px-3 py-0.5 text-xs font-bold tracking-wide rounded-full border border-emerald-500 text-emerald-600 bg-emerald-50 uppercase">
                                            {selectedData.status}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-xs">Due Date</span>
                                        <span className="text-gray-600 font-medium">{selectedData.due_date ? selectedData.due_date.split(' ')[0] : '-'}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-400 block text-xs">Clearance Timestamp</span>
                                        <span className="text-gray-600 font-medium">{selectedData.updated_at || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-5 h-10 text-sm font-semibold text-gray-600 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 active:scale-98 transition-all"
                            >
                                Close View
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Paidinstallment;