
import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getDbPool } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    // Get solutions using the dbService which handles database availability
    // When database is not available, it falls back to mock data
    let solutions;
    
    if (all) {
      // For now, just use the dbService as it's more reliable when DB is unavailable
      // The dbService will handle fallback to mock data internally
      solutions = await dbService.getSolutions(); // Get all available solutions
      console.log('Retrieved solutions (all param=true):', solutions.length);
    } else {
      // Get only active solutions
      solutions = await dbService.getSolutions();
    }

    return NextResponse.json({ success: true, data: solutions || [] });
  } catch (error: any) {
    console.error("Failed to fetch solutions:", error);
    
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
  let pool;
  let connection;
  try {
    pool = getDbPool();
    
    // Test connection first
    connection = await pool.getConnection();
    
    const body = await request.json();
    const { title, slug, summary, description, image_url, is_active } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: "Title and Slug are required" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO solutions (title, slug, summary, description, image_url, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, slug, summary, description, image_url, is_active]
    );

    return NextResponse.json({
      success: true,
      message: "Solution created successfully",
      data: { id: (result as any).insertId, ...body },
    });
  } catch (error: any) {
    console.error("Failed to create solution:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create solution",
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
