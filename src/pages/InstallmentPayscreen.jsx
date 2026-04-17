import React from 'react'
import EditIcon from "@mui/icons-material/Edit";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import Preview_Image from '../assets/preview-image.png'

const InstallmentPayscreen = () => {

    const data = {
        date: "17 December, 2025",
        customerNumber: "000-001",
        customerName: "Muhammad Ali Awan",
        invoiceNumber: "001",
        approvalManager: "Ali Muhammad",
        systemCode: "2626",
        contact: "0309-6614754",
        items: [
            {
                id: "001",
                item: "Samsung S24 Ultra",
                totalAmount: "15,000",
                installmentReceive: "12500",
                totalReceived: "50000",
                remaining: "100000",
            },
        ],
        summary: {
            balanceAmt: "100000",
            remainingInst: "8",
            nextInstallment: "12500",
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
                {/* Invoice Card */}
                <div className="bg-white rounded shadow-xl overflow-hidden">
                    {/* Header / Brand */}
                    <div className="flex items-center gap-3 px-6 md:px-8 py-5 border-b border-gray-100">
                        <img src={Preview_Image} alt="Preview_Image" className="h-11 w-full" />
                    </div>

                    {/* Info + Photos */}
                    <div className="flex flex-col md:flex-row justify-between gap-6 px-6 md:px-8 py-5">

                        {/* Left: Info Fields */}
                        <div className="flex-1 flex flex-col gap-3">
                            {/* Date + Customer Number */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-2 border-b border-dashed border-gray-200 pb-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-base text-[#65758B] font-medium w-20 shrink-0">Date :</span>
                                    <span className="text-base font-semibold text-[#0F1729]">{data.date}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-base text-[#65758B] font-medium shrink-0">Customer Number :</span>
                                    <span className="text-base font-semibold text-[#0F1729]">{data.customerNumber}</span>
                                </div>
                            </div>

                            {/* Customer Name */}
                            <div className="flex items-baseline gap-2 border-b border-dashed border-gray-200 pb-2">
                                <span className="text-base text-[#65758B] font-medium w-32 shrink-0">Customer Name :</span>
                                <span className="text-base font-semibold text-[#0F1729]">{data.customerName}</span>
                            </div>

                            {/* Invoice Number */}
                            <div className="flex items-baseline gap-2 border-b border-dashed border-gray-200 pb-2">
                                <span className="text-base text-[#65758B] font-medium w-32 shrink-0">Invoice Number :</span>
                                <span className="text-base font-semibold text-[#0F1729]">{data.invoiceNumber}</span>
                            </div>

                            {/* Approval Manager + Sign */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-2 border-b border-dashed border-gray-200 pb-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-base text-[#65758B] font-medium shrink-0">Approval Manager :</span>
                                    <span className="text-base font-semibold text-[#0F1729]">{data.approvalManager}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-base text-[#65758B] font-medium shrink-0">Sign :</span>
                                    <span className="inline-block w-24 border-b border-gray-300">&nbsp;</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Photos */}
                        <div className="flex flex-row md:flex-row gap-4 justify-center md:justify-end shrink-0">
                            {/* Customer Photo */}
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded border-2 border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                                    <PersonOutlineIcon style={{ fontSize: 40, color: '#ccc' }} />
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium">Customer Photo</span>
                            </div>
                            {/* Check Person Photo */}
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded border-2 border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                                    <PersonOutlineIcon style={{ fontSize: 40, color: '#ccc' }} />
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium">Check Person Photo</span>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="px-6 md:px-8 pb-5 overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded overflow-hidden text-sm" style={{ minWidth: 520 }}>
                            <thead>
                                <tr className="bg-gray-50">
                                    {['#', 'Item', 'Total Amount', 'Installment Receive', 'Total Received', 'Remaining'].map((h) => (
                                        <th key={h} className="px-3 py-2 text-center text-base font-semibold text-[#65758B] border-b border-gray-200 border-r last:border-r-0">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-3 text-center text-[#65758B] font-medium border-r border-gray-100">{row.id}</td>
                                        <td className="px-3 py-3 text-center text-[#65758B] font-medium border-r border-gray-100">{row.item}</td>
                                        <td className="px-3 py-3 text-center text-[#65758B] font-medium border-r border-gray-100">{row.totalAmount}</td>
                                        <td className="px-3 py-3 text-center text-[#65758B] font-medium border-r border-gray-100">{row.installmentReceive}</td>
                                        <td className="px-3 py-3 text-center text-[#65758B] font-medium border-r border-gray-100">{row.totalReceived}</td>
                                        <td className="px-3 py-3 text-center text-[#65758B] font-medium">{row.remaining}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Box */}
                    <div className="px-6 md:px-8 pb-5 flex justify-center">
                        <div className="w-full max-w-md border border-[#65758B] bg-[#FFFFFF] rounded overflow-hidden text-sm">
                            <div className="flex border-b border-[#65758B]">
                                <div className="flex-1 px-4 py-2 text-base font-medium text-[#65758B] border-r border-[#65758B]">Balance AMT</div>
                                <div className="w-28 px-4 py-2 text-base text-right font-semibold text-[#65758B]">{data.summary.balanceAmt}</div>
                            </div>
                            <div className="flex border-b border-[#65758B]">
                                <div className="flex-1 px-4 py-2 text-base font-medium text-[#65758B] border-r border-[#65758B]">Remaining INST</div>
                                <div className="w-28 px-4 py-2 text-base text-right font-semibold text-[#65758B]">{data.summary.remainingInst}</div>
                            </div>
                            <div className="flex border-b border-[#65758B]">
                                <div className="flex-1 px-4 py-2 text-base font-medium text-[#65758B] border-r border-[#65758B]">Next Installment</div>
                                <div className="w-28 px-4 py-2 text-base text-right font-semibold text-[#65758B]">{data.summary.nextInstallment}</div>
                            </div>
                            <div className="px-4 py-2 text-center text-sm text-red-500">
                                Due Date : 5th of Every Month
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                        <div>
                            <p className="text-sm  font-medium text-red-600">For Help</p>
                            <p className="text-sm  font-medium text-red-600">Contact : {data.contact}</p>
                        </div>
                        <div className="text-base text-semibold text-[#65758B] font-medium">
                            System Code : <strong className="text-[#0F1729] text-base font-semibold">{data.systemCode}</strong>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-5 flex-wrap">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-green-500 text-green-600 bg-green-50 font-semibold text-sm hover:bg-green-100 transition"
                    >
                        <LocalPrintshopOutlinedIcon fontSize="small" />
                        Print
                    </button>
                    <button
                        onClick={() => alert('Download')}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-900 text-white font-semibold text-sm hover:bg-blue-800 transition"
                    >
                        <FileDownloadOutlinedIcon fontSize="small" />
                        Download
                    </button>
                </div>

            </div>
        </div>
    )
}

export default InstallmentPayscreen