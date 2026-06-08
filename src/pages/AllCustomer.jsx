import React, { useEffect, useState } from 'react'
import DataTable from '../components/table/DataTable.jsx'
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import api from '../api/api';

const AllCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get state from navigation
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Is state mein un customers ki IDs store hongi jinka form fill ho chuka hai
  const [soldCustomers, setSoldCustomers] = useState(() => {
    const saved = sessionStorage.getItem('soldCustomers');
    return saved ? JSON.parse(saved) : [];
  });

  // Check if we came back after a successful form submission
  useEffect(() => {
    if (location.state?.sellSuccess && location.state?.customerId) {
      const successfulId = location.state.customerId;

      setSoldCustomers((prev) => {
        const updated = [...new Set([...prev, successfulId])];
        sessionStorage.setItem('soldCustomers', JSON.stringify(updated));
        return updated;
      });

      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

  // Top/Global Table Button component (agar aapki DataTable component isko use karti hai)
  const button = (row) => {
    const isSold = soldCustomers.includes(row.id);
    if (isSold) return <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">Sold</span>;

    return (
      <button
        onClick={() => navigate(`/sell-products/${row.id}`)}
        className="px-4 py-1.5 bg-[#0062BD] hover:bg-[#0054A3] text-white text-xs font-semibold rounded-lg transition-all shadow-sm cursor-pointer"
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
      key: 'action', label: 'Action',
      render: (row) => {
        // Check karein kya ye customer successfully processed ho chuka hai
        const isSold = soldCustomers.includes(row.id);

        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/view-customer/${row.id}`)}
              className="p-1 hover:bg-gray-100 rounded transition cursor-pointer"
              title="View Details"
            >
              <VisibilityIcon fontSize="small" className="text-gray-500 hover:text-[#0062BD]" />
            </button>

            {/* Conditional Rendering: Agar form fill ho chuka hai to button hide ho jaye ga, warna dikhega */}
            {!isSold ? (
              <button
                onClick={() => navigate(`/sell-products/${row.id}`)}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded transition cursor-pointer"
              >
                Sell
              </button>
            ) : (
              <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-semibold rounded cursor-not-allowed">
                Sold Out
              </span>
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
            placeholder="Search by Name, Phone, CNIC, Product"
            className='w-full h-11 pl-10 pr-4 rounded-lg border border-[#E1E7EF] bg-white outline-none shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] placeholder:text-[#65758B] placeholder:text-sm'
          />
        </div>

        <button className='flex items-center gap-2 px-4 h-11 rounded-xl border border-[#E1E7EF] bg-[#FFFFFF] shadow-[0px_12.67px_22.52px_0px_rgba(208,210,218,0.15)] text-[#64748B] cursor-pointer'>
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
          <DataTable rows={rows} columns={columns} button={button} />
        )}
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