"use client";

import {
    Building2,
    Target,
    Heart,
    Users,
    Shield,
    TrendingUp,
    Award,
    Globe,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

const values = [
    {
        icon: Shield,
        title: "Transparency",
        description: "We believe everyone deserves to know what healthcare costs before they need it.",
    },
    {
        icon: Heart,
        title: "Patient First",
        description: "Every decision we make puts patient welfare and affordability at the center.",
    },
    {
        icon: TrendingUp,
        title: "Data-Driven",
        description: "We use real billing data and analytics to provide accurate, actionable insights.",
    },
    {
        icon: Users,
        title: "Accessibility",
        description: "Healthcare cost information should be free and accessible to everyone.",
    },
];

const stats = [
    { value: "500+", label: "Hospitals" },
    { value: "10K+", label: "Procedures" },
    { value: "50K+", label: "Users Helped" },
    { value: "₹2Cr+", label: "Savings" },
];

const team = [
    { name: "Dr. Amit Sharma", role: "Founder & CEO", avatar: "AS" },
    { name: "Priya Patel", role: "Head of Product", avatar: "PP" },
    { name: "Rahul Verma", role: "Lead Engineer", avatar: "RV" },
    { name: "Sneha Gupta", role: "Data Science Lead", avatar: "SG" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero */}
            <section className="bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                            <Building2 className="w-5 h-5" />
                            <span className="font-medium">About MedMap</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Making Healthcare Costs
                            <br />
                            <span className="text-primary">Transparent for Everyone</span>
                        </h1>
                        <p className="text-lg text-base-content/70 leading-relaxed">
                            We started MedMap with a simple mission: no one should face a surprise
                            medical bill. By bringing transparency to healthcare pricing, we help
                            patients make informed decisions about their care.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 -mt-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="card bg-base-100 shadow-lg">
                                <div className="card-body items-center text-center p-6">
                                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-base-content/60">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-4">
                                <Target className="w-6 h-6" />
                                <span className="font-semibold">Our Mission</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-6">
                                Empowering Patients Through Price Transparency
                            </h2>
                            <p className="text-base-content/70 leading-relaxed mb-4">
                                Healthcare in India is excellent, but pricing remains opaque. Patients
                                often discover the true cost of care only after receiving treatment,
                                leading to financial stress and difficult decisions.
                            </p>
                            <p className="text-base-content/70 leading-relaxed">
                                MedMap aggregates real pricing data from hospitals across Mumbai and
                                Delhi, making it easy to compare costs, check insurance coverage, and
                                find quality care at fair prices.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {values.map((value) => (
                                <div key={value.title} className="card bg-base-100 shadow">
                                    <div className="card-body p-5">
                                        <value.icon className="w-8 h-8 text-primary mb-2" />
                                        <h3 className="font-semibold">{value.title}</h3>
                                        <p className="text-sm text-base-content/60">{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-base-content/60 max-w-2xl mx-auto">
                            A passionate team of healthcare professionals, engineers, and data
                            scientists working to make healthcare more accessible.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {team.map((member) => (
                            <div key={member.name} className="card bg-base-200">
                                <div className="card-body items-center text-center p-6">
                                    <div className="avatar placeholder mb-4">
                                        <div className="bg-primary text-primary-content rounded-full w-20">
                                            <span className="text-2xl">{member.avatar}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold">{member.name}</h3>
                                    <p className="text-sm text-base-content/60">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="card bg-linear-to-r from-primary to-secondary text-primary-content">
                        <div className="card-body items-center text-center py-12">
                            <Award className="w-12 h-12 mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Built for Hackvento</h2>
                            <p className="opacity-80 max-w-lg">
                                MedMap was created as part of the Hackvento hackathon, showcasing
                                how technology can improve healthcare accessibility in India.
                            </p>
                            <div className="flex items-center gap-4 mt-6">
                                <Globe className="w-5 h-5" />
                                <span>Serving Mumbai & Delhi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
