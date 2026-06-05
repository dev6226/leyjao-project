import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'
import toast from 'react-hot-toast'
import { User, Phone, CreditCard, ChevronLeft, Loader2 } from 'lucide-react'

const Sellproducts = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [customer, setCustomer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [type, setType] = useState("")
    const [products, setProducts] = useState([])
    const [series, setSeries] = useState([])
    const [models, setModels] = useState([])
    const [brands, setBrands] = useState([])
    const [selectedProduct, setSelectedProduct] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [selectedSeries, setSelectedSeries] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("");
    const [duration, setDuration] = useState("");

    // ── Price & Calculation States ──
    const [actualSellingPrice, setActualSellingPrice] = useState("");
    const [advanceAmount, setAdvanceAmount] = useState("");
    const [markupPercent, setMarkupPercent] = useState("");

    // ── Webcam & Upload States (Cleaned Base64) ──
    const [productImageFile, setProductImageFile] = useState(null) // Holds both device files and webcam blobs
    const [cameraActive, setCameraActive] = useState(false)
    const [facingMode, setFacingMode] = useState("environment")

    // ── Employee Specific States ──
    const [employees, setEmployees] = useState([])
    const [salesPersonId, setSalesPersonId] = useState("")
    const [inquiryPersonId, setInquiryPersonId] = useState("")
    const [approvalManagerId, setApprovalManagerId] = useState("")
    const [checkingManagerId, setCheckingManagerId] = useState("")

    const videoRef = useRef(null)
    const fileInputRef = useRef(null)
    const streamRef = useRef(null)

    // Start camera stream
    const startCamera = async () => {
        try {
            setCameraActive(true)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facingMode }
            })
            streamRef.current = stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (err) {
            console.error("Camera access failed:", err)
            toast.error("Could not access camera. Please check permissions.")
            setCameraActive(false)
        }
    }

    // Stop camera stream
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
        }
        setCameraActive(false)
    }

    // Capture photo from video and convert directly to File Object
    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas")
            canvas.width = videoRef.current.videoWidth || 640
            canvas.height = videoRef.current.videoHeight || 480
            const ctx = canvas.getContext("2d")
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

            // Convert canvas to real File Object instead of Base64
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], `webcam_capture_${Date.now()}.jpg`, { type: blob.type || "image/jpeg" });
                    setProductImageFile(file); // Stores as standard file input
                    stopCamera();
                    toast.success("Live photo captured successfully!");
                }
            }, "image/jpeg", 0.95);
        }
    }

    // Toggle camera (Front vs Back)
    const toggleCamera = () => {
        const nextMode = facingMode === "environment" ? "user" : "environment"
        setFacingMode(nextMode)
    }

    // Handle standard device upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProductImageFile(file); // Stores any image format uploaded by user
            toast.success("Image uploaded from device successfully!")
        }
    }

    // Keep camera updated if facingMode changes while active
    useEffect(() => {
        if (cameraActive) {
            stopCamera()
            startCamera()
        }
    }, [facingMode])

    // Clean up stream on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                setLoading(true)
                const res = await api.get(`/customer/${id}`)
                const list = res.data?.data || []
                const found = list.find((c) => c.id === Number(id))
                if (found) {
                    setCustomer(found)
                }
            } catch (error) {
                console.error("Error fetching customer:", error)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchCustomer()
    }, [id])

    // fetch-products
    const fetchProducts = async () => {
        try {
            const res = await api.get("/product")
            setProducts(res.data.data)
        } catch (error) {
            console.error("Error fetching products:", error)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    // fetch-series
    const fetchSeries = async () => {
        try {
            const res = await api.get("/series")
            setSeries(res.data.data)
        } catch (error) {
            console.error("Error fetching series:", error)
        }
    }
    useEffect(() => {
        fetchSeries()
    }, [])

    // fetchModels
    const fetchModels = async () => {
        try {
            const res = await api.get("/product-model")
            setModels(res.data.data)
        } catch (error) {
            console.error("Error fetching models:", error)
        }
    }
    useEffect(() => {
        fetchModels()
    }, [])

    // fetch Brands
    const fetchBrands = async () => {
        try {
            const res = await api.get("/brand")
            setBrands(res.data.data)
        } catch (error) {
            console.error("Error fetching brands:", error)
        }
    }
    useEffect(() => {
        fetchBrands()
    }, [])

    // ── Fetch Employee Records for Staff Details Card ──
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await api.get("/employee")
                setEmployees(res.data?.data || [])
            } catch (error) {
                console.error("Error fetching employees data:", error)
            }
        }
        fetchEmployees()
    }, [])

    // ── Handle Product Selection Change ──
    const handleProductChange = (e) => {
        const productId = e.target.value;
        setSelectedProduct(productId);

        if (productId) {
            const foundProduct = products.find((p) => p.id === Number(productId) || p.id === productId);
            if (foundProduct) {
                setActualSellingPrice(foundProduct.sale_price || 0);
            } else {
                setActualSellingPrice("");
            }
        } else {
            setActualSellingPrice("");
        }
        setAdvanceAmount("");
        setMarkupPercent("");
    };

    // ── Dynamic Calculations ──
    const priceNum = Number(actualSellingPrice) || 0;
    const advanceNum = Number(advanceAmount) || 0;
    const markupNum = Number(markupPercent) || 0;

    const baseRemaining = Math.max(0, priceNum - advanceNum);
    const calculatedMarkupAmount = baseRemaining * (markupNum / 100);
    const balanceAmount = baseRemaining + calculatedMarkupAmount;

    // ── Helper Function to Find Selected Employee CNIC ──
    const getEmployeeCNIC = (selectedId) => {
        if (!selectedId) return "00000-0000000-0";
        const found = employees.find((emp) => emp.id === Number(selectedId) || emp.id === selectedId);
        return found ? found.cnic : "00000-0000000-0";
    };

    // ── Form Submission Handler ──
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (!selectedProduct || !type || !markupPercent) {
            toast.error("Please fill all mandatory product fields.");
            return;
        }
        if (!productImageFile) {
            toast.error("Please provide a product proof photo (Upload or Live Webcam).");
            return;
        }

        try {
            setSubmitLoading(true);

            // Preparing Multi-part Form Data
            const formData = new FormData();
            formData.append("customer_id", id);
            formData.append("brand_id", selectedBrand);
            formData.append("product_id", selectedProduct);
            formData.append("model_id", selectedModel);

            // ── Backend Validation Keys Alignment ──
            formData.append("serial_id", selectedSeries);
            formData.append("duration_months", duration);
            formData.append("payment_type", type);
            formData.append("markup_percentage", markupPercent);

            formData.append("advance_amount", advanceAmount);
            formData.append("actual_selling_price", actualSellingPrice);
            formData.append("balance_amount", balanceAmount.toFixed(0));

            // Standard File field (Ab webcam wali image bi isi key pr jaygi as a true file binary)
            formData.append("proof_image", productImageFile);

            // ── Staff Payload Appends ──
            formData.append("sales_person_id", salesPersonId);
            formData.append("inquiry_person_id", inquiryPersonId);
            formData.append("approval_manager_id", approvalManagerId);
            formData.append("checking_manager_id", checkingManagerId);

            const res = await api.post("/sale/store", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data?.success || res.status === 200 || res.status === 201) {
                toast.success(res.data?.message || "Product sale processed successfully!");
                navigate('/all-Customer', { state: { sellSuccess: true, customerId: Number(id) } });
            } else {
                toast.error(res.data?.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            const serverMessage = error.response?.data?.message;
            toast.error(serverMessage || "Failed to submit sale data. Please try again.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const inputClass =
        "w-full h-11 px-3 rounded-lg border border-[#E1E7EF] bg-[#F9FAFB] outline-none placeholder:text-[#65758B] placeholder:text-sm"

    const labelClass =
        "text-sm sm:text-base font-semibold text-[#0F1729]"

    return (
        <form onSubmit={handleSubmit} className="p-1 md:p-3">
            {/* Header / Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <button
                    type="button"
                    disabled={submitLoading}
                    onClick={() => navigate('/all-Customer')}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-50 transition font-medium"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span className='cursor-pointer'>Back to Customers</span>
                </button>
                <div className="sm:text-right">
                    <h2 className='text-primary text-xl font-semibold'>Sell Product</h2>
                    <p className='text-secondary text-base mt-1'>Fill in the installment sale details</p>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
                {/* Form column */}
                <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
                    <div className='p-4 sm:p-6'>

                        {/* Header */}
                        <div className='flex items-center gap-3'>
                            <p className='text-primary text-base sm:text-lg font-semibold'>
                                Product Details
                            </p>
                        </div>

                        <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

                        {/* Inputs */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div>
                                <label className={labelClass}>Company</label>
                                <select
                                    className={inputClass}
                                    value={selectedBrand}
                                    disabled={submitLoading}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {brands && brands.map((b) => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Product Name</label>
                                <select
                                    className={inputClass}
                                    value={selectedProduct}
                                    disabled={submitLoading}
                                    onChange={handleProductChange}
                                >
                                    <option value="">Select</option>
                                    {products && products.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Model</label>
                                <select
                                    className={inputClass}
                                    value={selectedModel}
                                    disabled={submitLoading}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {models && models.map((m) => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Serial No</label>
                                <select
                                    className={inputClass}
                                    value={selectedSeries}
                                    disabled={submitLoading}
                                    onChange={(e) => setSelectedSeries(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {series && series.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Duration</label>
                                <select
                                    className={inputClass}
                                    value={duration}
                                    disabled={submitLoading}
                                    onChange={(e) => setDuration(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="12">12 Months</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Type</label>
                                <select
                                    className={inputClass}
                                    value={type}
                                    disabled={submitLoading}
                                    onChange={(e) => {
                                        setType(e.target.value);
                                        setAdvanceAmount("");
                                    }}
                                >
                                    <option value="">Select</option>
                                    <option value="first_installment">First Installment</option>
                                    <option value="advance_amount">Advance</option>
                                </select>
                            </div>

                            {type && (
                                <div>
                                    <label className={labelClass}>
                                        {type === "first_installment" ? "First Installment Amount" : "Advance Amount"}
                                    </label>
                                    <input
                                        type='number'
                                        placeholder='0000000'
                                        className={inputClass}
                                        value={advanceAmount}
                                        disabled={submitLoading}
                                        onChange={(e) => setAdvanceAmount(e.target.value)}
                                    />
                                </div>
                            )}

                            <div>
                                <label className={labelClass}>Markup %</label>
                                <input
                                    type='number'
                                    placeholder='e.g. 50'
                                    className={inputClass}
                                    value={markupPercent}
                                    disabled={submitLoading}
                                    onChange={(e) => setMarkupPercent(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Actual Selling Price</label>
                                <input
                                    type='text'
                                    placeholder='0000000'
                                    className={`${inputClass} cursor-not-allowed bg-gray-100 text-gray-500`}
                                    value={actualSellingPrice}
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Balance Amount</label>
                                <input
                                    type='text'
                                    placeholder='0000000'
                                    className={`${inputClass} cursor-not-allowed bg-gray-100 text-gray-800 font-semibold`}
                                    value={selectedProduct && type ? balanceAmount.toFixed(0) : ""}
                                    readOnly
                                />
                            </div>

                        </div>

                        {/* Upload & Webcam Section */}
                        <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 shadow-sm bg-[#F8FAFC]'>
                            <h3 className="text-sm font-semibold text-[#0F1729] mb-4 text-center sm:text-left">
                                Product Proof Photo
                            </h3>

                            <div className="flex flex-col items-center justify-center gap-5">
                                {cameraActive ? (
                                    <div className="relative w-full max-w-sm rounded-lg overflow-hidden border-2 border-[#0062BD] bg-black aspect-video flex items-center justify-center shadow-lg">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 px-3">
                                            <button
                                                type="button"
                                                onClick={capturePhoto}
                                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-md transition"
                                            >
                                                Capture Photo
                                            </button>
                                            <button
                                                type="button"
                                                onClick={toggleCamera}
                                                className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-md transition"
                                            >
                                                Switch Camera
                                            </button>
                                            <button
                                                type="button"
                                                onClick={stopCamera}
                                                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-md transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : productImageFile ? (
                                    <div className="relative group w-48 h-36 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                        <img
                                            src={URL.createObjectURL(productImageFile)}
                                            alt="Product proof preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <button
                                                type="button"
                                                disabled={submitLoading}
                                                onClick={() => setProductImageFile(null)}
                                                className="px-3 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded hover:bg-rose-700 transition disabled:opacity-50"
                                            >
                                                Remove Photo
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => !submitLoading && fileInputRef.current?.click()}
                                        className={`w-48 h-36 border-2 border-dashed border-[#CBD5E1] rounded-lg flex flex-col items-center justify-center bg-[#FFFFFF] transition-all ${submitLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-[#0062BD]'}`}
                                    >
                                        <span className="text-xs text-gray-400">No Image Uploaded</span>
                                        <span className="text-[10px] text-gray-400 mt-1 font-medium">Click to select file</span>
                                    </div>
                                )}

                                {!cameraActive && (
                                    <div className="flex flex-wrap items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            disabled={submitLoading}
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-4 py-2 border border-[#E1E7EF] bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Upload from Device
                                        </button>
                                        <button
                                            type="button"
                                            disabled={submitLoading}
                                            onClick={startCamera}
                                            className="px-4 py-2 bg-[#0062BD] hover:bg-[#0054A3] text-white text-xs sm:text-sm font-semibold rounded-lg transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Take Live Photo (Webcam)
                                        </button>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                    className="hidden"
                                    disabled={submitLoading}
                                />
                            </div>
                        </div>

                        {/* ── STAFF DETAIL CARD (NAME IN DROPDOWN | CNIC ON RIGHT) ── */}
                        <div className="mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 shadow-sm bg-white">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-[#F1F5F9] text-[#475569]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                </div>
                                <h3 className="text-base font-bold text-[#0F1729]">Staff Detail</h3>
                            </div>

                            <div className="space-y-5">
                                {/* Sales Person Field */}
                                <div>
                                    <label className="text-sm font-semibold text-[#0F1729] block mb-2">Sales Person ( Name ) / ( CNIC )</label>
                                    <div className="flex items-center justify-between w-full h-11 px-3 rounded-lg border border-[#E1E7EF] bg-[#F9FAFB]">
                                        <select
                                            className="bg-transparent outline-none text-sm text-[#0F1729] w-3/5 h-full cursor-pointer disabled:cursor-not-allowed"
                                            value={salesPersonId}
                                            disabled={submitLoading}
                                            onChange={(e) => setSalesPersonId(e.target.value)}
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map((emp) => (
                                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                                            ))}
                                        </select>
                                        <div className="flex items-center gap-4 text-sm text-[#65758B] select-none">
                                            <span>-</span>
                                            <span className="font-mono text-gray-700 min-w-[140px] text-right">{getEmployeeCNIC(salesPersonId)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Inquiry Person Field */}
                                <div>
                                    <label className="text-sm font-semibold text-[#0F1729] block mb-2">Inquiry Person ( Name ) / ( CNIC )</label>
                                    <div className="flex items-center justify-between w-full h-11 px-3 rounded-lg border border-[#E1E7EF] bg-[#F9FAFB]">
                                        <select
                                            className="bg-transparent outline-none text-sm text-[#0F1729] w-3/5 h-full cursor-pointer disabled:cursor-not-allowed"
                                            value={inquiryPersonId}
                                            disabled={submitLoading}
                                            onChange={(e) => setInquiryPersonId(e.target.value)}
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map((emp) => (
                                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                                            ))}
                                        </select>
                                        <div className="flex items-center gap-4 text-sm text-[#65758B] select-none">
                                            <span>-</span>
                                            <span className="font-mono text-gray-700 min-w-[140px] text-right">{getEmployeeCNIC(inquiryPersonId)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Approval Manager Field */}
                                <div>
                                    <label className="text-sm font-semibold text-[#0F1729] block mb-2">Approval Manager ( Name ) / ( CNIC )</label>
                                    <div className="flex items-center justify-between w-full h-11 px-3 rounded-lg border border-[#E1E7EF] bg-[#F9FAFB]">
                                        <select
                                            className="bg-transparent outline-none text-sm text-[#0F1729] w-3/5 h-full cursor-pointer disabled:cursor-not-allowed"
                                            value={approvalManagerId}
                                            disabled={submitLoading}
                                            onChange={(e) => setApprovalManagerId(e.target.value)}
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map((emp) => (
                                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                                            ))}
                                        </select>
                                        <div className="flex items-center gap-4 text-sm text-[#65758B] select-none">
                                            <span>-</span>
                                            <span className="font-mono text-gray-700 min-w-[140px] text-right">{getEmployeeCNIC(approvalManagerId)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checking Manager Field */}
                                <div>
                                    <label className="text-sm font-semibold text-[#0F1729] block mb-2">Checking Manager ( Name ) / ( CNIC )</label>
                                    <div className="flex items-center justify-between w-full h-11 px-3 rounded-lg border border-[#E1E7EF] bg-[#F9FAFB]">
                                        <select
                                            className="bg-transparent outline-none text-sm text-[#0F1729] w-3/5 h-full cursor-pointer disabled:cursor-not-allowed"
                                            value={checkingManagerId}
                                            disabled={submitLoading}
                                            onChange={(e) => setCheckingManagerId(e.target.value)}
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map((emp) => (
                                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                                            ))}
                                        </select>
                                        <div className="flex items-center gap-4 text-sm text-[#65758B] select-none">
                                            <span>-</span>
                                            <span className="font-mono text-gray-700 min-w-[140px] text-right">{getEmployeeCNIC(checkingManagerId)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button Section */}
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full sm:w-auto px-6 py-3 bg-[#0062BD] hover:bg-[#0054A3] disabled:bg-blue-400 text-white font-semibold rounded-lg transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {submitLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {submitLoading ? "Processing Sale..." : "Submit Sale Details"}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Sidebar column */}
                <div className="lg:col-span-3 lg:sticky lg:top-6 self-start">
                    <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-[0px_3px_4px_rgba(218,218,218,0.6)] flex flex-col gap-4">
                        <h3 className="text-base font-semibold text-[#0F1729] border-b border-gray-100 pb-3">Selected Customer</h3>

                        {loading ? (
                            <div className="animate-pulse space-y-3 py-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                            </div>
                        ) : customer ? (
                            <div className="flex flex-col items-center text-center gap-3">
                                {customer.customer_photo_url ? (
                                    <img
                                        src={customer.customer_photo_url}
                                        alt={customer.full_name}
                                        className="w-20 h-20 rounded-full object-cover border-2 border-[#0062BD]"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-xl font-bold text-[#0062BD]">
                                        {customer.name?.charAt(0).toUpperCase() || customer.full_name?.charAt(0).toUpperCase() || 'C'}
                                    </div>
                                )}

                                <div>
                                    <h4 className="font-semibold text-gray-800 text-base">{customer.name || customer.full_name}</h4>
                                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0062BD] border border-blue-100 uppercase tracking-wide">
                                        {customer.status || 'Draft'}
                                    </span>
                                </div>

                                <div className="w-full h-[1px] bg-gray-100 my-1"></div>

                                <div className="w-full text-left space-y-3 text-sm">
                                    <div className="flex items-center gap-2.5 text-gray-600">
                                        <CreditCard className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span className="font-mono">{customer.cnic || 'No CNIC'}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-gray-600">
                                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span>{customer.phone || 'No Phone'}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400 text-center">No customer selected</p>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Sellproducts