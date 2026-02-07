import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";

// Correct MySQL typed interface
export interface NavigationItem extends RowDataPacket {
  id: number;
  label: string;
  href: string;
  parentId: number | null;
  sort_order: number;
}

export async function GET() {
  try {
    const pool = getDbPool();

    // Query database
    const [rows] = await pool.query<NavigationItem[]>(
      `SELECT 
          id, 
          label, 
          href, 
          parent_id AS parentId,
          sort_order
       FROM navigation 
       WHERE is_active = 1 
       ORDER BY parent_id IS NULL, parent_id, sort_order, label`
    );

    // Return items as JSON
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Navigation API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch navigation items" },
      { status: 500 }
    );
  }
}
