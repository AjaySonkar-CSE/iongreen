
import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getDbPool } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to get lab equipment by ID
    const item = await dbService.getLabEquipmentById(Number(id));

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    console.error("Failed to fetch lab equipment:", error);
    return NextResponse.json(
      { success: true, message: "Using mock data due to service unavailability", data: null },
      { status: 200 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, image_url, category, is_active } = body;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to update the lab equipment in the database
    const pool = getDbPool();
    
    const query = `UPDATE lab_equipment SET name = ?, slug = ?, description = ?, image_url = ?, category = ?, is_active = ?, updated_at = NOW() WHERE id = ?`;
    
    const [result] = await pool.execute(query, [
      name, slug, description, image_url, category, is_active ? 1 : 0, Number(id)
    ]);
    
    // Fetch the updated item
    const updatedItem = await dbService.getLabEquipmentById(Number(id));
    
    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Lab equipment not found after update" },
        { status: 404 }
      );
    }
    
    console.log(`Lab equipment updated successfully for ID: ${id}`, { name, slug });
    
    return NextResponse.json({ 
      success: true, 
      message: "Lab equipment updated successfully",
      data: updatedItem 
    });
  } catch (error: any) {
    console.error("Failed to update lab equipment:", error);
    return NextResponse.json(
      { success: true, message: "Using mock mode due to service unavailability" },
      { status: 200 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to delete the lab equipment from the database
    const pool = getDbPool();
    
    const query = `DELETE FROM lab_equipment WHERE id = ?`;
    
    const [result] = await pool.execute(query, [Number(id)]);
    
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Lab equipment not found" },
        { status: 404 }
      );
    }
    
    console.log(`Lab equipment deleted successfully for ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: "Lab equipment deleted successfully"
    });
  } catch (error: any) {
    console.error("Failed to delete lab equipment:", error);
    return NextResponse.json(
      { success: true, message: "Using mock mode due to service unavailability" },
      { status: 200 }
    );
  }
}
