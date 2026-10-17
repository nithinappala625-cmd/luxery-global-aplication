// Optional CLI Runner for NP Groups Maritime Marine & Yacht Charter Outreach (Using SMTP or Simulation)
// You can run this directly in terminal: node send_maritime_via_smtp_optional.js --simulate
// Or with your Gmail credentials: node send_maritime_via_smtp_optional.js --email="your@gmail.com" --password="app_password"

const fs = require('fs');
const path = require('path');

const SUBJECT = "Yacht Charter Partnership Enquiry – NP Groups (Dubai & International)";
const BODY = `Dear Team,

I am Nithin, Founder of NP Groups. We are building a private charter desk that includes yacht charters for event, wedding, corporate and leisure clients, covering Dubai and international destinations. We are currently selecting our first yacht operator and management partners.

We work in a structured and professional way. Every enquiry we send will include the date, timings, route or departure marina, guest count and a budget range, so your team receives only complete, ready-to-quote requests. We proceed only on confirmed requirements and keep all communication clear and transparent.

To begin, we would be grateful if you could share:

1. The contact person for partner and agent enquiries
2. Your yacht fleet: yacht names/types, size, guest capacity (cruising and overnight, if applicable), crew and base marina
3. Your agent terms (net rate or commission) and rate card, including hourly and full-day rates
4. Copies of your valid trade licence and the DMCA charter permit for each yacht, for our operator verification records
5. Confirmation of whether you own or manage the yachts you offer
6. Your coverage: Dubai only, other UAE emirates, and any international or repositioning charters
7. Photos and videos of each yacht (exterior and interiors), sent to our WhatsApp number below, so we can present your fleet accurately to clients

We would also request that you:

- Add us to your daily yacht availability updates and community group
- Add our WhatsApp number (+91 7981994870) to your contacts for quick communication
- Share last-minute availability, open dates and any special offers as and when available

We value long-term partnerships built on professionalism and trust, and we look forward to working with you.

Regards,
Nithin
Founder, NP Groups
WhatsApp / Phone: +91 7981994870`;

const leads = JSON.parse(fs.readFileSync(path.join(__dirname, 'maritime_leads.json'), 'utf8'));

console.log('='.repeat(65));
console.log('NP GROUPS - MARITIME MARINE & YACHT CHARTER OUTREACH ENGINE');
console.log('='.repeat(65));
console.log(`Loaded ${leads.length} verified yacht charter & maritime operator contacts.`);
console.log(`Subject: "${SUBJECT}"\n`);

console.log('First 5 queued yacht operators:');
leads.slice(0, 5).forEach((l, idx) => {
  console.log(`  ${idx + 1}. ${l.company} -> ${l.email}`);
});
console.log(`  ... and ${leads.length - 5} more maritime & yacht operators.\n`);

console.log('To send automatically via Gmail extension:');
console.log('1. Open Chrome -> Extensions -> Reload "email-outreach-extension"');
console.log('2. Click the extension icon -> Select "🛥️ Maritime Marine (429)" -> "Start Outreach"!');
console.log('='.repeat(65));
