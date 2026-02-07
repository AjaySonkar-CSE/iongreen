import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Return dummy count for now
    return NextResponse.json({ count: 0 });
  } catch (error) {
    console.error('Failed to fetch lab equipment count:', error);
    return NextResponse.json(
      { count: 0 },
      { status: 500 }
    );
  }
}