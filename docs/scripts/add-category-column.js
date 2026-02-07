const mysql = require('mysql2/promise');

async function main() {
  try {
    console.log("Connecting to database...");
    
    // Database configuration
    const config = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Pravin2005',
      database: 'green_db'
    };
    
    // Create connection
    const connection = await mysql.createConnection(config);
    
    console.log("Adding category column to hero_slides table...");
    await connection.execute(`
      ALTER TABLE hero_slides 
      ADD COLUMN category VARCHAR(100) DEFAULT NULL AFTER image_url
    `);
    
    console.log("✅ Successfully added category column to hero_slides table");
    
    // Close the connection
    await connection.end();
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding category column:", error);
    process.exit(1);
  }
}

main();