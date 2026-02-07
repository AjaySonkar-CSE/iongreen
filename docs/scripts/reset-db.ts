import { getDbPool } from "../src/lib/db";

async function resetDatabase() {
  try {
    console.log("Resetting database tables...");
    const pool = getDbPool();
    
    // Drop existing tables if they exist
    await pool.query("DROP TABLE IF EXISTS solutions");
    console.log("✅ Dropped solutions table");
    
    await pool.query("DROP TABLE IF EXISTS lab_equipment");
    console.log("✅ Dropped lab_equipment table");
    
    await pool.query("DROP TABLE IF EXISTS case_studies");
    console.log("✅ Dropped case_studies table");
    
    // Now initialize the database again
    const { initializeDatabase } = await import("../src/lib/db");
    await initializeDatabase();
    console.log("✅ Database tables recreated with correct schema");
    
    await pool.end();
    console.log("✅ Database reset completed successfully");
  } catch (error) {
    console.error("❌ Database reset failed:", error);
  }
}

resetDatabase();