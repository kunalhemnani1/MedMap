import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const { query } = searchParams
    } catch (err) {

    }
}