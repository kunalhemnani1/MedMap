"use client";
import { useState, use } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  BadgeCheck,
  Heart,
  Share2,
  Navigation,
  Building2,
  ChevronRight,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

interface HospitalPageProps {
  params: Promise<{ slug: string }>;
}

const TABS = ["Overview", "Procedures", "Reviews", "Location", "Contact"];

// Mock data for demo
const mockHospital = {
  name: "Apollo Hospital",
  address: "21 Greams Lane, Off Greams Road, Thousand Lights West",
  district: "Mumbai",
  state: "Maharashtra",
  pincode: 400001,
  phone: "+91 98765 43210",
  rating: 4.5,
  reviewCount: 328,
  isOpen: true,
  accreditation: ["NABH", "JCI"],
  about:
    "Apollo Hospitals is a premier healthcare provider in India, known for cutting-edge technology and world-class medical expertise. With over 40 years of excellence, we offer comprehensive healthcare services across multiple specialties.",
  specialties: [
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Oncology",
    "Gastroenterology",
  ],
  facilities: ["24x7 Emergency", "ICU", "Pharmacy", "Diagnostic Lab", "Parking"],
  procedures: [
    { name: "MRI Scan - Brain", price: 4500 },
    { name: "CT Scan - Chest", price: 3200 },
    { name: "X-Ray", price: 500 },
    { name: "Blood Test Panel", price: 1200 },
    { name: "Echocardiogram", price: 2500 },
  ],
  reviews: [
    {
      author: "Rahul M.",
      rating: 5,
      date: "2 weeks ago",
      text: "Excellent service and very professional staff. The doctors explained everything clearly.",
    },
    {
      author: "Priya S.",
      rating: 4,
      date: "1 month ago",
      text: "Good hospital with modern facilities. Wait times could be better.",
    },
  ],
};

export default function HospitalDetailPage({ params }: HospitalPageProps) {
  const { slug } = use(params);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSaved, setIsSaved] = useState(false);

  const hospital = mockHospital; // In real app, fetch by slug

  return (
    <div className="min-h-screen bg-base-100">
      <Breadcrumb
        items={[
          { label: "Search", href: "/search" },
          { label: hospital.name, href: `/hospital/${slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative h-64 md:h-96 bg-base-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="w-24 h-24 text-base-content/20" />
              </div>
              {/* Add real images here */}
            </div>
          </div>

          {/* Info Card */}
          <div className="card bg-base-100 border border-base-200 shadow-lg">
            <div className="card-body">
              <h1 className="card-title text-2xl">{hospital.name}</h1>

              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-medium">{hospital.rating}</span>
                <span className="text-base-content/50">
                  ({hospital.reviewCount} reviews)
                </span>
              </div>

              <p className="text-sm text-base-content/70 flex items-start gap-2 mt-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                {hospital.address}, {hospital.district}, {hospital.state} -{" "}
                {hospital.pincode}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {hospital.accreditation.map((acc) => (
                  <span
                    key={acc}
                    className="badge badge-primary badge-outline gap-1"
                  >
                    <BadgeCheck className="w-3 h-3" />
                    {acc}
                  </span>
                ))}
                {hospital.isOpen && (
                  <span className="badge badge-success gap-1">
                    <Clock className="w-3 h-3" />
                    Open Now
                  </span>
                )}
              </div>

              <div className="divider" />

              <div className="flex gap-2">
                <button
                  className={`btn btn-sm flex-1 ${isSaved ? "btn-primary" : "btn-outline"
                    }`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart
                    className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                  />
                  {isSaved ? "Saved" : "Save"}
                </button>
                <button className="btn btn-sm btn-outline">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="btn btn-sm btn-outline">
                  <Navigation className="w-4 h-4" />
                  Directions
                </button>
              </div>

              <a
                href={`tel:${hospital.phone}`}
                className="btn btn-primary btn-block mt-4"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs tabs-bordered mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab tab-lg ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-100">
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-base-content/70 leading-relaxed mb-6">
                  {hospital.about}
                </p>

                <h3 className="font-semibold mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {hospital.specialties.map((s) => (
                    <span key={s} className="badge badge-lg badge-ghost">
                      {s}
                    </span>
                  ))}
                </div>

                <h3 className="font-semibold mb-3">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {hospital.facilities.map((f) => (
                    <span key={f} className="badge badge-lg badge-outline">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h2 className="card-title">Quick Price Check</h2>
                  <div className="divide-y divide-base-300">
                    {hospital.procedures.slice(0, 5).map((proc) => (
                      <div
                        key={proc.name}
                        className="flex items-center justify-between py-3"
                      >
                        <span className="text-sm">{proc.name}</span>
                        <span className="font-semibold text-primary">
                          ₹{proc.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/hospital/${slug}/procedures`}
                    className="btn btn-outline btn-sm mt-4"
                  >
                    View All Procedures
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Procedures" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">All Procedures</h2>
                <input
                  type="text"
                  placeholder="Search procedures..."
                  className="input input-bordered input-sm w-64"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Procedure</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospital.procedures.map((proc, i) => (
                      <tr key={i} className="hover">
                        <td className="font-medium">{proc.name}</td>
                        <td className="text-primary font-semibold">
                          ₹{proc.price.toLocaleString("en-IN")}
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm">
                            Book Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">{hospital.rating}</div>
                  <div className="flex text-warning">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(hospital.rating) ? "fill-current" : ""
                            }`}
                        />
                      ))}
                  </div>
                  <div className="text-sm text-base-content/50">
                    {hospital.reviewCount} reviews
                  </div>
                </div>
                <button className="btn btn-primary ml-auto">Write Review</button>
              </div>

              <div className="space-y-4">
                {hospital.reviews.map((review, i) => (
                  <div key={i} className="card bg-base-200 border border-base-300">
                    <div className="card-body">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-10">
                              <span>{review.author[0]}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{review.author}</div>
                            <div className="text-xs text-base-content/50">
                              {review.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex text-warning">
                          {Array(review.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-current"
                              />
                            ))}
                        </div>
                      </div>
                      <p className="text-sm text-base-content/70 mt-2">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Location" && (
            <div>
              <div className="h-96 bg-base-200 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-base-content/30 mx-auto mb-2" />
                  <p className="text-base-content/50">
                    Google Maps integration coming soon
                  </p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-base-content/70">
                    {hospital.address}, {hospital.district}, {hospital.state} -{" "}
                    {hospital.pincode}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      hospital.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm w-fit mt-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="max-w-xl">
              <div className="card bg-base-200 border border-base-300 mb-6">
                <div className="card-body">
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <a
                      href={`tel:${hospital.phone}`}
                      className="flex items-center gap-3 hover:text-primary"
                    >
                      <Phone className="w-5 h-5" />
                      {hospital.phone}
                    </a>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      {hospital.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="font-semibold mb-4">Send Inquiry</h3>
                  <form className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        className="input input-bordered"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Message</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered"
                        rows={4}
                        placeholder="Your inquiry..."
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
