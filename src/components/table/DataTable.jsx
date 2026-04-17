import React from "react";

export default function DataTable({ rows = [], columns = [] }) {
    return (
        <div className="w-full mt-6 bg-[#FFFFFF] border border-[#E1E7EF] rounded-lg overflow-hidden">
            <div className="w-full overflow-x-auto">
                <div className="min-w-[900px]">
                    {/* Header */}
                    <div
                        className="text-base font-semibold px-4 py-3 border-b bg-[#F9FAFB] text-[#65758B]"
                        style={{ display: 'grid', gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                    >
                        {columns.map((column) => (
                            <div key={column.key}>{column.label}</div>
                        ))}
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-3 mt-3">
                        {rows.length === 0 ? (
                            <div className="text-center py-6 text-gray-400">
                                No Data Found
                            </div>
                        ) : (
                            rows.map((row) => (
                                <div
                                    key={row.id}
                                    className="items-center bg-white border border-gray-200 rounded-xl mx-4 px-4 py-4 shadow-sm hover:shadow-md transition text-[#4C4E53] text-sm font-medium mb-4"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: `repeat(${columns.length}, 1fr)`
                                    }}
                                >
                                    {columns.map((column) => (
                                        <div key={column.key}>
                                            {column.render
                                                ? column.render(row)   // ✅ dynamic render
                                                : row[column.key] ?? "-"}
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