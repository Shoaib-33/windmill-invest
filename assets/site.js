// Windmill Invest: menus, cookie consent, attribution, lead forms and the yield calculator.
// No libraries. Events go to dataLayer and never contain personal data.
(function () {
  'use strict';
  var dl = (window.dataLayer = window.dataLayer || []);
  var SITE = window.SITE || {};
  var track = function (event, params) { var o = { event: event }; for (var k in params) o[k] = params[k]; dl.push(o); };
  var get = function (kind, key) { try { return window[kind].getItem(key); } catch (e) { return null; } };
  var set = function (kind, key, val) { try { window[kind].setItem(key, val); } catch (e) { /* storage blocked */ } };
  var each = function (sel, fn, root) { Array.prototype.forEach.call((root || document).querySelectorAll(sel), fn); };
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'nl';
  var M = {
    nl: {
      locale: 'nl-NL', consent: 'Ga akkoord met de privacyverklaring om door te gaan.', choose: 'Kies een optie.', required: 'Dit veld is verplicht.',
      postcode: 'Vul een geldige postcode in (bijv. 1234 AB).', email: 'Vul een geldig e-mailadres in.', phone: 'Vul een geldig telefoonnummer in, bijvoorbeeld 06 12345678.',
      phoneForContact: 'Vul uw telefoonnummer in, zodat we u kunnen bellen of een WhatsApp-bericht kunnen sturen.',
      step: 'Stap {n} van {t}', addressPick: 'Kies uw adres',
      photosTooMany: 'Kies maximaal 5 foto’s.', photosFailed: 'Een of meer foto’s konden niet worden geopend. Kies JPG- of PNG-foto’s.',
      addressNotFound: 'We vinden dit adres niet in het adressenregister. Controleer postcode en huisnummer, of ga gewoon verder.',
      check: 'Controleer de gemarkeerde velden.', sending: 'Bezig met versturen…',
      success: 'Bedankt, uw aanvraag is ontvangen. Wij nemen contact met u op, in volgorde van binnenkomst.',
      tooMany: 'U heeft veel aanvragen achter elkaar verstuurd. Probeer het over een paar minuten opnieuw.',
      failed: 'Er ging iets mis. Probeer het opnieuw of bel ons.', offline: 'Geen verbinding. Controleer uw internet en probeer het opnieuw.',
    },
    en: {
      locale: 'en-GB', consent: 'Please accept the privacy statement to continue.', choose: 'Please choose an option.', required: 'This field is required.',
      postcode: 'Please enter a valid Dutch postcode (e.g. 1234 AB).', email: 'Please enter a valid email address.', phone: 'Please enter a valid phone number, for example +31 6 12345678.',
      phoneForContact: 'Please enter your phone number, so we can call you or send a WhatsApp message.',
      step: 'Step {n} of {t}', addressPick: 'Choose your address',
      photosTooMany: 'Please choose up to 5 photos.', photosFailed: 'One or more photos could not be opened. Please choose JPG or PNG photos.',
      addressNotFound: 'We cannot find this address in the Dutch address register. Check the postcode and house number, or simply continue.',
      check: 'Please check the highlighted fields.', sending: 'Sending…',
      success: 'Thank you, we have received your request. We will contact you in order of receipt.',
      tooMany: 'You have sent several requests in a short time. Please try again in a few minutes.',
      failed: 'Something went wrong. Please try again or call us.', offline: 'No connection. Please check your internet and try again.',
    },
  }[LANG];

  // ---------- Navigation ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function closeMenus(except) {
    each('.has-menu.open', function (li) {
      if (li === except) return;
      li.classList.remove('open');
      li.querySelector('.nav-top').setAttribute('aria-expanded', 'false');
    });
  }
  each('.has-menu > .nav-top', function (b) {
    b.addEventListener('click', function () {
      var li = b.parentNode;
      var open = !li.classList.contains('open');
      closeMenus(li);
      li.classList.toggle('open', open);
      b.setAttribute('aria-expanded', String(open));
    });
  });
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openLi = document.querySelector('.has-menu.open');
    if (openLi) { closeMenus(); openLi.querySelector('.nav-top').focus(); return; }
    if (nav && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-menu')) closeMenus(); });

  // ---------- Attribution (first touch in this session) ----------
  var ATTR = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid'];
  var attribution = null;
  try { attribution = JSON.parse(get('sessionStorage', 'attribution_v1') || 'null'); } catch (e) { attribution = null; }
  if (!attribution) {
    attribution = {};
    var params = new URLSearchParams(location.search);
    ATTR.forEach(function (k) { var v = params.get(k); if (v) attribution[k] = v.slice(0, 200); });
    if (attribution.fbclid) attribution.fbclid_at = Date.now(); // for Meta's fbc value: fb.1.<time>.<fbclid>
    attribution.landing_page = location.pathname;
    var ref = document.referrer;
    attribution.referrer = ref && ref.indexOf(location.origin) !== 0 ? ref.slice(0, 300) : '';
    set('sessionStorage', 'attribution_v1', JSON.stringify(attribution));
  }

  // ---------- Cookie consent ----------
  var banner = document.querySelector('[data-cookie-banner]');
  var prefs = banner && banner.querySelector('[data-cookie-prefs]');
  var boxA = banner && banner.querySelector('input[name="analytics"]');
  var boxM = banner && banner.querySelector('input[name="marketing"]');
  var saved = null;
  try { saved = JSON.parse(get('localStorage', 'consent_v1') || 'null'); } catch (e) { saved = null; }
  function applyConsent(c) {
    var m = c.marketing ? 'granted' : 'denied';
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: c.analytics ? 'granted' : 'denied', ad_storage: m, ad_user_data: m, ad_personalization: m });
    }
    set('localStorage', 'consent_v1', JSON.stringify({ analytics: !!c.analytics, marketing: !!c.marketing, at: new Date().toISOString() }));
    track('consent_update', { analytics: !!c.analytics, marketing: !!c.marketing });
    banner.hidden = true;
  }
  function setPrefs(open) {
    prefs.hidden = !open;
    banner.querySelector('[data-consent="settings"]').setAttribute('aria-expanded', String(open));
    banner.querySelector('[data-consent="save"]').hidden = !open;
  }
  function showBanner(withPrefs) {
    banner.hidden = false;
    boxA.checked = !!(saved && saved.analytics);
    boxM.checked = !!(saved && saved.marketing);
    setPrefs(!!withPrefs);
  }
  if (banner) {
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (!b) return;
      var a = b.getAttribute('data-consent');
      if (a === 'settings') { setPrefs(prefs.hidden); return; }
      if (a === 'functional') saved = { analytics: false, marketing: false };
      else if (a === 'all') saved = { analytics: true, marketing: true };
      else if (a === 'save') saved = { analytics: boxA.checked, marketing: boxM.checked };
      applyConsent(saved);
    });
    if (!saved) showBanner(false);
    each('[data-cookie-settings]', function (b) {
      b.addEventListener('click', function () { showBanner(true); boxA.focus(); });
    });
  }

  // ---------- CTA clicks ----------
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-cta]');
    if (a) track('cta_click', { cta_location: a.getAttribute('data-cta'), page: location.pathname });
  });

  // ---------- Lead id ----------
  // One id per inquiry, made when a form is started and kept in a first-party cookie, so every event and
  // the CRM record share it. A new id is made after a successful submission.
  var cookie = function (name) { var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : ''; };
  var uuid = function () {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var b = new Uint8Array(16); crypto.getRandomValues(b);
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    var h = Array.prototype.map.call(b, function (x) { return (x + 256).toString(16).slice(1); }).join('');
    return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
  };
  var secure = location.protocol === 'https:' ? '; Secure' : '';
  var leadId = function () {
    var id = cookie('wi_lead_id');
    if (!id) { id = uuid(); document.cookie = 'wi_lead_id=' + id + '; Max-Age=2592000; Path=/; SameSite=Lax' + secure; }
    return id;
  };
  var newLeadId = function () { document.cookie = 'wi_lead_id=; Max-Age=0; Path=/; SameSite=Lax' + secure; };

  // ---------- Lead forms ----------
  var POSTCODE = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/;
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  each('[data-lead-form]', function (form) {
    var formType = form.elements.form_type ? form.elements.form_type.value : '';
    var status = form.querySelector('.form-status');
    var started = false;
    form.addEventListener('focusin', function () {
      if (started) return;
      started = true;
      track('form_start', { form_type: formType, page: location.pathname, lead_id: leadId() });
    });

    function setError(name, msg) {
      var el = form.querySelector('[data-error-for="' + name + '"]');
      if (el) { el.textContent = msg || ''; el.hidden = !msg; }
      var input = form.elements[name];
      if (input && input.setAttribute) {
        if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
        if (el && !el.id) el.id = 'err-' + name;
        if (msg && el) input.setAttribute('aria-describedby', el.id);
      }
    }
    function collect() {
      var data = {};
      each('input, select, textarea', function (el) {
        if (!el.name || el.disabled) return;
        if (el.type === 'checkbox') data[el.name] = el.checked;
        else if (el.type === 'radio') { if (el.checked) data[el.name] = el.value; }
        else data[el.name] = el.value.trim();
      }, form);
      return data;
    }
    // Checks the whole form, or only one step of a multi-step form (scope).
    function checkClient(data, scope) {
      var errors = {};
      var root = scope || form;
      var has = function (name) { return !!root.querySelector('[name="' + name + '"]'); };
      each('[required]', function (el) {
        if (el.type === 'checkbox') { if (!el.checked) errors[el.name] = M.consent; return; }
        if (!data[el.name]) errors[el.name] = el.tagName === 'SELECT' ? M.choose : M.required;
      }, root);
      if (has('postcode') && data.postcode && !POSTCODE.test(data.postcode)) errors.postcode = M.postcode;
      if (has('email') && data.email && !EMAIL.test(data.email)) errors.email = M.email;
      if (has('phone')) {
        if (data.phone && data.phone.replace(/\D/g, '').length < 9) errors.phone = M.phone;
        if (!data.phone && (data.consent_phone || data.consent_whatsapp) && !errors.phone) errors.phone = M.phoneForContact;
      }
      if (photoInput && root.contains(photoInput) && photoInput.files && photoInput.files.length > MAX_PHOTOS) errors.photos = M.photosTooMany;
      return errors;
    }

    // ---- Photos: made smaller here (longest side 1600 px, JPEG) so they upload fast on a phone ----
    var photoInput = form.querySelector('[data-photos]');
    var MAX_PHOTOS = 5, MAX_SIDE = 1600;
    function shrink(file) {
      return new Promise(function (ok) {
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function () {
          var s = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
          var c = document.createElement('canvas');
          c.width = Math.round(img.naturalWidth * s);
          c.height = Math.round(img.naturalHeight * s);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          URL.revokeObjectURL(url);
          ok(c.toDataURL('image/jpeg', 0.82).split(',')[1]);
        };
        img.onerror = function () { URL.revokeObjectURL(url); ok(null); }; // e.g. a HEIC file this browser cannot open
        img.src = url;
      });
    }
    function readPhotos() {
      var files = photoInput && photoInput.files ? Array.prototype.slice.call(photoInput.files) : [];
      if (!files.length) return Promise.resolve([]);
      if (files.length > MAX_PHOTOS) return Promise.reject('tooMany');
      return Promise.all(files.map(shrink)).then(function (list) {
        if (list.some(function (p) { return !p; })) throw 'failed';
        return list;
      });
    }
    if (photoInput) {
      photoInput.addEventListener('change', function () {
        setError('photos', photoInput.files.length > MAX_PHOTOS ? M.photosTooMany : '');
      });
    }

    // ---- Partial save: after each step, only with cookie consent, and never contact details ----
    var PRIVATE = ['name', 'email', 'phone', 'website', 'address_id', 'consent_privacy', 'consent_phone', 'consent_whatsapp', 'consent_marketing'];
    function saveDraft(stepNo) {
      if (!saved || !(saved.analytics || saved.marketing) || !window.fetch) return;
      var d = collect();
      PRIVATE.forEach(function (k) { delete d[k]; });
      ATTR.forEach(function (k) { if (attribution[k]) d[k] = attribution[k]; });
      d.landing_page = attribution.landing_page || '';
      d.referrer = attribution.referrer || '';
      d.lead_id = leadId();
      d.step = stepNo;
      d.consent = true;
      try {
        fetch('/api/draft', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d), keepalive: true }).catch(function () {});
      } catch (e) { /* never block the form */ }
    }

    // ---- Steps: one screen at a time (forms with data-steps) ----
    var steps = Array.prototype.slice.call(form.querySelectorAll('.form-step'));
    var current = 0;
    var progress = form.querySelector('[data-step-progress]');
    function showStep(i, focus) {
      current = i;
      steps.forEach(function (s, j) { s.hidden = j !== i; });
      if (progress) {
        progress.querySelector('[data-step-label]').textContent = M.step.replace('{n}', i + 1).replace('{t}', steps.length) + ': ' + steps[i].getAttribute('data-step-title');
        progress.querySelector('i').style.width = Math.round(((i + 1) / steps.length) * 100) + '%';
      }
      if (focus) {
        var first = steps[i].querySelector('input:not([type=hidden]), select, textarea');
        if (first) first.focus();
      }
    }
    if (steps.length && form.hasAttribute('data-steps')) {
      form.classList.add('js-steps');
      if (progress) progress.hidden = false;
      each('[data-step-next], [data-step-back]', function (b) { b.hidden = false; }, form);
      showStep(0, false);
      form.addEventListener('click', function (e) {
        if (e.target.closest('[data-step-back]')) { showStep(current - 1, true); return; }
        if (!e.target.closest('[data-step-next]')) return;
        var errors = checkClient(collect(), steps[current]);
        if (Object.keys(errors).length) { showErrors(errors); return; }
        track('form_step_completed', { form_type: formType, step: current + 1, lead_id: leadId() });
        saveDraft(current + 1);
        showStep(current + 1, true);
      });
    }
    var onLastStep = function () { return !steps.length || !form.classList.contains('js-steps') || current === steps.length - 1; };

    function showErrors(errors) {
      each('[data-error-for]', function (el) { setError(el.getAttribute('data-error-for'), ''); }, form);
      var first = null;
      Object.keys(errors).forEach(function (k) {
        setError(k, errors[k]);
        var el = form.elements[k] || (k === 'photos' ? photoInput : null);
        if (!first && el && el.focus) first = el;
      });
      if (!first) return;
      // On a multi-step form, go back to the step that holds the first problem.
      var holder = first.closest && first.closest('.form-step');
      if (holder && form.classList.contains('js-steps')) showStep(steps.indexOf(holder), false);
      first.focus();
    }

    // ---- Address lookup: postcode + house number → address from the Dutch register (BAG) ----
    var addrBox = form.querySelector('[data-address-result]');
    var addrId = form.querySelector('input[name="address_id"]');
    var addrTimer = null, addrKey = '';
    function lookupAddress() {
      var pc = (form.elements.postcode.value || '').replace(/\s+/g, '').toUpperCase();
      var nr = form.elements.house_number.value || '';
      var digits = (nr.match(/^\s*(\d+)/) || [])[1];
      if (!POSTCODE.test(pc) || !digits) { addrBox.hidden = true; addrId.value = ''; addrKey = ''; return; }
      var key = pc + ' ' + nr.trim().toUpperCase();
      if (key === addrKey) return;
      addrKey = key;
      fetch('/api/address?postcode=' + encodeURIComponent(pc) + '&number=' + encodeURIComponent(digits))
        .then(function (r) { return r.json(); })
        .then(function (body) {
          if (key !== addrKey) return; // the visitor typed on
          var matches = (body && body.matches) || [];
          addrId.value = '';
          addrBox.hidden = false;
          addrBox.className = 'address-result';
          if (!matches.length) { addrBox.textContent = M.addressNotFound; addrBox.classList.add('not-found'); return; }
          // "5B" typed → pick the match with letter B.
          var rest = nr.trim().replace(/^\d+/, '').replace(/[\s-]/g, '').toUpperCase();
          var exact = matches.filter(function (m) { return (m.house_letter + m.house_addition).toUpperCase() === rest; });
          if (matches.length === 1 || exact.length === 1) {
            var m = exact.length === 1 ? exact[0] : matches[0];
            addrId.value = m.id;
            addrBox.textContent = '✓ ' + m.label;
            addrBox.classList.add('found');
            return;
          }
          addrBox.innerHTML = '';
          var label = document.createElement('label');
          label.setAttribute('for', 'f-address-pick');
          label.textContent = M.addressPick;
          var select = document.createElement('select');
          select.id = 'f-address-pick';
          select.add(new Option(M.addressPick, ''));
          matches.forEach(function (m) { select.add(new Option(m.label, m.id)); });
          select.addEventListener('change', function () { addrId.value = select.value; });
          addrBox.appendChild(label);
          addrBox.appendChild(select);
        })
        .catch(function () { addrBox.hidden = true; });
    }
    if (addrBox && addrId && form.elements.postcode && form.elements.house_number) {
      ['postcode', 'house_number'].forEach(function (n) {
        form.elements[n].addEventListener('input', function () { clearTimeout(addrTimer); addrTimer = setTimeout(lookupAddress, 450); });
      });
    }
    each('input[type="date"]', function (d) { d.min = new Date().toISOString().slice(0, 10); }, form);
    var say = function (msg, cls) { status.textContent = msg; status.className = 'form-status' + (cls ? ' ' + cls : ''); };
    form.addEventListener('input', function (e) { if (e.target.name) setError(e.target.name, ''); });
    form.addEventListener('change', function (e) { if (e.target.name) setError(e.target.name, ''); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Enter on an earlier step means "next", not "send".
      if (!onLastStep()) { form.querySelector('.form-step:not([hidden]) [data-step-next]').click(); return; }
      say('');
      var data = collect();
      var errors = checkClient(data);
      if (Object.keys(errors).length) { showErrors(errors); say(M.check, 'err'); return; }
      ATTR.forEach(function (k) { if (attribution[k]) data[k] = attribution[k]; });
      data.landing_page = attribution.landing_page || '';
      data.referrer = attribution.referrer || '';
      data.lead_id = leadId();
      // Meta's browser ids, for matching conversions sent from the server (they exist only after marketing consent).
      data.fbp = cookie('_fbp');
      data.fbc = cookie('_fbc') || (attribution.fbclid ? 'fb.1.' + (attribution.fbclid_at || Date.now()) + '.' + attribution.fbclid : '');

      var btn = form.querySelector('button[type="submit"]');
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = M.sending;
      readPhotos()
        .then(function (photos) {
          if (photos.length) data.photos = photos;
          return sendInquiry(data);
        }, function (why) {
          showErrors({ photos: why === 'tooMany' ? M.photosTooMany : M.photosFailed });
          say(M.check, 'err');
        })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });

    function sendInquiry(data) {
      return fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (res) { return res.json().catch(function () { return {}; }).then(function (body) { return { res: res, body: body }; }); })
        .then(function (r) {
          if (r.res.ok && r.body.ok) {
            // event_id matches the server's lead.created event, so browser and server conversions deduplicate.
            track('generate_lead', { form_type: formType, page: location.pathname, lead_id: r.body.lead_id, event_id: r.body.event_id });
            newLeadId();
            form.classList.add('sent');
            say(M.success, 'ok');
            status.setAttribute('tabindex', '-1');
            status.focus();
            return;
          }
          if (r.body.errors) showErrors(r.body.errors);
          say(r.res.status === 429 ? M.tooMany : r.body.errors ? M.check : M.failed, 'err');
        })
        .catch(function () { say(M.offline, 'err'); });
    }
  });

  // ---------- Yield calculator (BAR / NAR) ----------
  each('[data-calculator]', function (calc) {
    var val = function (name) {
      var el = calc.querySelector('[name="' + name + '"]');
      var n = parseFloat(String(el.value).replace(',', '.'));
      return isFinite(n) && n >= 0 ? n : NaN;
    };
    var euro = function (n) { return (LANG === 'en' ? '€' : '€ ') + Math.round(n).toLocaleString(M.locale); };
    var pct = function (n) { return n.toLocaleString(M.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%'; };
    var out = function (k, v) { calc.querySelector('[data-out="' + k + '"]').textContent = v; };
    var run = function () {
      var price = val('price'), tax = val('tax') / 100, other = val('other'), rent = val('rent'), costs = val('costs');
      var vacancy = Math.min(val('vacancy') || 0, 100) / 100;
      if (!(price > 0) || isNaN(tax) || isNaN(other) || isNaN(rent) || isNaN(costs)) {
        ['bar', 'nar', 'kk', 'total', 'gross', 'net'].forEach(function (k) { out(k, '–'); });
        return;
      }
      // BAR and NAR over the total investment (price plus buyer's costs).
      var kk = price * tax + other;
      var total = price + kk;
      var gross = rent * 12;
      var net = gross * (1 - vacancy) - costs;
      out('gross', euro(gross));
      out('net', euro(net));
      out('kk', euro(kk));
      out('total', euro(total));
      out('bar', pct((gross / total) * 100));
      out('nar', pct((net / total) * 100));
    };
    calc.addEventListener('input', run);
    calc.addEventListener('change', run);
    run();
  });

  // Count language switches, so the team can see how many visitors prefer the other language.
  each('[data-lang-switch]', function (a) {
    // Landing pages switch language on the same URL: keep the ad's tracking parameters, change only lang.
    if (a.hasAttribute('data-same-url')) {
      try {
        var u = new URL(location.href);
        if (a.getAttribute('hreflang') === 'en') u.searchParams.set('lang', 'en'); else u.searchParams.delete('lang');
        a.href = u.pathname + u.search;
      } catch (e) {}
    }
    a.addEventListener('click', function () { track('language_switch', { from: LANG, to: a.getAttribute('hreflang'), page: location.pathname }); });
  });

  if (SITE.template === 'article') track('article_view', { page: location.pathname, language: LANG });
})();
