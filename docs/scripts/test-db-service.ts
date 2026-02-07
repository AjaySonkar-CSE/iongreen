import { dbService } from "../src/lib/db-service";

async function testDbService() {
  try {
    console.log("Testing database service functions...");
    
    // Test getSolutions
    try {
      console.log("Testing getSolutions...");
      const solutions = await dbService.getSolutions();
      console.log(`✅ Found ${solutions.length} solutions`);
      if (solutions.length > 0) {
        console.log("Sample solution:", {
          title: solutions[0].title,
          slug: solutions[0].slug
        });
      }
    } catch (error) {
      console.log("❌ Error in getSolutions:", (error as Error).message);
    }
    
    // Test getLabEquipment
    try {
      console.log("Testing getLabEquipment...");
      const equipment = await dbService.getLabEquipment();
      console.log(`✅ Found ${equipment.length} lab equipment items`);
      if (equipment.length > 0) {
        console.log("Sample equipment:", {
          name: equipment[0].name
        });
      }
    } catch (error) {
      console.log("❌ Error in getLabEquipment:", (error as Error).message);
    }
    
    // Test getCaseStudies
    try {
      console.log("Testing getCaseStudies...");
      const caseStudies = await dbService.getCaseStudies();
      console.log(`✅ Found ${caseStudies.length} case studies`);
      if (caseStudies.length > 0) {
        console.log("Sample case study:", {
          title: caseStudies[0].title
        });
      }
    } catch (error) {
      console.log("❌ Error in getCaseStudies:", (error as Error).message);
    }
    
    console.log("✅ Database service tests completed successfully");
  } catch (error) {
    console.error("❌ Database service tests failed:", error);
  }
}

testDbService();