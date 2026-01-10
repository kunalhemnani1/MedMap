"use client";

import { useState } from "react";
import {
    Shield,
    Search,
    CheckCircle,
    XCircle,
    AlertCircle,
    Building2,
    FileText,
    Phone,
    ArrowRight,
    Loader2,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

interface InsuranceResult {
    hospital: string;
    covered: boolean;
    networkType: "in-network" | "out-of-network" | "partial";
    copay: number;
    deductible: number;
    estimatedCoverage: number;
    notes: string;
}

const insuranceProviders = [
    "Star Health Insurance",
    "HDFC ERGO Health",
    "ICICI Lombard Health",
    "Max Bupa Health",
    "Bajaj Allianz Health",
    "New India Assurance",
    "United India Insurance",
    "National Insurance",
    "Care Health Insurance",
    "Niva Bupa Health",
];

const mockResults: InsuranceResult[] = [
    {
        hospital: "Apollo Hospital, Indore",
        covered: true,
        networkType: "in-network",
        copay: 500,
        deductible: 2000,
        estimatedCoverage: 85,
        notes: "Full coverage for most procedures. Pre-authorization required for surgeries.",
    },
    {
        hospital: "Medanta Hospital, Indore",
        covered: true,
        networkType: "in-network",
        copay: 750,
        deductible: 2500,
        estimatedCoverage: 80,
        notes: "Covered under premium network. Some specialty treatments may have limits.",
    },
    {
        hospital: "Bombay Hospital, Indore",
        covered: true,
        networkType: "partial",
        copay: 1000,
        deductible: 3000,
        estimatedCoverage: 60,
        notes: "Partial coverage. Outpatient services may not be covered.",
    },
    {
        hospital: "CHL Hospital, Indore",
        covered: false,
        networkType: "out-of-network",
        copay: 0,
        deductible: 0,
        estimatedCoverage: 0,
        notes: "Not in network. You may need to pay full amount and claim reimbursement.",
    },
];

export default function InsuranceCheckerPage() {
    const [provider, setProvider] = useState("");
    const [policyNumber, setPolicyNumber] = useState("");
    const [procedure, setProcedure] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<InsuranceResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (!provider) {
            setError("Please select an insurance provider");
            setIsLoading(false);
            return;
        }

        setResults(mockResults);
        setIsLoading(false);
    };

    const getNetworkBadge = (type: InsuranceResult["networkType"]) => {
        switch (type) {
            case "in-network":
                return <span className="badge badge-success gap-1"><CheckCircle className="w-3 h-3" /> In-Network</span>;
            case "out-of-network":
                return <span className="badge badge-error gap-1"><XCircle className="w-3 h-3" /> Out-of-Network</span>;
            case "partial":
                return <span className="badge badge-warning gap-1"><AlertCircle className="w-3 h-3" /> Partial</span>;
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero Section */}
            <section className="bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                            <Shield className="w-5 h-5" />
                            <span className="font-medium">Insurance Verification</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Check Your Insurance Coverage
                        </h1>
                        <p className="text-lg text-base-content/70">
                            Verify which hospitals accept your insurance and understand your coverage
                            before you visit. No surprises, just transparency.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-lg sticky top-24">
                            <div className="card-body">
                                <h2 className="card-title mb-4">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Your Insurance Details
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Insurance Provider</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={provider}
                                            onChange={(e) => setProvider(e.target.value)}
                                        >
                                            <option value="">Select provider...</option>
                                            {insuranceProviders.map((p) => (
                                                <option key={p} value={p}>
                                                    {p}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Policy Number</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., POL123456789"
                                            className="input input-bordered w-full"
                                            value={policyNumber}
                                            onChange={(e) => setPolicyNumber(e.target.value)}
                                        />
                                        <label className="label">
                                            <span className="label-text-alt text-base-content/60">
                                                Optional - for more accurate results
                                            </span>
                                        </label>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Procedure (Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., MRI Scan, Knee Replacement"
                                            className="input input-bordered w-full"
                                            value={procedure}
                                            onChange={(e) => setProcedure(e.target.value)}
                                        />
                                    </div>

                                    {error && (
                                        <div className="alert alert-error">
                                            <AlertCircle className="w-5 h-5" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Checking Coverage...
                                            </>
                                        ) : (
                                            <>
                                                <Search className="w-5 h-5" />
                                                Check Coverage
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="divider">Need Help?</div>

                                <a href="tel:1800-123-4567" className="btn btn-outline btn-sm gap-2">
                                    <Phone className="w-4 h-4" />
                                    Call Support
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2">
                        {!results && !isLoading && (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body items-center text-center py-16">
                                    <Shield className="w-16 h-16 text-base-content/20 mb-4" />
                                    <h3 className="text-xl font-semibold">Enter Your Insurance Details</h3>
                                    <p className="text-base-content/60 max-w-md">
                                        Fill out the form to see which hospitals in your area accept your
                                        insurance and what your estimated coverage will be.
                                    </p>
                                </div>
                            </div>
                        )}

                        {isLoading && (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body items-center text-center py-16">
                                    <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                                    <h3 className="text-xl font-semibold">Checking Coverage...</h3>
                                    <p className="text-base-content/60">
                                        Verifying your insurance with network hospitals
                                    </p>
                                </div>
                            </div>
                        )}

                        {results && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">
                                        Coverage Results for {provider}
                                    </h2>
                                    <span className="badge badge-lg">{results.length} hospitals found</span>
                                </div>

                                {results.map((result, index) => (
                                    <div
                                        key={index}
                                        className={`card bg-base-100 shadow-lg border-l-4 ${result.covered
                                            ? result.networkType === "in-network"
                                                ? "border-success"
                                                : "border-warning"
                                            : "border-error"
                                            }`}
                                    >
                                        <div className="card-body">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Building2 className="w-5 h-5 text-primary" />
                                                        <h3 className="font-semibold text-lg">{result.hospital}</h3>
                                                    </div>
                                                    {getNetworkBadge(result.networkType)}
                                                </div>

                                                {result.covered && (
                                                    <div className="text-right">
                                                        <div className="text-3xl font-bold text-primary">
                                                            {result.estimatedCoverage}%
                                                        </div>
                                                        <div className="text-sm text-base-content/60">
                                                            Estimated Coverage
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {result.covered && (
                                                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                                    <div className="bg-base-200 rounded-lg p-3">
                                                        <div className="text-sm text-base-content/60">Copay</div>
                                                        <div className="font-semibold">₹{result.copay.toLocaleString()}</div>
                                                    </div>
                                                    <div className="bg-base-200 rounded-lg p-3">
                                                        <div className="text-sm text-base-content/60">Deductible</div>
                                                        <div className="font-semibold">₹{result.deductible.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            )}

                                            <p className="text-base-content/70 mt-2">{result.notes}</p>

                                            <div className="card-actions justify-end mt-4">
                                                <a
                                                    href={`/hospital/${result.hospital.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                                    className="btn btn-primary btn-sm gap-1"
                                                >
                                                    View Hospital
                                                    <ArrowRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="alert alert-info">
                                    <AlertCircle className="w-5 h-5" />
                                    <div>
                                        <h4 className="font-semibold">Disclaimer</h4>
                                        <p className="text-sm">
                                            Coverage estimates are approximate and subject to your specific policy terms.
                                            Please contact your insurance provider for exact coverage details.
                                        </p>
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
