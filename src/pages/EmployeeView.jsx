import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Optional: Use this if using React Router
import api from '../api/api';

// If you are passing the ID via props, use: const EmployeeView = ({ employeeId }) => {
const EmployeeView = () => {
    // If you are using React Router (e.g., /employee/3), hook into the URL parameter:
    const { id } = useParams();

    // Fallback ID selector: Uses URL parameter, or a passed prop, or defaults to 1
    const currentId = id || 1;

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmployeeData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Updated Endpoint: Hits your API dynamically based on the selected person's ID
            // e.g., /employee?id=3 or /employee/3 depending on your backend routing structure
            const response = await api.get(`/employee`, {
                params: { id: currentId }
            });

            // Handle filtering on the frontend if your API endpoint doesn't support filter parameters 
            // and always returns the entire array:
            if (response.data && response.data.data) {
                const selectedEmployee = response.data.data.find(
                    (emp) => emp.id === parseInt(currentId)
                );

                if (selectedEmployee) {
                    setEmployee(selectedEmployee);
                } else {
                    setError('Employee record not found.');
                }
            }
        } catch (err) {
            console.error('Error fetching employee data:', err);
            setError('Failed to fetch employee details.');
        } finally {
            setLoading(false);
        }
    };

    // CRITICAL FIX: The dependency array must watch 'currentId'.
    // When you click a different person in your table, 'currentId' updates, re-triggering this hook.
    useEffect(() => {
        fetchEmployeeData();
    }, [currentId]);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-gray-500 font-medium animate-pulse">Loading Employee Profile...</div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-red-500 font-medium">{error}</div>
            </div>
        );
    }

    // Helper function to render data table rows
    const renderRow = (label, value) => (
        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-sm">
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="text-gray-800 font-semibold text-right capitalize">{value || "N/A"}</span>
        </div>
    );

    return (
        <>
            <div className="w-full flex justify-end mb-5">
                <a href={`/add-employee/${employee.id}`}>
                    <button className="bg-[#FFFFFF] border border-[#2196F3] rounded-xl h-11 px-6 sm:px-8 flex items-center justify-center cursor-pointer">
                        <h2 className="text-[#2196F3] font-medium text-sm sm:text-base">
                            Edit
                        </h2>
                    </button>
                </a>
            </div>
            <div className="min-h-screen">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* Header / Top Profile Card */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-28 h-28 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                            <img
                                src={employee.photo_url || "https://via.placeholder.com/150"}
                                alt={`${employee.name}'s Profile`}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        <div className="flex-1 text-center sm:text-left space-y-3 w-full">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 uppercase">{employee.name}</h1>
                                <p className="text-sm text-blue-600 font-medium">{employee.job_title?.title || "No Title Assigned"}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 pt-2 border-t border-gray-100 text-sm">
                                <div>
                                    <span className="text-gray-400 block text-xs">Phone Number</span>
                                    <span className="text-gray-700 font-medium">{employee.contact}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-xs">CNIC</span>
                                    <span className="text-gray-700 font-medium">{employee.cnic}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-xs">Address</span>
                                    <span className="text-gray-700 font-medium capitalize">{employee.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Grid Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Employee Information Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">Employee Information</h2>
                                </div>
                                <div className="space-y-1">
                                    {renderRow("Name", employee.name)}
                                    {renderRow("Father's Name", employee.father_name)}
                                    {renderRow("Date of Birth", employee.dob)}
                                    {renderRow("Phone Number", employee.contact)}
                                    {renderRow("CNIC", employee.cnic)}
                                    {renderRow("Marital Status", employee.marital_status)}
                                    {renderRow("Home Address", employee.address)}
                                </div>
                            </div>
                        </div>

                        {/* Job Detail Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                                    <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">Job Detail</h2>
                                </div>
                                <div className="space-y-1">
                                    {renderRow("Employee ID", employee.employee_id)}
                                    {renderRow("Job Title", employee.job_title?.title)}
                                    {renderRow("Joining Date", employee.joining_date)}
                                    {renderRow("Employee Status", employee.status)}
                                </div>
                            </div>
                        </div>

                        {/* Bank Detail Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">Bank Detail</h2>
                                </div>
                                <div className="space-y-1">
                                    {renderRow("Account Title", employee.account_title)}
                                    {renderRow("Bank Name", employee.bank_name)}
                                    {renderRow("Account Number", employee.account_number)}
                                    {renderRow("IBAN", employee.iban)}
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                                    <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800">Emergency Contact</h2>
                                </div>
                                <div className="space-y-1">
                                    {renderRow("Emergency Contact Name", employee.emergency_contact_name)}
                                    {renderRow("Emergency Contact Number", employee.emergency_contact_number)}
                                    {renderRow("Relation with Emergency", employee.emergency_contact_relation)}
                                </div>
                            </div>
                        </div>

                        {/* CNIC Photos Section */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60">
                            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">CNIC Photos</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border border-gray-200 rounded-lg p-2 bg-gray-50 flex items-center justify-center min-h-[140px]">
                                    {employee.cnic_front_url ? (
                                        <img
                                            src={employee.cnic_front_url}
                                            alt="Pakistani CNIC Front Side"
                                            className="w-full h-auto max-h-[130px] object-contain rounded"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400 italic text-center px-2">
                                            CNIC Front Image Missing
                                        </span>
                                    )}
                                </div>
                                <div className="border border-gray-200 rounded-lg p-2 bg-gray-50 flex items-center justify-center min-h-[140px]">
                                    {employee.cnic_back_url ? (
                                        <img
                                            src={employee.cnic_back_url}
                                            alt="Pakistani CNIC Back Side"
                                            className="w-full h-auto max-h-[130px] object-contain rounded"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400 italic text-center px-2">
                                            CNIC Back Image Missing
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default EmployeeView;