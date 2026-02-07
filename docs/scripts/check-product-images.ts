import { getDbPool } from '../src/lib/db';

async function checkProductImages() {
  try {
    const pool = getDbPool();
    
    const [rows] = await pool.query('SELECT id, name, image_url FROM products') as any[];
    
    console.log('Product images:');
    rows.forEach((row: any) => {
      console.log(`- ${row.name}: ${row.image_url}`);
    });
    
    // Close the connection
    await pool.end();
  } catch (error) {
    console.error('❌ Error checking product images:', error);
    process.exit(1);
  }
}

checkProductImages();