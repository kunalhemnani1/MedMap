"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Hospital,
    Building2,
    CheckCircle,
    ArrowRight,
    Upload,
    FileText,
    BadgeCheck,
    Clock,
    TrendingUp,
    Users,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function ProviderRegisterPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        hospitalName: "",
        registrationNumber: "",
        hospitalType: "",
        address: "",
        city: "",
        contactPerson: "",
        email: "",
        phone: "",
    });

    const benefits = [
        {
            icon: Users,
            title: "Reach More Patients",
            desc: "Get discovered by thousands of patients looking for healthcare services",
        },
        {
            icon: TrendingUp,
            title: "Increase Visibility",
            desc: "Showcase your services, prices, and patient reviews",
        },
        {
            icon: BadgeCheck,
            title: "Build Trust",
            desc: "Verified badge helps patients trust your hospital",
        },
        {
            icon: Clock,
            title: "Save Time",
            desc: "Reduce inquiry calls with transparent pricing information",
        },
    ];

    const steps = [
        { num: 1, title: "Basic Info", desc: "Hospital details" },
        { num: 2, title: "Verification", desc: "Upload documents" },
        { num: 3, title: "Review", desc: "Submit for approval" },
    ];

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero */}
            <section className="bg-linear-to-br from-primary/10 via-base-100 to-accent/10 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                            <Hospital className="w-5 h-5" />
                            <span className="font-medium">For Healthcare Providers</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Partner with MedMap
                        </h1>
                        <p className="text-lg text-base-content/70 mb-8">
                            Join India&apos;s leading healthcare price transparency platform. List
                            your hospital and reach millions of patients seeking quality
                            healthcare.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#register" className="btn btn-primary btn-lg">
                                Register Your Hospital
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <Link href="/providers/dashboard" className="btn btn-outline btn-lg">
                                Already Registered? Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Partner with Us?</h2>
                        <p className="text-base-content/60">
                            Benefits of listing your hospital on MedMap
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="card bg-base-200">
                                <div className="card-body items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <benefit.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="card-title text-lg">{benefit.title}</h3>
                                    <p className="text-base-content/60">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Form */}
            <section id="register" className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4">Register Your Hospital</h2>
                            <p className="text-base-content/60">
                                Complete the registration in 3 simple steps
                            </p>
                        </div>

                        {/* Progress Steps */}
                        <ul className="steps steps-horizontal w-full mb-8">
                            {steps.map((s) => (
                                <li
                                    key={s.num}
                                    className={`step ${step >= s.num ? "step-primary" : ""}`}
                                >
                                    {s.title}
                                </li>
                            ))}
                        </ul>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold mb-4">
                                            Hospital Information
                                        </h3>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">
                                                    Hospital Name
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter hospital name"
                                                className="input input-bordered"
                                                value={formData.hospitalName}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, hospitalName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">
                                                        Registration Number
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Hospital registration number"
                                                    className="input input-bordered"
                                                    value={formData.registrationNumber}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            registrationNumber: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">
                                                        Hospital Type
                                                    </span>
                                                </label>
                                                <select
                                                    className="select select-bordered"
                                                    value={formData.hospitalType}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, hospitalType: e.target.value })
                                                    }
                                                >
                                                    <option value="">Select type</option>
                                                    <option value="private">Private</option>
                                                    <option value="government">Government</option>
                                                    <option value="trust">Trust/Charity</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Address</span>
                                            </label>
                                            <textarea
                                                className="textarea textarea-bordered"
                                                placeholder="Full hospital address"
                                                value={formData.address}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">City</span>
                                            </label>
                                            <select
                                                className="select select-bordered"
                                                value={formData.city}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, city: e.target.value })
                                                }
                                            >
                                                <option value="">Select city</option>
                                                <option value="mumbai">Mumbai</option>
                                                <option value="delhi">Delhi</option>
                                            </select>
                                        </div>
                                        <div className="card-actions justify-end mt-6">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setStep(2)}
                                            >
                                                Continue
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold mb-4">
                                            Document Verification
                                        </h3>
                                        <p className="text-base-content/60 mb-6">
                                            Upload the following documents for verification
                                        </p>

                                        <div className="grid gap-4">
                                            {[
                                                {
                                                    title: "Hospital Registration Certificate",
                                                    desc: "PDF or image format",
                                                },
                                                { title: "NABH/JCI Accreditation", desc: "If applicable" },
                                                {
                                                    title: "Contact Person ID",
                                                    desc: "Government issued ID",
                                                },
                                            ].map((doc, i) => (
                                                <div
                                                    key={i}
                                                    className="border-2 border-dashed border-base-300 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer"
                                                >
                                                    <Upload className="w-8 h-8 mx-auto mb-2 text-base-content/40" />
                                                    <p className="font-medium">{doc.title}</p>
                                                    <p className="text-sm text-base-content/60">
                                                        {doc.desc}
                                                    </p>
                                                    <input type="file" className="hidden" />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">
                                                        Contact Person Name
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Name of authorized person"
                                                    className="input input-bordered"
                                                    value={formData.contactPerson}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            contactPerson: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">
                                                        Contact Email
                                                    </span>
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="official@hospital.com"
                                                    className="input input-bordered"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, email: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">
                                                    Contact Phone
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+91 XXXXX XXXXX"
                                                className="input input-bordered"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, phone: e.target.value })
                                                }
                                            />
                                        </div>

                                        <div className="card-actions justify-between mt-6">
                                            <button
                                                className="btn btn-ghost"
                                                onClick={() => setStep(1)}
                                            >
                                                Back
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setStep(3)}
                                            >
                                                Continue
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="w-8 h-8 text-success" />
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">
                                                Ready to Submit
                                            </h3>
                                            <p className="text-base-content/60">
                                                Please review your information before submitting
                                            </p>
                                        </div>

                                        <div className="bg-base-200 rounded-xl p-6">
                                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                                                <Building2 className="w-5 h-5" />
                                                Hospital Details
                                            </h4>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-base-content/60">Name:</span>
                                                    <p className="font-medium">
                                                        {formData.hospitalName || "Not provided"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-base-content/60">Type:</span>
                                                    <p className="font-medium capitalize">
                                                        {formData.hospitalType || "Not provided"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-base-content/60">City:</span>
                                                    <p className="font-medium capitalize">
                                                        {formData.city || "Not provided"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-base-content/60">Contact:</span>
                                                    <p className="font-medium">
                                                        {formData.contactPerson || "Not provided"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-base-200 rounded-xl p-6">
                                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                                                <FileText className="w-5 h-5" />
                                                Documents Uploaded
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="badge badge-success gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Registration Certificate
                                                </span>
                                                <span className="badge badge-success gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Contact ID
                                                </span>
                                            </div>
                                        </div>

                                        <div className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-primary"
                                                />
                                                <span className="label-text">
                                                    I agree to the{" "}
                                                    <a href="#" className="link link-primary">
                                                        Terms & Conditions
                                                    </a>{" "}
                                                    and{" "}
                                                    <a href="#" className="link link-primary">
                                                        Privacy Policy
                                                    </a>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="card-actions justify-between mt-6">
                                            <button
                                                className="btn btn-ghost"
                                                onClick={() => setStep(2)}
                                            >
                                                Back
                                            </button>
                                            <button className="btn btn-primary btn-lg">
                                                Submit for Review
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
