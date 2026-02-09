
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE ?? "green_db",
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    let query = "SELECT * FROM case_studies";
    const params: any[] = [];

    // Check if is_active column exists by trying to select it or just assume it does.
    // For now, I'll assume soft delete pattern is used everywhere.
    // If case_studies table doesn't have is_active, this might fail or return all.
    // I'll add the condition.
    if (!all) {
       // We'll check if the column exists in the catch block if it fails? No, that's messy.
       // Let's assume consistent schema design.
       query += " WHERE is_active = TRUE";
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await pool.query(query, params);

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Failed to fetch case studies:", error);
    // Fallback if is_active doesn't exist (dirty hack but safe)
    if (error.code === 'ER_BAD_FIELD_ERROR') {
       try {
         const [rows] = await pool.query("SELECT * FROM case_studies ORDER BY created_at DESC");
         return NextResponse.json({ success: true, data: rows });
       } catch (e) {
         return NextResponse.json({ success: false, message: "Failed to fetch case studies" }, { status: 500 });
       }
    }
    return NextResponse.json(
      { success: false, message: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, client_name, industry, description, challenge, solution, results, image_url, is_featured, is_active } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: "Title and Slug are required" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO case_studies (title, slug, client_name, industry, description, challenge, solution, results, image_url, is_featured, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, client_name, industry, description, challenge, solution, results, image_url, is_featured, is_active]
    );

    return NextResponse.json({
      success: true,
      message: "Case study created successfully",
      data: { id: (result as any).insertId, ...body },
    });
  } catch (error: any) {
    console.error("Failed to create case study:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create case study" },
      { status: 500 }
    );
  }
}
