import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Categorylist = () => {
    const [categories, setCategories] = useState([]);
    const [isModel, setIsModel] = useState(null);
    const [name, setName] = useState("");
    const [selectedcategory, setSelectedCategory] = useState(null);

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

    // for-model
    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setName(category.name);
        setIsModel(true);
    };

    // handle-edit-functionality
    const handleUpdate = async () => {
        const token = sessionStorage.getItem("token");
        console.log("token", token)
        const formdata = new FormData();
        formdata.append("name", name);
        try {
            const res = await axios.post(`https://stage.leyjao.pk/api/category/update/${selectedcategory.id}`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("my updated-response", res.data.data);
            // updateUI without pagereload
            const updatedCategories = categories.map((category) =>
                category.id === selectedcategory.id
                    ? {
                        ...category,
                        name: name,
                    }
                    : category
            );
            setCategories(updatedCategories);
            setIsModel(false);
        } catch (error) {
            console.log("update ka error hai ", error.response);
            console.log("update ka error hai data ka ", error.response?.data);
        }
    }

    return (
        <div>
            <div className="p-4 md:p-6">
                <div>
                    <div className="w-full bg-[#FFFFFF] border border-[#E1E7EF] rounded-lg overflow-hidden overflow-x-auto">
                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[600px]">
                                {/* Header */}
                                <div
                                    className="text-base font-semibold px-4 py-3 border-b bg-[#F9FAFB] text-[#65758B]"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "2fr 1fr"
                                    }}
                                >
                                    <div>Name</div>
                                    <div className="text-center">Actions</div>
                                </div>

                                {/* Rows */}
                                <div className="flex flex-col gap-3 mt-3 mb-3">

                                    {categories.length === 0 ? (
                                        <div className="text-center py-6 text-gray-400">
                                            No Data Found
                                        </div>
                                    ) : (
                                        categories.map((category) => (
                                            <div
                                                key={category.id}
                                                className="items-center bg-white border border-gray-200 rounded-xl mx-4 px-4 py-4 shadow-sm hover:shadow-md transition text-[#4C4E53] text-sm font-medium"
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "2fr 1fr"
                                                }}
                                            >

                                                {/* Name */}
                                                <div className="font-semibold text-gray-800 text-base">
                                                    {category.name}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(category)}
                                                        className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDeleteCat(category.id)}
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

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setIsModel(false)}
                                        className="px-4 py-2 bg-gray-300 rounded"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleUpdate}
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
        </div>
    )
}

export default Categorylist