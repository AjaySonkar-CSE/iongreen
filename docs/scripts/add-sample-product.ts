import { getDbPool } from '../src/lib/db';

async function addSampleProduct() {
  try {
    const pool = getDbPool();
    
    const result = await pool.query(
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
    
    console.log('Sample product added with ID:', (result[0] as any).insertId);
    console.log('✅ Sample product added successfully');
    
    // Close the connection
    await pool.end();
  } catch (error) {
    console.error('❌ Error adding sample product:', error);
    process.exit(1);
  }
}

addSampleProduct();