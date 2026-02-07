async function testDetailed() {
  try {
    const response = await fetch('http://localhost:3005/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'admin123' })
    });

    console.log('Status:', response.status);
    console.log('Headers:', [...response.headers.entries()]);
    
    const text = await response.text(); // Get raw text first
    console.log('Raw response length:', text.length);
    console.log('Raw response (first 300 chars):', text.substring(0, 300) + (text.length > 300 ? '...' : ''));
    
    if (text.trim().startsWith('<')) {
      console.log('ERROR: Response is HTML, not JSON!');
    } else {
      try {
        const json = JSON.parse(text);
        console.log('Parsed JSON:', json);
      } catch (e) {
        console.log('JSON parsing failed:', e.message);
      }
    }
  } catch (error) {
    console.error('Network error:', error.message);
  }
}

testDetailed();