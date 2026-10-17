/**
 * ROYENDISON AVIATION — SOVEREIGN LUXURY CONTROLLER
 * Minimal, Fast, Static-First Two-Step Enquiry Flow & Concierge Routing
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '919999999999';

  // =========================================================================
  // 1. HEADER SCROLL & MOBILE DRAWER NAVIGATION
  // =========================================================================
  const header = document.getElementById('site-header');
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      mobileMenu.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // =========================================================================
  // 2. MOBILE FIXED CONTACT BAR KEYBOARD AVOIDANCE
  // =========================================================================
  const mobileBar = document.getElementById('mobile-contact-bar');
  const formInputs = document.querySelectorAll('input, select, textarea');

  formInputs.forEach((input) => {
    input.addEventListener('focus', function () {
      if (mobileBar) mobileBar.classList.add('hidden-for-keyboard');
    });
    input.addEventListener('blur', function () {
      if (mobileBar) mobileBar.classList.remove('hidden-for-keyboard');
    });
  });

  // =========================================================================
  // 3. SERVICE SELECTOR & DYNAMIC PROMPTS
  // =========================================================================
  const serviceSelect = document.getElementById('enq-service-type');
  const serviceSpecificBox = document.getElementById('service-specific-box');
  const serviceSpecificLabel = document.getElementById('service-specific-label');
  const serviceSpecificInput = document.getElementById('enq-service-detail');

  const SERVICE_SPECIFIC_MAP = {
    'Helicopter': {
      label: 'Helipad & Landing Preferences',
      placeholder: 'e.g. Rooftop helipad, venue lawn landing permissions, airport tarmac apron transfer'
    },
    'Corporate Travel': {
      label: 'Corporate Retainer & Route Frequency',
      placeholder: 'e.g. Monthly multi-city board flight, recurring executive shuttle, roadshow dates'
    },
    'Weddings and Experiences': {
      label: 'Event Details & Rose Petal Shower',
      placeholder: 'e.g. Grand bridal entrance, 200 KG rose petal shower over mandap, guest air convoy'
    },
    'Aircraft Sales': {
      label: 'Target Aircraft Category & Acquisition Horizon',
      placeholder: 'e.g. Pre-owned Super-Midsize Jet, delivery position, budget parameters, VT registration'
    }
  };

  function updateDynamicServiceFields() {
    if (!serviceSelect || !serviceSpecificBox) return;
    const selected = serviceSelect.value;
    const config = SERVICE_SPECIFIC_MAP[selected];

    if (config) {
      serviceSpecificLabel.textContent = config.label;
      serviceSpecificInput.placeholder = config.placeholder;
      serviceSpecificBox.classList.add('visible');
    } else {
      serviceSpecificBox.classList.remove('visible');
      serviceSpecificInput.value = '';
    }
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateDynamicServiceFields);
  }

  // =========================================================================
  // 4. PRE-FILL HANDLERS (SERVICE PREFILL & ROUTE SHORTCUTS)
  // =========================================================================
  const prefillTriggers = document.querySelectorAll('[data-prefill]');
  prefillTriggers.forEach((trigger) => {
    trigger.addEventListener('click', function () {
      const targetService = this.getAttribute('data-prefill');
      if (serviceSelect && targetService) {
        serviceSelect.value = targetService;
        updateDynamicServiceFields();
      }
      showFormStep(1);
    });
  });

  const routeShortcuts = document.querySelectorAll('[data-route-origin]');
  routeShortcuts.forEach((shortcut) => {
    shortcut.addEventListener('click', function () {
      const origin = this.getAttribute('data-route-origin');
      const dest = this.getAttribute('data-route-dest');
      const service = this.getAttribute('data-route-service');

      const originInput = document.getElementById('enq-origin');
      const destInput = document.getElementById('enq-dest');

      if (originInput && origin) originInput.value = origin;
      if (destInput && dest) destInput.value = dest;
      if (serviceSelect && service) {
        serviceSelect.value = service;
        updateDynamicServiceFields();
      }

      showFormStep(1);
    });
  });

  // Set default travel date to 3 days ahead
  const dateInput = document.getElementById('enq-date');
  if (dateInput) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);
    dateInput.value = futureDate.toISOString().split('T')[0];
  }

  // =========================================================================
  // 5. ACCESSIBLE TWO-STEP ENQUIRY FORM LOGIC
  // =========================================================================
  const step1Block = document.getElementById('form-step-1');
  const step2Block = document.getElementById('form-step-2');
  const stepPill1 = document.getElementById('step-pill-1');
  const stepPill2 = document.getElementById('step-pill-2');

  const btnGotoStep2 = document.getElementById('btn-goto-step-2');
  const btnBacktoStep1 = document.getElementById('btn-backto-step-1');

  function showFormStep(stepNum) {
    if (stepNum === 1) {
      if (step1Block) step1Block.classList.add('active');
      if (step2Block) step2Block.classList.remove('active');
      if (stepPill1) stepPill1.classList.add('active');
      if (stepPill2) stepPill2.classList.remove('active');
    } else if (stepNum === 2) {
      if (step1Block) step1Block.classList.remove('active');
      if (step2Block) step2Block.classList.add('active');
      if (stepPill1) stepPill1.classList.remove('active');
      if (stepPill2) stepPill2.classList.add('active');
    }
  }

  if (btnGotoStep2) {
    btnGotoStep2.addEventListener('click', function () {
      const origin = document.getElementById('enq-origin')?.value.trim();
      const dest = document.getElementById('enq-dest')?.value.trim();
      const date = document.getElementById('enq-date')?.value;

      if (!origin || !dest || !date) {
        alert('Please specify your departure location, destination, and travel date.');
        if (!origin) document.getElementById('enq-origin')?.focus();
        else if (!dest) document.getElementById('enq-dest')?.focus();
        else document.getElementById('enq-date')?.focus();
        return;
      }

      showFormStep(2);
      document.getElementById('enq-fullname')?.focus();
    });
  }

  if (btnBacktoStep1) {
    btnBacktoStep1.addEventListener('click', function () {
      showFormStep(1);
    });
  }

  // =========================================================================
  // 6. FORM SUBMISSION & CONFIDENTIAL WHATSAPP BRIEF
  // =========================================================================
  const enquiryForm = document.getElementById('private-enquiry-form');
  const successBox = document.getElementById('enquiry-success');
  const briefContent = document.getElementById('confirmation-brief-content');
  const whatsappSubmitBtn = document.getElementById('whatsapp-direct-submit');
  const btnCopyBrief = document.getElementById('btn-copy-brief');

  let currentCompiledBrief = '';

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('enq-fullname')?.value.trim();
      const contact = document.getElementById('enq-contact')?.value.trim();
      const company = document.getElementById('enq-company')?.value.trim() || 'Private Individual';
      const service = document.getElementById('enq-service-type')?.value;
      const serviceDetail = document.getElementById('enq-service-detail')?.value.trim();
      const origin = document.getElementById('enq-origin')?.value.trim();
      const destination = document.getElementById('enq-dest')?.value.trim();
      const travelDate = document.getElementById('enq-date')?.value;
      const pax = document.getElementById('enq-pax')?.value || 'Not specified';
      const requirements = document.getElementById('enq-requirements')?.value.trim() || 'Standard executive protocol';

      if (!name || !contact) {
        alert('Please provide your name and contact details.');
        return;
      }

      const referenceId = `RE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Compile WhatsApp text
      const waText = 
        `*ROYENDISON AVIATION — PRIVATE FLIGHT BRIEF*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `*Reference:* ${referenceId}\n` +
        `*Client:* ${name}\n` +
        `*Organization:* ${company}\n` +
        `*Contact:* ${contact}\n` +
        `*Service:* ${service}\n` +
        (serviceDetail ? `*Specifics:* ${serviceDetail}\n` : '') +
        `*Sector:* ${origin} ➔ ${destination}\n` +
        `*Date:* ${travelDate}\n` +
        `*Passengers:* ${pax}\n` +
        `*Requirements:* ${requirements}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Please confirm vetted operator options and quotation.`;

      currentCompiledBrief = waText;

      const encoded = encodeURIComponent(waText);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

      if (whatsappSubmitBtn) {
        whatsappSubmitBtn.href = waUrl;
      }

      // Populate confirmation brief box
      if (briefContent) {
        briefContent.innerHTML = `
          <div style="border-bottom: 1px solid rgba(200,173,127,0.3); padding-bottom: 10px; margin-bottom: 12px; display: flex; justify-content: space-between;">
            <strong style="color: var(--color-gold); font-size: 11px; letter-spacing: 0.16em;">DOSSIER REF: ${referenceId}</strong>
            <span style="font-size: 11px; color: var(--color-grey-muted);">${new Date().toLocaleDateString('en-GB')}</span>
          </div>
          <p><strong>Client:</strong> ${name} &bull; ${company}</p>
          <p><strong>Routing:</strong> ${origin} ➔ ${destination}</p>
          <p><strong>Service:</strong> ${service} &bull; ${pax} Pax &bull; Date: ${travelDate}</p>
          ${serviceDetail ? `<p><strong>Service Notes:</strong> ${serviceDetail}</p>` : ''}
          <p><strong>Requirements:</strong> ${requirements}</p>
        `;
      }

      // Hide form & show confirmation state
      enquiryForm.style.display = 'none';
      const stepIndicator = document.querySelector('.form-step-indicator');
      if (stepIndicator) stepIndicator.style.display = 'none';
      if (successBox) successBox.classList.add('active');

      // Open WhatsApp dispatch
      window.open(waUrl, '_blank');
    });
  }

  // Copy Brief Button
  if (btnCopyBrief) {
    btnCopyBrief.addEventListener('click', function () {
      if (currentCompiledBrief) {
        navigator.clipboard.writeText(currentCompiledBrief).then(() => {
          const original = btnCopyBrief.innerHTML;
          btnCopyBrief.innerHTML = '<span>✓ BRIEF COPIED</span>';
          setTimeout(() => {
            btnCopyBrief.innerHTML = original;
          }, 2500);
        });
      }
    });
  }

  // =========================================================================
  // 7. FAQ ACCORDION INTERACTION
  // =========================================================================
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');

      // Close other open FAQ items for clean accordion UX
      document.querySelectorAll('.faq-item.active').forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        this.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Initialize dynamic field state on page load
  updateDynamicServiceFields();
})();
