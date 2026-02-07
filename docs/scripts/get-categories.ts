import { getDbPool } from '../src/lib/db';

async function getCategories() {
  try {
    const pool = getDbPool();
    
    // Get distinct product categories
    const [productCategories] = await pool.query(
      'SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != "" ORDER BY category'
    );
    
    console.log('Product Categories:');
    (productCategories as any[]).forEach((cat: any) => {
      console.log(`- ${cat.category}`);
    });
    
    // Get distinct solution categories
    const [solutionCategories] = await pool.query(
      'SELECT DISTINCT category FROM solutions WHERE category IS NOT NULL AND category != "" ORDER BY category'
    );
    
    console.log('\nSolution Categories:');
    (solutionCategories as any[]).forEach((cat: any) => {
      console.log(`- ${cat.category}`);
    });
    
    // Get distinct lab equipment categories
    const [labEquipmentCategories] = await pool.query(
      'SELECT DISTINCT category FROM lab_equipment WHERE category IS NOT NULL AND category != "" ORDER BY category'
    );
    
    console.log('\nLab Equipment Categories:');
    (labEquipmentCategories as any[]).forEach((cat: any) => {
      console.log(`- ${cat.category}`);
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

getCategories();