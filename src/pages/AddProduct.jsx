import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { X } from 'lucide-react'

const AddProduct = () => {
    const [productName, setProductName] = useState('')
    const [selectedModel, setSelectedModel] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [skuCode, setSkuCode] = useState('')
    const [barcode, setBarcode] = useState('')
    const [stockQuantity, setStockQuantity] = useState('')
    const [purchasePrice, setPurchasePrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [description, setDescription] = useState('')
    const [productImage, setProductImage] = useState(null)

    const [models, setModels] = useState([])
    const [category, setCategory] = useState([])
    const [brands, setBrands] = useState([])
    const [serialNumber, setSerialNumber] = useState([])
    const [selectedSerials, setSelectedSerials] = useState([])

    const creatProduct = async () => {
        const formData = new FormData()
        formData.append("name", productName)
        formData.append("product_model_id", selectedModel)
        formData.append("category_id", selectedCategory)
        formData.append("brand_id", selectedBrand)
        formData.append("sku_code", skuCode)
        formData.append("barcode", barcode)
        formData.append("quantity", stockQuantity)
        formData.append("purchase_price", purchasePrice)
        formData.append("sale_price", salePrice)
        formData.append("description", description)

        // Send selected serial IDs as array
        selectedSerials.forEach((serial, index) => {
            formData.append(`serials[${index}][series_id]`, serial.id)  // ✅ was "serials[]"
        })

        if (productImage) {
            formData.append("image", productImage)
        }

        try {
            const res = await api.post(`/product/store`, formData)
            console.log('res =>', res)
            setProductName('')
            setSelectedModel('')
            setSelectedCategory('')
            setSelectedBrand('')
            setSkuCode('')
            setBarcode('')
            setStockQuantity('')
            setPurchasePrice('')
            setSalePrice('')
            setDescription('')
            setProductImage(null)
            setSelectedSerials([])

        } catch (error) {
            console.log("Validation errors:", error.response?.data)
        }
    }

    useEffect(() => {
        fetchModels()
        fetchBrands()
        fetchCategories()
        fetchSerial()
    }, [])

    const fetchModels = async () => {
        const response = await api.get("/product-model")
        setModels(response.data.data)
    }

    const fetchBrands = async () => {
        const response = await api.get("/brand")
        setBrands(response.data.data)
    }

    const fetchCategories = async () => {
        const response = await api.get("/category")
        setCategory(response.data.data)
    }

    const fetchSerial = async () => {
        const response = await api.get("/series")
        setSerialNumber(response.data.data)
    }

    const handleSelectSerial = (e) => {
        const selectedId = e.target.value
        if (!selectedId) return

        const selectedItem = serialNumber.find(
            (item) => item.id.toString() === selectedId
        )

        const alreadyExist = selectedSerials.some(
            (item) => item.id === selectedItem.id
        )

        if (!alreadyExist) {
            setSelectedSerials([...selectedSerials, selectedItem])
        }

        // Reset select back to placeholder
        e.target.value = ""
    }

    const removeSerial = (id) => {
        setSelectedSerials(selectedSerials.filter((item) => item.id !== id))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) setProductImage(file)
    }

    return (
        <div>
            {/* Header */}
            <div>
                <h2 className='text-primary text-xl font-semibold'>Add Products</h2>
                <p className='text-secondary text-base mt-1'>Add new products to inventory</p>
            </div>

            {/* grid-cols */}
            <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>
                <div className='lg:col-span-12 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
                    <div className='p-4 sm:p-6'>
                        {/* Header */}
                        <div className='flex items-center gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                                <rect width="39" height="39" rx="12" fill="#CAE6FF" />
                                <path d="M26.5 28.25C26.7652 28.25 27.0196 28.1446 27.2071 27.9571C27.3946 27.7696 27.5 27.5152 27.5 27.25V26.004C27.504 23.198 23.526 21 19.5 21C15.474 21 11.5 23.198 11.5 26.004V27.25C11.5 27.5152 11.6054 27.7696 11.7929 27.9571C11.9804 28.1446 12.2348 28.25 12.5 28.25H26.5ZM23.104 14.354C23.104 14.8273 23.0108 15.2959 22.8297 15.7332C22.6485 16.1704 22.3831 16.5678 22.0484 16.9024C21.7138 17.2371 21.3164 17.5025 20.8792 17.6837C20.4419 17.8648 19.9733 17.958 19.5 17.958C19.0267 17.958 18.5581 17.8648 18.1208 17.6837C17.6836 17.5025 17.2862 17.2371 16.9516 16.9024C16.6169 16.5678 16.3515 16.1704 16.1703 15.7332C15.9892 15.2959 15.896 14.8273 15.896 14.354C15.896 13.3982 16.2757 12.4815 16.9516 11.8056C17.6275 11.1297 18.5442 10.75 19.5 10.75C20.4558 10.75 21.3725 11.1297 22.0484 11.8056C22.7243 12.4815 23.104 13.3982 23.104 14.354Z" stroke="#0062BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className='text-primary text-base sm:text-lg font-semibold'>Product Information</p>
                        </div>

                        <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

                        {/* Form Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Product Name</label>
                                <input
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    type='text'
                                    placeholder='Enter product name'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                />
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Model Number</label>
                                <select
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                >
                                    <option value="">Select</option>
                                    {models.map((model) => (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                >
                                    <option value="">Select</option>
                                    {category.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Brand</label>
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                >
                                    <option value="">Select</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>SKU Code</label>
                                <input
                                    value={skuCode}
                                    onChange={(e) => setSkuCode(e.target.value)}
                                    type='text'
                                    placeholder='Enter SKU code'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                />
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Barcode</label>
                                <input
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                    type='text'
                                    placeholder='Enter barcode'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                />
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Serial Number</label>
                                <select
                                    onChange={handleSelectSerial}
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                >
                                    <option value="">Select Serial</option>
                                    {serialNumber.map((serial) => (
                                        <option key={serial.id} value={serial.id}>{serial.name}</option>
                                    ))}
                                </select>

                                <div className='flex flex-wrap gap-2 mt-3'>
                                    {selectedSerials.map((item) => (
                                        <div
                                            key={item.id}
                                            className='flex items-center gap-2 px-3 py-2 bg-[#E8F1FB] text-[#0062BD] rounded-lg'
                                        >
                                            <span>{item.name}</span>
                                            <button
                                                type='button'
                                                onClick={() => removeSerial(item.id)}
                                                className='hover:text-red-500 cursor-pointer'
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Stock Quantity</label>
                                <input
                                    value={stockQuantity}
                                    onChange={(e) => setStockQuantity(e.target.value)}
                                    type='text'
                                    placeholder='Enter stock quantity'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                />
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Purchase Price</label>
                                <input
                                    value={purchasePrice}
                                    onChange={(e) => setPurchasePrice(e.target.value)}
                                    type='text'
                                    placeholder='Enter purchase price'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                />
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Sale Price</label>
                                <input
                                    value={salePrice}
                                    onChange={(e) => setSalePrice(e.target.value)}
                                    type='text'
                                    placeholder='Enter sale price'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                />
                            </div>

                            <div className='md:col-span-2'>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Product Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='Enter description'
                                    className='mt-2 w-full h-24 px-3 py-2 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                                />
                            </div>
                        </div>

                        <div className='h-[1px] bg-[#E1E7EF] mt-10 mb-6'></div>

                        {/* Upload Section */}
                        <div className='md:col-span-2'>
                            <label className='text-sm sm:text-base font-semibold text-primary'>Product Image</label>
                            <p className='text-secondary text-xs sm:text-sm mt-1'>
                                Upload product image (JPG, PNG, SVG - Max size 2MB)
                            </p>

                            <div className="mt-3 w-full">
                                <div className="w-full min-h-[180px] sm:min-h-[220px] md:min-h-[253px] bg-[#FCFDFE] border-2 border-dashed border-[#E1E7EF] rounded-lg flex flex-col items-center justify-center cursor-pointer px-4 py-6 text-center relative overflow-hidden">
                                    {/* Image Preview */}
                                    {productImage && (
                                        <img
                                            src={URL.createObjectURL(productImage)}
                                            alt="Preview"
                                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                        />
                                    )}

                                    <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-full">
                                        <p className="text-secondary text-xs sm:text-sm">Drag & drop your image here</p>
                                        <p className="text-secondary text-xs sm:text-sm">or</p>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\\s]/g, '') }} className="hidden"
                                            id="upload-logo"
                                            onChange={handleImageChange}
                                        />

                                        <label
                                            htmlFor="upload-logo"
                                            className="w-full max-w-[135px] h-9 bg-[#0062BD] text-white rounded-lg flex items-center justify-center text-sm cursor-pointer"
                                        >
                                            Upload Image
                                        </label>

                                        {productImage && (
                                            <p className="text-xs text-[#0062BD] mt-1">{productImage.name}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 sm:gap-4 mt-3 w-full'>
                <button className='bg-[#FFFFFF] h-11 w-full sm:w-[100px] shadow-[0px_6px_12.52px_0px_rgba(208,210,218,0.7)] rounded-xl text-[#313B54] font-medium border border-[#ECEFF5] cursor-pointer'>
                    Cancel
                </button>
                <button
                    onClick={creatProduct}
                    className='bg-[#2196F3] h-11 w-full sm:w-[168px] rounded-xl text-white font-medium capitalize cursor-pointer'
                >
                    Add Product
                </button>
            </div>
        </div>
    )
}

export default AddProduct