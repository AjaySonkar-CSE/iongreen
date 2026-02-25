
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: Number(process.env.MYSQL_PORT ?? "3306"),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "green_db",
});

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT DISTINCT category FROM lab_equipment WHERE category IS NOT NULL AND category != ""'
        ) as unknown as [Array<{ category: string }>];

        const categories = rows.map(r => r.category);
        return NextResponse.json({ success: true, data: categories });
    } catch (error: any) {
        console.error("Failed to fetch lab equipment categories:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
