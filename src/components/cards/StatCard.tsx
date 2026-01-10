interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    trend?: string;
    trendUp?: boolean;
}

export default function StatCard({ icon, value, label, trend, trendUp }: StatCardProps) {
    return (
        <div className="card bg-base-100 border border-base-200 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {icon}
            </div>
            <div className="text-3xl font-bold text-base-content mb-1">{value}</div>
            <div className="text-sm text-base-content/60 mb-2">{label}</div>
            {trend && (
                <div
                    className={`text-xs font-medium ${trendUp ? "text-success" : "text-error"
                        }`}
                >
                    {trend}
                </div>
            )}
        </div>
    );
}
