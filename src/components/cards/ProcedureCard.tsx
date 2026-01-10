import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";

interface ProcedureCardProps {
    id: string;
    name: string;
    category: string;
    priceMin?: number;
    priceMax?: number;
    hospitalCount?: number;
    icon?: React.ReactNode;
}

export default function ProcedureCard({
    id,
    name,
    category,
    priceMin,
    priceMax,
    hospitalCount,
    icon,
}: ProcedureCardProps) {
    return (
        <Link
            href={`/procedure/${id}`}
            className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group p-5"
        >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                {icon || <Stethoscope className="w-6 h-6 text-primary" />}
            </div>

            {/* Name */}
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {name}
            </h3>

            {/* Category */}
            <p className="text-sm text-base-content/60 mb-3">{category}</p>

            {/* Price Range */}
            {priceMin && priceMax && (
                <p className="text-sm font-medium text-primary mb-1">
                    ₹{priceMin.toLocaleString("en-IN")} – ₹{priceMax.toLocaleString("en-IN")}
                </p>
            )}

            {/* Hospital count */}
            {hospitalCount && (
                <p className="text-xs text-base-content/50 mb-4">
                    Available at {hospitalCount} hospitals
                </p>
            )}

            {/* CTA */}
            <div className="flex items-center gap-1 text-sm text-primary font-medium mt-auto">
                Compare Prices
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
}
