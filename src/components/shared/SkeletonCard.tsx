interface SkeletonCardProps {
    variant?: "hospital" | "procedure" | "stat";
}

export default function SkeletonCard({ variant = "hospital" }: SkeletonCardProps) {
    if (variant === "stat") {
        return (
            <div className="card bg-base-100 border border-base-200 p-6 animate-pulse">
                <div className="w-14 h-14 rounded-2xl bg-base-300 mx-auto mb-4" />
                <div className="h-8 bg-base-300 rounded w-24 mx-auto mb-2" />
                <div className="h-4 bg-base-300 rounded w-32 mx-auto" />
            </div>
        );
    }

    if (variant === "procedure") {
        return (
            <div className="card bg-base-100 border border-base-200 p-5 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-base-300 mb-4" />
                <div className="h-5 bg-base-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-base-300 rounded w-1/2 mb-3" />
                <div className="h-4 bg-base-300 rounded w-2/3" />
            </div>
        );
    }

    // Hospital card skeleton
    return (
        <div className="card bg-base-100 border border-base-200 animate-pulse">
            <div className="h-40 bg-base-300" />
            <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <div className="h-4 bg-base-300 rounded w-16" />
                    <div className="h-4 bg-base-300 rounded w-24" />
                </div>
                <div className="h-5 bg-base-300 rounded w-3/4" />
                <div className="h-4 bg-base-300 rounded w-full" />
                <div className="h-4 bg-base-300 rounded w-2/3" />
                <div className="flex gap-2 mt-3">
                    <div className="h-6 bg-base-300 rounded w-16" />
                    <div className="h-6 bg-base-300 rounded w-16" />
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-base-200">
                    <div className="h-8 bg-base-300 rounded flex-1" />
                    <div className="h-8 bg-base-300 rounded w-20" />
                </div>
            </div>
        </div>
    );
}
