
import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'
import toast from 'react-hot-toast'
import { User, Phone, CreditCard, ChevronLeft } from 'lucide-react'

const Sellproducts = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [customer, setCustomer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("")
    const [products, setProducts] = useState([])
    const [series, setSeries] = useState([])
    const [models, setModels] = useState([])
    const [brands, setBrands] = useState([])
    const [selectedProduct, setSelectedProduct] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [selectedSeries, setSelectedSeries] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("");

    // ── New State for Actual Selling Price ──
    const [actualSellingPrice, setActualSellingPrice] = useState("");

    // ── Webcam & Upload States ──
    const [productImage, setProductImage] = useState(null)
    const [productImageFile, setProductImageFile] = useState(null)
    const [cameraActive, setCameraActive] = useState(false)
    const [facingMode, setFacingMode] = useState("environment")

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

    // Capture photo from video
    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas")
            canvas.width = videoRef.current.videoWidth || 640
            canvas.height = videoRef.current.videoHeight || 480
            const ctx = canvas.getContext("2d")
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], "captured_proof.jpg", { type: "image/jpeg" })
                    setProductImageFile(file)
                    setProductImage(URL.createObjectURL(blob))
                    stopCamera()
                    toast.success("Photo captured successfully!")
                }
            }, "image/jpeg", 0.95)
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
            setProductImageFile(file)
            setProductImage(URL.createObjectURL(file))
            toast.success("Image uploaded successfully!")
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
            console.log(res.data.data)
            setBrands(res.data.data)
        } catch (error) {
            console.error("Error fetching brands:", error)
        }
    }
    useEffect(() => {
        fetchBrands()
    }, [])

    // ── Handle Product Selection Change ──
    const handleProductChange = (e) => {
        const productId = e.target.value;
        setSelectedProduct(productId);

        if (productId) {
            // Find the object details matching the selected dropdown ID
            const foundProduct = products.find((p) => p.id === Number(productId) || p.id === productId);
            if (foundProduct) {
                // Assign the price mapped inside your ProductList response state
                setActualSellingPrice(foundProduct.sale_price || "");
            } else {
                setActualSellingPrice("");
            }
        } else {
            setActualSellingPrice("");
        }
    };

    const inputClass =
        "w-full h-11 px-3 rounded-lg border border-[#E1E7EF] bg-[#F9FAFB] outline-none placeholder:text-[#65758B] placeholder:text-sm"

    const labelClass =
        "text-sm sm:text-base font-semibold text-[#0F1729]"

    return (
        <div className="p-1 md:p-3">
            {/* Header / Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <button
                    onClick={() => navigate('/all-Customer')}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition font-medium"
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
                                    onChange={handleProductChange} // Changed from inline setter to our handler logic
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
                                <select className={inputClass}>
                                    <option value="">Select</option>
                                    <option value="advance">12 Months</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Type</label>
                                <select
                                    className={inputClass}
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="first">First Installment</option>
                                    <option value="advance">Advance</option>
                                </select>
                            </div>

                            {type && (
                                <div>
                                    <label className={labelClass}>
                                        {type === "first" ? "First Installment" : "Advance Amount"}
                                    </label>
                                    <input type='text' placeholder='0000000' className={inputClass} />
                                </div>
                            )}

                            <div>
                                <label className={labelClass}>Markup</label>
                                <input type='text' placeholder='0000000' className={inputClass} />
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
                                <input type='text' placeholder='0000000' className={inputClass} />
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
                                                onClick={capturePhoto}
                                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-md transition"
                                            >
                                                Capture Photo
                                            </button>
                                            <button
                                                onClick={toggleCamera}
                                                className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-md transition"
                                            >
                                                Switch Camera
                                            </button>
                                            <button
                                                onClick={stopCamera}
                                                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-md transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : productImage ? (
                                    <div className="relative group w-48 h-36 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                        <img
                                            src={productImage}
                                            alt="Product proof preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <button
                                                onClick={() => {
                                                    setProductImage(null)
                                                    setProductImageFile(null)
                                                }}
                                                className="px-3 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded hover:bg-rose-700 transition"
                                            >
                                                Remove Photo
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-48 h-36 border-2 border-dashed border-[#CBD5E1] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#0062BD] transition-all bg-[#FFFFFF]"
                                    >
                                        <span className="text-xs text-gray-400">No Image Uploaded</span>
                                        <span className="text-[10px] text-gray-400 mt-1 font-medium">Click to select file</span>
                                    </div>
                                )}

                                {!cameraActive && (
                                    <div className="flex flex-wrap items-center justify-center gap-3">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-4 py-2 border border-[#E1E7EF] bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold rounded-lg transition shadow-sm cursor-pointer"
                                        >
                                            Upload from Device
                                        </button>
                                        <button
                                            onClick={startCamera}
                                            className="px-4 py-2 bg-[#0062BD] hover:bg-[#0054A3] text-white text-xs sm:text-sm font-semibold rounded-lg transition shadow-sm cursor-pointer"
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
                                />
                            </div>
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
        </div >
    )
}

export default Sellproducts
