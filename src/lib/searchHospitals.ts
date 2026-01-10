import Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";
import data from "@/app/api/search/hospital/hospitalsinmp.json";

export type Hospital = {
    Sr_No: number;
    Location_Coordinates: string;
    Location: string;
    Hospital_Name: string;
    Address_Original_First_Line: string;
    State: string;
    District: string;
    Pincode: number;
    Telephone: number;
    Mobile_Number: number;
    Emergency_Num: number;
};

const hospitals: readonly Hospital[] = data as Hospital[];

const searchKeys = [
    "Sr_No",
    "Location_Coordinates",
    "Location",
    "Hospital_Name",
    "Address_Original_First_Line",
    "State",
    "District",
    "Pincode",
    "Telephone",
    "Mobile_Number",
    "Emergency_Num",
];

export interface SearchParams {
    query?: string | null;
    state?: string | null;
    district?: string | null;
    pincode?: string | null;
    limit?: number;
    page?: number;
}

export interface SearchResult {
    results: Hospital[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export function searchHospitals(params: SearchParams): SearchResult {
    const {
        query,
        state,
        district,
        pincode,
        limit = 10,
        page = 1
    } = params;

    let filtered: readonly Hospital[] = hospitals;

    if (state) {
        filtered = filtered.filter((item) => item.State?.toLowerCase() === state.toLowerCase());
    }
    if (district) {
        filtered = filtered.filter((item) => item.District?.toLowerCase() === district.toLowerCase());
    }
    if (pincode) {
        const pin = parseInt(pincode, 10);
        filtered = Number.isFinite(pin) ? filtered.filter((item) => item.Pincode === pin) : filtered;
    }

    let results: Hospital[];

    if (query) {
        const fuse = new Fuse<Hospital>(filtered, { keys: searchKeys });
        results = fuse.search(query).map((hit: FuseResult<Hospital>) => hit.item);
    } else {
        results = [...filtered];
    }

    const total = results.length;
    // ensure limit is positive
    const safeLimit = Math.max(1, limit);
    const totalPages = Math.max(1, Math.ceil(total / safeLimit));
    const safePage = Math.max(1, Math.min(page, totalPages));

    // logic handling for excessive pagination
    const start = (safePage - 1) * safeLimit;
    const pagedResults = results.slice(start, start + safeLimit);

    return {
        results: pagedResults,
        total,
        page: safePage,
        limit: safeLimit,
        totalPages,
    };
}
