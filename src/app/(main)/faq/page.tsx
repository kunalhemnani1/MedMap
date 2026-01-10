"use client";

import { useState } from "react";
import {
    HelpCircle,
    Search,
    ChevronDown,
    ChevronUp,
    MessageCircle,
    Phone,
    Mail,
    FileText,
    CreditCard,
    Building2,
    Shield,
    Users,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        category: "General",
        question: "What is MedMap?",
        answer:
            "MedMap is a healthcare price transparency platform that helps you compare medical procedure costs across hospitals in Mumbai and Delhi. We aggregate real pricing data to help you make informed healthcare decisions.",
    },
    {
        category: "General",
        question: "How accurate are the prices shown?",
        answer:
            "Our prices are updated regularly from hospital billing data, insurance claims, and user submissions. While we strive for accuracy, actual costs may vary based on your specific condition, hospital, and insurance coverage. Always confirm with the hospital before booking.",
    },
    {
        category: "General",
        question: "Is MedMap free to use?",
        answer:
            "Yes! MedMap is completely free for patients. We believe healthcare cost transparency should be accessible to everyone.",
    },
    {
        category: "Pricing",
        question: "Why do prices vary so much between hospitals?",
        answer:
            "Healthcare pricing varies based on factors like hospital accreditation (NABH/JCI), location, doctor experience, equipment quality, and overhead costs. Our platform helps you understand these differences so you can make the best choice for your needs and budget.",
    },
    {
        category: "Pricing",
        question: "Do the prices include all costs?",
        answer:
            "Prices shown typically include the base procedure cost. Additional costs like room charges, medications, diagnostic tests, and doctor fees may apply. Use our Price Estimator tool for a more comprehensive cost breakdown.",
    },
    {
        category: "Insurance",
        question: "How does the insurance checker work?",
        answer:
            "Enter your insurance provider and policy details, and we'll show you which hospitals in our network accept your insurance, estimated coverage percentages, copay amounts, and deductible information.",
    },
    {
        category: "Insurance",
        question: "Which insurance providers do you support?",
        answer:
            "We support major Indian health insurers including Star Health, HDFC ERGO, ICICI Lombard, Max Bupa, Bajaj Allianz, New India Assurance, and more. The list is constantly expanding.",
    },
    {
        category: "Booking",
        question: "Can I book appointments through MedMap?",
        answer:
            "Currently, we provide contact information and directions to hospitals. Direct booking integration is coming soon. For now, you can use our platform to research and compare, then contact hospitals directly.",
    },
    {
        category: "Booking",
        question: "How do I save hospitals for later?",
        answer:
            "Create a free account to save hospitals, track your search history, and manage insurance profiles. Your saved items will sync across all your devices.",
    },
];

const categories = ["All", "General", "Pricing", "Insurance", "Booking"];

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openItems, setOpenItems] = useState<number[]>([0]);

    const filteredFAQs = faqData.filter((faq) => {
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleItem = (index: number) => {
        setOpenItems((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const getCategoryIcon = (cat: string) => {
        switch (cat) {
            case "General":
                return <HelpCircle className="w-4 h-4" />;
            case "Pricing":
                return <CreditCard className="w-4 h-4" />;
            case "Insurance":
                return <Shield className="w-4 h-4" />;
            case "Booking":
                return <Building2 className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero */}
            <section className="bg-linear-to-br from-warning/10 via-base-100 to-primary/10 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-full mb-6">
                            <HelpCircle className="w-5 h-5" />
                            <span className="font-medium">Help Center</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            How can we help you?
                        </h1>
                        <p className="text-lg text-base-content/70 mb-8">
                            Find answers to common questions about MedMap, pricing, insurance,
                            and more.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                className="input input-bordered w-full pl-12 h-14"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Categories Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-lg sticky top-24">
                            <div className="card-body">
                                <h3 className="font-semibold mb-4">Categories</h3>
                                <ul className="menu p-0 gap-1">
                                    {categories.map((cat) => (
                                        <li key={cat}>
                                            <button
                                                className={selectedCategory === cat ? "active" : ""}
                                                onClick={() => setSelectedCategory(cat)}
                                            >
                                                {getCategoryIcon(cat)}
                                                {cat}
                                                {cat !== "All" && (
                                                    <span className="badge badge-sm">
                                                        {faqData.filter((f) => f.category === cat).length}
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">
                                {filteredFAQs.length} questions found
                            </h2>
                        </div>

                        {filteredFAQs.length === 0 ? (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body items-center text-center py-12">
                                    <Search className="w-12 h-12 text-base-content/20 mb-4" />
                                    <h3 className="text-lg font-semibold">No results found</h3>
                                    <p className="text-base-content/60">
                                        Try adjusting your search or browse by category
                                    </p>
                                </div>
                            </div>
                        ) : (
                            filteredFAQs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="card bg-base-100 shadow-lg overflow-hidden"
                                >
                                    <button
                                        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-base-200/50 transition-colors"
                                        onClick={() => toggleItem(index)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="badge badge-primary badge-sm mt-1">
                                                {faq.category}
                                            </span>
                                            <h3 className="font-semibold text-lg">{faq.question}</h3>
                                        </div>
                                        {openItems.includes(index) ? (
                                            <ChevronUp className="w-5 h-5 shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 shrink-0" />
                                        )}
                                    </button>
                                    {openItems.includes(index) && (
                                        <div className="px-6 pb-6 pt-0">
                                            <div className="pl-16 text-base-content/70 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}

                        {/* Contact Card */}
                        <div className="card bg-primary text-primary-content mt-8">
                            <div className="card-body">
                                <h3 className="card-title">
                                    <Users className="w-5 h-5" />
                                    Still have questions?
                                </h3>
                                <p className="opacity-80">
                                    Our support team is here to help you.
                                </p>
                                <div className="card-actions mt-4 flex-wrap">
                                    <a href="mailto:medmap@example.com" className="btn btn-ghost gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Us
                                    </a>
                                    <a href="tel:1800-123-4567" className="btn btn-ghost gap-2">
                                        <Phone className="w-4 h-4" />
                                        Call Us
                                    </a>
                                    <button className="btn btn-ghost gap-2">
                                        <MessageCircle className="w-4 h-4" />
                                        Live Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
