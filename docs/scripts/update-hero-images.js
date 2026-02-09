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
    
    console.log("Updating hero_slides with local image URLs...");
    
    // Update the hero slides with local image URLs
    const updates = [
      { id: 1, image_url: "/1/ion1.png" },
      { id: 2, image_url: "/1/ion2.png" },
      { id: 3, image_url: "/1/ion3.png" }
    ];
    
    for (const update of updates) {
      await connection.execute(
        'UPDATE hero_slides SET image_url = ? WHERE id = ?',
        [update.image_url, update.id]
      );
      console.log(`Updated slide ${update.id} with image ${update.image_url}`);
    }
    
    console.log("✅ Successfully updated hero slide images");
    
    // Close the connection
    await connection.end();
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating hero slide images:", error);
    process.exit(1);
  }
}

main();