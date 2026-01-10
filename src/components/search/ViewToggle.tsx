"use client";
import { LayoutGrid, List } from "lucide-react";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
    value: ViewMode;
    onChange: (value: ViewMode) => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
    return (
        <div className="join">
            <button
                className={`btn btn-sm join-item ${value === "grid" ? "btn-active" : ""}`}
                onClick={() => onChange("grid")}
                aria-label="Grid view"
            >
                <LayoutGrid className="w-4 h-4" />
            </button>
            <button
                className={`btn btn-sm join-item ${value === "list" ? "btn-active" : ""}`}
                onClick={() => onChange("list")}
                aria-label="List view"
            >
                <List className="w-4 h-4" />
            </button>
        </div>
    );
}
