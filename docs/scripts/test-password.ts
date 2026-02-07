import { compare } from 'bcryptjs';

async function testPassword() {
  const testPassword = 'admin123';
  const storedHash = '$2b$10$BD9tuDZX5UhYqDJRJXip3ud900c3Xe8dADgV1ZpdP/YCeb17/mpBW';
  
  console.log('Testing password:', testPassword);
  console.log('Stored hash:', storedHash);
  
  const isValid = await compare(testPassword, storedHash);
  console.log('Password valid:', isValid);
}

testPassword().catch(console.error);