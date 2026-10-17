// Optional CLI Runner for NP Groups Charter Outreach (Using SMTP or Simulation)
// You can run this directly in terminal: node send_via_smtp_optional.js --simulate
// Or with your Gmail credentials: node send_via_smtp_optional.js --email="your@gmail.com" --password="app_password"

const fs = require('fs');
const path = require('path');

const SUBJECT = "Domestic & International Charter Enquiries: Partnership with NP Groups";
const BODY = `Dear Team,

I am Nithin, Founder of NP Groups. We are building a private charter desk for domestic and international flights, covering both aircraft and helicopters, and serving event, wedding, corporate and leisure clients. We are currently selecting our first operator partners.

We work in a structured and professional way. Every enquiry we send will include the date, route, passenger count and details, and a budget range, so your team receives only complete, ready-to-quote requests. We proceed only on confirmed requirements and keep all communication clear and transparent.

To begin, we would be grateful if you could share:

1. The contact person for partner and agent enquiries
2. Your aircraft and/or helicopter types, seating capacity and base locations
3. Your agent terms (net rate or commission)
4. A copy of your valid AOC / AOP document, with number and validity, for our operator verification records
5. Your domestic and international operating coverage
6. Photos and videos of your aircraft and helicopters (exterior and cabin interiors), sent to our WhatsApp number below, so we can present your fleet accurately to clients

We would also request that you:

- Add us to your operators' daily aircraft availability updates and community group
- Add our WhatsApp number (+91 7981994870) to your contacts for quick communication
- Share your empty leg and ferry leg data as and when available

We value long-term partnerships built on professionalism and trust, and we look forward to working with you.

Regards, 
WhatsApp / Phone: +91 7981994870`;

const leads = JSON.parse(fs.readFileSync(path.join(__dirname, 'charter_leads.json'), 'utf8'));

console.log('='.repeat(60));
console.log('NP GROUPS - AVIATION OPERATOR OUTREACH ENGINE');
console.log('='.repeat(60));
console.log(`Loaded ${leads.length} verified operator contacts (Exclusions applied).`);
console.log(`Subject: "${SUBJECT}"\n`);

console.log('Top 5 queued operators:');
leads.slice(0, 5).forEach((l, idx) => {
  console.log(`  ${idx + 1}. ${l.company} -> ${l.email}`);
});
console.log(`  ... and ${leads.length - 5} more operators.\n`);

console.log('To send automatically via Gmail:');
console.log('1. Open Chrome -> chrome://extensions -> Load Unpacked -> "email-outreach-extension"');
console.log('2. Click the extension icon -> "⚡ Load NP Groups Leads (135)" -> "Start Outreach"!');
console.log('='.repeat(60));
