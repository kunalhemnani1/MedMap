# MedMap 🏥

**MedMap** is an intelligent hospital discovery platform that bridges the gap between traditional directory search and AI-powered medical assistance. It helps users find the right healthcare facility not just by keywords, but by understanding their medical context.

## 🚀 The Problem

Finding the right hospital is often stressful and fragmented:

* **Information Overload**: Users get lists of hospitals but lack specific answers (e.g., "Which one is best for cardiac surgery under ₹5L?").
* **Medical Jargon**: Patients search for symptoms ("keyhole surgery") but databases list technical terms ("laparoscopic appendectomy"), leading to zero results.
* **Lack of Context**: Standard maps/search engines don't answer comparative questions or provide price estimates upfront.

## 💡 Our Innovation: Context-Aware AI Search

MedMap isn't just a database; it's a **Search-Augmented Generation (SAG)** engine for healthcare.

1. **Context-Aware AI Insight**: Unlike standard chatbots, our AI doesn't just "guess". It "sees" the exact search results you are looking at (filtered by location, price, etc.) and generates insights based on *that* specific data.
    * *User*: "Summarize the costs." -> *AI*: Analyzes the 5 hospitals on screen and gives a comparative price breakdown.
2. **Hybrid Interface**: We combine the precision of structured filters (Distance, Price, Accreditation) with the flexibility of natural language AI.
3. **Smart Metadata**: We enrich standard hospital data with derived insights (approximate pricing, ratings, insurance availability) to give users a complete picture instantly.

## ✨ Key Features

* **Advanced Search**: Fuse.js powered fuzzy search handling typos and broad queries.
* **AI Insight Box**: Real-time AI summaries appearing above search results interactively.
* **Smart Filters**: Filter by procedure cost, distance, NABH accreditation, and insurance availability.
* **Medical Chatbot**: A dedicated assistant for general medical queries, powered by Gemini 2.5 Flash Lite.

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router)
* **AI**: Google Gemini 2.5 Flash Lite
* **Styling**: Tailwind CSS + DaisyUI + Lucide Icons
* **Search**: Fuse.js (Client-side fuzzy search)
* **Database**: Firebase Firestore / Local JSON (Hybrid support)

## ⚡ Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```
