import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('Share Concerns & Symptoms') || line.includes('Secure Photo Upload')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
