import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

type NewsletterPayload = {
  email: string;
  name?: string;
};

export async function POST(req: Request) {
  const data = (await req.json()) as NewsletterPayload;

  if (!data.email) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 },
    );
  }

  try {
    const pool = getDbPool();
    await pool.execute(
      `
        INSERT INTO newsletter_subscriptions (email, name)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP
      `,
      [data.email, data.name || null],
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter:error]", error);
    return NextResponse.json(
      { error: "Unable to subscribe. Please try again later." },
      { status: 500 },
    );
  }
}
