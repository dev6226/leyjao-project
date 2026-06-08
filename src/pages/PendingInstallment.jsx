import React, { useState, useEffect } from 'react';
import DataTable from '../components/table/DataTable.jsx';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const PendingInstallment = () => {
    const navigate = useNavigate();
    const [salesData, setSalesData] = useState([]);
    const [summary, setSummary] = useState({
        total_installments: 0,
        paid_count: 0,
        pending_count: 0,
        total_paid_amount: 0,
        total_pending_amount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchInstallments = async () => {
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
                            actual_product_price: parseFloat(sale.actual_selling_price) || parseFloat(sale.total_amount) || 0
                        }));
                    });

                    // Remove duplicates based on ID
                    const uniqueInstallments = Array.from(
                        new Map(allInstallments.map(item => [item.id, item])).values()
                    );

                    // 🔥 CRITICAL FIX: Proceeded (Paid/Completed) installments ko list se filter out kar diya
                    // Ab table mein sirf aur sirf 'pending' status wali active rows hi bachengi
                    const pendingOnlyInstallments = uniqueInstallments.filter(
                        item => item.status === 'pending'
                    );

                    setSalesData(pendingOnlyInstallments);

                    // Summary block logic mapping
                    if (response.data.summary) {
                        setSummary(response.data.summary);
                    } else {
                        setSummary({
                            total_installments: uniqueInstallments.length,
                            paid_count: uniqueInstallments.filter(i => i.status === 'paid' || i.status === 'completed').length,
                            pending_count: pendingOnlyInstallments.length,
                            total_paid_amount: 0,
                            total_pending_amount: response.data.summary?.total_pending_amount || 0
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching installment data:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchInstallments();
        return () => { isMounted = false; };
    }, []);

    const dummycolumns = [
        {
            key: 'customer_name',
            label: 'Customer Name',
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{row.customer_name}</span>
                    <span className="text-xs text-gray-400">{row.customer_phone}</span>
                </div>
            )
        },
        {
            key: 'product_name',
            label: 'Product',
            render: (row) => <span className="text-gray-600 font-medium">{row.product_name}</span>
        },
        {
            key: 'installment_number',
            label: 'Instalment No.',
            render: (row) => <span className="font-medium text-gray-700">Installment #{row.installment_number}</span>
        },
        {
            key: 'due_date',
            label: 'Due Date',
            render: (row) => <span className="text-gray-600">{row.due_date ? row.due_date.split(' ')[0] : '-'}</span>
        },
        {
            key: 'amount',
            label: 'Amount',
            render: (row) => <span className="font-bold text-gray-900">Rs. {parseFloat(row.amount).toLocaleString()}</span>
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <span className="px-4 py-1 text-xs sm:text-sm font-semibold rounded-full border tracking-wide uppercase border-amber-500 text-amber-600 bg-amber-50">
                    {row.status}
                </span>
            )
        },
        {
            key: 'pay_action',
            label: 'Actions',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => console.log("Viewing Details for ID:", row.id)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer"
                        title="View Details"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>

                    <button
                        onClick={() => navigate('/pay-installment', { state: { installment: row } })}
                        className='h-9 px-4 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-sm shadow-blue-200 transition-all duration-200 cursor-pointer'
                    >
                        Pay
                    </button>
                </div>
            )
        },
    ];

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className='bg-white w-full rounded-2xl shadow-sm border border-gray-100 mb-6'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-y-1.5'>
                        <h1 className='text-gray-900 text-xl sm:text-2xl font-bold tracking-tight'>Pending Installments</h1>
                        <p className='text-gray-500 text-sm sm:text-base'>View and manage all active pending installments summary</p>
                    </div>

                    <div className='bg-red-50 border border-red-100 rounded-2xl p-4 sm:px-6 sm:py-4 text-left sm:text-right w-full sm:w-auto min-w-[200px]'>
                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">Total Pending</span>
                        <h1 className='text-red-600 text-2xl sm:text-3xl font-extrabold flex items-baseline gap-2 justify-start sm:justify-end'>
                            {summary.pending_count}
                            <span className="text-sm font-medium text-red-400">items</span>
                        </h1>
                        <p className='text-red-700 text-sm font-semibold mt-1'>
                            Rs. {parseFloat(summary.total_pending_amount || 0).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
                <div className='relative w-full sm:max-w-md shadow-sm rounded-xl'>
                    <div className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Name, Phone, CNIC, Product..."
                        className='w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm'
                    />
                </div>
                <button className='flex items-center justify-center gap-2 w-full sm:w-auto px-5 h-11 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-600 hover:bg-gray-50 active:scale-98 transition-all font-medium text-sm cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                    </svg>
                    Filter
                </button>
            </div>

            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-48 text-gray-400 gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                        <span className="text-sm font-medium">Loading installments...</span>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <DataTable rows={salesData} columns={dummycolumns} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingInstallment;