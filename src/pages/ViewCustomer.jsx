import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs } from "@base-ui/react/tabs";
import api from "../api/api";
import {
    User,
    MapPin,
    Phone,
    Briefcase,
    DollarSign,
    Clock,
    Home,
    Building,
    FileText,
    Users,
    ChevronLeft,
    Eye,
    X,
    CreditCard,
    Building2,
    Lock,
    Download,
    ExternalLink,
    ChevronRight,
    ShieldCheck
} from "lucide-react";

const ViewCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewTitle, setPreviewTitle] = useState("");

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/customer/${id}`);
                const list = res.data?.data || [];
                const found = list.find((c) => c.id === Number(id));
                setCustomer(found || null);
            } catch (error) {
                console.error("Error fetching customer:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCustomer();
    }, [id]);

    const getImg = (url) => {
        return url || "https://via.placeholder.com/200";
    };

    const handleImagePreview = (url, title) => {
        if (url) {
            setPreviewImage(url);
            setPreviewTitle(title);
        }
    };

    // Modern Skeleton Loading State
    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto space-y-6 p-4 animate-pulse">
                {/* Header Back Button Skeleton */}
                <div className="h-6 w-32 bg-gray-200 rounded"></div>

                {/* Hero Card Skeleton */}
                <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
                    <div className="h-28 bg-gradient-to-r from-blue-50 to-indigo-50"></div>
                    <div className="p-6 relative flex flex-col md:flex-row gap-5 items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white -mt-16 relative z-10"></div>
                        <div className="flex-1 space-y-3 text-center md:text-left">
                            <div className="h-6 w-48 bg-gray-200 rounded mx-auto md:mx-0"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded mx-auto md:mx-0"></div>
                        </div>
                        <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

                {/* Dashboard Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-150 h-80 space-y-4">
                            <div className="h-5 w-40 bg-gray-200 rounded"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-100 rounded"></div>
                                <div className="h-12 bg-gray-100 rounded"></div>
                                <div className="h-12 bg-gray-100 rounded"></div>
                                <div className="h-12 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-150 h-80 space-y-4">
                        <div className="h-5 w-40 bg-gray-200 rounded"></div>
                        <div className="h-32 bg-gray-100 rounded"></div>
                        <div className="h-20 bg-gray-100 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-gray-150 rounded-2xl max-w-lg mx-auto mt-10 shadow-sm">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <Users size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Customer Not Found</h3>
                <p className="text-gray-500 text-sm mt-1">The customer you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => navigate("/all-Customer")}
                    className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-blue-100 cursor-pointer"
                >
                    Back to Customer List
                </button>
            </div>
        );
    }

    const cheque = customer?.cheque || {};

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 pb-12 px-2 sm:px-4 md:px-6">
            {/* HEADER BREADCRUMB & BACK ACTION */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                    onClick={() => navigate("/all-Customer")}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm group-hover:border-blue-300 group-hover:bg-blue-50 transition-all">
                        <ChevronLeft size={16} className="text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <span>Back to All Customers</span>
                </button>

                {/* <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs text-gray-400 font-mono hidden md:inline">ID: {customer.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${customer.status === "Approved" || customer.status === "approved"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : customer.status === "Rejected" || customer.status === "rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                        {customer.status || "Draft"}
                    </span>
                </div> */}
            </div>

            {/* HERO HEADER CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Banner with modern pattern/gradient */}
                <div className="h-28 sm:h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>

                {/* Profile Overlay details */}
                <div className="p-4 sm:p-6 relative flex flex-col md:flex-row gap-5 items-center md:items-end -mt-10 sm:-mt-12">
                    {/* Avatar Container */}
                    <div className="relative group">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white bg-gray-50 shadow-md relative z-10">
                            <img
                                src={getImg(customer.customer_photo_url)}
                                alt={customer.full_name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/200?text=Customer";
                                }}
                            />
                        </div>
                        <button
                            onClick={() => handleImagePreview(getImg(customer.customer_photo_url), "Customer Photo")}
                            className="absolute inset-0 rounded-full bg-black/40 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                        >
                            <Eye size={20} />
                        </button>
                    </div>

                    {/* Customer Meta */}
                    <div className="flex-1 text-center md:text-left space-y-1">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-col sm:flex-row items-center gap-2 justify-center md:justify-start">
                            {customer.full_name}
                            <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                                {customer.customer_number || "NO-CN"}
                            </span>
                        </h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <Briefcase size={14} className="text-gray-400" />
                                {customer.designation || "N/A"}
                            </span>
                            <span className="hidden sm:inline text-gray-300">•</span>
                            <span className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-gray-400" />
                                {customer.home_status === "owned" ? "Personal Home" : "Rental Home"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABS CONTAINER */}
            <Tabs.Root defaultValue="overview" className="space-y-6">
                <Tabs.List className="inline-flex p-1 bg-gray-100/80 backdrop-blur rounded-xl border border-gray-200">
                    <Tabs.Tab
                        value="overview"
                        className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-600 transition-all cursor-pointer
              data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm"
                    >
                        Overview
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="detail"
                        className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-600 transition-all cursor-pointer
              data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm"
                    >
                        Tabular View
                    </Tabs.Tab>
                </Tabs.List>

                {/* ================= OVERVIEW TAB ================= */}
                <Tabs.Panel value="overview" className="outline-none space-y-6">
                    {/* Main Info Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* COLUMN 1: Customer Details */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Profile Card details */}
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                                            <User size={18} />
                                        </div>
                                        <h3 className="font-bold text-gray-800">Personal Profile</h3>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    {/* Grid fields */}
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</p>
                                        <p className="text-sm font-medium text-gray-800">{customer.full_name || "-"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Father's Name</p>
                                        <p className="text-sm font-medium text-gray-800">{customer.father_name || "-"}</p>
                                    </div>
                                    <div className="space-y-1 border-t border-gray-50 pt-3 sm:pt-0">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CNIC Number</p>
                                        <p className="text-sm font-mono font-medium text-gray-800">{customer.cnic || "-"}</p>
                                    </div>
                                    <div className="space-y-1 border-t border-gray-50 pt-3 sm:pt-0">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</p>
                                        <p className="text-sm font-medium text-gray-800">{customer.phone || "-"}</p>
                                    </div>
                                    <div className="space-y-1 border-t border-gray-50 pt-3 sm:col-span-2">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Home Address</p>
                                        <p className="text-sm font-medium text-gray-800 flex items-start gap-1">
                                            <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                            {customer.home_address || "-"}
                                        </p>
                                    </div>
                                    <div className="space-y-1 border-t border-gray-50 pt-3">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Home Status</p>
                                        <p className="text-sm font-medium text-gray-800 capitalize">{customer.home_status || "-"}</p>
                                    </div>
                                    <div className="space-y-1 border-t border-gray-50 pt-3">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Time Period at Home</p>
                                        <p className="text-sm font-medium text-gray-800">{customer.time_period || "-"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Work Information Card */}
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                                            <Building size={18} />
                                        </div>
                                        <h3 className="font-bold text-gray-800">Employment Details</h3>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Designation / Role</p>
                                        <p className="text-sm font-medium text-gray-800">{customer.designation || "-"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Monthly Salary</p>
                                        <p className="text-sm font-semibold text-gray-900 flex items-center">
                                            {customer.salary ? Number(customer.salary).toLocaleString() : "-"}
                                        </p>
                                    </div>
                                    <div className="space-y-1 border-t border-gray-50 pt-3 sm:col-span-2">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Office Address</p>
                                        <p className="text-sm font-medium text-gray-800 flex items-start gap-1">
                                            <Building2 size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                            {customer.office_address || "-"}
                                        </p>
                                    </div>
                                    <div className="space-y-1 border-t border-gray-50 pt-3">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Office Phone</p>
                                        <p className="text-sm font-medium text-gray-800">{customer.office_phone || "-"}</p>
                                    </div>
                                    <div className="space-y-1 border-t border-gray-50 pt-3">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Time Period at Work</p>
                                        <p className="text-sm font-medium text-gray-800">{customer.time_period || "-"}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* COLUMN 2: Cheque + Quick Verification Documents */}
                        <div className="space-y-6">

                            {/* Premium Banking Cheque Card styling */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-slate-850 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col justify-between h-[230px]">
                                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>

                                {/* Header */}
                                <div className="flex justify-between items-start z-10">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-semibold text-indigo-300 uppercase tracking-widest">Cheque Details</p>
                                        <p className="text-base font-bold tracking-wide">{cheque.bank_name || "N/A"}</p>
                                    </div>
                                    <div className="h-8 w-11 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10 text-white/80">
                                        <CreditCard size={18} />
                                    </div>
                                </div>

                                {/* Card Number */}
                                <div className="space-y-1 z-10 my-4">
                                    <p className="text-[9px] text-slate-400 uppercase tracking-widest">Account / Cheque Number</p>
                                    <p className="text-lg font-mono font-bold tracking-widest text-slate-100">
                                        {cheque.account_number ? cheque.account_number.match(/.{1,4}/g)?.join(" ") : "•••• •••• •••• ••••"}
                                    </p>
                                </div>

                                {/* Footer details */}
                                <div className="flex justify-between items-end z-10">
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] text-slate-400 uppercase tracking-wider">Account Holder</p>
                                        <p className="text-xs font-semibold tracking-wide text-slate-200 uppercase">{cheque.cheque_person_name || "N/A"}</p>
                                    </div>
                                    {cheque.cnic && (
                                        <div className="text-right">
                                            <p className="text-[9px] text-slate-400 uppercase">Holder CNIC</p>
                                            <p className="text-[11px] font-mono font-medium text-slate-300">{cheque.cnic}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Uploaded Documents Quick Panel */}
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                                            <ShieldCheck size={18} />
                                        </div>
                                        <h3 className="font-bold text-gray-800">Verification Files</h3>
                                    </div>
                                </div>

                                <div className="p-5 space-y-4">
                                    {/* Photo row items */}
                                    {[
                                        { label: "Customer Photo", url: customer.customer_photo_url, key: "photo" },
                                        { label: "CNIC Card Front", url: customer.cnic_front_url, key: "cnic_f" },
                                        { label: "CNIC Card Back", url: customer.cnic_back_url, key: "cnic_b" },
                                        { label: "Account Cheque Front", url: cheque.cheque_front_url, key: "cheq_f" },
                                        { label: "Account Cheque Back", url: cheque.cheque_back_url, key: "cheq_b" }
                                    ].map((doc, idx) => (
                                        <div
                                            key={doc.key + idx}
                                            onClick={() => handleImagePreview(getImg(doc.url), doc.label)}
                                            className="group flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform">
                                                    <img src={getImg(doc.url)} alt={doc.label} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">{doc.label}</p>
                                                    <p className="text-xs text-gray-400">{doc.url ? "Verified Document" : "Placeholder Used"}</p>
                                                </div>
                                            </div>
                                            <div className="h-7 w-7 rounded-lg bg-gray-50 group-hover:bg-blue-100/50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors">
                                                <Eye size={14} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* DYNAMIC GUARANTORS LIST SECTION */}
                    <div className="space-y-4 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                                <Users size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Guarantors Information</h2>
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                                {customer.guarantors?.length || 0}
                            </span>
                        </div>

                        {customer.guarantors && customer.guarantors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {customer.guarantors.map((g, i) => (
                                    <div key={g.id || i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                                        <div>
                                            {/* Top banner of Guarantor card */}
                                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
                                                    Guarantor {i + 1}
                                                </span>
                                            </div>

                                            {/* Content details */}
                                            <div className="p-5 space-y-3.5">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Full Name</p>
                                                        <p className="text-sm font-semibold text-gray-800">{g.full_name || "-"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">CNIC</p>
                                                        <p className="text-sm font-mono font-medium text-gray-800">{g.cnic || "-"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</p>
                                                        <p className="text-sm font-semibold text-gray-800">{g.phone || "-"}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Designation</p>
                                                        <p className="text-sm font-semibold text-gray-800">{g.designation || "-"}</p>
                                                    </div>
                                                </div>

                                                <div className="border-t border-gray-100 pt-3">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Home Address</p>
                                                    <p className="text-sm font-medium text-gray-700 flex items-start gap-1 mt-0.5">
                                                        <MapPin size={15} className="text-gray-400 shrink-0 mt-0.5" />
                                                        {g.home_address || "-"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Guarantor Document previews */}
                                        <div className="p-5 border-t border-gray-100 bg-gray-50/30 grid grid-cols-2 gap-3">
                                            <div
                                                onClick={() => handleImagePreview(getImg(g.cnic_front_url), `Guarantor ${i + 1} CNIC Front`)}
                                                className="group relative h-20 border border-gray-200 rounded-xl overflow-hidden cursor-pointer shadow-xs bg-white hover:border-blue-300 transition-colors"
                                            >
                                                <img src={getImg(g.cnic_front_url)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="CNIC Front" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                                                    <Eye size={12} /> View Front
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => handleImagePreview(getImg(g.cnic_back_url), `Guarantor ${i + 1} CNIC Back`)}
                                                className="group relative h-20 border border-gray-200 rounded-xl overflow-hidden cursor-pointer shadow-xs bg-white hover:border-blue-300 transition-colors"
                                            >
                                                <img src={getImg(g.cnic_back_url)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="CNIC Back" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1">
                                                    <Eye size={12} /> View Back
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-8 text-center rounded-2xl border border-gray-250/60 shadow-sm text-gray-500">
                                No guarantors registered for this customer profile.
                            </div>
                        )}
                    </div>
                </Tabs.Panel>

                {/* ================= TABULAR DETAILS VIEW ================= */}
                <Tabs.Panel value="detail" className="outline-none">
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">Complete Tabular Database View</h3>
                            <span className="text-xs text-gray-400">Structured system properties</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-400 uppercase tracking-wider text-[11px] font-semibold border-b border-gray-100">
                                        <th className="py-3 px-6">Section</th>
                                        <th className="py-3 px-6">Database Key</th>
                                        <th className="py-3 px-6">Current Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {/* General */}
                                    <tr>
                                        <td className="py-3 px-6 font-bold text-gray-900 bg-gray-50/20" rowSpan="6">General Info</td>
                                        <td className="py-3 px-6 font-mono text-xs text-gray-500">full_name</td>
                                        <td className="py-3 px-6">{customer.full_name || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-gray-500">father_name</td>
                                        <td className="py-3 px-6">{customer.father_name || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-gray-500">cnic</td>
                                        <td className="py-3 px-6 font-mono">{customer.cnic || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-gray-500">phone</td>
                                        <td className="py-3 px-6">{customer.phone || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-gray-500">home_address</td>
                                        <td className="py-3 px-6">{customer.home_address || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-gray-500">home_status</td>
                                        <td className="py-3 px-6 capitalize">{customer.home_status || "-"}</td>
                                    </tr>

                                    {/* Professional */}
                                    <tr className="border-t-2 border-gray-100">
                                        <td className="py-3 px-6 font-bold text-indigo-900 bg-indigo-50/5" rowSpan="5">Work Details</td>
                                        <td className="py-3 px-6 font-mono text-xs text-indigo-500">designation</td>
                                        <td className="py-3 px-6 font-medium">{customer.designation || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-indigo-500">salary</td>
                                        <td className="py-3 px-6 font-semibold">{customer.salary || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-indigo-500">office_address</td>
                                        <td className="py-3 px-6">{customer.office_address || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-indigo-500">office_phone</td>
                                        <td className="py-3 px-6">{customer.office_phone || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-indigo-500">time_period</td>
                                        <td className="py-3 px-6">{customer.time_period || "-"}</td>
                                    </tr>

                                    {/* Cheque */}
                                    <tr className="border-t-2 border-gray-100">
                                        <td className="py-3 px-6 font-bold text-teal-900 bg-teal-50/5" rowSpan="4">Cheque Details</td>
                                        <td className="py-3 px-6 font-mono text-xs text-teal-500">bank_name</td>
                                        <td className="py-3 px-6">{cheque.bank_name || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-teal-500">account_number</td>
                                        <td className="py-3 px-6 font-mono">{cheque.account_number || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-teal-500">cheque_person_name</td>
                                        <td className="py-3 px-6">{cheque.cheque_person_name || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-6 font-mono text-xs text-teal-500">cheque_cnic</td>
                                        <td className="py-3 px-6 font-mono">{cheque.cnic || "-"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Tabs.Panel>
            </Tabs.Root>

            {/* ================= LIGHTBOX MODAL OVERLAY ================= */}
            {previewImage && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in transition-all">

                    {/* Header Action Row */}
                    <div className="w-full max-w-4xl flex items-center justify-between mb-3 text-white">
                        <span className="text-sm font-semibold tracking-wide bg-white/10 px-3.5 py-1 rounded-full backdrop-blur">
                            {previewTitle}
                        </span>
                        <div className="flex items-center gap-3">
                            <a
                                href={previewImage}
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur"
                                title="View Fullscreen"
                            >
                                <ExternalLink size={16} />
                            </a>
                            <button
                                onClick={() => {
                                    setPreviewImage(null);
                                    setPreviewTitle("");
                                }}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 hover:bg-red-600 text-white transition-all backdrop-blur cursor-pointer"
                                title="Close"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Large Image Frame */}
                    <div className="relative w-full max-w-4xl max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-900/50 cursor-pointer">
                        <img
                            src={previewImage}
                            alt="Verification Preview"
                            className="max-w-full max-h-[75vh] object-contain select-none"
                        />
                    </div>

                    {/* Bottom dismiss trigger */}
                    <button
                        onClick={() => {
                            setPreviewImage(null);
                            setPreviewTitle("");
                        }}
                        className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold rounded-full tracking-wider transition-all backdrop-blur cursor-pointer"
                    >
                        DISMISS VIEWER
                    </button>
                </div>
            )}
        </div>
    );
};

export default ViewCustomer;
