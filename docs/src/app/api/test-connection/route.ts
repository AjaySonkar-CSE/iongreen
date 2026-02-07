import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = getDbPool();
    // Test the connection by running a simple query
    const [rows] = await pool.query('SELECT 1 as test');
    return NextResponse.json({ 
      status: 'success',
      message: 'Database connection successful!',
      data: rows 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
