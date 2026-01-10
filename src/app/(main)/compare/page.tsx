"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  MapPin,
  Clock,
  BadgeCheck,
  Plus,
  X,
  Check,
  Building2,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

// Mock hospital data
const mockHospitals = [
  {
    id: "1",
    name: "Apollo Hospital",
    location: "Andheri West, Mumbai",
    rating: 4.5,
    reviews: 328,
    accreditation: ["NABH", "JCI"],
    mriPrice: 4500,
    waitTime: "30 min",
    insurance: true,
    distance: 2.3,
  },
  {
    id: "2",
    name: "Fortis Hospital",
    location: "Mulund, Mumbai",
    rating: 4.2,
    reviews: 256,
    accreditation: ["NABH"],
    mriPrice: 5200,
    waitTime: "45 min",
    insurance: true,
    distance: 5.1,
  },
  {
    id: "3",
    name: "Lilavati Hospital",
    location: "Bandra, Mumbai",
    rating: 4.8,
    reviews: 412,
    accreditation: ["NABH", "JCI", "ISO"],
    mriPrice: 6800,
    waitTime: "20 min",
    insurance: false,
    distance: 3.8,
  },
];

const COMPARE_FEATURES = [
  { key: "mriPrice", label: "MRI Scan Price", format: (v: number) => `₹${v.toLocaleString("en-IN")}` },
  { key: "rating", label: "Rating", format: (v: number) => `${v} ★` },
  { key: "reviews", label: "Reviews", format: (v: number) => v.toString() },
  { key: "distance", label: "Distance", format: (v: number) => `${v} km` },
  { key: "waitTime", label: "Avg Wait Time", format: (v: string) => v },
  { key: "insurance", label: "Insurance", format: (v: boolean) => (v ? "Yes" : "No") },
];

function ComparePageContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get("ids")?.split(",") || [];
  
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialIds.length > 0 ? initialIds : ["1", "2"]
  );

  const selectedHospitals = mockHospitals.filter((h) =>
    selectedIds.includes(h.id)
  );

  const availableHospitals = mockHospitals.filter(
    (h) => !selectedIds.includes(h.id)
  );

  const addHospital = (id: string) => {
    if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeHospital = (id: string) => {
    setSelectedIds(selectedIds.filter((i) => i !== id));
  };

  const getBestValue = (key: string) => {
    if (selectedHospitals.length === 0) return null;
    
    if (key === "mriPrice" || key === "distance") {
      // Lower is better
      return selectedHospitals.reduce((best, h) =>
        (h as unknown as Record<string, number>)[key] < (best as unknown as Record<string, number>)[key] ? h : best
      ).id;
    } else if (key === "rating" || key === "reviews") {
      // Higher is better
      return selectedHospitals.reduce((best, h) =>
        (h as unknown as Record<string, number>)[key] > (best as unknown as Record<string, number>)[key] ? h : best
      ).id;
    } else if (key === "insurance") {
      return selectedHospitals.find((h) => h.insurance)?.id;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Breadcrumb items={[{ label: "Compare Hospitals", href: "/compare" }]} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Compare Hospitals</h1>
            <p className="text-base-content/60">
              {selectedHospitals.length} of 4 hospitals selected
            </p>
          </div>

          {availableHospitals.length > 0 && selectedIds.length < 4 && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-primary gap-2">
                <Plus className="w-4 h-4" />
                Add Hospital
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-20 menu p-2 shadow-lg bg-base-100 rounded-box w-64 border border-base-200"
              >
                {availableHospitals.map((h) => (
                  <li key={h.id}>
                    <button onClick={() => addHospital(h.id)}>
                      <Building2 className="w-4 h-4" />
                      {h.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {selectedHospitals.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No hospitals selected</h2>
            <p className="text-base-content/60 mb-4">
              Add hospitals to compare their prices and features
            </p>
            <Link href="/search" className="btn btn-primary">
              Search Hospitals
            </Link>
          </div>
        ) : (
          <>
            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="table table-lg">
                <thead>
                  <tr>
                    <th className="w-48"></th>
                    {selectedHospitals.map((hospital) => (
                      <th key={hospital.id} className="text-center min-w-[200px]">
                        <div className="relative">
                          <button
                            className="btn btn-ghost btn-circle btn-xs absolute -top-2 -right-2"
                            onClick={() => removeHospital(hospital.id)}
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="h-24 w-24 bg-base-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
                            <Building2 className="w-10 h-10 text-base-content/30" />
                          </div>
                          <div className="font-semibold text-base">
                            {hospital.name}
                          </div>
                          <div className="text-sm text-base-content/60 flex items-center justify-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {hospital.location}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_FEATURES.map((feature) => {
                    const bestId = getBestValue(feature.key);
                    return (
                      <tr key={feature.key} className="hover">
                        <td className="font-medium">{feature.label}</td>
                        {selectedHospitals.map((hospital) => {
                          const value = (hospital as unknown as Record<string, unknown>)[feature.key];
                          const isBest = hospital.id === bestId;
                          return (
                            <td key={hospital.id} className="text-center">
                              <span
                                className={`inline-flex items-center gap-1 ${
                                  isBest
                                    ? "text-success font-semibold"
                                    : ""
                                }`}
                              >
                                {feature.format(value as never)}
                                {isBest && (
                                  <Check className="w-4 h-4" />
                                )}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}

                  {/* Accreditation row */}
                  <tr className="hover">
                    <td className="font-medium">Accreditation</td>
                    {selectedHospitals.map((hospital) => (
                      <td key={hospital.id} className="text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {hospital.accreditation.map((acc) => (
                            <span
                              key={acc}
                              className="badge badge-primary badge-sm gap-1"
                            >
                              <BadgeCheck className="w-3 h-3" />
                              {acc}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Action row */}
                  <tr>
                    <td></td>
                    {selectedHospitals.map((hospital) => (
                      <td key={hospital.id} className="text-center">
                        <Link
                          href={`/hospital/${hospital.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recommendation */}
            {selectedHospitals.length >= 2 && (
              <div className="card bg-success/10 border border-success/20 mt-8">
                <div className="card-body">
                  <h3 className="card-title text-success">
                    <Check className="w-5 h-5" />
                    Our Recommendation
                  </h3>
                  <p className="text-base-content/70">
                    Based on price, rating, and location,{" "}
                    <strong>
                      {
                        mockHospitals.find((h) => h.id === getBestValue("mriPrice"))
                          ?.name
                      }
                    </strong>{" "}
                    offers the best value for your search.
                  </p>
                  <div className="card-actions mt-2">
                    <Link
                      href={`/hospital/${getBestValue("mriPrice")}`}
                      className="btn btn-success btn-sm"
                    >
                      Book at Recommended Hospital
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <ComparePageContent />
    </Suspense>
  );
}
