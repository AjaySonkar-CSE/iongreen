import mysql from 'mysql2/promise';

async function testConnection() {
  console.log('Testing MySQL connection with various authentication methods...\n');

  // Test 1: Try with empty password
  console.log('1. Testing with empty password...');
  try {
    const connection1 = await mysql.createConnection({
      host: process.env.MYSQL_HOST ?? "localhost",
      port: Number(process.env.MYSQL_PORT ?? "3306"),
      user: process.env.MYSQL_USER ?? "root",
      password: "", // Empty password
      multipleStatements: false
    });
    console.log('✅ Connected successfully with empty password!');
    await connection1.end();
  } catch (error) {
    console.log('❌ Failed with empty password:', (error as any).message);
  }

  // Test 2: Try with common default passwords
  const commonPasswords = ['root', 'password', '123456', 'mysql'];
  
  for (const pwd of commonPasswords) {
    console.log(`\n2. Testing with password: "${pwd}"...`);
    try {
      const connection2 = await mysql.createConnection({
        host: process.env.MYSQL_HOST ?? "localhost",
        port: Number(process.env.MYSQL_PORT ?? "3306"),
        user: process.env.MYSQL_USER ?? "root",
        password: pwd,
        multipleStatements: false
      });
      console.log(`✅ Connected successfully with password: "${pwd}"!`);
      await connection2.end();
      return; // Exit if successful
    } catch (error) {
      console.log(`❌ Failed with password "${pwd}":`, (error as any).message);
    }
  }

  // Test 3: Try to connect without specifying a database to check basic auth
  console.log('\n3. Testing basic connection to check if MySQL server is running...');
  try {
    const connection3 = await mysql.createConnection({
      host: process.env.MYSQL_HOST ?? "localhost",
      port: Number(process.env.MYSQL_PORT ?? "3306"),
      user: process.env.MYSQL_USER ?? "root",
      password: process.env.MYSQL_PASSWORD ?? "",
    });
    
    // Test a simple query
    const [results] = await connection3.execute('SELECT VERSION() as version');
    console.log('✅ MySQL server is running. Version:', (results as any)[0].version);
    await connection3.end();
  } catch (error) {
    console.log('❌ MySQL server connection failed:', (error as any).message);
  }

  console.log('\n💡 Troubleshooting suggestions:');
  console.log('1. Make sure MySQL server is running');
  console.log('2. If you recently installed MySQL, you might need to set a root password');
  console.log('3. Check MySQL configuration to see if root access is restricted');
  console.log('4. You might need to create a dedicated database user for the application');
}

testConnection().catch(console.error);