import React, { useState, useEffect } from "react";
import axios from "axios";
const BrandList = () => {
    const [brands, setBrands] = useState([]);
    // updated-state
    const [isModel, setIsModel] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);


    // fetch brands from api
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const token = sessionStorage.getItem("token");
                console.log("token", token)
                const res = await axios.get("https://stage.leyjao.pk/api/brand?per_page=-1", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setBrands(res.data.data);
                console.log("response", res.data);
            } catch (error) {
                console.log("Error", error)
            }
        }
        fetchBrands();
    }, [])

    // ✅ Open Modal
    const handleEditClick = (brand) => {
        setSelectedBrand(brand);
        setName(brand.name);
        setFile(null);
        setIsModel(true);
    };

    // edit functionality with api call

    const hadleUpdate = async () => {
        try {
            const token = sessionStorage.getItem("token");
            console.log("token", token)
            const formdata = new FormData();
            formdata.append("name", name);
            if (file) {
                formdata.append("image", file);
            }
            const res = await axios.post(`https://stage.leyjao.pk/api/brand/update/${selectedBrand.id}`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("my updated-response", res.data.data);
            // updateUI without pagereload
            const updatedBrands = brands.map((brand) =>
                brand.id === selectedBrand.id
                    ? {
                        ...brand,
                        name: name,
                        image_url: file ? res.data.data.image_url : brand.image_url
                    }
                    : brand
            );
            setBrands(updatedBrands);
            setIsModel(false);
            window.location.reload();


        } catch (error) {
            console.log("update ka error hai ", error.response);
            console.log("update ka error hai data ka ", error.response?.data);
        }
    }

    // del-functionality
    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token");
        console.log("token", token)
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        try {
            const res = await axios.delete(`https://stage.leyjao.pk/api/brand/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBrands((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {

        }
    }

    return (
        <div className="p-4 md:p-2">
            <div className="">
                <div className="w-full bg-[#FFFFFF] border border-[#E1E7EF] rounded-lg overflow-hidden overflow-x-auto">
                    <div className="min-w-[700px]">
                        {/* Header */}
                        <div
                            className="text-base font-semibold px-4 py-3 border-b bg-[#F9FAFB] text-[#65758B]"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "2fr 1fr 1fr"
                            }}
                        >
                            <div>Name</div>
                            <div>Image</div>
                            <div className="text-center">Actions</div>
                        </div>

                        {/* Rows */}
                        <div className="flex flex-col gap-3 mt-3 mb-3">

                            {brands.length === 0 ? (
                                <div className="text-center py-6 text-gray-400">
                                    No Data Found
                                </div>
                            ) : (
                                brands.map((brand) => (
                                    <div
                                        key={brand.id}
                                        className="items-center bg-white border border-gray-200 rounded-xl mx-4 px-4 py-4 shadow-sm hover:shadow-md transition text-[#4C4E53] text-sm font-medium"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "2fr 1fr 1fr"
                                        }}
                                    >

                                        {/* Name */}
                                        <div className="font-semibold text-gray-800">
                                            {brand.name}
                                        </div>

                                        {/* Image */}
                                        <div>
                                            <img
                                                src={brand.image_url}
                                                alt={brand.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEditClick(brand)}
                                                className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(brand.id)}
                                                className="px-4 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
                {/* model */}
                {isModel && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
                        <div className="bg-white p-6 rounded-xl w-[400px]">

                            <h2 className="text-lg font-semibold mb-4">
                                Edit Brand
                            </h2>

                            {/* Name */}
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border p-2 rounded mb-3"
                            />

                            {/* Image */}
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="mb-4"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setIsModel(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={hadleUpdate}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandList;