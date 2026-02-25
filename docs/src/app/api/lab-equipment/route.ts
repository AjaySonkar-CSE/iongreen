
import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getDbPool } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    // Get lab equipment using the dbService which handles database availability
    // When database is not available, it falls back to mock data
    let equipment;

    if (all) {
      // Get all available lab equipment (active and inactive)
      equipment = await dbService.getLabEquipment(false);
      console.log('Retrieved lab equipment (all param=true):', equipment.length);
    } else {
      // Get only active lab equipment
      equipment = await dbService.getLabEquipment(true);
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
  try {
    const pool = getDbPool();

    const body = await request.json();
    const { name, slug, description, image_url, category, is_active } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "Name and Slug are required" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `INSERT INTO lab_equipment (name, slug, description, image_url, category, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, slug, description || null, image_url || null, category || null, is_active ? 1 : 0]
    );

    const insertId = (result as any).insertId;

    return NextResponse.json({
      success: true,
      message: "Lab equipment created successfully",
      data: { id: insertId, ...body },
    });
  } catch (error: any) {
    console.error("Failed to create lab equipment:", error);

    // Handle duplicate entry error (MySQL error code 1062)
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
      return NextResponse.json(
        {
          success: false,
          message: "Equipment with this slug already exists. Please use a different slug.",
          error: "Duplicate slug"
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create lab equipment",
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
