// Email Outreach Content Script for Gmail Automation
(() => {
  let hudElement = null;

  // Initialize HUD on page load
  function initHud() {
    if (document.getElementById('email-outreach-hud')) return;

    hudElement = document.createElement('div');
    hudElement.id = 'email-outreach-hud';
    hudElement.className = 'hud-hidden';
    hudElement.innerHTML = `
      <div class="hud-icon">
        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </div>
      <div class="hud-content">
        <div class="hud-title">
          <span>Email Outreach</span>
          <span id="hud-badge" class="hud-badge sending">Active</span>
        </div>
        <div id="hud-status" class="hud-status">Ready to automate...</div>
      </div>
      <div class="hud-actions">
        <button id="hud-pause-btn" class="hud-btn">Pause</button>
        <button id="hud-stop-btn" class="hud-btn btn-stop">Stop</button>
      </div>
    `;

    document.body.appendChild(hudElement);

    document.getElementById('hud-pause-btn').addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'TOGGLE_PAUSE_CAMPAIGN' });
    });

    document.getElementById('hud-stop-btn').addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'STOP_CAMPAIGN' });
    });
  }

  function updateHud(visible, statusText, badgeType = 'sending', badgeText = 'Sending') {
    initHud();
    if (!hudElement) return;

    if (visible) {
      hudElement.classList.remove('hud-hidden');
    } else {
      hudElement.classList.add('hud-hidden');
      return;
    }

    const statusEl = document.getElementById('hud-status');
    const badgeEl = document.getElementById('hud-badge');
    const pauseBtn = document.getElementById('hud-pause-btn');

    if (statusEl) statusEl.textContent = statusText;
    if (badgeEl) {
      badgeEl.className = `hud-badge ${badgeType}`;
      badgeEl.textContent = badgeText;
    }
    if (pauseBtn) {
      pauseBtn.textContent = badgeType === 'paused' ? 'Resume' : 'Pause';
    }
  }

  // Utilities
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function waitForElement(selector, root = document, timeout = 7000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const el = typeof selector === 'function' ? selector() : root.querySelector(selector);
      if (el && el.offsetParent !== null) return el;
      await sleep(250);
    }
    return null;
  }

  // Find or open Gmail compose window
  async function openComposeWindow() {
    // Check if a compose window is already open
    let subjectInput = document.querySelector('input[name="subjectbox"]');
    if (subjectInput) {
      const dialog = subjectInput.closest('div[role="dialog"]');
      if (dialog) return dialog;
    }

    // Click Compose button
    const composeSelectors = [
      'div[gh="cm"]',
      'div[role="button"][aria-label*="Compose" i]',
      '.T-I.T-I-KE.L3',
      'div[data-tooltip*="Compose" i]'
    ];

    let composeBtn = null;
    for (const sel of composeSelectors) {
      composeBtn = document.querySelector(sel);
      if (composeBtn) break;
    }

    if (composeBtn) {
      composeBtn.click();
    } else {
      // Fallback: simulate 'c' keyboard press
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', keyCode: 67, bubbles: true }));
    }

    // Wait for compose dialog to appear
    const dialog = await waitForElement(() => {
      const sub = document.querySelector('input[name="subjectbox"]');
      return sub ? sub.closest('div[role="dialog"]') || sub.closest('table') || document.body : null;
    }, document, 8000);

    if (!dialog) throw new Error('Could not open Gmail Compose window.');
    await sleep(600);
    return dialog;
  }

  // Fill Recipient Field
  async function setRecipient(dialog, email) {
    // Look for recipient input fields
    const toSelectors = [
      'input[aria-label*="To recipients" i]',
      'input[aria-label*="To" i]',
      'input[peoplekit-id]',
      'textarea[name="to"]',
      'input[role="combobox"][aria-label*="To" i]',
      'div[name="to"] input',
      'form input[type="text"]'
    ];

    let toInput = null;
    for (const sel of toSelectors) {
      toInput = dialog.querySelector(sel);
      if (toInput) break;
    }

    if (!toInput) {
      // Fallback: search anywhere in dialog for "To" button or label
      const toLabel = dialog.querySelector('span[aria-label*="To" i], div[aria-label*="To" i]');
      if (toLabel) {
        toLabel.click();
        await sleep(300);
        toInput = dialog.querySelector('input[aria-label*="To" i], textarea[name="to"], input[type="text"]');
      }
    }

    if (!toInput) throw new Error('Could not find the "To" recipient field.');

    toInput.focus();
    toInput.value = '';
    // Use execCommand or direct assignment + simulate typing
    document.execCommand('insertText', false, email);
    if (!toInput.value.includes(email)) {
      toInput.value = email;
    }

    toInput.dispatchEvent(new Event('input', { bubbles: true }));
    toInput.dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(250);

    // Press Enter to confirm recipient chip
    toInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, code: 'Enter', bubbles: true }));
    toInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13, code: 'Enter', bubbles: true }));
    await sleep(400);
  }

  // Fill Subject Field
  async function setSubject(dialog, subject) {
    const subjectInput = dialog.querySelector('input[name="subjectbox"], input[placeholder*="Subject" i], input[aria-label*="Subject" i]');
    if (!subjectInput) throw new Error('Could not find the Subject field.');

    subjectInput.focus();
    subjectInput.value = '';
    document.execCommand('insertText', false, subject);
    if (subjectInput.value !== subject) {
      subjectInput.value = subject;
    }
    subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
    subjectInput.dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(350);
  }

  // Fill Message Body Field
  async function setBody(dialog, bodyText) {
    const bodySelectors = [
      'div[role="textbox"][aria-label*="Message Body" i]',
      'div[role="textbox"][aria-label*="Body" i]',
      'div[g_editable="true"][role="textbox"]',
      'div[contenteditable="true"][role="textbox"]',
      'div[contenteditable="true"]'
    ];

    let bodyInput = null;
    for (const sel of bodySelectors) {
      bodyInput = dialog.querySelector(sel);
      if (bodyInput) break;
    }

    if (!bodyInput) throw new Error('Could not find the Message Body field.');

    bodyInput.focus();
    await sleep(200);

    // Format newlines into HTML paragraphs or breaks
    const formattedHtml = bodyText
      .split('\n')
      .map(line => line.trim() === '' ? '<div><br></div>' : `<div>${line}</div>`)
      .join('');

    // Clear existing placeholder or text
    bodyInput.innerHTML = '';
    document.execCommand('insertHTML', false, formattedHtml);

    if (!bodyInput.innerHTML || bodyInput.innerHTML === '<br>') {
      bodyInput.innerHTML = formattedHtml;
    }

    bodyInput.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(400);
  }

  // Trigger Send Button
  async function clickSend(dialog) {
    const sendSelectors = [
      'div[role="button"][data-tooltip*="Send" i]',
      'div[role="button"][aria-label*="Send" i]',
      '.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3',
      'div[data-tooltip*="Ctrl-Enter" i]',
      'div[data-tooltip*="⌘-Enter" i]'
    ];

    let sendBtn = null;
    for (const sel of sendSelectors) {
      sendBtn = dialog.querySelector(sel);
      if (sendBtn && sendBtn.offsetParent !== null) break;
    }

    if (sendBtn) {
      sendBtn.click();
    } else {
      // Fallback: Press Ctrl+Enter on body
      const bodyInput = dialog.querySelector('div[role="textbox"]');
      if (bodyInput) {
        bodyInput.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Enter',
          keyCode: 13,
          code: 'Enter',
          ctrlKey: true,
          bubbles: true
        }));
      } else {
        throw new Error('Could not trigger the Send button.');
      }
    }

    // Wait 1.5 seconds to confirm dispatch
    await sleep(1500);
  }

  // Main automated flow for 1 single email
  async function executeSendEmail(payload) {
    const { lead, subject, body, isDryRun } = payload;
    const recipientEmail = lead.email;

    updateHud(true, `Sending to ${recipientEmail}...`, 'sending', 'Automating');

    if (isDryRun) {
      console.log('[Email Outreach Dry Run] Skipping actual send for:', recipientEmail);
      await sleep(1500);
      updateHud(true, `[Dry Run] Simulated sending to ${recipientEmail}`, 'sending', 'Simulated');
      return { success: true, dryRun: true };
    }

    const dialog = await openComposeWindow();
    await setRecipient(dialog, recipientEmail);
    await setSubject(dialog, subject);
    await setBody(dialog, body);
    await sleep(800); // Realistic human pacing before hitting send
    await clickSend(dialog);

    updateHud(true, `Sent successfully to ${recipientEmail}!`, 'sending', 'Success');
    return { success: true };
  }

  // Message listener from extension background/popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'PING_GMAIL') {
      sendResponse({ status: 'PONG', ready: true, url: window.location.href });
      return true;
    }

    if (message.type === 'SEND_OUTREACH_EMAIL') {
      executeSendEmail(message.payload)
        .then(res => sendResponse(res))
        .catch(err => {
          console.error('[Email Outreach Content Error]', err);
          updateHud(true, `Failed: ${err.message}`, 'paused', 'Error');
          sendResponse({ success: false, error: err.message });
        });
      return true; // Keep message channel open for async response
    }

    if (message.type === 'UPDATE_HUD') {
      const { visible, text, badgeType, badgeText } = message.payload;
      updateHud(visible, text, badgeType, badgeText);
      sendResponse({ success: true });
      return true;
    }
  });

  // Init HUD on script execution
  setTimeout(initHud, 1500);
})();
