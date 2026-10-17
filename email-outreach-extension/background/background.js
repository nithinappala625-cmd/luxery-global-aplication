// Email Outreach Background Service Worker
// Manages Campaign Queue, Pacing, State, and Gmail Tab Coordination
try {
  importScripts('charter_leads_data.js', 'maritime_leads_data.js');
} catch (e) {
  console.log('leads_data load error or worker context:', e);
}

const DEFAULT_MARITIME_SUBJECT = "Yacht Charter Partnership Enquiry – NP Groups (Dubai & International)";
const DEFAULT_MARITIME_BODY = `Dear Team,

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

const DEFAULT_CHARTER_SUBJECT = "Domestic & International Charter Enquiries: Partnership with NP Groups";
const DEFAULT_CHARTER_BODY = `Dear Team,

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

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(['template', 'leads', 'settings', 'activeCategory']);
  const updates = {};

  const activeCategory = data.activeCategory || 'maritime';
  updates.activeCategory = activeCategory;

  if (!data.template || !data.template.subject || data.template.subject.includes('Quick question')) {
    updates.template = {
      subject: activeCategory === 'aviation' ? DEFAULT_CHARTER_SUBJECT : DEFAULT_MARITIME_SUBJECT,
      body: activeCategory === 'aviation' ? DEFAULT_CHARTER_BODY : DEFAULT_MARITIME_BODY
    };
  }

  if (!data.leads || data.leads.length === 0) {
    if (activeCategory === 'aviation' && self.CHARTER_LEADS_DATA) {
      updates.leads = self.CHARTER_LEADS_DATA;
    } else if (self.MARITIME_LEADS_DATA) {
      updates.leads = self.MARITIME_LEADS_DATA;
    }
  }

  if (!data.settings) {
    updates.settings = {
      minDelay: 8,
      maxDelay: 15,
      isDryRun: false,
      sendSignature: false
    };
  }

  if (Object.keys(updates).length > 0) {
    await chrome.storage.local.set(updates);
    console.log('[Email Outreach] Initialized default NP Groups category template & leads.');
  }
});

const DEFAULT_STATE = {
  status: 'IDLE', // IDLE, RUNNING, PAUSED, COMPLETED, STOPPED
  currentIndex: 0,
  total: 0,
  sentCount: 0,
  failedCount: 0,
  currentLeadEmail: '',
  timerNextSeconds: 0
};

let campaignInterval = null;
let isProcessing = false;

// Resolve Spintax: e.g. "{Hi|Hello|Hey}" -> "Hello"
function resolveSpintax(text) {
  if (!text) return '';
  const spintaxRegex = /\{([^{}]+)\}/g;
  return text.replace(spintaxRegex, (match, choices) => {
    const options = choices.split('|');
    return options[Math.floor(Math.random() * options.length)];
  });
}

// Replace Template Variables: {{name}}, {{company}}, etc.
function renderTemplate(templateString, lead) {
  let content = resolveSpintax(templateString || '');
  
  // Replace each field in lead object
  for (const [key, val] of Object.entries(lead)) {
    const reg = new RegExp(`\\{\\{${key}\\}\\}`, 'gi');
    content = content.replace(reg, val || '');
  }

  // Common fallbacks
  content = content.replace(/\{\{name\}\}/gi, lead.name || 'there');
  content = content.replace(/\{\{company\}\}/gi, lead.company || 'your team');
  content = content.replace(/\{\{email\}\}/gi, lead.email || '');

  return content;
}

// Random delay helper
function getRandomDelay(minSeconds, maxSeconds) {
  const min = Math.max(1, parseInt(minSeconds, 10) || 5);
  const max = Math.max(min, parseInt(maxSeconds, 10) || 12);
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Ensure an active Gmail tab exists or create one
async function getOrCreateGmailTab() {
  const tabs = await chrome.tabs.query({ url: '*://mail.google.com/*' });
  if (tabs.length > 0) {
    // Select first open Gmail tab
    return tabs[0];
  }

  // If no tab exists, create one
  const newTab = await chrome.tabs.create({ url: 'https://mail.google.com/', active: true });
  // Wait for tab to load
  await new Promise(resolve => {
    const listener = (tabId, info) => {
      if (tabId === newTab.id && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    };
    chrome.tabs.onUpdated.addListener(listener);
  });
  await sleep(3000); // Give Gmail a moment to initialize DOM
  return newTab;
}

// Ensure content script is ready in Gmail tab
async function ensureContentScript(tabId) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, { type: 'PING_GMAIL' });
    if (response && response.ready) return true;
  } catch (e) {
    // Inject manually if needed
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['content/content.js']
      });
      await chrome.scripting.insertCSS({
        target: { tabId },
        files: ['content/content.css']
      });
      await sleep(1000);
      return true;
    } catch (err) {
      console.error('Failed to inject content script:', err);
      return false;
    }
  }
  return true;
}

// Process the next lead in the queue
async function processNextLead() {
  const data = await chrome.storage.local.get(['campaignState', 'leads', 'template', 'settings', 'logs']);
  let state = data.campaignState || { ...DEFAULT_STATE };
  const leads = data.leads || [];
  const template = data.template || { subject: '', body: '' };
  const settings = data.settings || { minDelay: 8, maxDelay: 15, isDryRun: false };
  let logs = data.logs || [];

  if (state.status !== 'RUNNING') {
    isProcessing = false;
    return;
  }

  if (state.currentIndex >= leads.length) {
    state.status = 'COMPLETED';
    state.currentLeadEmail = '';
    await chrome.storage.local.set({ campaignState: state });
    isProcessing = false;

    // Notify HUD
    try {
      const gmailTab = await getOrCreateGmailTab();
      if (gmailTab) {
        chrome.tabs.sendMessage(gmailTab.id, {
          type: 'UPDATE_HUD',
          payload: { visible: true, text: `Campaign finished! Sent ${state.sentCount}/${leads.length}`, badgeType: 'sending', badgeText: 'Complete' }
        });
      }
    } catch (e) {}
    return;
  }

  const currentLead = leads[state.currentIndex];
  state.currentLeadEmail = currentLead.email;
  await chrome.storage.local.set({ campaignState: state });

  // Get personalized Subject and Body
  const finalSubject = renderTemplate(template.subject, currentLead);
  let finalBody = renderTemplate(template.body, currentLead);

  if (settings.sendSignature && settings.signature) {
    finalBody += `\n\n--\n${settings.signature}`;
  }

  let result = null;
  let errorMsg = null;

  try {
    const gmailTab = await getOrCreateGmailTab();
    await ensureContentScript(gmailTab.id);

    // Send command to content script
    result = await chrome.tabs.sendMessage(gmailTab.id, {
      type: 'SEND_OUTREACH_EMAIL',
      payload: {
        lead: currentLead,
        subject: finalSubject,
        body: finalBody,
        isDryRun: settings.isDryRun
      }
    });

    if (!result || !result.success) {
      errorMsg = result?.error || 'Unknown send failure in Gmail.';
    }
  } catch (err) {
    errorMsg = err.message || 'Could not communicate with Gmail tab.';
  }

  // Update counters and logs
  const logEntry = {
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    recipient: currentLead.email,
    name: currentLead.name || '',
    company: currentLead.company || '',
    subject: finalSubject,
    status: errorMsg ? 'FAILED' : (settings.isDryRun ? 'SIMULATED' : 'SENT'),
    timestamp: new Date().toLocaleTimeString(),
    error: errorMsg || ''
  };

  logs.unshift(logEntry);
  if (logs.length > 500) logs.pop();

  if (errorMsg) {
    state.failedCount = (state.failedCount || 0) + 1;
  } else {
    state.sentCount = (state.sentCount || 0) + 1;
  }

  state.currentIndex += 1;
  await chrome.storage.local.set({ campaignState: state, logs });

  // Check if paused or stopped in the meantime
  const check = await chrome.storage.local.get(['campaignState']);
  if (check.campaignState?.status !== 'RUNNING') {
    isProcessing = false;
    return;
  }

  // Pacing Delay before next email
  if (state.currentIndex < leads.length) {
    const delayMs = getRandomDelay(settings.minDelay, settings.maxDelay);
    const delaySec = Math.round(delayMs / 1000);

    // Countdown updates
    for (let sec = delaySec; sec > 0; sec--) {
      const cur = await chrome.storage.local.get(['campaignState']);
      if (cur.campaignState?.status !== 'RUNNING') {
        isProcessing = false;
        return;
      }
      cur.campaignState.timerNextSeconds = sec;
      await chrome.storage.local.set({ campaignState: cur.campaignState });

      // Notify HUD
      try {
        const gmailTab = await getOrCreateGmailTab();
        if (gmailTab) {
          chrome.tabs.sendMessage(gmailTab.id, {
            type: 'UPDATE_HUD',
            payload: {
              visible: true,
              text: `Next email in ${sec}s (${state.currentIndex}/${leads.length})`,
              badgeType: 'waiting',
              badgeText: 'Pacing'
            }
          });
        }
      } catch (e) {}

      await sleep(1000);
    }
  }

  // Loop to next email
  processNextLead();
}

// Background Message Handlers
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_CAMPAIGN') {
    chrome.storage.local.get(['campaignState', 'leads'], (data) => {
      let state = data.campaignState || { ...DEFAULT_STATE };
      const leads = data.leads || [];

      state.status = 'RUNNING';
      state.total = leads.length;
      if (state.currentIndex >= leads.length) {
        state.currentIndex = 0;
        state.sentCount = 0;
        state.failedCount = 0;
      }

      chrome.storage.local.set({ campaignState: state }, () => {
        if (!isProcessing) {
          isProcessing = true;
          processNextLead();
        }
        sendResponse({ success: true, status: 'RUNNING' });
      });
    });
    return true;
  }

  if (message.type === 'PAUSE_CAMPAIGN' || message.type === 'TOGGLE_PAUSE_CAMPAIGN') {
    chrome.storage.local.get(['campaignState'], (data) => {
      let state = data.campaignState || { ...DEFAULT_STATE };
      if (state.status === 'RUNNING') {
        state.status = 'PAUSED';
      } else if (state.status === 'PAUSED') {
        state.status = 'RUNNING';
        if (!isProcessing) {
          isProcessing = true;
          processNextLead();
        }
      }
      chrome.storage.local.set({ campaignState: state }, () => {
        sendResponse({ success: true, status: state.status });
      });
    });
    return true;
  }

  if (message.type === 'STOP_CAMPAIGN') {
    chrome.storage.local.get(['campaignState'], (data) => {
      let state = data.campaignState || { ...DEFAULT_STATE };
      state.status = 'STOPPED';
      state.currentLeadEmail = '';
      state.timerNextSeconds = 0;
      isProcessing = false;

      chrome.storage.local.set({ campaignState: state }, () => {
        // Hide/update HUD
        getOrCreateGmailTab().then(tab => {
          if (tab) {
            chrome.tabs.sendMessage(tab.id, {
              type: 'UPDATE_HUD',
              payload: { visible: false, text: 'Campaign Stopped', badgeType: 'paused', badgeText: 'Stopped' }
            });
          }
        }).catch(() => {});

        sendResponse({ success: true, status: 'STOPPED' });
      });
    });
    return true;
  }

  if (message.type === 'RESET_CAMPAIGN') {
    const newState = { ...DEFAULT_STATE };
    chrome.storage.local.set({ campaignState: newState, logs: [] }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
