import { Search, AlertCircle, RefreshCw } from "lucide-react";

interface EmptyStateProps {
    type: "no-results" | "error" | "empty";
    query?: string;
    onRetry?: () => void;
    suggestions?: string[];
}

export default function EmptyState({ type, query, onRetry, suggestions }: EmptyStateProps) {
    if (type === "error") {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-error" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
                <p className="text-base-content/60 mb-6 max-w-md">
                    We couldn't load the results. Please check your connection and try again.
                </p>
                {onRetry && (
                    <button onClick={onRetry} className="btn btn-primary gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Retry
                    </button>
                )}
            </div>
        );
    }

    if (type === "no-results") {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-base-content/30" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                    No results found{query && ` for "${query}"`}
                </h3>
                <p className="text-base-content/60 mb-4 max-w-md">
                    Try adjusting your filters or search for something else.
                </p>
                <ul className="text-sm text-base-content/60 mb-6 space-y-1 text-left">
                    <li>• Check your spelling</li>
                    <li>• Try broader terms like "scan" instead of "MRI scan"</li>
                    <li>• Remove some filters</li>
                </ul>
                {suggestions && suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="text-sm text-base-content/50">Popular:</span>
                        {suggestions.map((s) => (
                            <button key={s} className="btn btn-outline btn-sm">
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Empty state (initial)
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Start your search</h3>
            <p className="text-base-content/60 max-w-md">
                Search for procedures, hospitals, or conditions to compare prices and find the best care.
            </p>
        </div>
    );
}
