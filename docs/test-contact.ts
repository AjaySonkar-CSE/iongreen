import { getDbPool, ensureContactTable } from './src/lib/db';

async function testContactTable() {
  try {
    console.log('Ensuring contact table exists...');
    await ensureContactTable();
    console.log('Contact table ensured');
    
    const pool = getDbPool();
    
    console.log('Checking table structure...');
    const [rows] = await pool.query('DESCRIBE contact_requests');
    console.log('Table structure:');
    console.log(rows);
    
    console.log('Checking if we can insert a test record...');
    const [result]: any = await pool.query(
      'INSERT INTO contact_requests (name, email, company, message) VALUES (?, ?, ?, ?)',
      ['Test User', 'test@example.com', 'Test Company', 'This is a test message']
    );
    console.log('Insert result:', result);
    
    console.log('Fetching the test record...');
    const [records]: any = await pool.query('SELECT * FROM contact_requests WHERE id = ?', [result.insertId]);
    console.log('Retrieved record:');
    console.log(records[0]);
    
    console.log('Cleaning up test record...');
    await pool.query('DELETE FROM contact_requests WHERE id = ?', [result.insertId]);
    console.log('Test record cleaned up');
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testContactTable();