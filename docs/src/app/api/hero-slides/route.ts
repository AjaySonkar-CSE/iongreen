
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "Pravin2005",
  database: "green_db",
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    let query = "SELECT * FROM hero_slides";
    const params: any[] = [];

    if (!all) {
      query += " WHERE is_active = TRUE";
    }

    query += " ORDER BY position ASC, created_at DESC";

    const [rows] = await pool.query(query, params);

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Failed to fetch slides:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch slides" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, cta_label, cta_href, image_url, category, position, is_active } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO hero_slides (title, description, cta_label, cta_href, image_url, category, position, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, cta_label, cta_href, image_url, category, position, is_active]
    );

    return NextResponse.json({
      success: true,
      message: "Slide created successfully",
      data: { id: (result as any).insertId, ...body },
    });
  } catch (error: any) {
    console.error("Failed to create slide:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create slide" },
      { status: 500 }
    );
  }
}
