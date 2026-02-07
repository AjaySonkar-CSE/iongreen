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
    
    console.log("Checking columns in solutions table...");
    const [rows] = await connection.execute('DESCRIBE solutions');
    
    console.log("Columns in solutions table:");
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