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
    
    console.log("Checking columns in hero_slides table...");
    const [rows] = await connection.execute('DESCRIBE hero_slides');
    
    console.log("Columns in hero_slides table:");
    rows.forEach(row => {
      console.log(`- ${row.Field} (${row.Type})`);
    });
    
    // Close the connection
    await connection.end();
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error checking columns:", error);
    process.exit(1);
  }
}

main();