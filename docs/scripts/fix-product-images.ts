import { getDbPool } from '../src/lib/db';

async function fixProductImages() {
  try {
    const pool = getDbPool();
    
    // Update all products to use local images
    const [result1] = await pool.query(
      "UPDATE products SET image_url = CONCAT('/1/ion', FLOOR(1 + RAND() * 6), '.png') WHERE image_url LIKE 'http%'"
    );
    
    // Also update uploaded images to use local images
    const [result2] = await pool.query(
      "UPDATE products SET image_url = CONCAT('/1/ion', FLOOR(1 + RAND() * 6), '.png') WHERE image_url LIKE '/uploads%'"
    );
    
    console.log('Updated products with external images:', (result1 as any).affectedRows);
    console.log('Updated products with uploaded images:', (result2 as any).affectedRows);
    console.log('✅ All product images updated to use local images');
    
    // Close the connection
    await pool.end();
  } catch (error) {
    console.error('❌ Error updating product images:', error);
    process.exit(1);
  }
}

fixProductImages();