import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Chatbot api key not configured");
        }
        const ai = new GoogleGenAI({ apiKey })
        const external_prompt: string = "Respond according to message history"
        const resp = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: message + external_prompt
        });
        const text = resp.text;
        return NextResponse.json({ text });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}
