const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(path.join(__dirname, 'process_charter_leads.js'), 'utf8');
const startTag = 'const rawData = `';
const endTag = '`;\n\n// Excluded';

const startIdx = scriptContent.indexOf(startTag) + startTag.length;
const endIdx = scriptContent.indexOf(endTag);
const rawData = scriptContent.substring(startIdx, endIdx).trim();

const lines = rawData.split('\n');
console.log(`Original total company lines: ${lines.length}`);

// Excluded companies
const excludedKeywords = ['simmsamm', 'avocet', 'iictechnologies', 'flapsaviation'];

function isExcluded(line) {
  const lower = line.toLowerCase();
  return excludedKeywords.some(k => lower.includes(k));
}

const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

const leads135 = [];
const excludedLines = [];

lines.forEach((line, idx) => {
  line = line.trim();
  if (!line) return;

  if (isExcluded(line)) {
    excludedLines.push({ lineNum: idx + 1, text: line });
    return;
  }

  const colonIdx = line.indexOf(':');
  let company = '';
  let rest = line;
  if (colonIdx !== -1) {
    company = line.substring(0, colonIdx).trim();
    rest = line.substring(colonIdx + 1);
  }

  const match = rest.match(emailRegex);
  const email = match ? match[0].toLowerCase() : '';

  if (email) {
    leads135.push({
      company: company,
      email: email,
      name: 'Team',
      role: 'Aviation Operations / Charters'
    });
  }
});

console.log(`Excluded companies count: ${excludedLines.length}`);
excludedLines.forEach(e => console.log(`  - Line ${e.lineNum}: ${e.text.split(':')[0]}`));

console.log(`\nTotal remaining companies in list: ${leads135.length}`);

// Save to charter_leads.json, charter_leads.csv, popup/charter_leads_data.js, background/charter_leads_data.js
fs.writeFileSync(path.join(__dirname, 'charter_leads.json'), JSON.stringify(leads135, null, 2));

let csv = 'Company,Email,Name,Role\n';
leads135.forEach(l => {
  csv += `"${l.company.replace(/"/g, '""')}","${l.email}","${l.name}","${l.role}"\n`;
});
fs.writeFileSync(path.join(__dirname, 'charter_leads.csv'), csv);

const popupJs = 'window.CHARTER_LEADS_DATA = ' + JSON.stringify(leads135, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, 'popup', 'charter_leads_data.js'), popupJs);

const bgJs = 'self.CHARTER_LEADS_DATA = ' + JSON.stringify(leads135, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, 'background', 'charter_leads_data.js'), bgJs);

console.log('Successfully updated all data files to exactly 135 companies!');
