"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    TrendingUp,
    TrendingDown,
    Hospital,
    AlertCircle,
    MapPin,
    ChevronRight,
    Star,
    IndianRupee,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

interface PriceData {
    hospitalName: string;
    hospitalSlug: string;
    price: number;
    minPrice?: number;
    maxPrice?: number;
    rating: number;
    city: string;
    type: string;
}

export default function ProcedureDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);
    const [priceData, setPriceData] = useState<PriceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<"price" | "rating">("price");

    useEffect(() => {
        params.then((p) => setResolvedParams(p));
    }, [params]);

    const procedureName = resolvedParams?.slug
        ? decodeURIComponent(resolvedParams.slug).replace(/-/g, " ")
        : "Procedure";

    // Mock data for demonstration
    useEffect(() => {
        if (!resolvedParams) return;

        const mockData: PriceData[] = [
            {
                hospitalName: "Apollo Hospital",
                hospitalSlug: "apollo-hospital-mumbai",
                price: 45000,
                minPrice: 40000,
                maxPrice: 50000,
                rating: 4.8,
                city: "Mumbai",
                type: "Private",
            },
            {
                hospitalName: "Fortis Hospital",
                hospitalSlug: "fortis-hospital-mumbai",
                price: 52000,
                minPrice: 48000,
                maxPrice: 58000,
                rating: 4.6,
                city: "Mumbai",
                type: "Private",
            },
            {
                hospitalName: "Max Healthcare",
                hospitalSlug: "max-healthcare-delhi",
                price: 48000,
                minPrice: 43000,
                maxPrice: 55000,
                rating: 4.7,
                city: "Delhi",
                type: "Private",
            },
            {
                hospitalName: "AIIMS",
                hospitalSlug: "aiims-delhi",
                price: 15000,
                minPrice: 10000,
                maxPrice: 20000,
                rating: 4.5,
                city: "Delhi",
                type: "Government",
            },
            {
                hospitalName: "Lilavati Hospital",
                hospitalSlug: "lilavati-hospital-mumbai",
                price: 55000,
                minPrice: 50000,
                maxPrice: 62000,
                rating: 4.7,
                city: "Mumbai",
                type: "Private",
            },
            {
                hospitalName: "Safdarjung Hospital",
                hospitalSlug: "safdarjung-hospital-delhi",
                price: 12000,
                minPrice: 8000,
                maxPrice: 18000,
                rating: 4.2,
                city: "Delhi",
                type: "Government",
            },
        ];

        setTimeout(() => {
            setPriceData(mockData);
            setLoading(false);
        }, 500);
    }, [resolvedParams]);

    const sortedData = [...priceData].sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        return b.rating - a.rating;
    });

    const avgPrice =
        priceData.length > 0
            ? Math.round(priceData.reduce((sum, d) => sum + d.price, 0) / priceData.length)
            : 0;
    const minPrice = priceData.length > 0 ? Math.min(...priceData.map((d) => d.price)) : 0;
    const maxPrice = priceData.length > 0 ? Math.max(...priceData.map((d) => d.price)) : 0;

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero */}
            <section className="bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <div className="badge badge-primary badge-lg mb-4">Procedure</div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 capitalize">
                            {procedureName}
                        </h1>
                        <p className="text-base-content/70 mb-6">
                            Compare prices across hospitals in Mumbai and Delhi for this
                            procedure. Prices are indicative and may vary based on individual
                            cases.
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-base-100 rounded-xl p-4 shadow">
                                <div className="flex items-center gap-2 text-success mb-1">
                                    <TrendingDown className="w-4 h-4" />
                                    <span className="text-sm">Lowest</span>
                                </div>
                                <p className="text-xl font-bold">
                                    <IndianRupee className="inline w-4 h-4" />
                                    {minPrice.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-base-100 rounded-xl p-4 shadow">
                                <div className="flex items-center gap-2 text-warning mb-1">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-sm">Average</span>
                                </div>
                                <p className="text-xl font-bold">
                                    <IndianRupee className="inline w-4 h-4" />
                                    {avgPrice.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-base-100 rounded-xl p-4 shadow">
                                <div className="flex items-center gap-2 text-error mb-1">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-sm">Highest</span>
                                </div>
                                <p className="text-xl font-bold">
                                    <IndianRupee className="inline w-4 h-4" />
                                    {maxPrice.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Disclaimer */}
                <div className="alert alert-warning mb-6">
                    <AlertCircle className="w-5 h-5" />
                    <span>
                        Prices shown are estimates and may vary based on hospital, doctor,
                        and individual patient conditions. Always verify with the hospital
                        directly.
                    </span>
                </div>

                {/* Sort Controls */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                        {priceData.length} Hospitals Found
                    </h2>
                    <div className="join">
                        <button
                            className={`btn btn-sm join-item ${sortBy === "price" ? "btn-primary" : "btn-ghost"}`}
                            onClick={() => setSortBy("price")}
                        >
                            Sort by Price
                        </button>
                        <button
                            className={`btn btn-sm join-item ${sortBy === "rating" ? "btn-primary" : "btn-ghost"}`}
                            onClick={() => setSortBy("rating")}
                        >
                            Sort by Rating
                        </button>
                    </div>
                </div>

                {/* Price Comparison Table */}
                {loading ? (
                    <div className="grid gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="card bg-base-100 shadow animate-pulse">
                                <div className="card-body">
                                    <div className="h-6 bg-base-300 rounded w-1/3 mb-2" />
                                    <div className="h-4 bg-base-300 rounded w-1/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedData.map((hospital, index) => (
                            <div
                                key={hospital.hospitalSlug}
                                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="card-body">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            {index === 0 && sortBy === "price" && (
                                                <div className="badge badge-success badge-lg absolute -top-2 -left-2">
                                                    Best Price
                                                </div>
                                            )}
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Hospital className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">
                                                    {hospital.hospitalName}
                                                </h3>
                                                <div className="flex items-center gap-3 text-sm text-base-content/60">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {hospital.city}
                                                    </span>
                                                    <span
                                                        className={`badge badge-sm ${hospital.type === "Government" ? "badge-success" : "badge-info"}`}
                                                    >
                                                        {hospital.type}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-warning fill-warning" />
                                                        {hospital.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-primary">
                                                    <IndianRupee className="inline w-5 h-5" />
                                                    {hospital.price.toLocaleString()}
                                                </p>
                                                {hospital.minPrice && hospital.maxPrice && (
                                                    <p className="text-sm text-base-content/60">
                                                        Range: ₹{hospital.minPrice.toLocaleString()} - ₹
                                                        {hospital.maxPrice.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                            <Link
                                                href={`/hospital/${hospital.hospitalSlug}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                View Hospital
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Related Procedures */}
                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">Related Procedures</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "MRI Scan",
                            "CT Scan",
                            "X-Ray",
                            "Blood Test",
                            "Ultrasound",
                            "ECG",
                        ].map((proc) => (
                            <Link
                                key={proc}
                                href={`/procedure/${proc.toLowerCase().replace(/ /g, "-")}`}
                                className="badge badge-outline badge-lg hover:badge-primary cursor-pointer"
                            >
                                {proc}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
