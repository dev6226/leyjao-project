import React from "react";
import { useParams } from "react-router-dom";

const data = [
    {
        sr: "001",
        date: "05/09/2026",
        invoice: "000-000-1",
        preBal: 150000,
        install: 12500,
        balance: 137500,
        officer: "Arfan Ali",
        remarks: "ABC",
    },
    {
        sr: "002",
        date: "05/10/2026",
        invoice: "000-000-2",
        preBal: 137500,
        install: 12500,
        balance: 125000,
        officer: "Arfan Ali",
        remarks: "ABC",
    },
    {
        sr: "003",
        date: "05/10/2026",
        invoice: "000-000-2",
        preBal: 137500,
        install: 12500,
        balance: 125000,
        officer: "Arfan Ali",
        remarks: "ABC",
    },
    {
        sr: "004",
        date: "05/10/2026",
        invoice: "000-000-2",
        preBal: 137500,
        install: 12500,
        balance: 125000,
        officer: "Arfan Ali",
        remarks: "ABC",
    },
];

const PaymentTable = () => {
    const { id } = useParams();

    return (
        <>
            {/* Header */}
            <div>
                <h2 className="text-primary text-xl font-semibold">
                    Customer View
                </h2>
                <p className="text-secondary text-base mt-1">
                    Customer id : {id}
                </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mt-3 mb-4">
                <h2 className="text-lg font-semibold mb-4 text-primary">
                    Payment Progress
                </h2>

                {/* Progress */}
                <div className="w-full bg-[#F3F5F7] rounded-full h-4">
                    <div className="bg-[#0062BD] h-4 rounded-full w-[33%]"></div>
                </div>

                <div className="flex justify-between text-base text-secondary mt-2">
                    <span>Paid : PKR 50,000</span>
                    <span>Remaining : PKR 100000</span>
                </div>

                {/* TABLE */}
                <div className="mt-6 w-full overflow-x-auto">
                    <table className="min-w-[1000px] w-full bg-[#FFFFFF] text-sm border border-gray-200 rounded-lg">

                        {/* Head */}
                        <thead className="bg-[#F9FAFB] text-[#65758B] text-base font-semibold text-left">
                            <tr>
                                <th className="px-4 py-3">Sr#</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Invoice #</th>
                                <th className="px-4 py-3">Pre-Bal</th>
                                <th className="px-4 py-3">Install.</th>
                                <th className="px-4 py-3">Balance</th>
                                <th className="px-4 py-3">Recovery Officer</th>
                                <th className="px-4 py-3">Remarks</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="border-t border-[#E1E7EF] border-1 hover:bg-gray-50 tetx-sm text-[#4C4E53] font-medium">

                                    <td className="px-4 py-3">{row.sr}</td>
                                    <td className="px-4 py-3">{row.date}</td>
                                    <td className="px-4 py-3">{row.invoice}</td>
                                    <td className="px-4 py-3">{row.preBal}</td>
                                    <td className="px-4 py-3">{row.install}</td>
                                    <td className="px-4 py-3">{row.balance}</td>
                                    <td className="px-4 py-3">{row.officer}</td>
                                    <td className="px-4 py-3">{row.remarks}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentTable;