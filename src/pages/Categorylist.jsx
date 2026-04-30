import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Categorylist = () => {
    const [categories, setCategories] = useState([]);
    // fetch-category-list-api
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        console.log("token", token)
        const fetchCategoryList = async () => {
            try {
                const res = await axios.get("https://stage.leyjao.pk/api/category?per_page=-1", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log('category-list-api-data', res.data)
                setCategories(res.data.data);
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchCategoryList();
    }, [])

    // handle-delete-category
    const handleDeleteCat = async (id) => {
        console.log("Delete ID:", id)
        const token = sessionStorage.getItem("token");
        console.log("token", token)
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`https://stage.leyjao.pk/api/category/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategories((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.log("delete error", error);
        }
    }
    return (
        <div>
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
                            {categories.map((category) => (
                                <tr key={category.id} className="border-t">
                                    {
                                        console.log("category-id", category.id)
                                    }

                                    <td className="p-4">
                                        {category.name}
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                            Edit
                                        </button>

                                        <button onClick={() => handleDeleteCat(categories.id)} className="px-3 py-1 bg-red-500 text-white rounded">
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* model */}

                </div>
            </div>
        </div>
    )
}

export default Categorylist