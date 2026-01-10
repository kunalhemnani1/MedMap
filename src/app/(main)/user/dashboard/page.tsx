"use client";

import { useState } from "react";
import Link from "next/link";
import {
    User,
    Heart,
    History,
    Settings,
    Shield,
    LogOut,
    Building2,
    Search,
    Bell,
    ChevronRight,
    Clock,
    TrendingDown,
    Star,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

const savedHospitals = [
    {
        id: 1,
        name: "Apollo Hospital",
        location: "Mumbai",
        rating: 4.8,
        savedDate: "2 days ago",
    },
    {
        id: 2,
        name: "Medanta Hospital",
        location: "Delhi",
        rating: 4.6,
        savedDate: "1 week ago",
    },
];

const recentSearches = [
    { query: "MRI Scan Mumbai", time: "2 hours ago" },
    { query: "Knee Replacement", time: "Yesterday" },
    { query: "Apollo Hospital prices", time: "3 days ago" },
];

const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "history", label: "History", icon: History },
    { id: "insurance", label: "Insurance", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-lg sticky top-24">
                            <div className="card-body">
                                {/* User Profile */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="avatar placeholder">
                                        <div className="bg-primary text-primary-content rounded-full w-16">
                                            <span className="text-xl">JD</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-lg">John Doe</h2>
                                        <p className="text-sm text-base-content/60">john@example.com</p>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <ul className="menu p-0 gap-1">
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <button
                                                className={activeTab === tab.id ? "active" : ""}
                                                onClick={() => setActiveTab(tab.id)}
                                            >
                                                <tab.icon className="w-4 h-4" />
                                                {tab.label}
                                            </button>
                                        </li>
                                    ))}
                                    <div className="divider my-2"></div>
                                    <li>
                                        <button className="text-error">
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {activeTab === "overview" && (
                            <>
                                {/* Welcome Card */}
                                <div className="card bg-linear-to-r from-primary to-secondary text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl">Welcome back, John!</h2>
                                        <p className="opacity-80">
                                            Continue exploring healthcare options and save more on medical costs.
                                        </p>
                                        <div className="card-actions mt-4">
                                            <Link href="/search" className="btn btn-ghost gap-2">
                                                <Search className="w-4 h-4" />
                                                New Search
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="stat bg-base-100 rounded-xl shadow">
                                        <div className="stat-figure text-primary">
                                            <Heart className="w-8 h-8" />
                                        </div>
                                        <div className="stat-title">Saved Hospitals</div>
                                        <div className="stat-value text-primary">{savedHospitals.length}</div>
                                    </div>
                                    <div className="stat bg-base-100 rounded-xl shadow">
                                        <div className="stat-figure text-secondary">
                                            <Search className="w-8 h-8" />
                                        </div>
                                        <div className="stat-title">Searches</div>
                                        <div className="stat-value text-secondary">{recentSearches.length}</div>
                                    </div>
                                    <div className="stat bg-base-100 rounded-xl shadow">
                                        <div className="stat-figure text-success">
                                            <TrendingDown className="w-8 h-8" />
                                        </div>
                                        <div className="stat-title">Est. Savings</div>
                                        <div className="stat-value text-success">₹45K</div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="card bg-base-100 shadow-lg">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            <Clock className="w-5 h-5" />
                                            Recent Searches
                                        </h3>
                                        <ul className="divide-y divide-base-200">
                                            {recentSearches.map((search, i) => (
                                                <li key={i} className="py-3 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Search className="w-4 h-4 text-base-content/40" />
                                                        <span>{search.query}</span>
                                                    </div>
                                                    <span className="text-sm text-base-content/60">{search.time}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "saved" && (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title">
                                        <Heart className="w-5 h-5 text-error" />
                                        Saved Hospitals
                                    </h3>
                                    {savedHospitals.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Heart className="w-12 h-12 text-base-content/20 mx-auto mb-4" />
                                            <p className="text-base-content/60">No saved hospitals yet</p>
                                            <Link href="/search" className="btn btn-primary mt-4">
                                                Explore Hospitals
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {savedHospitals.map((hospital) => (
                                                <div
                                                    key={hospital.id}
                                                    className="flex items-center justify-between p-4 bg-base-200 rounded-lg"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="avatar placeholder">
                                                            <div className="bg-primary text-primary-content rounded-lg w-12">
                                                                <Building2 className="w-6 h-6" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">{hospital.name}</h4>
                                                            <p className="text-sm text-base-content/60">
                                                                {hospital.location}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-warning fill-warning" />
                                                            <span>{hospital.rating}</span>
                                                        </div>
                                                        <Link
                                                            href={`/hospital/${hospital.name.toLowerCase().replace(/\s+/g, "-")}`}
                                                            className="btn btn-ghost btn-sm"
                                                        >
                                                            <ChevronRight className="w-4 h-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "history" && (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title">
                                        <History className="w-5 h-5" />
                                        Search History
                                    </h3>
                                    <ul className="divide-y divide-base-200">
                                        {recentSearches.map((search, i) => (
                                            <li key={i} className="py-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Clock className="w-4 h-4 text-base-content/40" />
                                                    <div>
                                                        <p className="font-medium">{search.query}</p>
                                                        <p className="text-sm text-base-content/60">{search.time}</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={`/search?q=${encodeURIComponent(search.query)}`}
                                                    className="btn btn-ghost btn-sm"
                                                >
                                                    Search Again
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === "insurance" && (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title">
                                        <Shield className="w-5 h-5 text-primary" />
                                        Insurance Profiles
                                    </h3>
                                    <p className="text-base-content/60 mb-4">
                                        Save your insurance details for quick coverage checks.
                                    </p>
                                    <div className="alert">
                                        <Shield className="w-5 h-5" />
                                        <span>No insurance profiles saved yet.</span>
                                        <Link href="/insurance-checker" className="btn btn-sm btn-primary">
                                            Add Insurance
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title">
                                        <Settings className="w-5 h-5" />
                                        Account Settings
                                    </h3>
                                    <div className="space-y-4 mt-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Email</span>
                                            </label>
                                            <input
                                                type="email"
                                                value="john@example.com"
                                                className="input input-bordered"
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Default City</span>
                                            </label>
                                            <select className="select select-bordered">
                                                <option>Mumbai</option>
                                                <option>Delhi</option>
                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text font-medium">Email Notifications</span>
                                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text font-medium">Price Alerts</span>
                                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                            </label>
                                        </div>
                                        <button className="btn btn-primary">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
