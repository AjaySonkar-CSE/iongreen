const mysql = require('mysql2/promise');

async function main() {
  try {
    console.log("Connecting to database...");
    
    // Database configuration
    const config = {
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'green_db'
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