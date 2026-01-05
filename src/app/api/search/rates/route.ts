
import { NextRequest, NextResponse } from "next/server";
import data from "./medmap_data.json";
import Fuse from "fuse.js";

interface RateItem {
    procedure_name: string;
    category?: string;
    [key: string]: any;
}

interface SourceData {
    description: string;
    currency: string;
    data: RateItem[];
}

interface MedMapData {
    metadata: any;
    sources: Record<string, SourceData>;
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        // name , category in query
        const query = searchParams.get("name");
        const category = searchParams.get("category");

        const sources = (data as MedMapData).sources;
        let allResults: any[] = [];

        Object.keys(sources).forEach((sourceKey) => {
            const source = sources[sourceKey];
            let sourceItems = source.data;

            if (category) {
                const lowerCategory = category.toLowerCase();
                sourceItems = sourceItems.filter((item) =>
                    item.category && item.category.toLowerCase() === lowerCategory
                );
            }

            let results: any[] = [];

            if (query) {
                const fuse = new Fuse(sourceItems, {
                    keys: ["procedure_name"],
                    threshold: 0.4,
                });

                results = fuse.search(query).map((result) => ({
                    ...result.item,
                    source: sourceKey,
                    refIndex: result.refIndex
                }));
            } else {
                results = sourceItems.map((item) => ({
                    ...item,
                    source: sourceKey,
                }));
            }

            allResults = [...allResults, ...results];
        });

        return NextResponse.json(allResults);

    } catch (error) {
        console.error("Error in rates search API:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}