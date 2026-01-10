"use client";

import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    Activity,
    IndianRupee,
    Building2,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

const priceData = [
    { procedure: "MRI Scan - Brain", avgPrice: 8500, change: -12, trend: "down" },
    { procedure: "CT Scan - Full Body", avgPrice: 6500, change: 5, trend: "up" },
    { procedure: "Knee Replacement", avgPrice: 250000, change: -8, trend: "down" },
    { procedure: "Cataract Surgery", avgPrice: 35000, change: 3, trend: "up" },
    { procedure: "Angioplasty", avgPrice: 180000, change: -15, trend: "down" },
    { procedure: "Normal Delivery", avgPrice: 35000, change: 10, trend: "up" },
];

const cityComparison = [
    { city: "Mumbai", avgCost: 100, index: 1.0 },
    { city: "Delhi", avgCost: 95, index: 0.95 },
];

export default function InsightsPage() {
    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero */}
            <section className="bg-linear-to-br from-info/10 via-base-100 to-primary/10 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-info/10 text-info px-4 py-2 rounded-full mb-6">
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-medium">Market Insights</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Healthcare Price Trends
                        </h1>
                        <p className="text-lg text-base-content/70">
                            Data-driven insights into medical procedure costs, hospital pricing
                            trends, and market analysis across India.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                    <div className="stat bg-base-100 rounded-xl shadow">
                        <div className="stat-figure text-primary">
                            <IndianRupee className="w-8 h-8" />
                        </div>
                        <div className="stat-title">Avg. Savings</div>
                        <div className="stat-value text-primary">35%</div>
                        <div className="stat-desc flex items-center gap-1 text-success">
                            <ArrowUpRight className="w-4 h-4" />
                            vs market average
                        </div>
                    </div>

                    <div className="stat bg-base-100 rounded-xl shadow">
                        <div className="stat-figure text-secondary">
                            <Building2 className="w-8 h-8" />
                        </div>
                        <div className="stat-title">Hospitals Tracked</div>
                        <div className="stat-value text-secondary">500+</div>
                        <div className="stat-desc">Across 2 cities</div>
                    </div>

                    <div className="stat bg-base-100 rounded-xl shadow">
                        <div className="stat-figure text-accent">
                            <Activity className="w-8 h-8" />
                        </div>
                        <div className="stat-title">Procedures</div>
                        <div className="stat-value text-accent">10K+</div>
                        <div className="stat-desc">Price points analyzed</div>
                    </div>

                    <div className="stat bg-base-100 rounded-xl shadow">
                        <div className="stat-figure text-info">
                            <Users className="w-8 h-8" />
                        </div>
                        <div className="stat-title">Users Helped</div>
                        <div className="stat-value text-info">50K+</div>
                        <div className="stat-desc flex items-center gap-1 text-success">
                            <ArrowUpRight className="w-4 h-4" />
                            12% this month
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Price Trends Table */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="card-title">
                                        <BarChart3 className="w-5 h-5 text-primary" />
                                        Price Trends (30 Days)
                                    </h2>
                                    <select className="select select-bordered select-sm">
                                        <option>All Procedures</option>
                                        <option>Diagnostic</option>
                                        <option>Surgical</option>
                                    </select>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Procedure</th>
                                                <th className="text-right">Avg. Price</th>
                                                <th className="text-right">30d Change</th>
                                                <th>Trend</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {priceData.map((item) => (
                                                <tr key={item.procedure}>
                                                    <td className="font-medium">{item.procedure}</td>
                                                    <td className="text-right">
                                                        ₹{item.avgPrice.toLocaleString()}
                                                    </td>
                                                    <td
                                                        className={`text-right ${item.trend === "down" ? "text-success" : "text-error"
                                                            }`}
                                                    >
                                                        <span className="flex items-center justify-end gap-1">
                                                            {item.trend === "down" ? (
                                                                <ArrowDownRight className="w-4 h-4" />
                                                            ) : (
                                                                <ArrowUpRight className="w-4 h-4" />
                                                            )}
                                                            {Math.abs(item.change)}%
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="w-20 h-8 flex items-end gap-0.5">
                                                            {[...Array(7)].map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`flex-1 rounded-sm ${item.trend === "down"
                                                                        ? "bg-success/60"
                                                                        : "bg-error/60"
                                                                        }`}
                                                                    style={{
                                                                        height: `${Math.random() * 60 + 40}%`,
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* City Comparison */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <PieChart className="w-5 h-5 text-primary" />
                                    City Cost Index
                                </h2>
                                <p className="text-sm text-base-content/60 mb-4">
                                    Relative cost of healthcare (Mumbai = 100)
                                </p>

                                <div className="space-y-4">
                                    {cityComparison.map((city) => (
                                        <div key={city.city}>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">{city.city}</span>
                                                <span className="text-base-content/70">{city.avgCost}</span>
                                            </div>
                                            <progress
                                                className="progress progress-primary"
                                                value={city.avgCost}
                                                max="100"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Best Time to Book
                                </h2>
                                <p className="text-sm text-base-content/60 mb-4">
                                    Prices are typically lowest during:
                                </p>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                                        <span>Weekdays (Tue-Thu)</span>
                                        <span className="badge badge-success">-8% avg</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                                        <span>Jan-Mar</span>
                                        <span className="badge badge-success">-12% avg</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                                        <span>Off-peak hours</span>
                                        <span className="badge badge-warning">-5% avg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
