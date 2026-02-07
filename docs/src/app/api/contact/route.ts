import { NextResponse } from "next/server";
import { ensureContactTable, getDbPool } from "@/lib/db";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export async function POST(req: Request) {
  const data = (await req.json()) as ContactPayload;

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  try {
    await ensureContactTable();
    const pool = getDbPool();
    await pool.execute(
      `
        INSERT INTO contact_requests (name, email, company, message)
        VALUES (?, ?, ?, ?)
      `,
      [data.name, data.email, data.company ?? null, data.message],
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact-form:error]", error);
    return NextResponse.json(
      { error: "Unable to save your request right now. Please try again later." },
      { status: 500 },
    );
  }
}

