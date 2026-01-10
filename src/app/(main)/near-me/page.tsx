"use client";

import { useState, useEffect } from "react";
import {
    MapPin,
    Navigation,
    Loader2,
    AlertCircle,
    Phone,
    Clock,
    Star,
    ArrowRight,
    Filter,
    List,
    Map,
    Building2,
    Stethoscope,
    Pill,
    FlaskConical,
    Ambulance,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

interface NearbyHospital {
    id: string;
    name: string;
    address: string;
    distance: number;
    rating: number;
    reviewCount: number;
    type: "hospital" | "clinic" | "pharmacy" | "lab" | "emergency";
    isOpen: boolean;
    openUntil: string;
    phone: string;
    specialties: string[];
}

const mockHospitals: NearbyHospital[] = [
    {
        id: "1",
        name: "Apollo Hospital",
        address: "Scheme No. 54, Vijay Nagar, Indore",
        distance: 1.2,
        rating: 4.8,
        reviewCount: 2340,
        type: "hospital",
        isOpen: true,
        openUntil: "24 hours",
        phone: "+91 731 2555555",
        specialties: ["Cardiology", "Orthopedics", "Neurology"],
    },
    {
        id: "2",
        name: "Medanta Hospital",
        address: "AB Road, Near Bombay Hospital, Indore",
        distance: 2.5,
        rating: 4.6,
        reviewCount: 1890,
        type: "hospital",
        isOpen: true,
        openUntil: "24 hours",
        phone: "+91 731 2666666",
        specialties: ["Oncology", "Cardiac Surgery", "Nephrology"],
    },
    {
        id: "3",
        name: "City Care Clinic",
        address: "MG Road, Opposite City Center Mall, Indore",
        distance: 0.8,
        rating: 4.3,
        reviewCount: 456,
        type: "clinic",
        isOpen: true,
        openUntil: "9:00 PM",
        phone: "+91 731 2444444",
        specialties: ["General Medicine", "Pediatrics"],
    },
    {
        id: "4",
        name: "LifeCare Pharmacy",
        address: "Palasia Square, Near HDFC Bank, Indore",
        distance: 0.3,
        rating: 4.5,
        reviewCount: 234,
        type: "pharmacy",
        isOpen: true,
        openUntil: "10:00 PM",
        phone: "+91 731 2333333",
        specialties: [],
    },
    {
        id: "5",
        name: "Dr. Lal PathLabs",
        address: "Race Course Road, Indore",
        distance: 1.8,
        rating: 4.4,
        reviewCount: 890,
        type: "lab",
        isOpen: false,
        openUntil: "Opens 7:00 AM",
        phone: "+91 731 2777777",
        specialties: ["Blood Tests", "Imaging"],
    },
    {
        id: "6",
        name: "108 Emergency Services",
        address: "Government Hospital Campus, Indore",
        distance: 3.2,
        rating: 4.1,
        reviewCount: 567,
        type: "emergency",
        isOpen: true,
        openUntil: "24 hours",
        phone: "108",
        specialties: ["Emergency", "Trauma"],
    },
];

const facilityTypes = [
    { id: "all", label: "All", icon: Building2 },
    { id: "hospital", label: "Hospitals", icon: Building2 },
    { id: "clinic", label: "Clinics", icon: Stethoscope },
    { id: "pharmacy", label: "Pharmacies", icon: Pill },
    { id: "lab", label: "Labs", icon: FlaskConical },
    { id: "emergency", label: "Emergency", icon: Ambulance },
];

export default function NearMePage() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [hospitals, setHospitals] = useState<NearbyHospital[]>([]);
    const [selectedType, setSelectedType] = useState("all");
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [maxDistance, setMaxDistance] = useState(10);

    const requestLocation = () => {
        setIsLoadingLocation(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser");
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setHospitals(mockHospitals);
                setIsLoadingLocation(false);
            },
            (error) => {
                let message = "Unable to get your location";
                if (error.code === error.PERMISSION_DENIED) {
                    message = "Location permission denied. Please enable location access.";
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    message = "Location information unavailable";
                } else if (error.code === error.TIMEOUT) {
                    message = "Location request timed out";
                }
                setLocationError(message);
                setIsLoadingLocation(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const filteredHospitals = hospitals
        .filter((h) => selectedType === "all" || h.type === selectedType)
        .filter((h) => h.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);

    const getTypeIcon = (type: NearbyHospital["type"]) => {
        switch (type) {
            case "hospital":
                return <Building2 className="w-5 h-5" />;
            case "clinic":
                return <Stethoscope className="w-5 h-5" />;
            case "pharmacy":
                return <Pill className="w-5 h-5" />;
            case "lab":
                return <FlaskConical className="w-5 h-5" />;
            case "emergency":
                return <Ambulance className="w-5 h-5" />;
        }
    };

    const getTypeBadgeColor = (type: NearbyHospital["type"]) => {
        switch (type) {
            case "hospital":
                return "badge-primary";
            case "clinic":
                return "badge-secondary";
            case "pharmacy":
                return "badge-accent";
            case "lab":
                return "badge-info";
            case "emergency":
                return "badge-error";
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Breadcrumb />

            {/* Hero Section */}
            <section className="bg-linear-to-br from-accent/10 via-base-100 to-primary/10 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                            <MapPin className="w-5 h-5" />
                            <span className="font-medium">Location-Based Search</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Find Healthcare Near You
                        </h1>
                        <p className="text-lg text-base-content/70 mb-8">
                            Discover hospitals, clinics, pharmacies, and labs in your vicinity.
                            Get directions and contact information instantly.
                        </p>

                        {!location && (
                            <button
                                className="btn btn-primary btn-lg gap-2"
                                onClick={requestLocation}
                                disabled={isLoadingLocation}
                            >
                                {isLoadingLocation ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Getting Location...
                                    </>
                                ) : (
                                    <>
                                        <Navigation className="w-5 h-5" />
                                        Enable Location
                                    </>
                                )}
                            </button>
                        )}

                        {locationError && (
                            <div className="alert alert-error max-w-md mx-auto mt-4">
                                <AlertCircle className="w-5 h-5" />
                                <span>{locationError}</span>
                            </div>
                        )}

                        {location && (
                            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
                                <MapPin className="w-5 h-5" />
                                <span className="font-medium">Location enabled</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {location && (
                <div className="container mx-auto px-4 py-8">
                    {/* Filters */}
                    <div className="card bg-base-100 shadow-lg mb-6">
                        <div className="card-body">
                            <div className="flex flex-wrap items-center gap-4">
                                {/* Facility Type Filter */}
                                <div className="flex flex-wrap gap-2">
                                    {facilityTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            className={`btn btn-sm gap-2 ${selectedType === type.id ? "btn-primary" : "btn-ghost"
                                                }`}
                                            onClick={() => setSelectedType(type.id)}
                                        >
                                            <type.icon className="w-4 h-4" />
                                            {type.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1"></div>

                                {/* Distance Filter */}
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-base-content/60" />
                                    <select
                                        className="select select-bordered select-sm"
                                        value={maxDistance}
                                        onChange={(e) => setMaxDistance(Number(e.target.value))}
                                    >
                                        <option value={2}>Within 2 km</option>
                                        <option value={5}>Within 5 km</option>
                                        <option value={10}>Within 10 km</option>
                                        <option value={25}>Within 25 km</option>
                                    </select>
                                </div>

                                {/* View Toggle */}
                                <div className="btn-group">
                                    <button
                                        className={`btn btn-sm ${viewMode === "list" ? "btn-active" : ""}`}
                                        onClick={() => setViewMode("list")}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                    <button
                                        className={`btn btn-sm ${viewMode === "map" ? "btn-active" : ""}`}
                                        onClick={() => setViewMode("map")}
                                    >
                                        <Map className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Results List */}
                        <div className={viewMode === "map" ? "lg:col-span-1" : "lg:col-span-3"}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">
                                    {filteredHospitals.length} Places Found
                                </h2>
                            </div>

                            <div className={`space-y-4 ${viewMode === "list" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-4 space-y-0" : ""}`}>
                                {filteredHospitals.map((hospital) => (
                                    <div key={hospital.id} className="card bg-base-100 shadow-lg">
                                        <div className="card-body">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg bg-base-200`}>
                                                        {getTypeIcon(hospital.type)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{hospital.name}</h3>
                                                        <span className={`badge ${getTypeBadgeColor(hospital.type)} badge-sm`}>
                                                            {hospital.type}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-primary">
                                                        {hospital.distance} km
                                                    </div>
                                                    <div className="text-xs text-base-content/60">away</div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-base-content/70 mt-2">
                                                {hospital.address}
                                            </p>

                                            <div className="flex items-center gap-4 mt-3 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-warning fill-warning" />
                                                    <span className="font-medium">{hospital.rating}</span>
                                                    <span className="text-base-content/60">
                                                        ({hospital.reviewCount})
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span className={hospital.isOpen ? "text-success" : "text-error"}>
                                                        {hospital.isOpen ? "Open" : "Closed"}
                                                    </span>
                                                    <span className="text-base-content/60">
                                                        · {hospital.openUntil}
                                                    </span>
                                                </div>
                                            </div>

                                            {hospital.specialties.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {hospital.specialties.slice(0, 3).map((spec) => (
                                                        <span key={spec} className="badge badge-outline badge-sm">
                                                            {spec}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="card-actions justify-between mt-4 pt-3 border-t border-base-200">
                                                <a
                                                    href={`tel:${hospital.phone}`}
                                                    className="btn btn-ghost btn-sm gap-1"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                    Call
                                                </a>
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.address)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary btn-sm gap-1"
                                                >
                                                    Directions
                                                    <ArrowRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {filteredHospitals.length === 0 && (
                                    <div className="col-span-full card bg-base-100 shadow-lg">
                                        <div className="card-body items-center text-center py-12">
                                            <MapPin className="w-12 h-12 text-base-content/20 mb-4" />
                                            <h3 className="text-lg font-semibold">No places found</h3>
                                            <p className="text-base-content/60">
                                                Try adjusting your filters or increasing the distance
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Map View */}
                        {viewMode === "map" && (
                            <div className="lg:col-span-2">
                                <div className="card bg-base-100 shadow-lg h-150 sticky top-24">
                                    <div className="card-body items-center justify-center">
                                        <Map className="w-16 h-16 text-base-content/20 mb-4" />
                                        <h3 className="text-lg font-semibold">Map View</h3>
                                        <p className="text-base-content/60 text-center">
                                            Google Maps integration coming soon.
                                            <br />
                                            Enable with your Google Maps API key.
                                        </p>
                                        <a
                                            href={`https://www.google.com/maps/search/hospitals+near+${location.lat},${location.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary mt-4"
                                        >
                                            Open in Google Maps
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!location && !isLoadingLocation && !locationError && (
                <div className="container mx-auto px-4 py-16">
                    <div className="card bg-base-100 shadow-lg max-w-2xl mx-auto">
                        <div className="card-body items-center text-center py-12">
                            <MapPin className="w-16 h-16 text-base-content/20 mb-4" />
                            <h3 className="text-xl font-semibold">Enable Location Access</h3>
                            <p className="text-base-content/60 max-w-md">
                                To find healthcare facilities near you, we need access to your location.
                                Your location data is only used to show nearby results and is never stored.
                            </p>
                            <button
                                className="btn btn-primary mt-6"
                                onClick={requestLocation}
                            >
                                <Navigation className="w-5 h-5" />
                                Allow Location Access
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
