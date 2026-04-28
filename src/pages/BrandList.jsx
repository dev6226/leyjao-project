import React, { useState, useEffect } from "react";
import axios from "axios";
import { data } from "react-router-dom";
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
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log("my updated-response", res.data);
            // updateUI without pagereload
            const updatedBrands = brands.map((brand) =>
                brand.id === selectedBrand.id
                    ? {
                        ...brand,
                        name: name,
                        image_url: res.data.data.image_url,
                    }
                    : brand
            );
            setBrands(updatedBrands);
            setIsModel(false);


        } catch (error) {
            console.log("update ka error hai ", error.response);
            console.log("update ka error hai data ka ", error.response?.data);
        }
    }

    return (
        <div className="p-4 md:p-6">
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="w-full text-left">
                    {/* Table Head */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {brands.map((brand) => (
                            <tr key={brand.id} className="border-t">

                                <td className="p-4">{brand.name}</td>

                                <td className="p-4">
                                    <img
                                        src={brand.image_url}
                                        alt={brand.name}
                                        className="w-12 h-12 rounded"
                                    />
                                </td>

                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => handleEditClick(brand)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded"
                                    >
                                        Edit
                                    </button>

                                    <button className="px-3 py-1 bg-red-500 text-white rounded">
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* model */}
                {isModel && (
                    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/30">
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