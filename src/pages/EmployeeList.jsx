import React, { useEffect, useState } from 'react'
import { Search, Filter, Plus, Eye, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import toast from 'react-hot-toast'

const EmployeeList = () => {

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    // fetch employees
    const fetchEmployees = async () => {

        try {

            setLoading(true)

            // change endpoint if needed
            const response = await api.get('/employee')

            console.log(response.data)

            setEmployees(response.data.data)

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)

        }
    }

    // delete employee
    const deleteEmployee = async (id) => {

        try {

            await api.delete(`/employee/delete/${id}`)

            toast.success('Employee deleted successfully')

            fetchEmployees()

        } catch (error) {
            console.log(error)
            toast.error('Failed to delete employee')
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    // search filter
    const filteredEmployees = employees.filter((item) => {

        return (
            item?.name?.toLowerCase().includes(search.toLowerCase()) ||
            item?.contact?.includes(search) ||
            item?.cnic?.includes(search)
        )
    })

    return (
        <div className="min-h-screen bg-[#F7F8FA] p-4 md:p-6">

            {/* Heading */}
            <div className="mb-6">

                <h1 className="text-[28px] font-bold text-[#1E293B]">
                    All Employees
                </h1>

                <p className="text-sm text-[#94A3B8] mt-1">
                    View All Employees List
                </p>

            </div>

            {/* Top Actions */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">

                {/* Search */}
                <div className="relative w-full lg:max-w-[380px]">

                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search by Name, Phone, CNIC,"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-[50px] rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 w-full lg:w-auto">

                    <button className="h-[50px] px-5 bg-white border border-[#E2E8F0] rounded-xl flex items-center gap-2 text-[#64748B] text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer">

                        <Filter className="w-4 h-4" />

                        Filter

                    </button>

                    <Link
                        to="/add-employee"
                        className="h-[50px] px-6 bg-[#0F6CBD] hover:bg-[#0B5DA7] rounded-xl flex items-center gap-2 text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
                    >

                        <Plus className="w-4 h-4" />

                        Add Employee

                    </Link>

                </div>

            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">

                {/* Table Header */}
                <div className="min-w-[950px] px-6 py-4 border-b border-[#E2E8F0]">

                    <div className="grid grid-cols-7 gap-4 text-base font-semibold text-[#64748B]">

                        <div>Employee ID</div>
                        <div>Employee Name</div>
                        <div>Designation</div>
                        <div>CNIC</div>
                        <div>Contact</div>
                        <div>Status</div>
                        <div className="text-center">Action</div>

                    </div>

                </div>

                {/* Table Body */}
                <div className="max-h-[620px] overflow-y-auto overflow-x-auto p-3 space-y-3">

                    {
                        loading ? (

                            <div className="text-center py-10 text-gray-500">
                                Loading...
                            </div>

                        ) : filteredEmployees.length > 0 ? (

                            filteredEmployees.map((employee) => (

                                <div
                                    key={employee.id}
                                    className="min-w-[950px] bg-[#FCFCFD] border border-[#EAECEF] rounded-2xl px-4 py-5 hover:shadow-sm transition-all"
                                >

                                    <div className="grid grid-cols-7 gap-4 items-center">

                                        {/* Employee ID */}
                                        <div className="text-sm text-[#334155] font-medium">
                                            {employee.employee_id}
                                        </div>

                                        {/* Name */}
                                        <div className="flex items-center gap-3">

                                            {/* <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">

                                                {
                                                    employee.photo_url ? (
                                                        <img
                                                            src={employee.photo_url}
                                                            alt="employee"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-sm font-semibold text-gray-500">
                                                            {employee.name?.charAt(0)}
                                                        </span>
                                                    )
                                                }

                                            </div> */}

                                            <div>

                                                <h3 className="text-[14px] font-semibold text-[#1E293B]">
                                                    {employee.name}
                                                </h3>

                                            </div>

                                        </div>

                                        {/* Designation */}
                                        <div className="text-sm text-[#475569] font-medium">
                                            {employee.job_title?.title}
                                        </div>

                                        {/* CNIC */}
                                        <div className="text-sm  text-[#475569] font-medium">
                                            {employee.cnic}
                                        </div>

                                        {/* Contact */}
                                        <div className="text-sm text-[#475569] font-medium">
                                            {employee.contact}
                                        </div>
                                        {/* Status */}
                                        <div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${employee.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : employee.status === 'inactive'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {employee.status}
                                            </span>
                                        </div>

                                        {/* Action */}
                                        <div className="flex items-center justify-center gap-3">

                                            <button className="w-10 h-10 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] flex items-center justify-center transition-all cursor-pointer">

                                                <Link
                                                    to={`/employee/${employee.id}`}
                                                    className="w-10 h-10 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] flex items-center justify-center transition-all cursor-pointer"
                                                >
                                                    <Eye className="w-5 h-5 text-[#64748B]" />
                                                </Link>
                                            </button>

                                            <button
                                                onClick={() => deleteEmployee(employee.id)}
                                                className="cursor-pointer w-10 h-10 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] flex items-center justify-center transition-all cursor-pointer"
                                            >
                                                <Trash2 className="w-5 h-5 text-[#64748B]" />
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="text-center py-10 text-gray-500">
                                No Employees Found
                            </div>

                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default EmployeeList