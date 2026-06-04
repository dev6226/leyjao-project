import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api.js';

const Payinstallment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Previous page se aaya hua installment data extract karna
    const installmentData = location.state?.installment;

    // Is installment ki original expected amount (e.g., 10909.23)
    const ACTUAL_INSTALLMENT_AMOUNT = parseFloat(installmentData?.amount) || 0;

    // States for Form fields
    const [currentTime, setCurrentTime] = useState('');
    const [paidAmount, setPaidAmount] = useState('');
    const [remarks, setRemarks] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Status and Toast state
    const [message, setMessage] = useState({ type: '', text: '' });
    const [toast, setToast] = useState({ show: false, type: '', text: '' });

    // Toast show karne ka helper function
    const showToast = (type, text) => {
        setToast({ show: true, type, text });
        setTimeout(() => {
            setToast({ show: false, type: '', text: '' });
        }, 3000);
    };

    // Component load hote hi inputs aur calculations set karna
    useEffect(() => {
        if (!installmentData) {
            navigate(-1);
            return;
        }

        // By default input field mein isi installment ki expected amount pre-fill karna
        setPaidAmount(installmentData.amount || '');

        // Setup Live Local current Date & Time
        const updateDateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleDateString('en-PK', {
                year: 'numeric', month: 'short', day: '2-digit'
            }) + ' - ' + now.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentTime(formatted);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, [installmentData, navigate]);

    if (!installmentData) return null;

    // Real-time calculation for Remaining Balance
    const currentInputAmount = parseFloat(paidAmount) || 0;

    // Formula: Installment Amount - Jo amount user enter kar raha hai
    const remainingAmount = ACTUAL_INSTALLMENT_AMOUNT - currentInputAmount;

    // Validation: Entered amount expected amount se ek rupiya bhi ZYADA nahi ho sakti
    const isInvalidAmount = currentInputAmount > ACTUAL_INSTALLMENT_AMOUNT;

    // API submission handle karna
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Safety validations before sending request
        if (isInvalidAmount) {
            setMessage({ type: 'error', text: `Paid amount cannot be more than Rs. ${ACTUAL_INSTALLMENT_AMOUNT.toLocaleString()}` });
            showToast('error', 'Invalid amount entered!');
            return;
        }

        if (!remarks.trim()) {
            setMessage({ type: 'error', text: 'Remarks are mandatory to process payment.' });
            showToast('error', 'Remarks field is required!');
            return;
        }

        setSubmitting(true);
        setMessage({ type: '', text: '' });

        const payload = {
            installment_id: parseInt(installmentData.id),
            paid_amount: parseFloat(paidAmount),
            remarks: remarks.trim()
        };

        try {
            const response = await api.post('/payment/store', payload);
            if (response.data.success || response.status === 200) {
                setMessage({ type: 'success', text: 'Payment processed successfully!' });
                showToast('success', 'Payment recorded successfully!');
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            } else {
                const errMsg = response.data.message || 'Something went wrong.';
                setMessage({ type: 'error', text: errMsg });
                showToast('error', errMsg);
            }
        } catch (error) {
            console.error("API Error:", error);
            const errMsg = error.response?.data?.message || 'Failed to submit payment.';
            setMessage({ type: 'error', text: errMsg });
            showToast('error', errMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen flex justify-center items-center relative">

            {/* 🔥 FLOATING TOASTER COMPONENT */}
            {toast.show && (
                <div className={`fixed top-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-xl border text-sm font-semibold tracking-wide transition-all duration-300 transform translate-y-0 ${toast.type === 'success'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-red-600 text-white border-red-500'
                    }`}>
                    <div className="mr-2">
                        {toast.type === 'success' ? '✅' : '⚠️'}
                    </div>
                    <div>{toast.text}</div>
                </div>
            )}

            <div className="bg-white w-full max-w-xl rounded-2xl shadow-md border border-gray-100 overflow-hidden">

                {/* Form Header */}
                <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Process Installment Payment</h2>
                        <p className="text-blue-100 text-xs mt-1">Fill the details to record the collection</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-white hover:bg-blue-700 bg-blue-500/30 p-2 rounded-xl text-sm font-semibold transition-all"
                    >
                        Go Back
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Status Alert Message */}
                    {message.text && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* 1. Date & Time (Read Only) */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Current Date & Time</label>
                        <input
                            type="text"
                            value={currentTime}
                            readOnly
                            className="w-full h-11 px-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 font-medium cursor-not-allowed outline-none text-sm"
                        />
                    </div>

                    {/* 2. Customer Name (Read Only) */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Name</label>
                        <input
                            type="text"
                            value={installmentData.customer_name}
                            readOnly
                            className="w-full h-11 px-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 font-semibold cursor-not-allowed outline-none text-sm"
                        />
                    </div>

                    {/* 3. Installment Amount & Installment No (Read Only) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Actual Product Price (Rs.)</label>
                            <input
                                type="text"
                                value={`Rs. ${ACTUAL_INSTALLMENT_AMOUNT.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                                readOnly
                                className="w-full h-11 px-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 font-bold cursor-not-allowed outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Installment No.</label>
                            <input
                                type="text"
                                value={`Installment #${installmentData.installment_number}`}
                                readOnly
                                className="w-full h-11 px-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 font-medium cursor-not-allowed outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* 4. Installment Receiving Amount (Editable Field) */}
                    <div>
                        <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Installment Receiving Amount (Rs.) *</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={paidAmount}
                            onChange={(e) => setPaidAmount(e.target.value)}
                            placeholder="Enter paid amount"
                            className={`w-full h-11 px-4 rounded-xl bg-white text-gray-900 font-bold focus:ring-4 outline-none transition-all text-base ${isInvalidAmount
                                ? 'border-red-400 focus:ring-red-100 focus:border-red-500 animate-pulse'
                                : 'border-blue-300 focus:ring-blue-100 focus:border-blue-500'
                                }`}
                        />
                        {isInvalidAmount ? (
                            <p className="text-xs text-red-500 mt-1 font-semibold">⚠️ Warning: Amount cannot be greater than expected Rs. {ACTUAL_INSTALLMENT_AMOUNT.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        ) : (
                            <p className="text-xs text-gray-400 mt-1">Expected this installment amount: Rs. {ACTUAL_INSTALLMENT_AMOUNT.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        )}
                    </div>

                    {/* 5. Remaining Amount Field (Read Only & Auto Calculated) */}
                    <div>
                        <label className="block text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Remaining Balance Amount (Rs.)</label>
                        <input
                            type="text"
                            value={`Rs. ${(remainingAmount >= 0 ? remainingAmount : 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                            readOnly
                            className={`w-full h-11 px-4 rounded-xl font-extrabold cursor-not-allowed outline-none text-base ${isInvalidAmount
                                ? 'bg-red-50 border-red-200 text-red-700'
                                : remainingAmount === 0
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                    : 'bg-amber-50 border-amber-200 text-amber-700'
                                }`}
                        />
                        <p className="text-xs text-gray-400 mt-1">Remaining balance will show the pending amount if you pay less.</p>
                    </div>

                    {/* 6. Remarks / References (🔥 REQUIRED FIELD) */}
                    <div>
                        <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Remarks / References *</label>
                        <textarea
                            rows="3"
                            required
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Enter payment notes or method details (e.g., Cash collection details)"
                            className="w-full p-4 rounded-xl bg-white border border-gray-300 text-gray-800 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Actions Form Buttons */}
                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="w-1/3 h-11 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || isInvalidAmount}
                            className={`w-2/3 h-11 rounded-xl text-white font-semibold text-sm transition-all flex justify-center items-center shadow-md ${(submitting || isInvalidAmount)
                                ? 'bg-gray-400 cursor-not-allowed shadow-none'
                                : 'bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-blue-100'
                                }`}
                        >
                            {submitting ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            ) : (
                                'Confirm Payment'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payinstallment;