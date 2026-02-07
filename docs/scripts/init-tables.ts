import { getDbPool } from "../src/lib/db";

async function main() {
  try {
    console.log("Initializing database tables...");
    
    // Connect to the database
    const pool = await getDbPool();
    
    // Create lab_equipment table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lab_equipment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(255)
      );
    `);
    console.log("✅ Table 'lab_equipment' created or already exists.");

    // Create solutions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS solutions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        summary TEXT,
        description TEXT,
        image_url VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Table 'solutions' created or already exists.");
    
    // Create case_studies table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        client_name VARCHAR(200),
        location VARCHAR(200),
        industry VARCHAR(100),
        challenge TEXT,
        solution TEXT,
        results TEXT,
        image_url VARCHAR(255),
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Table 'case_studies' created or already exists.");
    
    console.log("✅ Database tables initialized successfully");
    
    // Close the connection
    await pool.end();
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing database tables:", error);
    process.exit(1);
  }
}

main();