import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const pool = getDbPool();
    const [result]: any = await pool.query('SELECT COUNT(*) as count FROM lab_equipment WHERE is_active = TRUE');
    
    const count = result[0]?.count || 0;
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Failed to fetch equipment count:', error);
    return NextResponse.json(
      { count: 0 },
      { status: 500 }
    );
  }
}