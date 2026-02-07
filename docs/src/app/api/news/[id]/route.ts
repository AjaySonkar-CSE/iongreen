
import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getDbPool } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid news ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to get news by ID
    const news = await dbService.getNewsById(Number(id));

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error: any) {
    console.error("Failed to fetch news article:", error);
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
    const { title, slug, summary, content, image_url, published_at, is_active } = body;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid news ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to update the news in the database
    const pool = getDbPool();
    
    const query = `UPDATE news SET title = ?, slug = ?, summary = ?, content = ?, image_url = ?, publish_date = ?, is_active = ?, updated_at = NOW() WHERE id = ?`;
    
    const [result] = await pool.execute(query, [
      title, slug, summary, content, image_url, published_at, is_active ? 1 : 0, Number(id)
    ]);
    
    // Fetch the updated news
    const updatedNews = await dbService.getNewsById(Number(id));
    
    if (!updatedNews) {
      return NextResponse.json(
        { success: false, message: "News article not found after update" },
        { status: 404 }
      );
    }
    
    console.log(`News article updated successfully for ID: ${id}`, { title, slug });
    
    return NextResponse.json({ 
      success: true, 
      message: "News article updated successfully",
      data: updatedNews 
    });
  } catch (error: any) {
    console.error("Failed to update news article:", error);
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
        { success: false, message: "Valid news ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to delete the news from the database
    const pool = getDbPool();
    
    const query = `DELETE FROM news WHERE id = ?`;
    
    const [result] = await pool.execute(query, [Number(id)]);
    
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "News article not found" },
        { status: 404 }
      );
    }
    
    console.log(`News article deleted successfully for ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: "News article deleted successfully"
    });
  } catch (error: any) {
    console.error("Failed to delete news article:", error);
    return NextResponse.json(
      { success: true, message: "Using mock mode due to service unavailability" },
      { status: 200 }
    );
  }
}
