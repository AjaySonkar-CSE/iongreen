import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: Number(process.env.MYSQL_PORT ?? "3306"),
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "green_db",
};

async function migrate() {
    console.log('Migrating solutions table...');

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Check if gallery column exists
        const [columns] = await connection.query('DESCRIBE solutions');
        const colNames = (columns as any[]).map((c: any) => c.Field);

        if (!colNames.includes('gallery')) {
            console.log('Adding gallery column to solutions table...');
            await connection.query('ALTER TABLE solutions ADD COLUMN gallery JSON NULL AFTER image_url');
            console.log('✅ Added gallery column');
        } else {
            console.log('ℹ️ gallery column already exists');
        }

        await connection.end();
        console.log('✅ Migration completed successfully');
    } catch (error) {
        console.error('❌ Error during migration:', error);
        process.exit(1);
    }
}

migrate();
