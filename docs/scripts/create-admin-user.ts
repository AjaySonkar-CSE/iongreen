
import mysql from 'mysql2/promise';
import { hash } from "bcryptjs";

// Database configuration from environment variables
const dbConfig = {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: Number(process.env.MYSQL_PORT ?? "3306"),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "green_db",
};

async function createAdmin() {
    const email = process.argv[2] || "admin@example.com";
    const password = process.argv[3] || "admin123";
    const name = process.argv[4] || "Administrator";

    console.log(`Creating admin user: ${email}`);

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Ensure table exists
        await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(180) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        const hashedPassword = await hash(password, 10);

        await connection.query(
            "INSERT INTO admins (email, password, name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password), name = VALUES(name)",
            [email, hashedPassword, name]
        );

        console.log("✅ Admin user created/updated successfully");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating admin user:", error);
        process.exit(1);
    }
}

createAdmin().catch(console.error);
