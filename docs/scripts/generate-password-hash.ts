import { hash } from 'bcryptjs';

async function generateHash() {
  const password = process.argv[2] || 'admin123';
  const hashedPassword = await hash(password, 10);
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hashedPassword}`);
}

generateHash().catch(console.error);