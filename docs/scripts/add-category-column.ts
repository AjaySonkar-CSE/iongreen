import { getDbPool } from "../src/lib/db";

async function main() {
  try {
    console.log("Connecting to database...");
    const pool = await getDbPool();
    
    console.log("Adding category column to hero_slides table...");
    await pool.query(`
      ALTER TABLE hero_slides 
      ADD COLUMN category VARCHAR(100) DEFAULT NULL AFTER image_url
    `);
    
    console.log("✅ Successfully added category column to hero_slides table");
    
    // Close the connection
    await pool.end();
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding category column:", error);
    process.exit(1);
  }
}

main();