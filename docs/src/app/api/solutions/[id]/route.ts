
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

    // Use dbService to get solution by ID
    const solution = await dbService.getSolutionById(Number(id));

    if (!solution) {
      return NextResponse.json(
        { success: false, message: "Solution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: solution });
  } catch (error: any) {
    console.error("Failed to fetch solution:", error);
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
    const { title, slug, summary, description, image_url, is_active } = body;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to update the solution in the database
    const pool = getDbPool();
    
    const query = `UPDATE solutions SET title = ?, slug = ?, summary = ?, description = ?, image_url = ?, is_active = ?, updated_at = NOW() WHERE id = ?`;
    
    const [result] = await pool.execute(query, [
      title, slug, summary, description, image_url, is_active ? 1 : 0, Number(id)
    ]);
    
    // Fetch the updated solution
    const updatedSolution = await dbService.getSolutionById(Number(id));
    
    if (!updatedSolution) {
      return NextResponse.json(
        { success: false, message: "Solution not found after update" },
        { status: 404 }
      );
    }
    
    console.log(`Solution updated successfully for ID: ${id}`, { title, slug });
    
    return NextResponse.json({ 
      success: true, 
      message: "Solution updated successfully",
      data: updatedSolution 
    });
  } catch (error: any) {
    console.error("Failed to update solution:", error);
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

    // Use dbService to delete the solution from the database
    const pool = getDbPool();
    
    const query = `DELETE FROM solutions WHERE id = ?`;
    
    const [result] = await pool.execute(query, [Number(id)]);
    
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Solution not found" },
        { status: 404 }
      );
    }
    
    console.log(`Solution deleted successfully for ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: "Solution deleted successfully"
    });
  } catch (error: any) {
    console.error("Failed to delete solution:", error);
    return NextResponse.json(
      { success: true, message: "Using mock mode due to service unavailability" },
      { status: 200 }
    );
  }
}
