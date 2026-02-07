import { getDbPool } from "../src/lib/db";

async function checkData() {
  try {
    console.log("Checking database data...");
    const pool = getDbPool();
    
    // Check solutions data
    try {
      const [solutions]: any = await pool.query("SELECT COUNT(*) as count FROM solutions");
      console.log(`✅ Solutions table has ${solutions[0].count} records`);
      
      if (solutions[0].count > 0) {
        const [sample]: any = await pool.query("SELECT title, slug FROM solutions LIMIT 1");
        console.log("Sample solution:", sample[0]);
      }
    } catch (error) {
      console.log("❌ Error checking solutions data:", (error as Error).message);
    }
    
    // Check lab_equipment data
    try {
      const [equipment]: any = await pool.query("SELECT COUNT(*) as count FROM lab_equipment");
      console.log(`✅ Lab equipment table has ${equipment[0].count} records`);
      
      if (equipment[0].count > 0) {
        const [sample]: any = await pool.query("SELECT name, slug FROM lab_equipment LIMIT 1");
        console.log("Sample equipment:", sample[0]);
      }
    } catch (error) {
      console.log("❌ Error checking lab equipment data:", (error as Error).message);
    }
    
    // Check case_studies data
    try {
      const [cases]: any = await pool.query("SELECT COUNT(*) as count FROM case_studies");
      console.log(`✅ Case studies table has ${cases[0].count} records`);
      
      if (cases[0].count > 0) {
        const [sample]: any = await pool.query("SELECT title, slug FROM case_studies LIMIT 1");
        console.log("Sample case study:", sample[0]);
      }
    } catch (error) {
      console.log("❌ Error checking case studies data:", (error as Error).message);
    }
    
    await pool.end();
    console.log("✅ Data check completed successfully");
  } catch (error) {
    console.error("❌ Data check failed:", error);
  }
}

checkData();