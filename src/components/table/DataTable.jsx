import React from "react";

export default function DataTable({ rows = [], columns = [], button }) {

    let finalRows = [];

    // SMART CHECK: Array dhoondne ki logic
    if (Array.isArray(rows)) {
        finalRows = rows;
    } else if (rows) {
        // 1. Agar direct response object ke andar 'installments' array ho
        if (Array.isArray(rows.installments)) {
            finalRows = rows.installments;
        }
        // 2. Agar response.data ke andar 'installments' array ho
        else if (rows.data && Array.isArray(rows.data.installments)) {
            finalRows = rows.data.installments;
        }
        // 3. Purani backup logic agar simple data array ho
        else if (Array.isArray(rows.data)) {
            finalRows = rows.data;
        }
    }

    // Dono header aur rows ko ek jaisa align rakhne ke liye common style
    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        alignItems: "center",
    };

    return (
        <div className="w-full mt-6 bg-white border border-[#E1E7EF] rounded-lg overflow-hidden">
            <div className="w-full overflow-x-auto">
                <div className="min-w-[900px]">

                    {/* Header */}
                    <div
                        className="text-base font-semibold px-8 py-4 border-b bg-[#F9FAFB] text-[#65758B]"
                        style={gridStyle}
                    >
                        {columns.map((column) => (
                            <div key={column.key} className="uppercase tracking-wider text-xs">
                                {column.label}
                            </div>
                        ))}
                    </div>

                    {/* Rows Body */}
                    <div className="flex flex-col gap-3 p-4">
                        {finalRows.length === 0 ? (
                            <div className="text-center py-10 bg-[#F9FAFB] rounded-xl border border-dashed border-gray-300 text-gray-400">
                                No Data Found
                            </div>
                        ) : (
                            finalRows.map((row, index) => (
                                <div
                                    key={row.id || index}
                                    className="bg-white border border-gray-100 rounded-xl px-4 py-5 shadow-sm hover:shadow-md transition-all duration-200 text-[#4C4E53] text-sm font-medium"
                                    style={gridStyle}
                                >
                                    {columns.map((column) => (
                                        <div key={column.key} className="px-2 truncate">
                                            {column.render
                                                ? column.render(row)
                                                : (row[column.key] ?? "-")
                                            }
                                        </div>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}