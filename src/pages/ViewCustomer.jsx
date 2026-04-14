import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from '@base-ui/react/tabs';
import Printview from '../assets/preview-image.png'


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
            {/* main-container-table */}
            <div className="bg-[#FFFFFF] h-auto w-full rounded-xl mt-3">
                <div className="p-2 md:p-4">
                    {/* progress */}
                    <div className="p-2 mt-3 mb-3">
                        <h2 className="text-lg font-semibold mb-4 text-primary">
                            Payment Progress
                        </h2>

                        {/* Progress */}
                        <div className="w-full bg-[#F3F5F7] rounded-full h-4">
                            <div className="bg-[#0062BD] h-4 rounded-full w-[33%]"></div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between text-base text-secondary mt-2 gap-2">
                            <span>Paid : PKR 50,000</span>
                            <span>Remaining : PKR 100000</span>
                        </div>
                    </div>
                    {/* TABLE */}
                    <div className="mt-6 w-full overflow-x-auto ">
                        <table className="min-w-[1000px] w-full bg-[#FFFFFF] text-sm border border-gray-200 rounded-lg">

                            {/* Head */}
                            <thead className="bg-[#F9FAFB] text-[#65758B] text-base font-semibold text-left">
                                <tr>
                                    <th className="px-4 py-3">Sr#</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Invoice #</th>
                                    <th className="px-4 py-3">Pre-Bal</th>
                                    <th className="px-4 py-3">Install</th>
                                    <th className="px-4 py-3">Balance</th>
                                    <th className="px-4 py-3">Recovery Officer</th>
                                    <th className="px-4 py-3">Remarks</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index} className="border-t border-[#E1E7EF] hover:bg-gray-50 text-sm text-[#4C4E53] font-medium">

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

            </div>


            {/* ✅ Tabs Added (Base UI) */}
            <Tabs.Root className="mt-4" defaultValue="printView">

                <Tabs.List className="flex gap-2 border-b mb-4 bg-gray-100 p-1 rounded-lg w-fit">

                    <Tabs.Tab
                        value="printView"
                        className="px-4 py-2 rounded-md text-sm font-medium transition-all 
        text-gray-600 hover:bg-white hover:text-blue-600 
        data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow"
                    >
                        Overview
                    </Tabs.Tab>

                    <Tabs.Tab
                        value="projects"
                        className="px-4 py-2 rounded-md text-sm font-medium transition-all 
        text-gray-600 hover:bg-white hover:text-blue-600 
        data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow"
                    >
                        Detail View
                    </Tabs.Tab>

                </Tabs.List>

                {/* buttons */}
                <div className=" flex justify-end items-center gap-3 ">
                    <button className="flex items-center justify-center gap-x-2 bg-[#E6FAEE] rounded-xl h-11 w-28">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M14.905 4.54V3.372C14.9051 3.07055 14.8445 2.77217 14.727 2.49457C14.6095 2.21697 14.4375 1.96581 14.221 1.756L13.064 0.634C12.6442 0.227271 12.0825 -0.000108793 11.498 3.90503e-08H4.845C4.24826 3.90503e-08 3.67597 0.237053 3.25401 0.65901C2.83205 1.08097 2.595 1.65326 2.595 2.25V4.54H2.25C1.65326 4.54 1.08097 4.77705 0.65901 5.19901C0.237053 5.62097 0 6.19326 0 6.79V10.709C0 11.3057 0.237053 11.878 0.65901 12.3C1.08097 12.7219 1.65326 12.959 2.25 12.959H2.594V15.249C2.594 15.8457 2.83105 16.418 3.25301 16.84C3.46194 17.0489 3.70998 17.2147 3.98296 17.3277C4.25594 17.4408 4.54853 17.499 4.844 17.499H12.654C13.2507 17.499 13.823 17.2619 14.245 16.84C14.6669 16.418 14.904 15.8457 14.904 15.249V12.959H15.249C15.8457 12.959 16.418 12.7219 16.84 12.3C17.2619 11.878 17.499 11.3057 17.499 10.709V6.789C17.499 6.19226 17.2619 5.61997 16.84 5.19801C16.418 4.77605 15.8457 4.539 15.249 4.539L14.905 4.54ZM4.845 1.5H11.498C11.6928 1.49987 11.88 1.57555 12.02 1.711L13.177 2.833C13.2492 2.90297 13.3066 2.98675 13.3457 3.07934C13.3849 3.17194 13.4051 3.27146 13.405 3.372V4.539H4.095V2.249C4.095 2.05009 4.17402 1.85932 4.31467 1.71867C4.45532 1.57802 4.64609 1.5 4.845 1.5ZM2.594 10.694V11.458H2.25C2.05109 11.458 1.86032 11.379 1.71967 11.2383C1.57902 11.0977 1.5 10.9069 1.5 10.708V6.789C1.5 6.59009 1.57902 6.39932 1.71967 6.25867C1.86032 6.11802 2.05109 6.039 2.25 6.039H15.25C15.4489 6.039 15.6397 6.11802 15.7803 6.25867C15.921 6.39932 16 6.59009 16 6.789V10.708C16 10.9069 15.921 11.0977 15.7803 11.2383C15.6397 11.379 15.4489 11.458 15.25 11.458H14.904V10.694C14.904 10.4951 14.825 10.3043 14.6843 10.1637C14.5437 10.023 14.3529 9.944 14.154 9.944H3.344C3.14509 9.944 2.95432 10.023 2.81367 10.1637C2.67302 10.3043 2.594 10.4951 2.594 10.694ZM4.094 11.444H13.404V15.249C13.404 15.4479 13.325 15.6387 13.1843 15.7793C13.0437 15.92 12.8529 15.999 12.654 15.999H4.844C4.64509 15.999 4.45432 15.92 4.31367 15.7793C4.17302 15.6387 4.094 15.4479 4.094 15.249V11.444Z" fill="#00C950" />
                        </svg>
                        <p className="text-base font-medium text-[#00C950]">Print</p>
                    </button>
                    <button className="flex items-center justify-center gap-x-2 bg-[#2196F3] rounded-xl h-11 w-32">

                        <p className="text-base font-medium text-[#FFFFFF]">Download</p>
                    </button>
                </div>

                {/* 🔹 Overview Panel */}
                <Tabs.Panel value="printView">
                    <div className="p-3 md:p-6 bg-white rounded-xl border mt-6" >
                        {/* print-view */}
                        <div>
                            <div>
                                <img src={Printview} alt="Printview image" className="w-full" />
                            </div>
                        </div>

                        {/* ✅ PRINT DATA UI */}
                        <div className="mt-6 text-sm text-gray-700">
                            {/* Top Row */}
                            <div className="flex justify-between border-b pb-2 text-[#000000] text-sm md:text-base font-medium">
                                <p>Print Date : 01-Jan-2025</p>
                                <p>Form No : 1156155</p>
                            </div>

                            {/* Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                {/* Left */}
                                <div className="space-y-1">
                                    {[
                                        { label: "Name :", value: "Danish Arshad" },
                                        { label: "F/H Name :", value: "Arshad Bhatti" },
                                        { label: "CNIC :", value: "35201-4108698-5" },
                                        { label: "Phone No :", value: "03024425829" },
                                        { label: "H. Address :", value: "DHA Phase 1 Block D, Street # 12, House # 452" },
                                        { label: "Home Status :", value: "Permanent [ 20 Years ]" },
                                        { label: "Occupation :", value: "Graphic Designer" },
                                        { label: "Office Address :", value: "DHA Phase 1 Block D, Street # 12, House # 452" },
                                    ].map((item, index) => (
                                        <p key={index} className="flex text-sm md:text-base">
                                            <span className="text-[#65758B] w-40 shrink-0">{item.label}</span>
                                            <span className="text-[#000000] font-medium ">{item.value}</span>
                                        </p>
                                    ))}
                                </div>

                                {/* Middle */}
                                <div className="space-y-1">
                                    {[
                                        { label: "Date :", value: "01-Jan-2026" },
                                        { label: "Account No :", value: "2866533" },
                                    ].map((item, index) => (
                                        <p key={index} className="flex text-sm md:text-base">
                                            <span className="text-[#65758B] w-40 shrink-0">{item.label}</span>
                                            <span className="text-[#000000] font-medium">{item.value}</span>
                                        </p>
                                    ))}
                                </div>

                                {/* Right Images */}
                                <div className="flex gap-3">
                                    <div className="text-center">
                                        <img src="https://via.placeholder.com/100" className="rounded w-24 h-24 object-cover" />
                                        <p className="text-xs mt-1 text-[#65758B]">Customer Photo</p>
                                    </div>
                                    <div className="text-center">
                                        <img src="https://via.placeholder.com/100" className="rounded w-24 h-24 object-cover" />
                                        <p className="text-xs mt-1 text-[#65758B]">Cheque Person Photo</p>
                                    </div>
                                </div>

                            </div>

                            {/* Product Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 border-t pt-4">

                                {/* Left */}
                                <div className="space-y-2">
                                    {[
                                        { label: "Company :", value: "Samsung" },
                                        { label: "Product :", value: "Mobile" },
                                        { label: "Model :", value: "s24 Ultra" },
                                        { label: "Serial No :", value: "s564845651" },
                                        { label: "Duration :", value: "12" },
                                        { label: "Inst Receive :", value: "4" },
                                        { label: "Inst Remaining :", value: "8" },
                                        { label: "Status :", value: "Open" },
                                    ].map((item, index) => (
                                        <p key={index} className="flex text-sm md:text-base">
                                            <span className="text-[#65758B] w-40 shrink-0">{item.label}</span>
                                            <span className="text-[#000000] font-medium">{item.value}</span>
                                        </p>
                                    ))}
                                </div>

                                {/* Middle */}
                                <div className="space-y-2 md:border-l md:pl-4 border-t md:border-t-0 pt-4 md:pt-0">
                                    {[
                                        { label: "Instal Price :", value: "150000" },
                                        { label: "Act Installment :", value: "12500" },
                                        { label: "Adv Receive :", value: "12500" },
                                        { label: "Total Received :", value: "50000" },
                                        { label: "Balance :", value: "100000" },
                                    ].map((item, index) => (
                                        <p key={index} className="flex text-sm md:text-base">
                                            <span className="text-[#65758B] w-40 shrink-0">{item.label}</span>
                                            <span className="text-[#000000] font-medium">{item.value}</span>
                                        </p>
                                    ))}
                                </div>

                                {/* Right */}
                                <div className="space-y-2 md:border-l md:pl-4 border-t md:border-t-0 pt-4 md:pt-0">
                                    {[
                                        { label: "Data Operator :", value: "Irfan / 2853" },
                                        { label: "Sale Person :", value: "Hassan Ali" },
                                        { label: "Inquiry Person :", value: "Bilal" },
                                        { label: "Chk Manager :", value: "Osama" },
                                        { label: "App Manager :", value: "Afzal" },
                                    ].map((item, index) => (
                                        <p key={index} className="flex text-sm md:text-base">
                                            <span className="text-[#65758B] w-40 shrink-0">{item.label}</span>
                                            <span className="text-[#000000] font-medium">{item.value}</span>
                                        </p>
                                    ))}
                                </div>

                            </div>

                            {/* border */}
                            <div className="mt-6 border-t pt-4"></div>

                            {/* Guarantor Table */}
                            <div className="mt-6 border border-gray-300 rounded overflow-hidden overflow-x-auto">
                                <table className="w-full text-sm min-w-[500px]">
                                    <thead>
                                        <tr className="bg-[#D9D9D9] text-[#000000] text-sm md:text-base font-medium">
                                            <th className="p-3 text-left font-medium border border-gray-300 w-[20%]">Criteria</th>
                                            <th className="p-3 text-left font-medium border border-gray-300 w-[20%]">Guarantor 1</th>
                                            <th className="p-3 text-left font-medium border border-gray-300 w-[20%]">Guarantor 2</th>
                                            <th className="p-3 text-left font-medium border border-gray-300 w-[40%]">Guarantor 3</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            {
                                                label: "Name :",
                                                g1: "Danish Arshad",
                                                g2: "Danish Arshad",
                                                g3: "Danish Arshad",

                                            },
                                            {
                                                label: "F/H Name :",
                                                g1: "Arshad Bhatti",
                                                g2: "Arshad Bhatti",
                                                g3: "Arshad Bhatti",

                                            },
                                            {
                                                label: "CNIC :",
                                                g1: "35201-4108698-5",
                                                g2: "35201-4108698-5",
                                                g3: "35201-4108698-5",

                                            },
                                            {
                                                label: "Phone No :",
                                                g1: "03024425829",
                                                g2: "03024425829",
                                                g3: "03024425829",
                                            },
                                            {
                                                label: "H. Address :",
                                                g1: "DHA Phase 1 Block D, Street # 12, House # 452",
                                                g2: "DHA Phase 1 Block D, Street # 12, House # 452",
                                                g3: "DHA Phase 1 Block D, Street # 12, House # 452",
                                            },
                                            {
                                                label: "Home Status :",
                                                g1: "Permanent [ 20 Years ]",
                                                g2: "Permanent [ 20 Years ]",
                                                g3: "Permanent [ 20 Years ]",

                                            },
                                            {
                                                label: "Occupation :",
                                                g1: "Graphic Designer [10,0000]",
                                                g2: "Graphic Designer [10,0000]",
                                                g3: "Graphic Designer [10,0000]",

                                            },
                                            {
                                                label: "Office Address :",
                                                g1: "DHA Phase 1 Block D, Street # 12, House # 452",
                                                g2: "DHA Phase 1 Block D, Street # 12, House # 452",
                                                g3: "DHA Phase 1 Block D, Street # 12, House # 452",

                                            },
                                            {
                                                label: "Relation :",
                                                g1: "Neighbour",
                                                g2: "Neighbour",
                                                g3: "Neighbour",

                                            },
                                        ].map((row, index) => (
                                            <tr key={index} className="border-t border-gray-300">
                                                <td className="p-3 text-[#65758B] text-sm md:text-base border-r border-dashed border-gray-300 align-top whitespace-nowrap">
                                                    {row.label}
                                                </td>
                                                <td className="p-3 text-[#0F1729] text-sm md:text-base font-medium border-r border-dashed border-gray-300 align-top">
                                                    {row.g1}
                                                </td>
                                                <td className="p-3 text-[#0F1729] text-sm md:text-base font-medium align-top">
                                                    {row.g2}
                                                </td>
                                                <td className="p-3 text-[#0F1729] text-sm md:text-base font-medium border-l border-dashed border-gray-300 align-top">
                                                    {row.g3}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                            <th className="px-4 py-3">Install</th>
                                            <th className="px-4 py-3">Balance</th>
                                            <th className="px-4 py-3">Recovery Officer</th>
                                            <th className="px-4 py-3">Remarks</th>
                                        </tr>
                                    </thead>

                                    {/* Body */}
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr key={index} className="border-t border-[#E1E7EF] hover:bg-gray-50 text-sm text-[#4C4E53] font-medium">

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
                    </div >
                </Tabs.Panel >

                {/* 🔹 Payment Panel (YOUR EXISTING CODE) */}
                <Tabs.Panel value="projects">
                    <div className="bg-gray-50 rounded-xl mt-6">

                        {/* Info Row helper */}
                        {(() => {
                            const InfoRow = ({ label, value }) => (
                                <div className="flex justify-between items-start py-1 border-b border-dashed border-gray-100 last:border-0">
                                    <span className="text-[#65758B] text-sm md:text-base w-44 shrink-0">{label}</span>
                                    <span className="text-[#111827] text-sm md:text-base font-medium text-right">{value || "—"}</span>
                                </div>
                            );

                            const SectionHeader = ({ title }) => (
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#CAE6FF] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                            <path d="M15.75 18.25C16.0152 18.25 16.2696 18.1446 16.4571 17.9571C16.6446 17.7696 16.75 17.5152 16.75 17.25V16.004C16.754 13.198 12.776 11 8.75 11C4.724 11 0.75 13.198 0.75 16.004V17.25C0.75 17.5152 0.855357 17.7696 1.04289 17.9571C1.23043 18.1446 1.48478 18.25 1.75 18.25H15.75ZM12.354 4.354C12.354 4.82728 12.2608 5.29593 12.0797 5.73319C11.8985 6.17045 11.6331 6.56775 11.2984 6.90241C10.9638 7.23707 10.5664 7.50254 10.1292 7.68366C9.69193 7.86478 9.22328 7.958 8.75 7.958C8.27672 7.958 7.80807 7.86478 7.37081 7.68366C6.93355 7.50254 6.53625 7.23707 6.20159 6.90241C5.86692 6.56775 5.60146 6.17045 5.42034 5.73319C5.23922 5.29593 5.146 4.82728 5.146 4.354C5.146 3.39816 5.52571 2.48147 6.20159 1.80559C6.87747 1.12971 7.79416 0.75 8.75 0.75C9.70584 0.75 10.6225 1.12971 11.2984 1.80559C11.9743 2.48147 12.354 3.39816 12.354 4.354Z" stroke="#0062BD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <h2 className="text-[#0F1729] font-semibold text-lg">{title}</h2>
                                </div>
                            );

                            const PhotoBox = ({ label }) => (
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                                        <img src="https://via.placeholder.com/80" alt={label} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm sm:text-base text-[#65758B] text-center leading-tight">{label}</span>
                                </div>
                            );

                            return (
                                <div className="max-w-7xl mx-auto space-y-4">

                                    {/* Row 1: Customer Info + Product Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                                        {/* Customer Information */}
                                        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
                                            <SectionHeader title="Customer Information" />
                                            <InfoRow label="Full Name" value="Danish Arshad" />
                                            <InfoRow label="CNIC" value="35201-4108698-5" />
                                            <InfoRow label="Phone Number" value="0302-4425829" />
                                            <InfoRow label="Home Address" value="Dha Phase 1 Block D" />
                                            <InfoRow label="Home Status" value="Permanent" />
                                            <InfoRow label="Time Period" value="[ 20 Years ]" />
                                            <InfoRow label="Office Address" value="Dha Phase 1 Block D" />
                                            <InfoRow label="Designation" value="Graphic Designer" />
                                            <InfoRow label="Time Period" value="[ 2 Years ]" />
                                            <InfoRow label="Salary" value="10,000" />
                                            <InfoRow label="Phone Number" value="Nill" />
                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                <div className="flex gap-3 flex-wrap">
                                                    <PhotoBox label="Customer Photo" />
                                                    <PhotoBox label="CNIC Front" />
                                                    <PhotoBox label="CNIC Back" />
                                                    <PhotoBox label="Cheque Photo" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Information */}
                                        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
                                            <SectionHeader title="Product Information" />
                                            <InfoRow label="Company" value="Samsung" />
                                            <InfoRow label="Product" value="Mobile" />
                                            <InfoRow label="Model" value="s24 Ultra" />
                                            <InfoRow label="Serial No" value="s5556585065" />
                                            <InfoRow label="Duration" value="12" />
                                            <InfoRow label="Total Installment Receive" value="4" />
                                            <InfoRow label="Total Price" value="150050" />
                                            <InfoRow label="Actual Installment" value="12950" />
                                            <InfoRow label="Advance Receive" value="12950" />
                                            <InfoRow label="Total Receive" value="50000" />
                                            <InfoRow label="Balance" value="10,000" />
                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                <div className="flex gap-3 flex-wrap">
                                                    <PhotoBox label="Product Photo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2: Guarantor 1 + Guarantor 2 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                                        {/* Guarantor 1 */}
                                        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
                                            <SectionHeader title="Guarantor 1" />
                                            <InfoRow label="Full Name" value="Danish Arshad" />
                                            <InfoRow label="CNIC" value="35201-4108698-5" />
                                            <InfoRow label="Phone Number" value="0302-4425829" />
                                            <InfoRow label="Home Address" value="Dha Phase 1 Block D" />
                                            <InfoRow label="Home Status" value="Permanent" />
                                            <InfoRow label="Time Period" value="[ 20 Years ]" />
                                            <InfoRow label="Office Address" value="Dha Phase 1 Block D" />
                                            <InfoRow label="Designation" value="Graphic Designer" />
                                            <InfoRow label="Time Period" value="[ 2 Years ]" />
                                            <InfoRow label="Salary" value="10,000" />
                                            <InfoRow label="Phone Number" value="Nill" />
                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                <div className="flex gap-3 flex-wrap">
                                                    <PhotoBox label="CNIC Front" />
                                                    <PhotoBox label="CNIC Back" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Guarantor 2 */}
                                        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
                                            <SectionHeader title="Guarantor 2" />
                                            <InfoRow label="Full Name" value="Danish Arshad" />
                                            <InfoRow label="CNIC" value="35201-4108698-5" />
                                            <InfoRow label="Phone Number" value="0302-4425829" />
                                            <InfoRow label="Home Address" value="Dha Phase 1 Block D" />
                                            <InfoRow label="Home Status" value="Permanent" />
                                            <InfoRow label="Time Period" value="[ 20 Years ]" />
                                            <InfoRow label="Office Address" value="Dha Phase 1 Block D" />
                                            <InfoRow label="Designation" value="Graphic Designer" />
                                            <InfoRow label="Time Period" value="[ 2 Years ]" />
                                            <InfoRow label="Salary" value="10,000" />
                                            <InfoRow label="Phone Number" value="Nill" />
                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                <div className="flex gap-3 flex-wrap">
                                                    <PhotoBox label="CNIC Front" />
                                                    <PhotoBox label="CNIC Back" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 3: Cheque Detail */}
                                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm w-auto lg:max-w-[547px]">
                                        <SectionHeader title="Cheque Detail" />
                                        <div className="max-w-sm">
                                            <InfoRow label="Bank" value="Meezan Bank" />
                                            <InfoRow label="Cheque Number" value="0214589638755" />
                                            <InfoRow label="Cheque Person Name" value="Danish Arshad" />
                                            <InfoRow label="CNIC" value="35201-4108698-5" />
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-gray-100">
                                            <div className="flex gap-3 flex-wrap">
                                                <PhotoBox label="Product Photo" />
                                                <PhotoBox label="Cheque Photo" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })()}

                    </div>
                </Tabs.Panel>
            </Tabs.Root >
        </>
    );
};

export default PaymentTable;