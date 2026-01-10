"use client";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useState } from "react";

export type SortOption =
    | "relevance"
    | "price-asc"
    | "price-desc"
    | "distance"
    | "rating"
    | "reviews";

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
    { value: "relevance", label: "Relevance" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "distance", label: "Distance" },
    { value: "rating", label: "Rating" },
    { value: "reviews", label: "Most Reviewed" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
    const [open, setOpen] = useState(false);
    const currentLabel = OPTIONS.find((o) => o.value === value)?.label || "Sort";

    return (
        <div className={`dropdown dropdown-end ${open ? "dropdown-open" : ""}`}>
            <div
                tabIndex={0}
                role="button"
                className="btn btn-sm btn-ghost gap-2"
                onClick={() => setOpen((prev) => !prev)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
            >
                <ArrowUpDown className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLabel}</span>
                <ChevronDown className="w-3 h-3" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-20 menu p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-200"
            >
                {OPTIONS.map((option) => (
                    <li key={option.value}>
                        <button
                            className={`${value === option.value ? "active" : ""}`}
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
