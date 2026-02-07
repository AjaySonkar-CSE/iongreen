import { getDbPool } from '../src/lib/db';

async function checkSchema() {
  try {
    console.log('Checking database schema...');
    
    // Connect to the database
    const pool = await getDbPool();
    
    // Check solutions table structure
    const [solutionColumns] = await pool.query('DESCRIBE solutions');
    console.log('Solutions table columns:');
    console.log(solutionColumns);
    
    // Check if category column exists
    const hasCategoryColumn = (solutionColumns as any[]).some((col: any) => col.Field === 'category');
    console.log('\nSolutions table has category column:', hasCategoryColumn);
    
    // Check products table structure
    const [productColumns] = await pool.query('DESCRIBE products');
    console.log('\nProducts table columns:');
    console.log(productColumns);
    
    // Check if category column exists in products
    const productHasCategoryColumn = (productColumns as any[]).some((col: any) => col.Field === 'category');
    console.log('\nProducts table has category column:', productHasCategoryColumn);
    
    // Close the connection
    await pool.end();
    
    console.log('\n✅ Schema check completed successfully');
    
  } catch (error) {
    console.error('❌ Error checking schema:', error);
    process.exit(1);
  }
}

checkSchema();