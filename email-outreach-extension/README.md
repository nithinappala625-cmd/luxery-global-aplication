# ⚡ Email Outreach - Automated 1-by-1 Cold Emailer Chrome Extension

A Chrome Extension (Manifest V3) designed to automate sending personalized cold outreach emails **1-by-1 to different email addresses** directly through Gmail with intelligent human-like pacing, dynamic tags, spintax, and real-time progress tracking.

---

## 🚀 Key Features

- **Automated 1-by-1 Sending via Gmail**: Automatically opens compose in Gmail, fills recipient, personalizes subject and body, and sends with realistic human pacing.
- **Dynamic Tag Personalization**:
  - `{{name}}` — Recipient's first or full name
  - `{{company}}` — Target company name
  - `{{role}}` — Job title or role
  - `{{email}}` — Email address
- **Spintax Support**: Use `{Hi|Hello|Hey}` or `{quick question|thought|idea}` to dynamically vary phrasing per recipient and protect email deliverability.
- **Flexible Lead Management**:
  - Paste lists directly (`name, email, company, role` or just `email`)
  - Drag & drop CSV files (includes `sample_leads.csv` for immediate testing)
  - 1-Click "Load Demo Leads" button
- **Pacing & Account Safety**:
  - Configurable randomized delay (default: 8–15 seconds) between emails to respect Gmail sending policies.
  - **Dry Run / Test Mode**: Test and simulate your entire campaign without clicking send.
- **In-Gmail Floating HUD**: An unobtrusive floating widget inside Gmail displaying real-time countdown, current recipient, and immediate Pause / Stop controls.
- **Live Logs & CSV Export**: Real-time progress bar, sent/failed counters, and one-click export of sent campaign history to CSV.
- **Modern Luxury UI**: Sleek dark slate glassmorphic aesthetic built for high-speed workflow.

---

## 📦 How to Install in 3 Easy Steps (Under 30 Seconds)

1. Open Google Chrome (or Brave / Edge / Opera) and navigate to:
   ```
   chrome://extensions
   ```
2. Enable **"Developer mode"** via the toggle switch in the top-right corner.
3. Click the **"Load unpacked"** button in the top-left and select this folder:
   ```
   c:\luxery project\email-outreach-extension
   ```
4. Pin the **Email Outreach** icon to your browser toolbar!

---

## 🛥️ Campaign Categories (Instant 1-Click Switcher)

The extension now features a **Category Switcher** allowing you to instantly swap templates and leads between NP Groups desks:

### 1. 🛥️ Maritime Marine (Yacht Charters) — 429 Verified Contacts
- **Pre-loaded Subject**: `Yacht Charter Partnership Enquiry – NP Groups (Dubai & International)`
- **Pre-loaded Body**: Complete structured enquiry for yacht charters covering Dubai & international destinations, requesting fleet details, DMCA permits, trade licences, agent terms, and photos/videos to WhatsApp `+91 7981994870`.
- **Pre-filtered Leads (429 Operators)**: Extracted and cleaned from all provided marine, yacht management, and charter companies in Dubai, UAE & international ports. Saved in [maritime_leads.csv](file:///c:/luxery%20project/email-outreach-extension/maritime_leads.csv) and [maritime_leads.json](file:///c:/luxery%20project/email-outreach-extension/maritime_leads.json).

### 2. ✈️ Aviation Operators (Flight Charters) — 135 Verified Contacts
- **Pre-loaded Subject**: `Domestic & International Charter Enquiries: Partnership with NP Groups`
- **Pre-loaded Body**: Complete structured enquiry for aircraft & helicopter charters across domestic & international routes.
- **Pre-filtered Leads (135 Operators)**: Saved in [charter_leads.csv](file:///c:/luxery%20project/email-outreach-extension/charter_leads.csv) and [charter_leads.json](file:///c:/luxery%20project/email-outreach-extension/charter_leads.json).
- **Excluded Companies Filtered Out (4 Companies)**:
  - ❌ `Simm Samm Airways` (`ceo@simmsamm.com`, `ops@simmsamm.com`)
  - ❌ `Avocet Aviation` (`yashpal@avocet.co.in`)
  - ❌ `IIC Technologies` (`vijay.madhavarapu@iictechnologies.com`)
  - ❌ `Flaps Aviation` (`gyan@flapsaviation.in`)

---

## 🛠️ How to Send the Emails Fast

1. **Open Gmail**: In Chrome, log into your Gmail account (`https://mail.google.com`).
2. **Open Extension**: Click the **Email Outreach** icon in your Chrome toolbar.
3. **Verify/Load**:
   - The Subject and Message are already set!
   - Under the **Leads** tab, all 135 operators are pre-loaded (or click **"⚡ Load NP Groups Leads (135)"** anytime).
4. **Preview**: Click **"Preview Next"** to inspect how the email will look populated for Lead #1.
5. **(Optional) Enable Test Mode**: In **Settings**, toggle **"Dry Run / Test Mode"** if you want to test the entire sequence without clicking send.
6. **Start Outreach**: Click **"Start Outreach"**!
   - The extension will automatically handle Gmail compose, enter recipient, subject, and message, and send 1-by-1 with human-like delays.
   - Monitor the live progress bar and floating HUD in real time.

---

## 📂 Project Structure

```
email-outreach-extension/
├── manifest.json            # Manifest V3 extension configuration
├── sample_leads.csv         # Ready-to-use sample leads for testing
├── generate_icons.js        # Node.js script that generated icon assets
├── icons/                   # High-res extension icons (16px, 48px, 128px)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── popup/                   # Extension popup interface
│   ├── popup.html           # Luxury UI structure
│   ├── popup.css            # Dark mode glassmorphic styling
│   └── popup.js             # Leads parser, spintax engine & campaign controller
├── background/              # Background service worker
│   └── background.js        # Automation queue, pacing timers & Gmail coordination
└── content/                 # Gmail web automation
    ├── content.js           # Resilient DOM selectors for Compose, Inputs & Send
    └── content.css          # In-Gmail floating status HUD
```
