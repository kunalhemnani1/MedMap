"use client";

import { useState } from "react";
import Link from "next/link";
import {
    BarChart3,
    Users,
    Eye,
    TrendingUp,
    Settings,
    FileText,
    Plus,
    Edit,
    Trash2,
    Search,
    Bell,
    ChevronDown,
    IndianRupee,
    Calendar,
    Filter,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function ProviderDashboardPage() {
    const [activeTab, setActiveTab] = useState("overview");

    const stats = [
        {
            label: "Total Views",
            value: "12,458",
            change: "+12%",
            icon: Eye,
            color: "primary",
        },
        {
            label: "Patient Inquiries",
            value: "234",
            change: "+8%",
            icon: Users,
            color: "secondary",
        },
        {
            label: "Procedures Listed",
            value: "48",
            change: "+2",
            icon: FileText,
            color: "accent",
        },
        {
            label: "Avg. Rating",
            value: "4.6",
            change: "+0.2",
            icon: TrendingUp,
            color: "success",
        },
    ];

    const procedures = [
        { name: "MRI Scan", price: 8500, views: 1234, status: "active" },
        { name: "CT Scan", price: 5500, views: 987, status: "active" },
        { name: "Blood Test Panel", price: 1200, views: 2341, status: "active" },
        { name: "X-Ray", price: 800, views: 876, status: "pending" },
        { name: "Ultrasound", price: 2000, views: 654, status: "active" },
    ];

    const recentInquiries = [
        { patient: "A***a K", procedure: "MRI Scan", date: "Today, 2:30 PM" },
        { patient: "R***h S", procedure: "CT Scan", date: "Today, 11:15 AM" },
        { patient: "P***a M", procedure: "Blood Test", date: "Yesterday" },
        { patient: "S***l R", procedure: "X-Ray", date: "Yesterday" },
    ];

    const tabs = [
        { id: "overview", label: "Overview", icon: BarChart3 },
        { id: "procedures", label: "Procedures", icon: FileText },
        { id: "inquiries", label: "Inquiries", icon: Users },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Dashboard Header */}
            <section className="bg-base-100 border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">Provider Dashboard</h1>
                            <p className="text-base-content/60">
                                Manage your hospital listing and procedures
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="btn btn-ghost btn-circle">
                                <Bell className="w-5 h-5" />
                            </button>
                            <details className="dropdown dropdown-end">
                                <summary className="btn btn-ghost gap-2">
                                    <div className="avatar placeholder">
                                        <div className="bg-primary text-primary-content rounded-full w-8">
                                            <span>AP</span>
                                        </div>
                                    </div>
                                    <span>Apollo Hospital</span>
                                    <ChevronDown className="w-4 h-4" />
                                </summary>
                                <ul className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-xl">
                                    <li>
                                        <a>Profile</a>
                                    </li>
                                    <li>
                                        <a>Settings</a>
                                    </li>
                                    <li>
                                        <a>Logout</a>
                                    </li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-6">
                {/* Tabs */}
                <div className="tabs tabs-boxed bg-base-100 mb-6 p-1 inline-flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab gap-2 ${activeTab === tab.id ? "tab-active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="card bg-base-100 shadow">
                                    <div className="card-body">
                                        <div className="flex items-center justify-between">
                                            <div
                                                className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}
                                            >
                                                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                                            </div>
                                            <span className="text-success text-sm font-medium">
                                                {stat.change}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                        <p className="text-base-content/60 text-sm">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Top Procedures */}
                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="card-title">Top Procedures</h2>
                                        <Link
                                            href="#"
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => setActiveTab("procedures")}
                                        >
                                            View All
                                        </Link>
                                    </div>
                                    <div className="space-y-3">
                                        {procedures.slice(0, 4).map((proc, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between p-3 rounded-lg bg-base-200"
                                            >
                                                <div>
                                                    <p className="font-medium">{proc.name}</p>
                                                    <p className="text-sm text-base-content/60">
                                                        {proc.views} views
                                                    </p>
                                                </div>
                                                <p className="font-semibold">
                                                    <IndianRupee className="inline w-4 h-4" />
                                                    {proc.price.toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Inquiries */}
                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="card-title">Recent Inquiries</h2>
                                        <Link
                                            href="#"
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => setActiveTab("inquiries")}
                                        >
                                            View All
                                        </Link>
                                    </div>
                                    <div className="space-y-3">
                                        {recentInquiries.map((inq, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between p-3 rounded-lg bg-base-200"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar placeholder">
                                                        <div className="bg-primary/10 text-primary rounded-full w-10">
                                                            <span>{inq.patient.charAt(0)}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{inq.patient}</p>
                                                        <p className="text-sm text-base-content/60">
                                                            {inq.procedure}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-base-content/60">
                                                    {inq.date}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Procedures Tab */}
                {activeTab === "procedures" && (
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <h2 className="card-title">Manage Procedures</h2>
                                <div className="flex gap-2">
                                    <div className="join">
                                        <div className="join-item">
                                            <input
                                                type="text"
                                                placeholder="Search procedures..."
                                                className="input input-bordered join-item w-full md:w-64"
                                            />
                                        </div>
                                        <button className="btn join-item">
                                            <Search className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button className="btn btn-primary">
                                        <Plus className="w-4 h-4" />
                                        Add Procedure
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Procedure</th>
                                            <th>Price</th>
                                            <th>Views</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {procedures.map((proc, i) => (
                                            <tr key={i}>
                                                <td className="font-medium">{proc.name}</td>
                                                <td>
                                                    <IndianRupee className="inline w-4 h-4" />
                                                    {proc.price.toLocaleString()}
                                                </td>
                                                <td>{proc.views}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${proc.status === "active" ? "badge-success" : "badge-warning"}`}
                                                    >
                                                        {proc.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex gap-1">
                                                        <button className="btn btn-ghost btn-xs">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button className="btn btn-ghost btn-xs text-error">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Inquiries Tab */}
                {activeTab === "inquiries" && (
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <h2 className="card-title">Patient Inquiries</h2>
                                <div className="flex gap-2">
                                    <button className="btn btn-ghost btn-sm gap-2">
                                        <Filter className="w-4 h-4" />
                                        Filter
                                    </button>
                                    <button className="btn btn-ghost btn-sm gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Date Range
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[...recentInquiries, ...recentInquiries].map((inq, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-base-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary/10 text-primary rounded-full w-12">
                                                        <span className="text-lg">{inq.patient.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{inq.patient}</p>
                                                    <p className="text-sm text-base-content/60">
                                                        Inquiry for {inq.procedure}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="badge badge-ghost">{inq.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <button className="btn btn-primary btn-sm">
                                                Respond
                                            </button>
                                            <button className="btn btn-ghost btn-sm">
                                                Mark as Read
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Hospital Information</h2>
                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">
                                                    Hospital Name
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered"
                                                defaultValue="Apollo Hospital"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">
                                                    Description
                                                </span>
                                            </label>
                                            <textarea
                                                className="textarea textarea-bordered h-24"
                                                defaultValue="Leading multi-specialty hospital providing world-class healthcare services."
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">Phone</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="input input-bordered"
                                                    defaultValue="+91 22 1234 5678"
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">Email</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="input input-bordered"
                                                    defaultValue="info@apollohospital.com"
                                                />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Verification Status</h2>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                                        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-success" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-success">Verified</p>
                                            <p className="text-sm text-base-content/60">
                                                Last verified on Jan 15, 2025
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Quick Actions</h2>
                                    <div className="space-y-2">
                                        <button className="btn btn-block btn-ghost justify-start gap-3">
                                            <FileText className="w-4 h-4" />
                                            Update Documents
                                        </button>
                                        <button className="btn btn-block btn-ghost justify-start gap-3">
                                            <Users className="w-4 h-4" />
                                            Manage Staff
                                        </button>
                                        <button className="btn btn-block btn-ghost justify-start gap-3">
                                            <Bell className="w-4 h-4" />
                                            Notification Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
