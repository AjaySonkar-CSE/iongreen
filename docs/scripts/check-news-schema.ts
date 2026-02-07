
import mysql from 'mysql2/promise';

async function checkNewsSchema() {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST ?? "127.0.0.1",
      port: Number(process.env.MYSQL_PORT ?? "3306"),
      user: process.env.MYSQL_USER ?? "root",
      password: process.env.MYSQL_PASSWORD ?? "Pravin2005",
      database: "green_db",
    });

    try {
      const [columns] = await pool.query('DESCRIBE news') as any[];
      console.log('News Table Columns:', columns.map((c: any) => c.Field));
    } catch (e: any) {
      if (e.code === 'ER_NO_SUCH_TABLE') {
        console.log('News table does not exist.');
      } else {
        throw e;
      }
    }

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Failed to check schema:', error);
    process.exit(1);
  }
}

checkNewsSchema();
