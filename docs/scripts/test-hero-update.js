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
    
    console.log("Testing hero_slides table update...");
    
    // First, let's check if we can select data
    const [rows] = await connection.execute('SELECT * FROM hero_slides LIMIT 1');
    console.log("Sample row:", rows[0]);
    
    // Now let's try to update a row
    if (rows.length > 0) {
      const slideId = rows[0].id;
      console.log(`Updating slide with ID: ${slideId}`);
      
      const result = await connection.execute(
        'UPDATE hero_slides SET title = ?, description = ?, image_url = ?, category = ? WHERE id = ?',
        ['Test Title', 'Test Description', '/test/image.jpg', 'Test Category', slideId]
      );
      
      console.log("Update result:", result[0]);
      console.log("✅ Update successful!");
    } else {
      console.log("No rows found in hero_slides table");
    }
    
    // Close the connection
    await connection.end();
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error testing hero_slides update:", error);
    process.exit(1);
  }
}

main();