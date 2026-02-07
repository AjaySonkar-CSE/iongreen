
import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getDbPool } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    // Get news using the dbService which handles database availability
    // When database is not available, it falls back to mock data
    let news;
    
    if (all) {
      // Get ALL news (both active and inactive) when all=true
      news = await dbService.getAllNews(100); // Get all news
      console.log('Retrieved all news (all param=true):', news.length);
    } else {
      // Get only active news
      news = await dbService.getNews(100); // Get active news
    }

    return NextResponse.json({ success: true, data: news || [] });
  } catch (error: any) {
    console.error("Failed to fetch news:", error);
    
    // Return safe response with empty array
    return NextResponse.json(
      { 
        success: true, 
        message: "Using mock data due to service unavailability",
        data: [],
        count: 0
      },
      { status: 200 }  // Return 200 with empty data instead of 500
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, summary, content, image_url, published_at, is_active } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: "Title and Slug are required" },
        { status: 400 }
      );
    }

    const pool = getDbPool();
    
    const [result] = await pool.execute(
      `INSERT INTO news (title, slug, summary, content, image_url, publish_date, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, summary, content, image_url, published_at, is_active]
    );
    
    // Fetch the newly created news
    const newNews = await dbService.getNewsById(Number((result as any).insertId));
    
    return NextResponse.json({
      success: true,
      message: "News article created successfully",
      data: newNews,
    });
  } catch (error: any) {
    console.error("Failed to create news:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create news article" },
      { status: 500 }
    );
  }
}
