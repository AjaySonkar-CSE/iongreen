import mysql from 'mysql2/promise';

async function updateProductsSchema() {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      port: Number(process.env.MYSQL_PORT ?? "3306"),
      user: process.env.MYSQL_USER ?? "root",
      password: process.env.MYSQL_PASSWORD ?? "",
      database: "green_db",
    });

    console.log('Updating products table schema...');

    // Helper to add column if missing
    const addColumn = async (colName: string, colType: string) => {
      try {
        await pool.query(`ALTER TABLE products ADD COLUMN ${colName} ${colType}`);
        console.log(`Added ${colName} column.`);
      } catch (e: any) {
        if (e.code === 'ER_DUP_FIELDNAME') {
          console.log(`${colName} column already exists.`);
        } else {
          throw e;
        }
      }
    };

    await addColumn('category', 'VARCHAR(255)');

    // Check types again
    const [columns] = await pool.query('DESCRIBE products') as any[];
    console.log('Columns:', columns.map((c: any) => c.Field));

    await pool.end();
    console.log('Schema update complete.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to update schema:', error);
    process.exit(1);
  }
}

updateProductsSchema();
