// Test script to validate all API endpoints
const tests = [
  { name: 'Products API', url: '/api/products?all=true' },
  { name: 'Solutions API', url: '/api/solutions' },
  { name: 'News API', url: '/api/news' },
  { name: 'Lab Equipment API', url: '/api/lab-equipment' },
  { name: 'Admin Stats API', url: '/api/admin/stats' }
];

async function testAPIs() {
  console.log('🔍 Testing API endpoints...\n');
  
  for (const test of tests) {
    try {
      const response = await fetch(test.url);
      const data = await response.json();
      
      console.log(`✅ ${test.name}: ${response.status} ${response.statusText}`);
      console.log(`   Data count: ${data.data?.length || 0} items`);
      console.log(`   Success: ${data.success}\n`);
    } catch (error) {
      console.log(`❌ ${test.name}: Failed - ${error.message}\n`);
    }
  }
}

// Test routing paths
const routes = [
  { name: 'Products Page', url: '/products' },
  { name: 'Solutions Page', url: '/solutions' },
  { name: 'News Page', url: '/news' },
  { name: 'Lab Equipment Page', url: '/lab-equipment' },
  { name: 'Admin Dashboard', url: '/admin' }
];

async function testRoutes() {
  console.log('🔍 Testing page routes...\n');
  
  for (const route of routes) {
    try {
      const response = await fetch(route.url);
      console.log(`✅ ${route.name}: ${response.status} ${response.statusText}\n`);
    } catch (error) {
      console.log(`❌ ${route.name}: Failed - ${error.message}\n`);
    }
  }
}

// Run all tests
async function runAllTests() {
  await testAPIs();
  await testRoutes();
  console.log('🎉 Testing complete!');
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testAPIs = testAPIs;
  window.testRoutes = testRoutes;
  window.runAllTests = runAllTests;
}

export { testAPIs, testRoutes, runAllTests };
