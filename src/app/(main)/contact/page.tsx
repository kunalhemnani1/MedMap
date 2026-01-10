"use client";

import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageCircle,
    Clock,
    CheckCircle,
    Loader2,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero */}
            <section className="bg-linear-to-br from-accent/10 via-base-100 to-primary/10 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-medium">Contact Us</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-base-content/70">
                            Have questions about MedMap? We&apos;re here to help. Reach out and
                            we&apos;ll respond as soon as we can.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <a
                                            href="mailto:medmap@example.com"
                                            className="text-primary hover:underline"
                                        >
                                            medmap@example.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <a
                                            href="tel:1800-123-4567"
                                            className="text-secondary hover:underline"
                                        >
                                            1800-123-4567
                                        </a>
                                        <p className="text-sm text-base-content/60">Toll-free</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Office</h3>
                                        <p className="text-base-content/70">
                                            Mumbai, Maharashtra
                                            <br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-success" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Support Hours</h3>
                                        <p className="text-base-content/70">
                                            Mon - Sat: 9AM - 6PM
                                            <br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8 text-success" />
                                        </div>
                                        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                                        <p className="text-base-content/60 mb-6">
                                            Thank you for reaching out. We&apos;ll get back to you within
                                            24 hours.
                                        </p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormData({ name: "", email: "", subject: "", message: "" });
                                            }}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="card-title mb-6">Send us a Message</h2>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Name</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Your name"
                                                        className="input input-bordered"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, name: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Email</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        placeholder="your@email.com"
                                                        className="input input-bordered"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, email: e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">Subject</span>
                                                </label>
                                                <select
                                                    className="select select-bordered"
                                                    required
                                                    value={formData.subject}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, subject: e.target.value })
                                                    }
                                                >
                                                    <option value="">Select a topic...</option>
                                                    <option value="general">General Inquiry</option>
                                                    <option value="pricing">Pricing Question</option>
                                                    <option value="hospital">Hospital Information</option>
                                                    <option value="insurance">Insurance Help</option>
                                                    <option value="bug">Report a Bug</option>
                                                    <option value="feedback">Feedback</option>
                                                </select>
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">Message</span>
                                                </label>
                                                <textarea
                                                    className="textarea textarea-bordered h-32"
                                                    placeholder="How can we help you?"
                                                    required
                                                    value={formData.message}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, message: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary w-full md:w-auto"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5" />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
