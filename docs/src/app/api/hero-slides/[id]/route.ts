
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "Pravin2005",
  database: "green_db",
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid ID is required" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query("SELECT * FROM hero_slides WHERE id = ?", [Number(id)]);
    const item = (rows as any[])[0];

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    console.error("Failed to fetch slide:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch slide" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, cta_label, cta_href, image_url, category, position, is_active } = body;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid ID is required" },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE hero_slides 
       SET title = ?, description = ?, cta_label = ?, cta_href = ?, image_url = ?, category = ?, position = ?, is_active = ?
       WHERE id = ?`,
      [title, description, cta_label, cta_href, image_url, category, position, is_active, Number(id)]
    );

    return NextResponse.json({ success: true, message: "Slide updated successfully" });
  } catch (error: any) {
    console.error("Failed to update slide:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update slide" },
      { status: 500 }
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

    // Soft delete
    await pool.query('UPDATE hero_slides SET is_active = FALSE WHERE id = ?', [Number(id)]);

    return NextResponse.json({ success: true, message: "Slide deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete slide:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete slide" },
      { status: 500 }
    );
  }
}
