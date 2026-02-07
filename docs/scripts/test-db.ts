import { getDbPool } from "../src/lib/db";

async function testConnection() {
  try {
    console.log("Testing database connection...");
    const pool = getDbPool();
    
    // Test connection
    const connection = await pool.getConnection();
    console.log("✅ Successfully connected to database");
    
    // Check if solutions table exists and its structure
    try {
      const [rows] = await connection.query("DESCRIBE solutions");
      console.log("✅ Solutions table structure:");
      console.table(rows);
    } catch (error) {
      console.log("❌ Solutions table does not exist or has issues:", (error as Error).message);
    }
    
    // Check if lab_equipment table exists and its structure
    try {
      const [rows] = await connection.query("DESCRIBE lab_equipment");
      console.log("✅ Lab equipment table structure:");
      console.table(rows);
    } catch (error) {
      console.log("❌ Lab equipment table does not exist or has issues:", (error as Error).message);
    }
    
    connection.release();
    await pool.end();
    
    console.log("✅ Test completed successfully");
  } catch (error) {
    console.error("❌ Database connection test failed:", error);
  }
}

testConnection();