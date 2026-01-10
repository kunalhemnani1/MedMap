import { NextRequest } from "next/server";
import Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";

import data from "./hospital/hospitalsinmp.json";

type Hospital = {
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

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const query = params.get("query") ?? params.get("value");
        const state = params.get("state");
        const district = params.get("district");
        const pincode = params.get("pincode");

        const limitParam = Number(params.get("limit"));
        const pageParam = Number(params.get("page"));
        const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 100) : 10;
        const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

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
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const start = (page - 1) * limit;
        const pagedResults = results.slice(start, start + limit);

        return Response.json({
            page,
            limit,
            total,
            totalPages,
            results: pagedResults,
        });
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: 1, message: "internal server error" },
            { status: 500 }
        );
    }
}
