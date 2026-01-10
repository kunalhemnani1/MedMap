"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const pathname = usePathname();

    // Auto-generate breadcrumbs from path if not provided
    const breadcrumbs: BreadcrumbItem[] = items || generateBreadcrumbs(pathname);

    if (breadcrumbs.length <= 1) return null;

    return (
        <div className="bg-base-200/50 border-b border-base-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
                <nav className="text-sm breadcrumbs" aria-label="Breadcrumb">
                    <ul className="flex items-center gap-1 flex-wrap">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center gap-1 text-base-content/60 hover:text-primary transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Home</span>
                            </Link>
                        </li>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <li key={item.href} className="flex items-center gap-1">
                                    <ChevronRight className="w-4 h-4 text-base-content/40" />
                                    {isLast ? (
                                        <span className="font-medium text-base-content truncate max-w-50">
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-base-content/60 hover:text-primary transition-colors truncate max-w-37.5"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = "";
    for (const segment of segments) {
        currentPath += `/${segment}`;
        breadcrumbs.push({
            label: formatSegment(segment),
            href: currentPath,
        });
    }

    return breadcrumbs;
}

function formatSegment(segment: string): string {
    // Handle dynamic segments like [slug]
    if (segment.startsWith("[") && segment.endsWith("]")) {
        return segment.slice(1, -1);
    }

    // Convert kebab-case to Title Case
    return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
