import React, { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import api from '../api/api'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

const Addemployee = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [jobTitles, setJobTitles] = useState([])

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
        job_title_id: '',        // ✅ fixed
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
        cnic_front: null,
        cnic_back: null,
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (id) {
            fetchEmployee()
        } else {
            const now = new Date();
            const offset = now.getTimezoneOffset() * 60000;
            const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16);
            setFormData(prev => ({
                ...prev,
                dob: localISOTime.split('T')[0],
                joining_date: localISOTime
            }));
        }
        fetchJobTitles()
    }, [id])
    const fetchJobTitles = async () => {
        try {
            const response = await api.get('/job-title')
            const data = response.data.data.data  // ✅ one extra .data for pagination
            setJobTitles(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log(error)
            setJobTitles([])
        }
    }
    const fetchEmployee = async () => {
        try {
            setLoading(true)
            const response = await api.get('/employee', { params: { id } })
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
                        job_title_id: selectedEmployee.job_title_id || '',   // ✅ fixed
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
                        photo: null,
                        cnic_front: null,
                        cnic_back: null,
                    })
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        // ✅ Clear error on field change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target
        const file = files[0]
        setFormData({ ...formData, [name]: file })
        setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }))
    }

    const validateForm = () => {
        let newErrors = {};

        const textFields = [
            'name', 'father_name', 'dob', 'contact', 'cnic', 'marital_status',
            'address', 'employee_id', 'job_title_id',   // ✅ fixed
            'joining_date', 'status',
            'account_title', 'bank_name', 'account_number', 'iban',
            'emergency_contact_name', 'emergency_contact_number', 'emergency_contact_relation'
        ];

        // ✅ Mark every empty field with an error
        textFields.forEach(field => {
            if (!formData[field] || formData[field].toString().trim() === '') {
                newErrors[field] = "This field is required";
            }
        });

        if (formData.cnic && !/^[0-9-]+$/.test(formData.cnic))
            newErrors.cnic = "Invalid CNIC format";
        if (formData.contact && !/^[0-9-]+$/.test(formData.contact))
            newErrors.contact = "Invalid contact format";
        if (formData.account_number && !/^[0-9 ]+$/.test(formData.account_number))
            newErrors.account_number = "Invalid account number";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            toast.error("Please fill all the required fields.");
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setShowConfirm(true)  // ✅ show modal instead of window.confirm
    }

    const handleConfirmSave = async () => {
        setShowConfirm(false)
        try {
            setLoading(true)
            const data = new FormData()
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null && formData[key] !== '') {
                    if (key === 'joining_date') {
                        data.append(key, formData[key].split('T')[0]);
                    } else {
                        data.append(key, formData[key]);
                    }
                }
            });

            let response
            if (id) {
                response = await api.post(`/employee/update/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                toast.success('Employee Updated Successfully')
            } else {
                response = await api.post('/employee/store', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                toast.success('Employee Saved Successfully')
            }

            console.log(response.data)
            navigate('/employee-list')

        } catch (error) {
            console.log(error)
            if (error.response?.status === 422) {
                const errs = error.response.data.errors
                if (errs) {
                    Object.values(errs).forEach((item) => toast.error(item[0]))
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

    // ✅ Helper: returns red border class if field has error
    const fieldClass = (name) =>
        `w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors[name]
            ? 'border-red-400 bg-red-50 focus:ring-red-400'
            : 'border-gray-200'
        }`

    return (
        <div className="min-h-screen p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {id ? 'Edit Employee' : 'Add Employee'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Add new employee</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* Left Side */}
                    <div className="xl:col-span-3 space-y-6">

                        {/* Employee Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">Employee Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="name" value={formData.name}
                                        onChange={handleChange} placeholder="Enter full name"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                                        className={fieldClass('name')}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Father's Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="father_name" value={formData.father_name}
                                        onChange={handleChange} placeholder="Enter father's name"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                                        className={fieldClass('father_name')}
                                    />
                                    {errors.father_name && <p className="text-red-500 text-xs mt-1">{errors.father_name}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                                    <input
                                        type="date" name="dob" value={formData.dob}
                                        onChange={handleChange}
                                        className={fieldClass('dob')}
                                    />
                                    {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Contact Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="contact" value={formData.contact}
                                        onChange={handleChange} placeholder="0300-0000000"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                                        className={fieldClass('contact')}
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">CNIC <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="cnic" value={formData.cnic}
                                        onChange={handleChange} placeholder="00000-0000000-0"
                                        maxLength="15"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                                        className={fieldClass('cnic')}
                                    />
                                    {errors.cnic && <p className="text-red-500 text-xs mt-1">{errors.cnic}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Marital Status <span className="text-red-500">*</span></label>
                                    <select name="marital_status" value={formData.marital_status}
                                        onChange={handleChange} className={fieldClass('marital_status')}>
                                        <option value="">Select</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                    </select>
                                    {errors.marital_status && <p className="text-red-500 text-xs mt-1">{errors.marital_status}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="address" value={formData.address}
                                        onChange={handleChange} placeholder="Enter complete address"
                                        className={fieldClass('address')}
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>

                            </div>
                        </div>

                        {/* Job Detail */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">Job Detail</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Employee ID <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="employee_id" value={formData.employee_id}
                                        onChange={handleChange} placeholder="000-000"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                                        className={fieldClass('employee_id')}
                                    />
                                    {errors.employee_id && <p className="text-red-500 text-xs mt-1">{errors.employee_id}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Job Title <span className="text-red-500">*</span></label>
                                    <select
                                        name="job_title_id"
                                        value={formData.job_title_id}
                                        onChange={handleChange}
                                        className={fieldClass('job_title_id')}
                                    >
                                        <option value="">Select</option>

                                        {jobTitles.map((title) => (
                                            <option
                                                key={title.id}
                                                value={title.id}
                                            >
                                                {title.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.job_title_id && <p className="text-red-500 text-xs mt-1">{errors.job_title_id}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Joining Date <span className="text-red-500">*</span></label>
                                    <input
                                        type="datetime-local" name="joining_date" value={formData.joining_date}
                                        onChange={handleChange}
                                        className={fieldClass('joining_date')}
                                    />
                                    {errors.joining_date && <p className="text-red-500 text-xs mt-1">{errors.joining_date}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Employee Status <span className="text-red-500">*</span></label>
                                    <select name="status" value={formData.status}
                                        onChange={handleChange} className={fieldClass('status')}>
                                        <option value="">Select</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                                </div>

                            </div>
                        </div>

                        {/* Bank Detail */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">Bank Detail</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Account Title <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="account_title" value={formData.account_title}
                                        onChange={handleChange} placeholder="Enter account name"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                                        className={fieldClass('account_title')}
                                    />
                                    {errors.account_title && <p className="text-red-500 text-xs mt-1">{errors.account_title}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Bank Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="bank_name" value={formData.bank_name}
                                        onChange={handleChange} placeholder="Enter bank name"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                                        className={fieldClass('bank_name')}
                                    />
                                    {errors.bank_name && <p className="text-red-500 text-xs mt-1">{errors.bank_name}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Account Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="account_number" value={formData.account_number}
                                        onChange={handleChange} placeholder="00000 0000000 0"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9 ]/g, '') }}
                                        className={fieldClass('account_number')}
                                    />
                                    {errors.account_number && <p className="text-red-500 text-xs mt-1">{errors.account_number}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">IBAN <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="iban" value={formData.iban}
                                        onChange={handleChange} placeholder="00000000000000"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '') }}
                                        className={fieldClass('iban')}
                                    />
                                    {errors.iban && <p className="text-red-500 text-xs mt-1">{errors.iban}</p>}
                                </div>

                            </div>
                        </div>

                        {/* Other Detail */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">Other Detail</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Emergency Contact Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="emergency_contact_name" value={formData.emergency_contact_name}
                                        onChange={handleChange} placeholder="Enter full name"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                                        className={fieldClass('emergency_contact_name')}
                                    />
                                    {errors.emergency_contact_name && <p className="text-red-500 text-xs mt-1">{errors.emergency_contact_name}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Emergency Contact Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="emergency_contact_number" value={formData.emergency_contact_number}
                                        onChange={handleChange} placeholder="0300-0000000"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                                        className={fieldClass('emergency_contact_number')}
                                    />
                                    {errors.emergency_contact_number && <p className="text-red-500 text-xs mt-1">{errors.emergency_contact_number}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Relation with Emergency <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" name="emergency_contact_relation" value={formData.emergency_contact_relation}
                                        onChange={handleChange} placeholder="Sister / Brother"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                                        className={fieldClass('emergency_contact_relation')}
                                    />
                                    {errors.emergency_contact_relation && <p className="text-red-500 text-xs mt-1">{errors.emergency_contact_relation}</p>}
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Right Side Uploads */}
                    <div className="space-y-6">

                        {/* Employee Photo */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-5">Employee Photo</h3>
                            <label className="border-2 border-dashed border-gray-300 rounded-2xl h-52 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300">
                                {preview.photo ? (
                                    <img src={preview.photo} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <span className="text-sm text-gray-500 mt-3">Add Image</span>
                                    </>
                                )}
                                <input type="file" name="photo" onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>

                        {/* CNIC Front */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-5">CNIC Front</h3>
                            <label className="border-2 border-dashed border-gray-300 rounded-2xl h-52 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300">
                                {preview.cnic_front ? (
                                    <img src={preview.cnic_front} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <span className="text-sm text-gray-500 mt-3">Add Image</span>
                                    </>
                                )}
                                <input type="file" name="cnic_front" onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>

                        {/* CNIC Back */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-5">CNIC Back</h3>
                            <label className="border-2 border-dashed border-gray-300 rounded-2xl h-52 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300">
                                {preview.cnic_back ? (
                                    <img src={preview.cnic_back} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <span className="text-sm text-gray-500 mt-3">Add Image</span>
                                    </>
                                )}
                                <input type="file" name="cnic_back" onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>

                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
                    <button className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all cursor-pointer"
                    >
                        {loading
                            ? (id ? 'Updating...' : 'Saving...')
                            : (id ? 'Update Employee' : 'Save Employee')}
                    </button>
                </div>

            </div>

            {/* Confirm Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 flex flex-col items-center gap-5 animate-fade-in">

                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                {id ? 'Update Employee?' : 'Save Employee?'}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {id
                                    ? 'Are you sure you want to update this employee record?'
                                    : 'Are you sure you want to save this new employee?'}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-all cursor-pointer"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleConfirmSave}
                                className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all shadow-md cursor-pointer"
                            >
                                {id ? 'Update' : 'Save'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Addemployee