import React from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Table() {
    const rows = [
        {
            id: 1,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Umar",
            phone: "03024425829",
            cnic: "35201-4108698-5",
            status: "Draft",
        },
        {
            id: 2,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Danish Ali",
            phone: "03024425829",
            cnic: "35201-4108698-5",
            status: "Draft",
        },
        {
            id: 3,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Muhammad Bilal",
            phone: "03024425829",
            cnic: "35201-4108698-5",
            status: "Draft",
        },
        {
            id: 4,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Lassan Adrak",
            phone: "03024425829",
            cnic: "35201-4108698-5",
            status: "Draft",
        },
        {
            id: 5,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Lassan Adrak",
            phone: "03024425829",
            cnic: "35201-4108698-5",
            status: "Draft",
        },
        {
            id: 6,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Lassan Adrak",
            phone: "03024425829",
            cnic: "35201-4108698-5",
            status: "Draft",
        },
        {
            id: 7,
            date: "10 Dec, 2025",
            cn: "000-001",
            name: "Lassan Adrak",
            phone: "03024425829",
            cnic: "35201-4108698-5",
            status: "Draft",
        },
    ];


    const navigate = useNavigate();

    const handleNavigate = (row) => {
        navigate(`/view-Customer/${row.id}`);
    }

    return (
        <div className="w-full mt-6 bg-[#FFFFFF] border border-[#E1E7EF] rounded-lg overflow-hidden">

            {/* 👇 SCROLL WRAPPER */}
            <div className="w-full overflow-x-auto">

                {/* 👇 MIN WIDTH FOR SCROLL */}
                <div className="min-w-[900px]">

                    {/* Header */}
                    <div className="grid grid-cols-8 text-base font-semibold px-4 py-3 border-b bg-[#F9FAFB] text-[#65758B]">
                        <div>Date</div>
                        <div>CN #</div>
                        <div>Name</div>
                        <div>Phone</div>
                        <div>CNIC</div>
                        <div>Status</div>
                        <div>Edit</div>
                        <div>Action</div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-3 mt-3">
                        {rows.map((row) => (
                            <div
                                key={row.id}
                                className="grid grid-cols-8 items-center bg-white border border-gray-200 rounded-xl mx-4 px-4 py-4 shadow-sm hover:shadow-md transition text-[#4C4E53] text-sm font-medium mb-4"
                            >
                                <div>{row.date}</div>
                                <div>{row.cn}</div>
                                <div className="font-medium">{row.name}</div>
                                <div>{row.phone}</div>
                                <div>{row.cnic}</div>


                                <div>
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full border border-orange-400 text-orange-500 bg-orange-50">
                                        {row.status}
                                    </span>
                                </div>


                                <div>
                                    <button onClick={() => handleEdit(row)}>
                                        <EditIcon fontSize="small" />
                                    </button>
                                </div>


                                <div>
                                    <button className="cursor-pointer" onClick={() => handleNavigate(row)}>
                                        <VisibilityIcon fontSize="small" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}