import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";

import data from "./hospitalsinmp.json"

type hospital_type = {
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
const hospital_data: readonly hospital_type[] = data;


const keys = [
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
    "Emergency_Num"
];


export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const value = searchParams.get("value");
        const state = searchParams.get("state");
        const district = searchParams.get("district");
        const pincode = searchParams.get("pincode");

        let filterdata: readonly hospital_type[] = hospital_data;

        if (state)
            filterdata = filterdata.filter((v) => v.State?.toLowerCase() === state.toLowerCase());
        if (district)
            filterdata = filterdata.filter(v => v.District?.toLowerCase() == district.toLowerCase());
        if (pincode)
            filterdata = filterdata.filter(v => v.Pincode === parseInt(pincode));

        if (!value) {
            return Response.json(filterdata);
        }

        const f = new Fuse(filterdata, {
            keys: keys
        });
        const d = f.search(value);
        return Response.json(d)
    } catch (err) {
        console.log(err)
        return Response.json({ error: 1, message: "internal server error" },
            {
                status: 500
            }
        )
    }
}