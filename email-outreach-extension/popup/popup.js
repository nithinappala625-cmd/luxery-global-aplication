// Email Outreach Popup Logic
document.addEventListener('DOMContentLoaded', async () => {
  // Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // Inputs
  const subjectInput = document.getElementById('template-subject');
  const bodyInput = document.getElementById('template-body');
  const leadsInput = document.getElementById('leads-input');
  const parsedCountEl = document.getElementById('parsed-count');
  const leadsCountBadge = document.getElementById('leads-count-badge');
  const leadsList = document.getElementById('leads-list');
  const csvFileInput = document.getElementById('csv-file-input');
  const fileDropzone = document.getElementById('file-dropzone');
  
  // Status & Stats
  const statusPill = document.getElementById('status-pill');
  const statusText = document.getElementById('status-text');
  const statProgressText = document.getElementById('stat-progress-text');
  const statTimer = document.getElementById('stat-timer');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const statSent = document.getElementById('stat-sent');
  const statFailed = document.getElementById('stat-failed');
  const statRemaining = document.getElementById('stat-remaining');
  const logsContainer = document.getElementById('logs-container');
  
  // Buttons
  const startBtn = document.getElementById('start-btn');
  const previewBtn = document.getElementById('preview-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const stopBtn = document.getElementById('stop-btn');
  const resetBtn = document.getElementById('reset-btn');
  const catMaritimeBtn = document.getElementById('cat-maritime-btn');
  const catAviationBtn = document.getElementById('cat-aviation-btn');
  const activeCategoryName = document.getElementById('active-category-name');
  const loadMaritimeBtn = document.getElementById('load-maritime-btn');
  const loadCharterBtn = document.getElementById('load-charter-btn');
  const loadSampleBtn = document.getElementById('load-sample-btn');
  const clearLeadsBtn = document.getElementById('clear-leads-btn');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const openGmailBtn = document.getElementById('open-gmail-btn');
  
  // Settings
  const settingMinDelay = document.getElementById('setting-min-delay');
  const settingMaxDelay = document.getElementById('setting-max-delay');
  const settingDryRun = document.getElementById('setting-dry-run');
  const settingUseSig = document.getElementById('setting-use-sig');
  const sigGroup = document.getElementById('sig-group');
  const settingSignature = document.getElementById('setting-signature');
  
  // Modal
  const previewModal = document.getElementById('preview-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOkBtn = document.getElementById('modal-ok-btn');
  const previewTo = document.getElementById('preview-to');
  const previewSubject = document.getElementById('preview-subject');
  const previewBody = document.getElementById('preview-body');

  let currentActiveInput = bodyInput;

  // Track focused input for tag insertion
  subjectInput.addEventListener('focus', () => { currentActiveInput = subjectInput; });
  bodyInput.addEventListener('focus', () => { currentActiveInput = bodyInput; });

  // Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Tag insertion
  document.querySelectorAll('.tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const tag = chip.getAttribute('data-tag');
      insertTagIntoActiveInput(tag);
    });
  });

  function insertTagIntoActiveInput(text) {
    const input = currentActiveInput || bodyInput;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const val = input.value;
    input.value = val.substring(0, start) + text + val.substring(end);
    input.selectionStart = input.selectionEnd = start + text.length;
    input.focus();
    saveTemplate();
  }

  // CAMPAIGN TEMPLATES
  const MARITIME_SUBJECT = "Yacht Charter Partnership Enquiry – NP Groups (Dubai & International)";
  const MARITIME_BODY = `Dear Team,

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

  const AVIATION_SUBJECT = "Domestic & International Charter Enquiries: Partnership with NP Groups";
  const AVIATION_BODY = `Dear Team,

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

  let currentCategory = 'maritime';
  let leads = [];

  function switchCategory(category, shouldAlert = false) {
    currentCategory = category;
    if (category === 'maritime') {
      if (catMaritimeBtn) catMaritimeBtn.classList.add('active');
      if (catAviationBtn) catAviationBtn.classList.remove('active');
      if (activeCategoryName) {
        activeCategoryName.textContent = '🛥️ Maritime Marine';
        activeCategoryName.style.color = '#38bdf8';
        activeCategoryName.style.borderColor = 'rgba(56, 189, 248, 0.25)';
      }
      
      const maritimeList = (window.MARITIME_LEADS_DATA && window.MARITIME_LEADS_DATA.length > 0)
        ? window.MARITIME_LEADS_DATA
        : [];
      
      subjectInput.value = MARITIME_SUBJECT;
      bodyInput.value = MARITIME_BODY;
      leads = maritimeList;
      leadsInput.value = leads.map(l => `${l.name}, ${l.email}, ${l.company}, ${l.role}`).join('\n');
      
      chrome.storage.local.set({
        activeCategory: 'maritime',
        template: { subject: MARITIME_SUBJECT, body: MARITIME_BODY },
        leads: leads
      });
      renderLeadsList(leads);
      if (shouldAlert) {
        alert(`Loaded Maritime Marine category: ${leads.length} verified yacht charter leads & partnership email template!`);
      }
    } else if (category === 'aviation') {
      if (catAviationBtn) catAviationBtn.classList.add('active');
      if (catMaritimeBtn) catMaritimeBtn.classList.remove('active');
      if (activeCategoryName) {
        activeCategoryName.textContent = '✈️ Aviation Charters';
        activeCategoryName.style.color = '#a855f7';
        activeCategoryName.style.borderColor = 'rgba(168, 85, 247, 0.25)';
      }
      
      const aviationList = (window.CHARTER_LEADS_DATA && window.CHARTER_LEADS_DATA.length > 0)
        ? window.CHARTER_LEADS_DATA
        : [];
      
      subjectInput.value = AVIATION_SUBJECT;
      bodyInput.value = AVIATION_BODY;
      leads = aviationList;
      leadsInput.value = leads.map(l => `${l.name}, ${l.email}, ${l.company}, ${l.role}`).join('\n');
      
      chrome.storage.local.set({
        activeCategory: 'aviation',
        template: { subject: AVIATION_SUBJECT, body: AVIATION_BODY },
        leads: leads
      });
      renderLeadsList(leads);
      if (shouldAlert) {
        alert(`Loaded Aviation Charters category: ${leads.length} verified aircraft operator leads & partnership email template!`);
      }
    }
  }

  // Load Initial Storage
  const data = await chrome.storage.local.get([
    'campaignState', 'leads', 'template', 'settings', 'logs', 'activeCategory'
  ]);

  currentCategory = data.activeCategory || 'maritime';

  if (currentCategory === 'aviation') {
    if (catAviationBtn) catAviationBtn.classList.add('active');
    if (catMaritimeBtn) catMaritimeBtn.classList.remove('active');
    if (activeCategoryName) {
      activeCategoryName.textContent = '✈️ Aviation Charters';
      activeCategoryName.style.color = '#a855f7';
    }
  } else {
    if (catMaritimeBtn) catMaritimeBtn.classList.add('active');
    if (catAviationBtn) catAviationBtn.classList.remove('active');
    if (activeCategoryName) {
      activeCategoryName.textContent = '🛥️ Maritime Marine';
      activeCategoryName.style.color = '#38bdf8';
    }
  }

  if (data.template && data.template.subject && !data.template.subject.includes("Quick question")) {
    subjectInput.value = data.template.subject;
    bodyInput.value = data.template.body || '';
  } else {
    subjectInput.value = currentCategory === 'aviation' ? AVIATION_SUBJECT : MARITIME_SUBJECT;
    bodyInput.value = currentCategory === 'aviation' ? AVIATION_BODY : MARITIME_BODY;
    saveTemplate();
  }

  if (data.settings) {
    settingMinDelay.value = data.settings.minDelay || 8;
    settingMaxDelay.value = data.settings.maxDelay || 15;
    settingDryRun.checked = !!data.settings.isDryRun;
    settingUseSig.checked = !!data.settings.sendSignature;
    settingSignature.value = data.settings.signature || '';
    sigGroup.style.display = settingUseSig.checked ? 'block' : 'none';
  }

  leads = data.leads || [];
  // If leads empty, populate based on category
  if (leads.length === 0) {
    if (currentCategory === 'aviation' && window.CHARTER_LEADS_DATA) {
      leads = window.CHARTER_LEADS_DATA;
    } else if (window.MARITIME_LEADS_DATA) {
      leads = window.MARITIME_LEADS_DATA;
    }
    chrome.storage.local.set({ leads, activeCategory: currentCategory });
  }
  renderLeadsList(leads);

  updateUIFromState(data.campaignState, leads, data.logs);

  // Auto-Save Template Changes
  subjectInput.addEventListener('input', saveTemplate);
  bodyInput.addEventListener('input', saveTemplate);

  function saveTemplate() {
    chrome.storage.local.set({
      template: {
        subject: subjectInput.value,
        body: bodyInput.value
      }
    });
  }

  // Settings Save
  function saveSettings() {
    chrome.storage.local.set({
      settings: {
        minDelay: parseInt(settingMinDelay.value, 10) || 8,
        maxDelay: parseInt(settingMaxDelay.value, 10) || 15,
        isDryRun: settingDryRun.checked,
        sendSignature: settingUseSig.checked,
        signature: settingSignature.value
      }
    });
  }

  settingMinDelay.addEventListener('change', saveSettings);
  settingMaxDelay.addEventListener('change', saveSettings);
  settingDryRun.addEventListener('change', saveSettings);
  settingSignature.addEventListener('input', saveSettings);
  settingUseSig.addEventListener('change', () => {
    sigGroup.style.display = settingUseSig.checked ? 'block' : 'none';
    saveSettings();
  });

  // Parse pasted leads
  leadsInput.addEventListener('input', () => {
    const text = leadsInput.value.trim();
    if (!text) return;
    const parsed = parseLeadsFromText(text);
    if (parsed.length > 0) {
      leads = parsed;
      saveAndRenderLeads(leads);
    }
  });

  function parseLeadsFromText(text) {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
    const lines = text.split('\n');
    const result = [];
    const seen = new Set();

    lines.forEach(line => {
      line = line.trim();
      if (!line) return;

      const emailMatch = line.match(emailRegex);
      if (!emailMatch) return;

      const email = emailMatch[0].toLowerCase();
      if (seen.has(email)) return;
      seen.add(email);

      // Try parsing comma or tab separated fields: Name, Email, Company, Role
      const parts = line.split(/[,;\t]/).map(p => p.trim());
      let name = '';
      let company = '';
      let role = '';

      if (parts.length >= 2) {
        if (parts[0].includes('@')) {
          company = parts[1] || '';
          role = parts[2] || '';
        } else {
          name = parts[0] || '';
          company = parts[2] || '';
          role = parts[3] || '';
        }
      }

      if (!name) {
        // Fallback: extract name from email prefix (e.g. john.doe@... -> John)
        const prefix = email.split('@')[0].split(/[._]/)[0];
        name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }

      result.push({ email, name, company: company || 'Company', role: role || 'Lead' });
    });

    return result;
  }

  function saveAndRenderLeads(list) {
    chrome.storage.local.set({ leads: list });
    renderLeadsList(list);
  }

  function renderLeadsList(list) {
    parsedCountEl.textContent = list.length;
    leadsCountBadge.textContent = list.length;

    if (!list || list.length === 0) {
      leadsList.innerHTML = `<div class="empty-leads">No leads loaded yet. Paste leads above or click "Load Demo Leads".</div>`;
      return;
    }

    leadsList.innerHTML = list.map((lead, idx) => `
      <div class="lead-item">
        <div>
          <span class="lead-email">${idx + 1}. ${lead.email}</span>
          <div class="lead-meta">${lead.name ? lead.name : ''} ${lead.company ? '• ' + lead.company : ''} ${lead.role ? '• ' + lead.role : ''}</div>
        </div>
      </div>
    `).join('');
  }

  // Category Switchers
  if (catMaritimeBtn) {
    catMaritimeBtn.addEventListener('click', () => switchCategory('maritime', false));
  }
  if (catAviationBtn) {
    catAviationBtn.addEventListener('click', () => switchCategory('aviation', false));
  }

  // Quick category loaders in Recipients Tab
  if (loadMaritimeBtn) {
    loadMaritimeBtn.addEventListener('click', () => switchCategory('maritime', true));
  }
  if (loadCharterBtn) {
    loadCharterBtn.addEventListener('click', () => switchCategory('aviation', true));
  }

  // Demo Leads loader
  loadSampleBtn.addEventListener('click', () => {
    const demoLeads = [
      { name: "Alex Rivera", email: "alex.growth@acmeventures.io", company: "Acme Ventures", role: "Head of Growth" },
      { name: "Sarah Chen", email: "sarah.chen@innovatetech.co", company: "Innovate Tech", role: "VP Engineering" },
      { name: "Marcus Brody", email: "marcus@velocityscale.com", company: "Velocity Scale", role: "Managing Director" },
      { name: "Elena Rostova", email: "elena@apexbrands.global", company: "Apex Brands", role: "Director of Marketing" }
    ];
    leads = demoLeads;
    leadsInput.value = demoLeads.map(l => `${l.name}, ${l.email}, ${l.company}, ${l.role}`).join('\n');
    saveAndRenderLeads(leads);
  });

  // Clear leads
  clearLeadsBtn.addEventListener('click', () => {
    leads = [];
    leadsInput.value = '';
    saveAndRenderLeads(leads);
  });

  // CSV Drag and Drop
  fileDropzone.addEventListener('click', () => csvFileInput.click());
  fileDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropzone.classList.add('dragover');
  });
  fileDropzone.addEventListener('dragleave', () => fileDropzone.classList.remove('dragover'));
  fileDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleCSVFile(e.dataTransfer.files[0]);
  });
  csvFileInput.addEventListener('change', (e) => {
    if (e.target.files.length) handleCSVFile(e.target.files[0]);
  });

  function handleCSVFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const parsed = parseLeadsFromText(content);
      if (parsed.length > 0) {
        leads = parsed;
        saveAndRenderLeads(leads);
        leadsInput.value = parsed.map(l => `${l.name}, ${l.email}, ${l.company}`).join('\n');
      }
    };
    reader.readAsText(file);
  }

  // Open Gmail tab
  openGmailBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://mail.google.com/' });
  });

  // Preview Modal
  previewBtn.addEventListener('click', () => {
    if (leads.length === 0) {
      alert('Please add at least one lead to preview.');
      return;
    }
    const sampleLead = leads[0];
    previewTo.textContent = `${sampleLead.name} <${sampleLead.email}>`;
    previewSubject.textContent = renderTemplateStr(subjectInput.value, sampleLead);
    previewBody.textContent = renderTemplateStr(bodyInput.value, sampleLead);
    previewModal.classList.add('open');
  });

  closeModalBtn.addEventListener('click', () => previewModal.classList.remove('open'));
  modalOkBtn.addEventListener('click', () => previewModal.classList.remove('open'));

  function resolveSpintaxStr(text) {
    return text.replace(/\{([^{}]+)\}/g, (match, choices) => {
      const options = choices.split('|');
      return options[0]; // first choice for preview
    });
  }

  function renderTemplateStr(tmpl, lead) {
    let out = resolveSpintaxStr(tmpl || '');
    for (const [k, v] of Object.entries(lead)) {
      out = out.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'gi'), v || '');
    }
    out = out.replace(/\{\{name\}\}/gi, lead.name || 'there');
    out = out.replace(/\{\{company\}\}/gi, lead.company || 'your team');
    out = out.replace(/\{\{email\}\}/gi, lead.email || '');
    return out;
  }

  // Campaign Start / Pause / Stop
  startBtn.addEventListener('click', () => {
    if (leads.length === 0) {
      alert('Please add at least 1 lead before starting.');
      return;
    }
    if (!subjectInput.value.trim() || !bodyInput.value.trim()) {
      alert('Please enter a subject line and email body.');
      return;
    }

    // Switch to logs tab
    document.querySelector('.tab-btn[data-tab="logs-tab"]').click();

    chrome.runtime.sendMessage({ type: 'START_CAMPAIGN' });
  });

  pauseBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'PAUSE_CAMPAIGN' });
  });

  stopBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'STOP_CAMPAIGN' });
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('Reset campaign progress and clear logs?')) {
      chrome.runtime.sendMessage({ type: 'RESET_CAMPAIGN' });
    }
  });

  // Export CSV
  exportCsvBtn.addEventListener('click', async () => {
    const res = await chrome.storage.local.get(['logs']);
    const list = res.logs || [];
    if (list.length === 0) {
      alert('No logs to export.');
      return;
    }

    let csv = "Recipient,Name,Company,Subject,Status,Timestamp,Error\n";
    list.forEach(item => {
      const row = [
        `"${item.recipient || ''}"`,
        `"${item.name || ''}"`,
        `"${item.company || ''}"`,
        `"${(item.subject || '').replace(/"/g, '""')}"`,
        `"${item.status || ''}"`,
        `"${item.timestamp || ''}"`,
        `"${(item.error || '').replace(/"/g, '""')}"`
      ];
      csv += row.join(',') + "\n";
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email_outreach_results_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Update UI Function
  function updateUIFromState(state, currentLeads, logs) {
    state = state || { status: 'IDLE', currentIndex: 0, total: 0, sentCount: 0, failedCount: 0, timerNextSeconds: 0 };
    logs = logs || [];
    const total = currentLeads.length;

    // Status Pill
    statusPill.className = `status-pill ${state.status.toLowerCase()}`;
    statusText.textContent = state.status;

    // Progress Bar
    const percent = total > 0 ? Math.round((state.currentIndex / total) * 100) : 0;
    progressBarFill.style.width = `${percent}%`;
    statProgressText.textContent = `${state.currentIndex} / ${total} (${percent}%)`;

    // Counters
    statSent.textContent = state.sentCount || 0;
    statFailed.textContent = state.failedCount || 0;
    statRemaining.textContent = Math.max(0, total - (state.currentIndex || 0));

    // Countdown / Timer
    if (state.status === 'RUNNING') {
      if (state.timerNextSeconds > 0) {
        statTimer.textContent = `Pacing: ${state.timerNextSeconds}s`;
      } else {
        statTimer.textContent = `Automating...`;
      }
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      stopBtn.disabled = false;
      pauseBtn.textContent = 'Pause';
    } else if (state.status === 'PAUSED') {
      statTimer.textContent = 'Paused';
      startBtn.disabled = false;
      pauseBtn.disabled = false;
      stopBtn.disabled = false;
      pauseBtn.textContent = 'Resume';
    } else {
      statTimer.textContent = state.status === 'COMPLETED' ? 'Completed!' : 'Ready';
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      stopBtn.disabled = true;
      pauseBtn.textContent = 'Pause';
    }

    // Logs list
    if (logs.length === 0) {
      logsContainer.innerHTML = `<div class="empty-logs">No activity yet. Logs will appear here during send.</div>`;
    } else {
      logsContainer.innerHTML = logs.map(item => `
        <div class="log-entry">
          <div>
            <span class="log-badge ${item.status.toLowerCase()}">${item.status}</span>
            <strong style="color: #f1f5f9;">${item.recipient}</strong>
          </div>
          <span class="log-time">${item.timestamp}</span>
        </div>
      `).join('');
    }
  }

  // Real-time Storage Listener
  chrome.storage.onChanged.addListener((changes) => {
    chrome.storage.local.get(['campaignState', 'leads', 'logs'], (data) => {
      updateUIFromState(data.campaignState, data.leads || [], data.logs || []);
    });
  });

  // Polling fallback while popup is active
  setInterval(() => {
    chrome.storage.local.get(['campaignState', 'leads', 'logs'], (data) => {
      updateUIFromState(data.campaignState, data.leads || [], data.logs || []);
    });
  }, 1000);
});
