"use client";

import { useState, useCallback } from "react";
import {
    MapPin,
    SlidersHorizontal,
    Star,
    Shield,
    Clock,
    BadgeCheck,
    X,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

interface FilterSidebarProps {
    filters: {
        distance: string;
        priceMin: number;
        priceMax: number;
        categories: string[];
        rating: number;
        insurance: boolean;
        availability: boolean;
        accreditation: string[];
    };
    onFilterChange: (filters: FilterSidebarProps["filters"]) => void;
    onClear: () => void;
    isMobile?: boolean;
    onClose?: () => void;
    priceCeil?: number;
}

const CATEGORIES = [
    "Diagnostic",
    "Surgical",
    "Dental",
    "Maternity",
    "Emergency",
    "Wellness",
];

const ACCREDITATIONS = ["NABH", "JCI", "ISO"];

const DISTANCES = [
    { value: "5", label: "< 5 km" },
    { value: "10", label: "< 10 km" },
    { value: "25", label: "< 25 km" },
    { value: "any", label: "Any distance" },
];

export default function FilterSidebar({
    filters,
    onFilterChange,
    onClear,
    isMobile = false,
    onClose,
    priceCeil = 10000,
}: FilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState<string[]>([
        "distance",
        "price",
        "category",
    ]);

    const minVal = Math.max(0, filters.priceMin ?? 0);
    const maxVal = Math.min(filters.priceMax ?? priceCeil, priceCeil);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - 0) / (priceCeil - 0)) * 100),
        [priceCeil]
    );

    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    const toggleSection = (section: string) => {
        setExpandedSections((prev) =>
            prev.includes(section)
                ? prev.filter((s) => s !== section)
                : [...prev, section]
        );
    };

    const updateFilter = <K extends keyof FilterSidebarProps["filters"]>(
        key: K,
        value: FilterSidebarProps["filters"][K]
    ) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value);
        if (newVal > maxVal) {
            onFilterChange({
                ...filters,
                priceMin: Math.min(newVal, priceCeil),
                priceMax: Math.min(newVal, priceCeil),
            });
        } else {
            updateFilter("priceMin", Math.min(newVal, priceCeil));
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value);
        if (newVal < minVal) {
            onFilterChange({
                ...filters,
                priceMax: Math.max(0, newVal),
                priceMin: Math.max(0, newVal),
            });
        } else {
            updateFilter("priceMax", Math.min(newVal, priceCeil));
        }
    };

    const toggleCategory = (cat: string) => {
        const updated = filters.categories.includes(cat)
            ? filters.categories.filter((c) => c !== cat)
            : [...filters.categories, cat];
        updateFilter("categories", updated);
    };

    const toggleAccreditation = (acc: string) => {
        const updated = filters.accreditation.includes(acc)
            ? filters.accreditation.filter((a) => a !== acc)
            : [...filters.accreditation, acc];
        updateFilter("accreditation", updated);
    };

    const SectionHeader = ({
        id,
        icon,
        title,
    }: {
        id: string;
        icon: React.ReactNode;
        title: string;
    }) => (
        <button
            className="flex items-center justify-between w-full py-2 text-left font-medium"
            onClick={() => toggleSection(id)}
        >
            <span className="flex items-center gap-2">
                {icon}
                {title}
            </span>
            {expandedSections.includes(id) ? (
                <ChevronUp className="w-4 h-4" />
            ) : (
                <ChevronDown className="w-4 h-4" />
            )}
        </button>
    );

    const radioClass = "radio radio-primary radio-sm";
    const checkboxClass = "checkbox checkbox-primary checkbox-sm";

    return (
        <aside className={!isMobile ? "w-72 shrink-0 hidden lg:block" : ""}>
            <div
                className={
                    !isMobile
                        ? "sticky top-20 bg-base-100 border border-base-200 rounded-xl p-4 max-h-[calc(100vh-6rem)] overflow-y-auto"
                        : ""
                }
            >
                {!isMobile && (
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5" />
                        Filters
                    </h2>
                )}

                <div className="space-y-4">
                    <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm p-4">
                        <SectionHeader
                            id="distance"
                            icon={<MapPin className="w-4 h-4" />}
                            title="Distance"
                        />
                        {expandedSections.includes("distance") && (
                            <div className="mt-3 space-y-2">
                                {DISTANCES.map((d) => (
                                    <label
                                        key={d.value}
                                        className="flex items-center justify-between gap-3 cursor-pointer rounded-lg border border-base-200 px-3 py-2 hover:border-primary/60 hover:bg-primary/5 transition"
                                    >
                                        <input
                                            type="radio"
                                            name="distance"
                                            className={radioClass}
                                            checked={filters.distance === d.value}
                                            onChange={() => updateFilter("distance", d.value)}
                                        />
                                        <span className="text-sm font-medium text-base-content/80 flex-1">
                                            {d.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm p-4">
                        <SectionHeader
                            id="price"
                            icon={<span className="text-sm font-bold">₹</span>}
                            title="Price Range"
                        />
                        {expandedSections.includes("price") && (
                            <div className="mt-3 space-y-5">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        className="input input-bordered input-sm w-full font-medium"
                                        placeholder="Min"
                                        value={minVal.toString()}
                                        onChange={handleMinInputChange}
                                    />
                                    <span className="text-base-content/50 font-bold">–</span>
                                    <input
                                        type="number"
                                        className="input input-bordered input-sm w-full font-medium"
                                        placeholder="Max"
                                        value={maxVal.toString()}
                                        onChange={handleMaxInputChange}
                                    />
                                </div>

                                <div className="relative w-full h-5 flex items-center select-none">
                                    {/* Gray Background Track */}
                                    <div className="absolute w-full h-full bg-base-200 rounded-full" />

                                    {/* VISUAL ELEMENTS */}

                                    {/* Purple Pill (Active Range) */}
                                    {/* We offset left by ~12px and increase width by ~24px to visually wrap the dots */}
                                    <div
                                        className="absolute h-full bg-[#5200e0] rounded-full z-10"
                                        style={{
                                            left: `calc(${minPercent}% + (${8 - minPercent * 0.16}px) - 12px)`,
                                            width: `calc(${maxPercent - minPercent}% + (${(maxPercent - minPercent) * -0.16}px) + 24px)`,
                                        }}
                                    />

                                    {/* Left White Thumb (Visual) */}
                                    <div
                                        className="absolute h-3.5 w-3.5 bg-white rounded-full shadow-sm z-20"
                                        style={{
                                            left: `calc(${minPercent}% + (${8 - minPercent * 0.16}px))`,
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />

                                    {/* Right White Thumb (Visual) */}
                                    <div
                                        className="absolute h-3.5 w-3.5 bg-white rounded-full shadow-sm z-20"
                                        style={{
                                            left: `calc(${maxPercent}% + (${8 - maxPercent * 0.16}px))`,
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />

                                    {/* INVISIBLE INTERACTIVE INPUTS */}
                                    <input
                                        type="range"
                                        min={0}
                                        max={priceCeil}
                                        value={minVal}
                                        onChange={(e) => {
                                            const val = Math.min(Number(e.target.value), maxVal);
                                            updateFilter("priceMin", val);
                                        }}
                                        className="range-input absolute inset-0 w-full h-full z-30 m-0 p-0"
                                        step={100}
                                    />

                                    <input
                                        type="range"
                                        min={0}
                                        max={priceCeil}
                                        value={maxVal}
                                        onChange={(e) => {
                                            const val = Math.max(Number(e.target.value), minVal);
                                            updateFilter("priceMax", val);
                                        }}
                                        className="range-input absolute inset-0 w-full h-full z-30 m-0 p-0"
                                        step={100}
                                    />
                                </div>

                                <div className="flex justify-between text-xs font-medium text-base-content/60 -mt-2">
                                    <span>₹0</span>
                                    <span>₹{priceCeil.toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm p-4">
                        <SectionHeader
                            id="category"
                            icon={<SlidersHorizontal className="w-4 h-4" />}
                            title="Category"
                        />
                        {expandedSections.includes("category") && (
                            <div className="mt-3 space-y-2">
                                {CATEGORIES.map((cat) => (
                                    <label
                                        key={cat}
                                        className="flex items-center justify-between gap-3 cursor-pointer rounded-lg border border-base-200 px-3 py-2 hover:border-primary/60 hover:bg-primary/5 transition"
                                    >
                                        <input
                                            type="checkbox"
                                            className={checkboxClass}
                                            checked={filters.categories.includes(cat)}
                                            onChange={() => toggleCategory(cat)}
                                        />
                                        <span className="text-sm font-medium text-base-content/80 flex-1">
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm p-4">
                        <SectionHeader
                            id="rating"
                            icon={<Star className="w-4 h-4" />}
                            title="Rating"
                        />
                        {expandedSections.includes("rating") && (
                            <div className="mt-3 space-y-2">
                                {[4, 3, 2, 0].map((r) => (
                                    <label
                                        key={r}
                                        className="flex items-center justify-between gap-3 cursor-pointer rounded-lg border border-base-200 px-3 py-2 hover:border-primary/60 hover:bg-primary/5 transition"
                                    >
                                        <input
                                            type="radio"
                                            name="rating"
                                            className={radioClass}
                                            checked={filters.rating === r}
                                            onChange={() => updateFilter("rating", r)}
                                        />
                                        <span className="text-sm flex items-center gap-1">
                                            {r > 0 ? (
                                                <>
                                                    {Array(r)
                                                        .fill(0)
                                                        .map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="w-3 h-3 fill-warning text-warning"
                                                            />
                                                        ))}
                                                    <span>& up</span>
                                                </>
                                            ) : (
                                                "All ratings"
                                            )}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm p-4 flex items-center justify-between">
                        <label className="flex items-center gap-2 font-medium cursor-pointer">
                            <span className="flex items-center gap-2 font-medium">
                                <Shield className="w-4 h-4" />
                                Accepts Insurance
                            </span>
                        </label>
                        <button
                            type="button"
                            className={`btn btn-sm ${filters.insurance ? "btn-primary" : "btn-outline"
                                }`}
                            onClick={() => updateFilter("insurance", !filters.insurance)}
                        >
                            {filters.insurance ? "On" : "Off"}
                        </button>
                    </div>

                    <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm p-4 flex items-center justify-between">
                        <label className="flex items-center gap-2 font-medium cursor-pointer">
                            <span className="flex items-center gap-2 font-medium">
                                <Clock className="w-4 h-4" />
                                Open Now / 24x7
                            </span>
                        </label>
                        <button
                            type="button"
                            className={`btn btn-sm ${filters.availability ? "btn-primary" : "btn-outline"
                                }`}
                            onClick={() => updateFilter("availability", !filters.availability)}
                        >
                            {filters.availability ? "On" : "Off"}
                        </button>
                    </div>

                    <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm p-4">
                        <SectionHeader
                            id="accreditation"
                            icon={<BadgeCheck className="w-4 h-4" />}
                            title="Accreditation"
                        />
                        {expandedSections.includes("accreditation") && (
                            <div className="mt-3 space-y-2">
                                {ACCREDITATIONS.map((acc) => (
                                    <label
                                        key={acc}
                                        className="flex items-center justify-between gap-3 cursor-pointer rounded-lg border border-base-200 px-3 py-2 hover:border-primary/60 hover:bg-primary/5 transition"
                                    >
                                        <input
                                            type="checkbox"
                                            className={checkboxClass}
                                            checked={filters.accreditation.includes(acc)}
                                            onChange={() => toggleAccreditation(acc)}
                                        />
                                        <span className="text-sm font-medium text-base-content/80 flex-1">
                                            {acc}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={onClear} className="btn btn-outline btn-block">
                        Clear All Filters
                    </button>
                </div>
            </div>


        </aside>
    );
}