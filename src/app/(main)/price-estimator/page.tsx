"use client";

import { useState } from "react";
import {
    Calculator,
    IndianRupee,
    TrendingUp,
    TrendingDown,
    Building2,
    ChevronRight,
    Info,
    AlertCircle,
    CheckCircle,
    Plus,
    X,
    Loader2,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

interface ProcedureOption {
    id: string;
    name: string;
    category: string;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
}

interface EstimateResult {
    hospital: string;
    location: string;
    price: number;
    rating: number;
    savings: number;
    accreditation: string[];
}

const procedures: ProcedureOption[] = [
    { id: "1", name: "MRI Scan - Brain", category: "Diagnostic", avgPrice: 8500, minPrice: 5000, maxPrice: 15000 },
    { id: "2", name: "CT Scan - Full Body", category: "Diagnostic", avgPrice: 6500, minPrice: 4000, maxPrice: 12000 },
    { id: "3", name: "X-Ray - Chest", category: "Diagnostic", avgPrice: 500, minPrice: 200, maxPrice: 1000 },
    { id: "4", name: "Blood Test - Complete Panel", category: "Pathology", avgPrice: 1500, minPrice: 800, maxPrice: 3000 },
    { id: "5", name: "Knee Replacement Surgery", category: "Orthopedic", avgPrice: 250000, minPrice: 150000, maxPrice: 400000 },
    { id: "6", name: "Hip Replacement Surgery", category: "Orthopedic", avgPrice: 280000, minPrice: 180000, maxPrice: 450000 },
    { id: "7", name: "Cataract Surgery", category: "Ophthalmology", avgPrice: 35000, minPrice: 20000, maxPrice: 60000 },
    { id: "8", name: "Appendectomy", category: "General Surgery", avgPrice: 45000, minPrice: 25000, maxPrice: 80000 },
    { id: "9", name: "Angioplasty", category: "Cardiology", avgPrice: 180000, minPrice: 120000, maxPrice: 300000 },
    { id: "10", name: "Bypass Surgery", category: "Cardiology", avgPrice: 350000, minPrice: 250000, maxPrice: 500000 },
    { id: "11", name: "Normal Delivery", category: "Maternity", avgPrice: 35000, minPrice: 15000, maxPrice: 60000 },
    { id: "12", name: "C-Section Delivery", category: "Maternity", avgPrice: 65000, minPrice: 40000, maxPrice: 120000 },
];

const mockEstimates: EstimateResult[] = [
    { hospital: "City Care Hospital", location: "Indore", price: 7500, rating: 4.5, savings: 1500, accreditation: ["NABH"] },
    { hospital: "Apollo Hospital", location: "Indore", price: 9000, rating: 4.8, savings: 0, accreditation: ["NABH", "JCI"] },
    { hospital: "Medanta Hospital", location: "Indore", price: 8200, rating: 4.6, savings: 800, accreditation: ["NABH"] },
    { hospital: "CHL Hospital", location: "Indore", price: 6800, rating: 4.2, savings: 2200, accreditation: [] },
    { hospital: "Bombay Hospital", location: "Indore", price: 7800, rating: 4.4, savings: 1200, accreditation: ["NABH"] },
];

export default function PriceEstimatorPage() {
    const [selectedProcedures, setSelectedProcedures] = useState<ProcedureOption[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("Indore");
    const [isLoading, setIsLoading] = useState(false);
    const [estimates, setEstimates] = useState<EstimateResult[] | null>(null);

    const filteredProcedures = procedures.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalEstimate = selectedProcedures.reduce((sum, p) => sum + p.avgPrice, 0);
    const minEstimate = selectedProcedures.reduce((sum, p) => sum + p.minPrice, 0);
    const maxEstimate = selectedProcedures.reduce((sum, p) => sum + p.maxPrice, 0);

    const addProcedure = (procedure: ProcedureOption) => {
        if (!selectedProcedures.find((p) => p.id === procedure.id)) {
            setSelectedProcedures([...selectedProcedures, procedure]);
        }
        setSearchQuery("");
    };

    const removeProcedure = (id: string) => {
        setSelectedProcedures(selectedProcedures.filter((p) => p.id !== id));
    };

    const handleGetEstimates = async () => {
        if (selectedProcedures.length === 0) return;
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setEstimates(mockEstimates);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero Section */}
            <section className="bg-linear-to-br from-secondary/10 via-base-100 to-primary/10 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
                            <Calculator className="w-5 h-5" />
                            <span className="font-medium">Price Estimator</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Estimate Your Medical Costs
                        </h1>
                        <p className="text-lg text-base-content/70">
                            Get instant cost estimates for medical procedures across hospitals.
                            Compare prices and find the best value for your healthcare needs.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Procedure Selection */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title mb-4">
                                    <Plus className="w-5 h-5 text-primary" />
                                    Select Procedures
                                </h2>

                                {/* Search Input */}
                                <div className="form-control">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search for procedures (e.g., MRI, Surgery, X-Ray)..."
                                            className="input input-bordered w-full pr-4"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Search Results Dropdown */}
                                {searchQuery && (
                                    <div className="bg-base-200 rounded-lg max-h-64 overflow-y-auto">
                                        {filteredProcedures.length === 0 ? (
                                            <div className="p-4 text-center text-base-content/60">
                                                No procedures found
                                            </div>
                                        ) : (
                                            filteredProcedures.map((procedure) => (
                                                <button
                                                    key={procedure.id}
                                                    className="w-full p-3 text-left hover:bg-base-300 flex items-center justify-between transition-colors"
                                                    onClick={() => addProcedure(procedure)}
                                                >
                                                    <div>
                                                        <div className="font-medium">{procedure.name}</div>
                                                        <div className="text-sm text-base-content/60">
                                                            {procedure.category}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-semibold text-primary">
                                                            ₹{procedure.avgPrice.toLocaleString()}
                                                        </div>
                                                        <div className="text-xs text-base-content/60">avg price</div>
                                                    </div>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                )}

                                {/* Selected Procedures */}
                                {selectedProcedures.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-medium mb-3">Selected Procedures:</h3>
                                        <div className="space-y-2">
                                            {selectedProcedures.map((procedure) => (
                                                <div
                                                    key={procedure.id}
                                                    className="flex items-center justify-between bg-base-200 rounded-lg p-3"
                                                >
                                                    <div>
                                                        <div className="font-medium">{procedure.name}</div>
                                                        <div className="text-sm text-base-content/60">
                                                            ₹{procedure.minPrice.toLocaleString()} - ₹{procedure.maxPrice.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-right">
                                                            <div className="font-semibold">
                                                                ₹{procedure.avgPrice.toLocaleString()}
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="btn btn-ghost btn-sm btn-circle"
                                                            onClick={() => removeProcedure(procedure.id)}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedProcedures.length === 0 && !searchQuery && (
                                    <div className="text-center py-8 text-base-content/60">
                                        <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>Start by searching for a procedure above</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Hospital Estimates */}
                        {estimates && (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">
                                        <Building2 className="w-5 h-5 text-primary" />
                                        Hospital Price Comparison
                                    </h2>

                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Hospital</th>
                                                    <th>Rating</th>
                                                    <th>Accreditation</th>
                                                    <th className="text-right">Price</th>
                                                    <th className="text-right">Savings</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {estimates
                                                    .sort((a, b) => a.price - b.price)
                                                    .map((est, index) => (
                                                        <tr key={index} className={index === 0 ? "bg-success/10" : ""}>
                                                            <td>
                                                                <div className="flex items-center gap-2">
                                                                    {index === 0 && (
                                                                        <span className="badge badge-success badge-sm">Best Price</span>
                                                                    )}
                                                                    <div>
                                                                        <div className="font-medium">{est.hospital}</div>
                                                                        <div className="text-sm text-base-content/60">{est.location}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="flex items-center gap-1">
                                                                    <span className="text-warning">★</span>
                                                                    {est.rating}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="flex gap-1">
                                                                    {est.accreditation.length > 0 ? (
                                                                        est.accreditation.map((acc) => (
                                                                            <span key={acc} className="badge badge-outline badge-sm">
                                                                                {acc}
                                                                            </span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="text-base-content/40">-</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="text-right font-semibold">
                                                                ₹{est.price.toLocaleString()}
                                                            </td>
                                                            <td className="text-right">
                                                                {est.savings > 0 ? (
                                                                    <span className="text-success flex items-center justify-end gap-1">
                                                                        <TrendingDown className="w-4 h-4" />
                                                                        ₹{est.savings.toLocaleString()}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-base-content/40">-</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="alert mt-4">
                                        <Info className="w-5 h-5" />
                                        <span className="text-sm">
                                            Prices are estimates based on average costs. Actual prices may vary based on
                                            your specific condition and requirements.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Estimate Summary */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-lg sticky top-24">
                            <div className="card-body">
                                <h2 className="card-title mb-4">
                                    <IndianRupee className="w-5 h-5 text-primary" />
                                    Cost Summary
                                </h2>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text font-medium">Location</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    >
                                        <option value="Indore">Indore, MP</option>
                                        <option value="Bhopal">Bhopal, MP</option>
                                        <option value="Jabalpur">Jabalpur, MP</option>
                                        <option value="Gwalior">Gwalior, MP</option>
                                    </select>
                                </div>

                                <div className="divider"></div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Procedures</span>
                                        <span className="font-medium">{selectedProcedures.length}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Min Estimate</span>
                                        <span className="font-medium text-success">
                                            ₹{minEstimate.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-base-content/70">Max Estimate</span>
                                        <span className="font-medium text-error">
                                            ₹{maxEstimate.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="divider"></div>

                                    <div className="flex justify-between text-lg">
                                        <span className="font-semibold">Average Total</span>
                                        <span className="font-bold text-primary">
                                            ₹{totalEstimate.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {selectedProcedures.length > 0 && (
                                    <div className="bg-base-200 rounded-lg p-3 mt-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <TrendingUp className="w-4 h-4 text-primary" />
                                            <span>
                                                Price range varies by{" "}
                                                <strong>
                                                    ₹{(maxEstimate - minEstimate).toLocaleString()}
                                                </strong>
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    className="btn btn-primary w-full mt-6"
                                    disabled={selectedProcedures.length === 0 || isLoading}
                                    onClick={handleGetEstimates}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Getting Estimates...
                                        </>
                                    ) : (
                                        <>
                                            Compare Hospital Prices
                                            <ChevronRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                {selectedProcedures.length === 0 && (
                                    <p className="text-sm text-center text-base-content/60 mt-2">
                                        Select at least one procedure
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
