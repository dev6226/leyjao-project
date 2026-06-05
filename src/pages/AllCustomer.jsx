import React, { useEffect, useState } from 'react'
import DataTable from '../components/table/DataTable.jsx'
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // 🔥 Completed Tick Icon ke liye
import api from '../api/api';

const AllCustomer = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 🔥 Search state function handler

  // 🔥 LOCAL STORAGE TRACKER: Un customers ki IDs nikalna jinki installment ban chuki hai
  const [processedCustomers, setProcessedCustomers] = useState(() => {
    const saved = localStorage.getItem('processed_installment_customers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/customer');
        const data = response.data.data || response.data;

        const mapped = data.map((customer) => ({
          id: customer.id,
          date: customer.created_at
            ? new Date(customer.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : '-',
          cn: customer.cn || customer.customer_number || '-',
          name: customer.full_name || '-',
          phone: customer.phone || '-',
          cnic: customer.cnic || '-',
          status: customer.status || 'Draft',
        }));

        setRows(mapped);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // 🔥 CUSTOMER CLICK HANDLER: ID ko save karna aur redirect karna
  const handleSellClick = (customerId) => {
    const updatedList = [...processedCustomers, customerId];
    setProcessedCustomers(updatedList);
    localStorage.setItem('processed_installment_customers', JSON.stringify(updatedList));

    // Installment page par redirect karna
    navigate(`/sell-products/${customerId}`);
  };

  // Real-time Search Filter Logic
  const filteredRows = rows.filter(row => {
    const term = searchTerm.toLowerCase();
    return (
      row.name.toLowerCase().includes(term) ||
      row.phone.toLowerCase().includes(term) ||
      row.cnic.toLowerCase().includes(term) ||
      row.cn.toLowerCase().includes(term)
    );
  });

  // Main external action button mapper
  const button = (row) => {
    const isAlreadyCreated = processedCustomers.includes(row.id);

    if (isAlreadyCreated) {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
          <CheckCircleIcon fontSize="inherit" /> Completed
        </span>
      );
    }

    return (
      <button
        onClick={() => handleSellClick(row.id)}
        className="px-4 py-1.5 bg-[#0062BD] hover:bg-[#0054A3] text-white text-xs font-semibold rounded-lg transition-all shadow-sm"
      >
        Sell
      </button>
    );
  };

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'cn', label: 'CN' },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'cnic', label: 'CNIC' },
    {
      key: 'status', label: 'Status',
      render: (row) => {
        const isAlreadyCreated = processedCustomers.includes(row.id);
        return (
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${isAlreadyCreated
            ? 'border-emerald-400 text-emerald-600 bg-emerald-50'
            : 'border-orange-400 text-orange-500 bg-orange-50'
            }`}>
            {isAlreadyCreated ? 'Completed' : row.status}
          </span>
        );
      }
    },

    {
      key: 'action', label: 'Action',
      render: (row) => {
        // 🔥 Check: Kya is customer ki ID processed list mein hai?
        const isAlreadyCreated = processedCustomers.includes(row.id);

        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/view-customer/${row.id}`)}
              className="p-1 hover:bg-gray-100 rounded transition"
              title="View Details"
            >
              <VisibilityIcon fontSize="small" className="text-gray-500 hover:text-[#0062BD]" />
            </button>

            {/* ── DYNAMIC BUTTON SWITCH ── */}
            {isAlreadyCreated ? (
              <div className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                Completed
              </div>
            ) : (
              <button
                onClick={() => handleSellClick(row.id)}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded transition"
              >
                Sell
              </button>
            )}
          </div>
        );
      }
    },
  ];

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, Phone, CNIC, Product"
            className='w-full h-11 pl-10 pr-4 rounded-lg border border-[#E1E7EF] bg-white outline-none shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] placeholder:text-[#65758B] placeholder:text-sm'
          />
        </div>

        <button className='flex items-center gap-2 px-4 h-11 rounded-xl border border-[#E1E7EF] bg-[#FFFFFF] shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] text-[#64748B]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
            <path d="M0.5 0.5H9.83333L6.5 4.83333V11.1667L3.83333 8.5V4.83333L0.5 0.5Z" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Filter
        </button>
      </div>

      {/* Data Table */}
      <div className='mt-4'>
        {loading ? (
          <p className='text-center text-sm text-gray-400 py-10'>Loading...</p>
        ) : (
          <DataTable rows={filteredRows} columns={columns} button={button} />
        )}
      </div>

      {/* Footer */}
      <div className='mt-6 text-xs text-gray-400 flex flex-col md:flex-row justify-between gap-2'>
        <p>Copyright © 2026 All rights reserved</p>
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