const fs = require('fs');
const { execSync } = require('child_process');

// Use PowerShell to extract the docx (it's a zip)
const file = 'Doc3 (1).docx';
const tempDir = 'temp_docx_extract';

// Clean up
try { fs.rmSync(tempDir, { recursive: true }); } catch (e) { }
fs.mkdirSync(tempDir, { recursive: true });

// Copy and rename to .zip
fs.copyFileSync(file, tempDir + '/doc.zip');

// Extract using PowerShell
execSync(`powershell -c "Expand-Archive -Path '${tempDir}/doc.zip' -DestinationPath '${tempDir}/out' -Force"`, { timeout: 15000 });

// Read document.xml
const xml = fs.readFileSync(tempDir + '/out/word/document.xml', 'utf-8');

// Extract text from w:t tags
const texts = [];
const regex = /<w:t[^>]*>([^<]+)<\/w:t>/g;
let m;
while ((m = regex.exec(xml)) !== null) {
    texts.push(m[1]);
}

const result = texts.join(' ');
fs.writeFileSync('temp_doc3_content.txt', result, 'utf-8');
console.log('Done, length:', result.length);
console.log(result.substring(0, 5000));

// Clean up
fs.rmSync(tempDir, { recursive: true });
