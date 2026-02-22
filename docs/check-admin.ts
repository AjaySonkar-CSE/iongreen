import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

async function checkAdmin() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '',
    database: 'green_db',
  });

  const [rows] = await conn.execute('SELECT id, email, password FROM users WHERE email = ?', ['admin@example.com']);
  
  if (Array.isArray(rows) && rows.length > 0) {
    const user = rows[0] as any;
    console.log('Email:', user.email);
    console.log('Password hash:', user.password);
    
    // Test if password matches
    const match = await bcrypt.compare('admin123', user.password);
    console.log('Password matches "admin123":', match);
  } else {
    console.log('No admin user found');
  }
  
  await conn.end();
}

checkAdmin().catch(console.error);
