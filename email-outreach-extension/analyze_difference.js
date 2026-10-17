const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(path.join(__dirname, 'process_charter_leads.js'), 'utf8');
const startTag = 'const rawData = `';
const endTag = '`;\n\n// Excluded';

const startIdx = scriptContent.indexOf(startTag) + startTag.length;
const endIdx = scriptContent.indexOf(endTag);
const rawData = scriptContent.substring(startIdx, endIdx).trim();

const lines = rawData.split('\n');
console.log(`Total lines provided by user: ${lines.length}`);

const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

let totalEmailsInInput = 0;
const companyEntries = [];

lines.forEach((line, idx) => {
  const parts = line.split(':');
  const company = parts[0].trim();
  const rest = parts.slice(1).join(':');
  const matches = rest.match(emailRegex) || [];
  const uniqueInLine = [...new Set(matches.map(e => e.toLowerCase()))];
  uniqueInLine.forEach(e => {
    companyEntries.push({
      line: idx + 1,
      company,
      email: e
    });
  });
});

console.log(`Total company-email pairs extracted: ${companyEntries.length}`);

// Check exclusions:
const exclusions = ['simmsamm', 'avocet', 'iictechnologies', 'flapsaviation'];

const excludedEntries = companyEntries.filter(entry => {
  const lower = `${entry.company} ${entry.email}`.toLowerCase();
  return exclusions.some(ex => lower.includes(ex));
});

console.log(`\nExcluded entries (${excludedEntries.length}):`);
excludedEntries.forEach(e => console.log(`  Line ${e.line}: ${e.company} -> ${e.email}`));

// Check duplicates:
const emailCountMap = {};
companyEntries.forEach(e => {
  emailCountMap[e.email] = (emailCountMap[e.email] || 0) + 1;
});

console.log(`\nDuplicate emails appearing in more than 1 company/line:`);
Object.entries(emailCountMap).forEach(([email, count]) => {
  if (count > 1) {
    const matching = companyEntries.filter(e => e.email === email);
    console.log(`  Email "${email}" appears ${count} times:`);
    matching.forEach(m => console.log(`    - Line ${m.line}: ${m.company}`));
  }
});
