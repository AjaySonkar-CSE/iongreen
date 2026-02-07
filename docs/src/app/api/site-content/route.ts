import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getSiteContent(), {
    headers: {
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

