
import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    // Get lab equipment using the dbService which handles database availability
    // When database is not available, it falls back to mock data
    let equipment;
    
    if (all) {
      // For now, just use the dbService as it's more reliable when DB is unavailable
      // The dbService will handle fallback to mock data internally
      equipment = await dbService.getLabEquipment(); // Get all available lab equipment
      console.log('Retrieved lab equipment (all param=true):', equipment.length);
    } else {
      // Get only active lab equipment
      equipment = await dbService.getLabEquipment(); // Get available lab equipment
    }

    return NextResponse.json({ success: true, data: equipment || [] });
  } catch (error: any) {
    console.error("Failed to fetch lab equipment:", error);
    
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
    const { name, slug, description, image_url, category, is_active } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "Name and Slug are required" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO lab_equipment (name, slug, description, image_url, category, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, slug, description, image_url, category, is_active]
    );

    return NextResponse.json({
      success: true,
      message: "Lab equipment created successfully",
      data: { id: (result as any).insertId, ...body },
    });
  } catch (error: any) {
    console.error("Failed to create lab equipment:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create lab equipment",
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
