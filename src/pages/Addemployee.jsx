import React, { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import api from '../api/api'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

const Addemployee = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState({
        photo: null,
        cnic_front: null,
        cnic_back: null,
    })
    const [formData, setFormData] = useState({
        name: '',
        father_name: '',
        dob: '',
        contact: '',
        cnic: '',
        marital_status: '',
        address: '',
        employee_id: '',
        job_title: '',
        joining_date: '',
        status: '',
        account_title: '',
        bank_name: '',
        account_number: '',
        iban: '',
        emergency_contact_name: '',
        emergency_contact_number: '',
        emergency_contact_relation: '',
        business_id: 1,
        photo: null,
        cnic_front: null,
        cnic_back: null,
    })

    // updated-code
    useEffect(() => {

        if (id) {
            fetchEmployee()
        }

    }, [id])

    const fetchEmployee = async () => {

        try {

            setLoading(true)

            const response = await api.get('/employee', {
                params: { id }
            })

            if (response.data && response.data.data) {

                const selectedEmployee = response.data.data.find(
                    (emp) => emp.id === parseInt(id)
                )

                if (selectedEmployee) {

                    setFormData({
                        name: selectedEmployee.name || '',
                        father_name: selectedEmployee.father_name || '',
                        dob: selectedEmployee.dob || '',
                        contact: selectedEmployee.contact || '',
                        cnic: selectedEmployee.cnic || '',
                        marital_status: selectedEmployee.marital_status || '',
                        address: selectedEmployee.address || '',
                        employee_id: selectedEmployee.employee_id || '',
                        job_title: selectedEmployee.job_title || '',
                        joining_date: selectedEmployee.joining_date || '',
                        status: selectedEmployee.status || '',
                        account_title: selectedEmployee.account_title || '',
                        bank_name: selectedEmployee.bank_name || '',
                        account_number: selectedEmployee.account_number || '',
                        iban: selectedEmployee.iban || '',
                        emergency_contact_name: selectedEmployee.emergency_contact_name || '',
                        emergency_contact_number: selectedEmployee.emergency_contact_number || '',
                        emergency_contact_relation: selectedEmployee.emergency_contact_relation || '',
                        business_id: selectedEmployee.business_id || 1,

                        // important
                        photo: null,
                        cnic_front: null,
                        cnic_back: null,
                    })

                    // previews
                    setPreview({
                        photo: selectedEmployee.photo_url || null,
                        cnic_front: selectedEmployee.cnic_front_url || null,
                        cnic_back: selectedEmployee.cnic_back_url || null,
                    })
                }

            }

        } catch (error) {

            console.log(error)
            toast.error('Failed to fetch employee')

        } finally {

            setLoading(false)

        }

    }

    // input change
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    // file change
    const handleFileChange = (e) => {

        const { name, files } = e.target

        const file = files[0]

        setFormData({
            ...formData,
            [name]: file
        })

        // image preview
        setPreview((prev) => ({
            ...prev,
            [name]: URL.createObjectURL(file)
        }))
    }

    // submit
    // submit
    const handleSubmit = async () => {

        try {

            setLoading(true)

            const data = new FormData()

            Object.keys(formData).forEach((key) => {

                // skip null/empty values
                if (formData[key] !== null && formData[key] !== '') {
                    data.append(key, formData[key])
                }

            })

            let response

            if (id) {

                // UPDATE EMPLOYEE
                response = await api.post(
                    `/employee/update/${id}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                toast.success('Employee Updated Successfully')

            } else {

                // CREATE EMPLOYEE
                response = await api.post(
                    '/employee/store',
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                toast.success('Employee Saved Successfully')

            }

            console.log(response.data)

            navigate('/employee-list')

        } catch (error) {

            console.log(error)

            if (error.response?.status === 422) {

                const errors = error.response.data.errors

                if (errors) {

                    Object.values(errors).forEach((item) => {
                        toast.error(item[0])
                    })

                } else {

                    toast.error(error.response.data.message)

                }

            } else {

                toast.error('Something went wrong')

            }

        } finally {

            setLoading(false)

        }

    }

    return (
        <div className="min-h-screen p-4 md:p-6">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {id ? 'Edit Employee' : 'Add Employee'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Add new employee
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* Left Side */}
                    <div className="xl:col-span-3 space-y-6">

                        {/* Employee Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">
                                Employee Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Name*
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Father's Name
                                    </label>

                                    <input
                                        type="text"
                                        name="father_name"
                                        value={formData.father_name}
                                        onChange={handleChange}
                                        placeholder="Enter father's name"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Contact Number
                                    </label>

                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        placeholder="0300-0000000"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        CNIC
                                    </label>

                                    <input
                                        type="text"
                                        name="cnic"
                                        value={formData.cnic}
                                        onChange={handleChange}
                                        placeholder="00000-0000000-0"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Marital Status
                                    </label>

                                    <select
                                        name="marital_status"
                                        value={formData.marital_status}
                                        onChange={handleChange}
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter complete address"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Job Detail */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">
                                Job Detail
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Employee ID
                                    </label>

                                    <input
                                        type="text"
                                        name="employee_id"
                                        value={formData.employee_id}
                                        onChange={handleChange}
                                        placeholder="000-000"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Job Title
                                    </label>

                                    <select
                                        name="job_title"
                                        value={formData.job_title}
                                        onChange={handleChange}
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="Sales Person">Sales Person</option>
                                        <option value="Inquiry Person">Inquiry Person</option>
                                        <option value="Approval Manager">Approval Manager</option>
                                        <option value="Checking Manager">Checking Manager</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Joining Date
                                    </label>

                                    <input
                                        type="date"
                                        name="joining_date"
                                        value={formData.joining_date}
                                        onChange={handleChange}
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Employee Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        {/* Bank Detail */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">
                                Bank Detail
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Account Title
                                    </label>

                                    <input
                                        type="text"
                                        name="account_title"
                                        value={formData.account_title}
                                        onChange={handleChange}
                                        placeholder="Enter account name"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Bank Name
                                    </label>

                                    <input
                                        type="text"
                                        name="bank_name"
                                        value={formData.bank_name}
                                        onChange={handleChange}
                                        placeholder="Enter bank name"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Account Number
                                    </label>

                                    <input
                                        type="text"
                                        name="account_number"
                                        value={formData.account_number}
                                        onChange={handleChange}
                                        placeholder="00000 0000000 0"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Iban
                                    </label>

                                    <input
                                        type="text"
                                        name="iban"
                                        value={formData.iban}
                                        onChange={handleChange}
                                        placeholder="00000000000000"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Other Detail */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">
                                Other Detail
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Emergency Contact Name
                                    </label>

                                    <input
                                        type="text"
                                        name="emergency_contact_name"
                                        value={formData.emergency_contact_name}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Emergency Contact Number
                                    </label>

                                    <input
                                        type="text"
                                        name="emergency_contact_number"
                                        value={formData.emergency_contact_number}
                                        onChange={handleChange}
                                        placeholder="0300-0000000"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Relation with Emergency
                                    </label>

                                    <input
                                        type="text"
                                        name="emergency_contact_relation"
                                        value={formData.emergency_contact_relation}
                                        onChange={handleChange}
                                        placeholder="Sister / Brother"
                                        className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Right Side Uploads */}
                    <div className="space-y-6">

                        {/* Employee Photo */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-5">
                                Employee Photo
                            </h3>

                            <label className="border-2 border-dashed border-gray-300 rounded-2xl h-52 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300">

                                {
                                    preview.photo ? (
                                        <img
                                            src={preview.photo}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400" />

                                            <span className="text-sm text-gray-500 mt-3">
                                                Add Image
                                            </span>
                                        </>
                                    )
                                }

                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* CNIC Front */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-5">
                                CNIC Front
                            </h3>

                            <label className="border-2 border-dashed border-gray-300 rounded-2xl h-52 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300">

                                {
                                    preview.cnic_front ? (
                                        <img
                                            src={preview.cnic_front}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400" />

                                            <span className="text-sm text-gray-500 mt-3">
                                                Add Image
                                            </span>
                                        </>
                                    )
                                }

                                <input
                                    type="file"
                                    name="cnic_front"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* CNIC Back */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-5">
                                CNIC Back
                            </h3>

                            <label className="border-2 border-dashed border-gray-300 rounded-2xl h-52 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300">

                                {
                                    preview.cnic_back ? (
                                        <img
                                            src={preview.cnic_back}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400" />

                                            <span className="text-sm text-gray-500 mt-3">
                                                Add Image
                                            </span>
                                        </>
                                    )
                                }

                                <input
                                    type="file"
                                    name="cnic_back"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                    </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">

                    <button className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all">
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all"
                    >
                        {
                            loading
                                ? (id ? 'Updating...' : 'Saving...')
                                : (id ? 'Update Employee' : 'Save Employee')
                        }
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Addemployee