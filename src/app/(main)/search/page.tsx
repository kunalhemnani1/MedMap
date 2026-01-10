"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FilterSidebar from "@/components/search/FilterSidebar";
import SortDropdown, { SortOption } from "@/components/search/SortDropdown";
import ViewToggle, { ViewMode } from "@/components/search/ViewToggle";
import HospitalCard from "@/components/cards/HospitalCard";
import SkeletonCard from "@/components/shared/SkeletonCard";
import EmptyState from "@/components/shared/EmptyState";

interface Hospital {
  Sr_No: number;
  Hospital_Name: string;
  Address_Original_First_Line: string;
  District: string;
  State: string;
  Pincode: number;
  Telephone: number;
  Mobile_Number: number;
}

interface SearchResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  results: Hospital[];
}

const CATEGORY_POOL = ["Diagnostic", "Surgical", "Dental", "Maternity", "Emergency", "Wellness"] as const;
const PRICE_CEIL_DEFAULT = 10000;

const defaultFilters = {
  distance: "any",
  priceMin: 0,
  priceMax: PRICE_CEIL_DEFAULT,
  categories: [] as string[],
  rating: 0,
  insurance: false,
  availability: false,
  accreditation: [] as string[],
};

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [view, setView] = useState<ViewMode>("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [results, setResults] = useState<Hospital[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (pageNum = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        query: query || "",
        limit: "12",
        page: String(pageNum),
      });
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data: SearchResponse = await res.json();
      setResults(data.results);
      setPage(data.page);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
      setError("Could not load results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(1);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input")?.value || "";
    setQuery(input);
    router.push(`/search?q=${encodeURIComponent(input)}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchResults(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const deriveMeta = (hospital: Hospital) => {
    const seed = hospital.Sr_No || hospital.Pincode || hospital.Telephone;
    const rand = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    const rating = 3.4 + rand(seed) * 1.6;
    const reviewCount = 50 + Math.floor(rand(seed + 1) * 300);
    const priceFrom = 2000 + Math.floor(rand(seed + 2) * 5000);
    const distance = 1 + rand(seed + 3) * 10;
    const hasInsurance = rand(seed + 4) > 0.35;
    const isOpenNow = rand(seed + 5) > 0.5;
    const categories = CATEGORY_POOL.filter((_, idx) => rand(seed + idx + 6) > 0.6);
    const accreditation = rand(seed + 20) > 0.5 ? ["NABH"] : [];

    return {
      rating: Number(rating.toFixed(1)),
      reviewCount,
      priceFrom,
      distance: Number(distance.toFixed(1)),
      hasInsurance,
      isOpenNow,
      categories: categories.length ? categories : [CATEGORY_POOL[seed % CATEGORY_POOL.length]],
      accreditation,
    };
  };

  const priceCeil = useMemo(() => {
    if (!results.length) return PRICE_CEIL_DEFAULT;
    const maxPrice = Math.max(
      ...results.map((h) => deriveMeta(h).priceFrom),
      PRICE_CEIL_DEFAULT
    );
    return Math.ceil(maxPrice / 500) * 500; // round to nearest 500 for tidy slider
  }, [results]);

  const processedResults = useMemo(() => {
    const enriched = results.map((hospital) => ({ hospital, meta: deriveMeta(hospital) }));

    const filtered = enriched.filter(({ meta }) => {
      if (meta.priceFrom < (filters.priceMin || 0)) return false;
      if (meta.priceFrom > (filters.priceMax || PRICE_CEIL_DEFAULT)) return false;
      if (filters.rating && meta.rating < filters.rating) return false;
      if (filters.distance !== "any" && meta.distance > Number(filters.distance)) return false;
      if (filters.insurance && !meta.hasInsurance) return false;
      if (filters.availability && !meta.isOpenNow) return false;
      if (filters.categories.length && !filters.categories.some((c) => meta.categories.includes(c))) return false;
      if (filters.accreditation.length && !filters.accreditation.some((a) => meta.accreditation.includes(a))) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return filtered.sort((a, b) => a.meta.priceFrom - b.meta.priceFrom);
      case "price-desc":
        return filtered.sort((a, b) => b.meta.priceFrom - a.meta.priceFrom);
      case "distance":
        return filtered.sort((a, b) => a.meta.distance - b.meta.distance);
      case "rating":
        return filtered.sort((a, b) => b.meta.rating - a.meta.rating);
      case "reviews":
        return filtered.sort((a, b) => b.meta.reviewCount - a.meta.reviewCount);
      default:
        return filtered;
    }
  }, [results, filters, sort]);

  return (
    <div className="min-h-screen bg-base-100">
      <Breadcrumb
        items={[
          { label: "Search", href: "/search" },
          ...(query ? [{ label: `"${query}"`, href: `/search?q=${query}` }] : []),
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Search Header */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="join w-full max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              <input
                type="text"
                defaultValue={query}
                placeholder="Search procedures, hospitals..."
                className="input input-bordered join-item w-full pl-12"
              />
            </div>
            <button type="submit" className="btn btn-primary join-item">
              Search
            </button>
          </div>
        </form>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <FilterSidebar
            filters={filters}
            onFilterChange={(next) => setFilters({ ...next, priceMax: Math.min(next.priceMax, priceCeil) })}
            onClear={() => setFilters({ ...defaultFilters, priceMax: priceCeil })}
            priceCeil={priceCeil}
          />

          {/* Results Area */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-semibold">
                  {processedResults.length > 0
                    ? `${processedResults.length} results${query ? ` for "${query}"` : ""}`
                    : query
                      ? `Searching for "${query}"...`
                      : "Search Results"}
                </h1>
                <p className="text-sm text-base-content/60">
                  Showing {processedResults.length} of {total || processedResults.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <button
                  className="btn btn-outline btn-sm lg:hidden gap-2"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                <SortDropdown value={sort} onChange={setSort} />
                <ViewToggle value={view} onChange={setView} />
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <FilterSidebar
                filters={filters}
                onFilterChange={(next) => setFilters({ ...next, priceMax: Math.min(next.priceMax, priceCeil) })}
                onClear={() => setFilters({ ...defaultFilters, priceMax: priceCeil })}
                priceCeil={priceCeil}
                isMobile
                onClose={() => setShowMobileFilters(false)}
              />
            )}

            {/* Results Grid */}
            {isLoading ? (
              <div
                className={`grid gap-4 ${view === "list"
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  }`}
              >
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <SkeletonCard key={i} variant="hospital" />
                  ))}
              </div>
            ) : error ? (
              <EmptyState type="error" onRetry={() => fetchResults(page)} />
            ) : results.length === 0 ? (
              <EmptyState
                type={query ? "no-results" : "empty"}
                query={query}
                suggestions={["MRI Scan", "Blood Test", "X-Ray", "CT Scan"]}
              />
            ) : (
              <>
                <div
                  className={`grid gap-4 ${view === "list"
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    }`}
                >
                  {processedResults.map(({ hospital, meta }) => (
                    <HospitalCard
                      key={hospital.Sr_No}
                      id={String(hospital.Sr_No)}
                      name={hospital.Hospital_Name}
                      address={hospital.Address_Original_First_Line}
                      district={hospital.District}
                      state={hospital.State}
                      pincode={hospital.Pincode}
                      rating={meta.rating}
                      reviewCount={meta.reviewCount}
                      priceFrom={meta.priceFrom}
                      distance={meta.distance}
                      accreditation={meta.accreditation}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <div className="join">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          className={`btn btn-sm join-item ${page === pageNum ? "btn-active" : ""
                            }`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <>
                        <button className="btn btn-sm join-item btn-disabled">
                          ...
                        </button>
                        <button
                          className={`btn btn-sm join-item ${page === totalPages ? "btn-active" : ""
                            }`}
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
