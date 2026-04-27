import React, { useState, useEffect } from "react";
import axios from "axios";
const BrandList = () => {
    const [brands, setBrands] = useState([]);

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
                            <tr key={brand.id} className="border-t hover:bg-gray-50">

                                {/* Name */}
                                <td className="p-4 text-sm font-medium text-gray-800">
                                    {brand.name}
                                </td>

                                {/* Image */}
                                <td className="p-4">
                                    <img
                                        src={brand.image_url}
                                        alt={brand.name}
                                        className="w-12 h-12 object-cover rounded-lg border"
                                    />
                                </td>

                                {/* Actions */}
                                <td className="p-4 flex gap-2">
                                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default BrandList;