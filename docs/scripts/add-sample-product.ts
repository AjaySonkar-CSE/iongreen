import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? "3307"),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE ?? "green_db",
};

async function addSampleProduct() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const result = await connection.query(
      "INSERT INTO products (name, slug, description, image_url, category, is_featured, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        'Sample Residential Battery',
        'sample-residential-battery',
        'A high-quality residential energy storage solution',
        '/1/ion1.png',
        'residential-energy-storage',
        true,
        true
      ]
    );
    
    console.log('✅ Sample product added successfully');
    console.log('Product ID:', (result as any).insertId);
    
  } catch (error) {
    console.error('❌ Error adding sample product:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addSampleProduct();
