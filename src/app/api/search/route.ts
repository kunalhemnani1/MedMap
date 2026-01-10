import { NextRequest } from "next/server";
import { searchHospitals } from "@/lib/searchHospitals";

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const query = params.get("query") ?? params.get("value");
        const state = params.get("state");
        const district = params.get("district");
        const pincode = params.get("pincode");

        const limitParam = Number(params.get("limit"));
        const pageParam = Number(params.get("page"));
        const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 10;
        const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

        const result = searchHospitals({
            query,
            state,
            district,
            pincode,
            limit,
            page
        });

        return Response.json(result);
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: 1, message: "internal server error" },
            { status: 500 }
        );
    }
}
