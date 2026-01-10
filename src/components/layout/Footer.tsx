import Link from "next/link";
import {
    Building2,
    Search,
    Shield,
    Calculator,
    GitCompare,
    Compass,
    TrendingUp,
    HelpCircle,
    Twitter,
    Linkedin,
    Youtube,
} from "lucide-react";

export default function Footer() {
    const productsLinks = [
        { href: "/search", label: "Price Search", icon: Search },
        { href: "/insurance-checker", label: "Insurance Checker", icon: Shield },
        { href: "/price-estimator", label: "Price Estimator", icon: Calculator },
        { href: "/compare", label: "Compare Hospitals", icon: GitCompare },
        { href: "/near-me", label: "Near Me", icon: Compass },
    ];

    const resourcesLinks = [
        { href: "/insights", label: "Market Insights", icon: TrendingUp },
        { href: "/faq", label: "Help Center", icon: HelpCircle },
    ];

    const legalLinks = [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookies", label: "Cookie Policy" },
    ];

    return (
        <footer className="bg-base-200 border-t border-base-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                            <Building2 className="w-8 h-8" />
                            MedMap
                        </Link>
                        <p className="text-base-content/70 text-sm leading-relaxed">
                            Making healthcare costs transparent. Compare prices, check insurance, and find the best care for your budget.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost btn-circle btn-sm hover:text-primary"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost btn-circle btn-sm hover:text-primary"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost btn-circle btn-sm hover:text-primary"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="font-semibold text-base-content mb-4">Products</h3>
                        <ul className="space-y-2">
                            {productsLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-base-content/70 hover:text-primary transition-colors text-sm flex items-center gap-2"
                                    >
                                        <link.icon className="w-4 h-4" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-base-content mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {resourcesLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-base-content/70 hover:text-primary transition-colors text-sm flex items-center gap-2"
                                    >
                                        <link.icon className="w-4 h-4" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-base-content mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-base-content/70 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="divider my-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-base-content/60">
                    <p>© 2026 MedMap. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Powered by
                        <span className="font-medium text-primary">Google Cloud</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
