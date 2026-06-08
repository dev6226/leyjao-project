import React, { useState, useEffect } from 'react'
import api from '../api/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/product');
            setProducts(response.data.data);
        } catch (error) {
            console.log("product-data-error", error)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/product/delete/${productId}`);
                fetchProducts(); // Refresh the product list
            } catch (error) {
                console.log("product-delete-error", error);
            }
        }
    };

    return (
        <div className="p-4 md:p-2">
            <div>
                <div className="w-full bg-[#FFFFFF] border border-[#E1E7EF] rounded-lg overflow-hidden overflow-x-auto">
                    <div className="min-w-[1100px]">

                        {/* Header */}
                        <div
                            className="text-base font-semibold px-4 py-3 border-b bg-[#F9FAFB] text-[#65758B]"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "60px 1.5fr 1fr 1fr 1fr 0.8fr 1fr 1fr 1.5fr 1.2fr"
                            }}
                        >
                            <div>Image</div>
                            <div>Name</div>
                            <div>Brand</div>
                            <div>Category</div>
                            <div>Model</div>
                            <div>Qty</div>
                            <div>Purchase</div>
                            <div>Sale</div>
                            <div>Serials</div>
                            <div className="text-center">Actions</div>
                        </div>

                        {/* Rows */}
                        <div className="flex flex-col gap-3 mt-3 mb-3">
                            {products.length === 0 ? (
                                <div className="text-center py-6 text-gray-400">
                                    No Data Found
                                </div>
                            ) : (
                                products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="items-center bg-white border border-gray-200 rounded-xl mx-4 px-4 py-4 shadow-sm hover:shadow-md transition text-[#4C4E53] text-sm font-medium"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "60px 1.5fr 1fr 1fr 1fr 0.8fr 1fr 1fr 1.5fr 1.2fr",
                                            alignItems: "center"
                                        }}
                                    >
                                        {/* Image */}
                                        <div>
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                        </div>

                                        {/* Name + SKU + Barcode */}
                                        <div>
                                            <p className="font-semibold text-gray-800">{product.name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">SKU: {product.sku_code || '—'}</p>
                                            <p className="text-xs text-gray-400">Barcode: {product.barcode || '—'}</p>
                                        </div>

                                        {/* Brand */}
                                        <div className="text-gray-700">
                                            {product.brand?.name || '—'}
                                        </div>

                                        {/* Category */}
                                        <div className="text-gray-700">
                                            {product.category?.name || '—'}
                                        </div>

                                        {/* Model */}
                                        <div className="text-gray-700">
                                            {product.product_model?.name || '—'}
                                        </div>

                                        {/* Quantity */}
                                        <div>
                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                                                {product.quantity}
                                            </span>
                                        </div>

                                        {/* Purchase Price */}
                                        <div className="text-gray-700">
                                            Rs. {parseFloat(product.purchase_price).toLocaleString()}
                                        </div>

                                        {/* Sale Price */}
                                        <div className="text-gray-700">
                                            Rs. {parseFloat(product.sale_price).toLocaleString()}
                                        </div>

                                        {/* Serial Numbers */}
                                        <div className="flex flex-col gap-1">
                                            {product.serial_numbers?.length > 0 ? (
                                                product.serial_numbers.map((sn) => (
                                                    <span
                                                        key={sn.id}
                                                        className="px-2 py-0.5 bg-[#E8F1FB] w-fit text-[#0062BD] rounded-md text-xs"
                                                    >
                                                        {sn.series?.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-xs">—</span>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-center gap-2">
                                            <button className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition cursor-pointer">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(product.id)} className="px-4 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer">
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList