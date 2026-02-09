import { exec } from 'child_process';
import { promisify } from 'util';
import mysql from 'mysql2/promise';
import path from 'path';

const execAsync = promisify(exec);

// Database configuration from environment variables
const dbConfig = {
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DATABASE ?? "green_db",
};

async function createDatabaseIfNotExists() {
  try {
    console.log('📦 Creating database if it does not exist...');
    
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true,
    });

    await tempConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    
    console.log(`✅ Database '${dbConfig.database}' created or already exists`);
    await tempConnection.end();
  } catch (error) {
    console.error('❌ Error creating database:', error);
    throw error;
  }
}

async function runScript(scriptPath: string, description: string) {
  try {
    console.log(`\n🔄 Running: ${description}...`);
    const { stdout, stderr } = await execAsync(
      `npx ts-node --project tsconfig.scripts.json "${scriptPath}"`,
      { cwd: process.cwd() }
    );
    
    if (stdout) console.log(stdout);
    if (stderr && !stderr.includes('Warning')) console.error(stderr);
    
    console.log(`✅ Completed: ${description}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Error running ${description}:`, error.message);
    return false;
  }
}

async function runJavaScriptScript(scriptPath: string, description: string) {
  try {
    console.log(`\n🔄 Running: ${description}...`);
    const { stdout, stderr } = await execAsync(
      `node "${scriptPath}"`,
      { cwd: process.cwd() }
    );
    
    if (stdout) console.log(stdout);
    if (stderr && !stderr.includes('Warning')) console.error(stderr);
    
    console.log(`✅ Completed: ${description}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Error running ${description}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting database migration...\n');
  console.log('Database Configuration:');
  console.log(`  Host: ${dbConfig.host}`);
  console.log(`  Port: ${dbConfig.port}`);
  console.log(`  User: ${dbConfig.user}`);
  console.log(`  Database: ${dbConfig.database}`);
  console.log(`  Password: ${dbConfig.password ? '[SET]' : '[EMPTY]'}\n`);

  try {
    // Step 1: Create database
    await createDatabaseIfNotExists();

    // Step 2: Run full database initialization (creates all tables)
    const scriptsDir = path.join(__dirname);
    
    const migrationSteps = [
      {
        path: path.join(scriptsDir, 'init-full-db.ts'),
        description: 'Full Database Initialization',
        type: 'ts' as const,
      },
      {
        path: path.join(scriptsDir, 'init-db.ts'),
        description: 'Database Tables & Sample Data',
        type: 'ts' as const,
      },
    ];

    let successCount = 0;
    let failCount = 0;

    for (const step of migrationSteps) {
      const success = step.type === 'ts' 
        ? await runScript(step.path, step.description)
        : await runJavaScriptScript(step.path, step.description);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary:');
    console.log(`  ✅ Successful: ${successCount}`);
    console.log(`  ❌ Failed: ${failCount}`);
    console.log('='.repeat(50));

    if (failCount === 0) {
      console.log('\n🎉 All migrations completed successfully!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some migrations failed. Please check the errors above.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();

