import Link from "next/link";
import {
  Stethoscope,
  Syringe,
  Baby,
  HeartPulse,
  Microscope,
  Smile,
  ArrowRight,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

const CATEGORIES = [
  {
    id: "diagnostic",
    name: "Diagnostic",
    description: "MRI, CT Scan, X-Ray, Blood Tests, Ultrasound",
    icon: Microscope,
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    count: 156,
  },
  {
    id: "surgical",
    name: "Surgical",
    description: "Orthopedic, Cardiac, Laparoscopic, General Surgery",
    icon: Syringe,
    color: "bg-red-100 dark:bg-red-900/30 text-red-600",
    count: 89,
  },
  {
    id: "dental",
    name: "Dental",
    description: "Root Canal, Implants, Cleaning, Orthodontics",
    icon: Smile,
    color: "bg-green-100 dark:bg-green-900/30 text-green-600",
    count: 72,
  },
  {
    id: "maternity",
    name: "Maternity",
    description: "Delivery, Prenatal Care, C-Section, NICU",
    icon: Baby,
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600",
    count: 45,
  },
  {
    id: "emergency",
    name: "Emergency",
    description: "Trauma Care, ICU, Ambulance, 24x7 Services",
    icon: HeartPulse,
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600",
    count: 34,
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Health Checkups, Preventive Care, Vaccinations",
    icon: Stethoscope,
    color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600",
    count: 98,
  },
];

const POPULAR_PROCEDURES = [
  { name: "MRI Scan", category: "Diagnostic", priceRange: "₹3,500 – ₹12,000" },
  { name: "CT Scan", category: "Diagnostic", priceRange: "₹2,000 – ₹8,000" },
  { name: "Blood Test Panel", category: "Diagnostic", priceRange: "₹500 – ₹2,500" },
  { name: "Root Canal", category: "Dental", priceRange: "₹3,000 – ₹8,000" },
  { name: "Knee Replacement", category: "Surgical", priceRange: "₹1,50,000 – ₹4,00,000" },
  { name: "Normal Delivery", category: "Maternity", priceRange: "₹25,000 – ₹75,000" },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <Breadcrumb items={[{ label: "Categories", href: "/categories" }]} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Browse by Category</h1>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Find the right procedure and compare prices across hospitals in your area.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="card-body">
                <div
                  className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="w-7 h-7" />
                </div>
                <h2 className="card-title text-xl group-hover:text-primary transition-colors">
                  {category.name}
                </h2>
                <p className="text-sm text-base-content/60 mb-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-base-200">
                  <span className="text-sm text-base-content/50">
                    {category.count} procedures
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Procedures */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular Procedures</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Procedure</th>
                  <th>Category</th>
                  <th>Price Range</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {POPULAR_PROCEDURES.map((proc, i) => (
                  <tr key={i} className="hover">
                    <td className="font-medium">{proc.name}</td>
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        {proc.category}
                      </span>
                    </td>
                    <td className="text-primary font-medium">{proc.priceRange}</td>
                    <td>
                      <Link
                        href={`/search?q=${encodeURIComponent(proc.name)}`}
                        className="btn btn-primary btn-sm"
                      >
                        Compare
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
