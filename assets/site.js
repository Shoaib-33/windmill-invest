// Windmill Invest: menus, cookie consent, attribution, lead forms and the scroll animations.
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
  var escHtml = function (v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var M = {
    nl: {
      locale: 'nl-NL', consent: 'Ga akkoord met de privacyverklaring om door te gaan.', choose: 'Kies een optie.', required: 'Dit veld is verplicht.',
      postcode: 'Vul een geldige postcode in (bijv. 1234 AB).', email: 'Vul een geldig e-mailadres in.', phone: 'Vul een geldig telefoonnummer in, bijvoorbeeld 06 12345678.',
      phoneForContact: 'Vul uw telefoonnummer in, zodat we u kunnen bellen of een WhatsApp-bericht kunnen sturen.',
      step: 'Stap {n} van {t}', addressPick: 'Kies uw adres',
      found: 'Wij hebben uw woning gevonden', built: 'Bouwjaar', aerial: 'Luchtfoto van uw woning en de omgeving',
      viewPhoto: 'Luchtfoto', view3d: '3D', model3d: '3D-model van uw gebouw. Sleep om te draaien.',
      listening: 'Luisteren… Uw browser zet uw stem om in tekst.', micOff: 'Inspreken lukt niet in deze browser.',
      planTitle: 'Uw verkoopplan', planIntro: 'Wat er nu gebeurt en wat u alvast klaar kunt leggen.', planSteps: 'De stappen', planDocs: 'Handig om klaar te leggen', planPrint: 'Opslaan als PDF of printen',
      planNote: 'Alles is vrijblijvend tot u de koopovereenkomst tekent. Vragen? Bel ons gerust.',
      docs: {
        id: 'Uw legitimatiebewijs (pas nodig bij de notaris)', mortgage: 'Gegevens van uw hypotheek: bank en leningnummer',
        label: 'Het energielabel, als u dat heeft', vve: 'Stukken van de VvE: notulen, jaarstukken en de stand van het reservefonds',
        heirs: 'Een verklaring van erfrecht of van executele (via de notaris)', heirsAgree: 'Het akkoord van alle erfgenamen',
        divorce: 'Het akkoord en de handtekening van beide eigenaren', rent: 'De huurcontracten en de huidige huurprijzen',
        abroad: 'Een volmacht voor de notaris, als u niet zelf kunt tekenen', defects: 'Een lijstje met gebreken die u kent: dat voorkomt discussie',
        photos: 'Een paar foto’s van de woning (mag later)',
      },
      use: { woonfunctie: 'Woning', winkelfunctie: 'Winkel', kantoorfunctie: 'Kantoor', industriefunctie: 'Bedrijfsruimte', bijeenkomstfunctie: 'Bijeenkomstruimte', logiesfunctie: 'Logies', gezondheidszorgfunctie: 'Zorg', onderwijsfunctie: 'Onderwijs', sportfunctie: 'Sport', overige: 'Overig' },
      photosTooMany: 'Kies maximaal 5 foto’s.', photosFailed: 'Een of meer foto’s konden niet worden geopend. Kies JPG- of PNG-foto’s.',
      addressNotFound: 'We vinden dit adres niet in het adressenregister. Controleer postcode en huisnummer, of ga gewoon verder.',
      check: 'Controleer de gemarkeerde velden.', sending: 'Bezig met versturen…',
      success: 'Bedankt, uw aanvraag is ontvangen. Wij nemen contact met u op, in volgorde van binnenkomst.',
      thanksTitle: 'Bedankt {name}, we gaan voor u aan de slag!',
      thanksSteps: ['Aanvraag ontvangen', 'Wij bellen u om alles door te nemen', 'Eén bezichtiging, wanneer het u past', 'U ontvangt een bod op papier'],
      thanksCallSteps: ['Verzoek ontvangen', 'Wij bellen u op het gekozen moment'],
      tooMany: 'U heeft veel aanvragen achter elkaar verstuurd. Probeer het over een paar minuten opnieuw.',
      failed: 'Er ging iets mis. Probeer het opnieuw of bel ons.', offline: 'Geen verbinding. Controleer uw internet en probeer het opnieuw.',
    },
    en: {
      locale: 'en-GB', consent: 'Please accept the privacy statement to continue.', choose: 'Please choose an option.', required: 'This field is required.',
      postcode: 'Please enter a valid Dutch postcode (e.g. 1234 AB).', email: 'Please enter a valid email address.', phone: 'Please enter a valid phone number, for example +31 6 12345678.',
      phoneForContact: 'Please enter your phone number, so we can call you or send a WhatsApp message.',
      step: 'Step {n} of {t}', addressPick: 'Choose your address',
      found: 'We found your home', built: 'Built', aerial: 'Aerial photo of your home and its surroundings',
      viewPhoto: 'Aerial photo', view3d: '3D', model3d: '3D model of your building. Drag to turn it.',
      listening: 'Listening… Your browser turns your voice into text.', micOff: 'Speaking does not work in this browser.',
      planTitle: 'Your sale plan', planIntro: 'What happens now and what you can get ready.', planSteps: 'The steps', planDocs: 'Useful to have ready', planPrint: 'Save as PDF or print',
      planNote: 'Nothing is binding until you sign the purchase agreement. Questions? Just call us.',
      docs: {
        id: 'Your ID (only needed at the notary)', mortgage: 'Your mortgage details: bank and loan number',
        label: 'The energy label, if you have one', vve: 'Owners\' association (VvE) papers: minutes, annual accounts and the reserve fund',
        heirs: 'A certificate of inheritance or executorship (through the notary)', heirsAgree: 'The agreement of all heirs',
        divorce: 'The agreement and signature of both owners', rent: 'The tenancy agreements and current rents',
        abroad: 'A power of attorney for the notary, if you cannot sign yourself', defects: 'A short list of defects you know of: it prevents disputes',
        photos: 'A few photos of the home (can wait)',
      },
      use: { woonfunctie: 'Home', winkelfunctie: 'Shop', kantoorfunctie: 'Office', industriefunctie: 'Commercial space', bijeenkomstfunctie: 'Meeting space', logiesfunctie: 'Lodging', gezondheidszorgfunctie: 'Care', onderwijsfunctie: 'Education', sportfunctie: 'Sport', overige: 'Other' },
      photosTooMany: 'Please choose up to 5 photos.', photosFailed: 'One or more photos could not be opened. Please choose JPG or PNG photos.',
      addressNotFound: 'We cannot find this address in the Dutch address register. Check the postcode and house number, or simply continue.',
      check: 'Please check the highlighted fields.', sending: 'Sending…',
      success: 'Thank you, we have received your request. We will contact you in order of receipt.',
      thanksTitle: 'Thank you {name}, we are on it!',
      thanksSteps: ['Request received', 'We call you to go through everything', 'One viewing, when it suits you', 'You receive a written offer'],
      thanksCallSteps: ['Request received', 'We call you at the time you chose'],
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
  var header = document.querySelector('[data-header]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (header) header.classList.toggle('menu-open', open);
    });
  }
  // The header gets a background once the page scrolls (on the home page it starts transparent over the photo).
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openLi = document.querySelector('.has-menu.open');
    if (openLi) { closeMenus(); openLi.querySelector('.nav-top').focus(); return; }
    if (nav && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); if (header) header.classList.remove('menu-open'); toggle.focus(); }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-menu')) closeMenus(); });

  // ---------- Larger text (remembered on this device) ----------
  var root = document.documentElement;
  var applySize = function (on) {
    root.classList.toggle('large-text', on);
    each('[data-text-size]', function (b) { b.setAttribute('aria-pressed', String(on)); });
  };
  applySize(get('localStorage', 'text_large') === '1');
  each('[data-text-size]', function (b) {
    b.addEventListener('click', function () {
      var on = !root.classList.contains('large-text');
      applySize(on);
      set('localStorage', 'text_large', on ? '1' : '0');
      track('text_size', { large: on });
    });
  });

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
        if (!data[el.name]) errors[el.name] = el.tagName === 'SELECT' || el.type === 'radio' ? M.choose : M.required;
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
    var summary = form.querySelector('[data-house-summary]');
    function placeHouse(i) {
      if (!summary || !addrBox) return;
      var card = (i === 0 ? summary : addrBox).querySelector('.house-card');
      if (i === 0) {
        if (card) addrBox.appendChild(card);
        summary.hidden = true;
      } else {
        if (card) summary.appendChild(card);
        summary.hidden = !summary.querySelector('.house-card');
      }
    }
    function showStep(i, focus) {
      current = i;
      form.classList.toggle('on-first', i === 0);
      placeHouse(i);
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
        if (el && !el.focus && el[0]) el = el[0]; // a group of tiles (radio buttons)
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
            showHouse(m);
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
          select.addEventListener('change', function () {
            addrId.value = select.value;
            var picked = matches.filter(function (x) { return x.id === select.value; })[0];
            if (picked) showHouse(picked, true);
          });
          addrBox.appendChild(label);
          addrBox.appendChild(select);
        })
        .catch(function () { addrBox.hidden = true; });
    }
    // "We found your home": the address, an aerial photo around it and the facts from the BAG.
    function aerialHtml(lat, lon) {
      if (typeof lat !== 'number' || typeof lon !== 'number') return '';
      var z = 18, n = Math.pow(2, z);
      var x = (lon + 180) / 360 * n;
      var r = lat * Math.PI / 180;
      var y = (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n;
      var tx = Math.floor(x), ty = Math.floor(y), tiles = '';
      for (var j = -1; j <= 1; j++) for (var i = -1; i <= 1; i++) {
        tiles += '<img src="/api/tile/' + z + '/' + (tx + i) + '/' + (ty + j) + '.jpg" alt="" width="256" height="256" decoding="async">';
      }
      var dx = (1 + x - tx) * 256, dy = (1 + y - ty) * 256;
      return '<div class="house-map" role="img" aria-label="' + escHtml(M.aerial) + '"><div class="house-tiles" style="transform:translate(-' + dx.toFixed(1) + 'px,-' + dy.toFixed(1) + 'px)">' + tiles + '</div><span class="house-pin" aria-hidden="true"></span></div>';
    }
    function showHouse(m, keepPicker) {
      var card = document.createElement('div');
      card.className = 'house-card';
      card.innerHTML = aerialHtml(m.lat, m.lon) + '<div class="house-info"><span class="house-found">' + escHtml(M.found) + '</span><strong>' + escHtml(m.label) + '</strong><span class="house-facts" data-facts></span></div>';
      if (!keepPicker) { addrBox.innerHTML = ''; addrBox.className = 'address-result found'; }
      else { var old = addrBox.querySelector('.house-card'); if (old) old.remove(); }
      addrBox.hidden = false;
      addrBox.appendChild(card);
      // The visitor may already be on step 2 (fast "Next"): then the home goes straight to the strip above the steps.
      if (typeof current === 'number' && current > 0) placeHouse(current);
      track('address_found', { form_type: formType, page: location.pathname });
      fetch('/api/house?id=' + encodeURIComponent(m.id))
        .then(function (r) { return r.json(); })
        .then(function (body) {
          var d = body && body.details;
          if (!d) return;
          var facts = [];
          if (d.build_year) facts.push(M.built + ' ' + d.build_year);
          if (d.area_m2) facts.push(d.area_m2.toLocaleString(M.locale) + ' m²');
          if (d.use) facts.push(M.use[d.use] || d.use);
          card.querySelector('[data-facts]').innerHTML = facts.map(function (f) { return '<span>' + escHtml(f) + '</span>'; }).join('');
        })
        .catch(function () {});
      // The building in 3D, when the 3D BAG has it; otherwise the aerial photo simply stays.
      var mapBox = card.querySelector('.house-map');
      if (mapBox && window.HTMLCanvasElement) {
        fetch('/api/model?id=' + encodeURIComponent(m.id))
          .then(function (r) { return r.json(); })
          .then(function (body) { if (body && body.model && card.isConnected) viewer3d(mapBox, body.model); })
          .catch(function () {});
      }
    }

    // A small 3D viewer on a canvas: turns slowly, drag to turn it yourself. Roofs warm, walls light.
    function viewer3d(box, model) {
      var V = model.v, F = model.f;
      if (!V.length || !F.length) return;
      var canvas = document.createElement('canvas');
      canvas.className = 'house-3d';
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', M.model3d);
      box.appendChild(canvas);
      box.classList.add('has-3d', 'show-3d');
      var views = document.createElement('div');
      views.className = 'house-views';
      views.innerHTML = '<button type="button" data-view="photo" aria-pressed="false">' + escHtml(M.viewPhoto) + '</button><button type="button" data-view="3d" aria-pressed="true">' + escHtml(M.view3d) + '</button>';
      box.appendChild(views);
      views.addEventListener('click', function (e) {
        var b = e.target.closest('[data-view]');
        if (!b) return;
        var on = b.getAttribute('data-view') === '3d';
        box.classList.toggle('show-3d', on);
        each('[data-view]', function (x) { x.setAttribute('aria-pressed', String(x === b)); }, views);
        if (on) start();
      });
      var ctx = canvas.getContext('2d');
      var W = 0, H = 0;
      var size = function () {
        var dpr = Math.min(2, window.devicePixelRatio || 1);
        W = box.clientWidth; H = box.clientHeight;
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      var R = 1, top = 0;
      V.forEach(function (p) { R = Math.max(R, Math.sqrt(p[0] * p[0] + p[1] * p[1])); top = Math.max(top, p[2]); });
      var reach = Math.max(R, top * 0.75);
      // Faces should point outwards (roofs up); flip them all if the data winds the other way.
      var normal = function (pts) {
        var nx = 0, ny = 0, nz = 0;
        for (var i = 0; i < pts.length; i++) {
          var a = pts[i], b = pts[(i + 1) % pts.length];
          nx += (a[1] - b[1]) * (a[2] + b[2]); ny += (a[2] - b[2]) * (a[0] + b[0]); nz += (a[0] - b[0]) * (a[1] + b[1]);
        }
        var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        return [nx / l, ny / l, nz / l];
      };
      var up = 0;
      F.forEach(function (f) { if (f[0] === 2) up += normal(f.slice(1).map(function (i) { return V[i]; }))[2]; });
      var flip = up < 0 ? -1 : 1;
      var COL = { 0: [214, 206, 192], 1: [240, 234, 222], 2: [196, 98, 58] };
      var L = [-0.45, -0.55, 0.7], ll = Math.sqrt(L[0] * L[0] + L[1] * L[1] + L[2] * L[2]);
      L = L.map(function (c) { return c / ll; });
      var yaw = 0.7, pitch = 0.62, still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var dragging = false, lastX = 0, lastY = 0, idle = 0, raf = 0;
      function draw() {
        var ca = Math.cos(yaw), sa = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
        var s = Math.min(W, H * 1.6) * 0.34 / reach;
        var cy = H * 0.62;
        ctx.clearRect(0, 0, W, H);
        // soft shadow on the ground
        ctx.save(); ctx.translate(W / 2, cy + top * 0.0); ctx.scale(1, sp);
        var g = ctx.createRadialGradient(0, 0, 0, 0, 0, R * s * 1.3);
        g.addColorStop(0, 'rgba(0,0,0,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R * s * 1.3, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        var P = V.map(function (p) {
          var x = p[0] * ca - p[1] * sa, y = p[0] * sa + p[1] * ca, z = p[2];
          return [x, y, z, W / 2 + x * s, cy - (z * cp + y * sp) * s, y * cp - z * sp];
        });
        var list = [];
        for (var k = 0; k < F.length; k++) {
          var f = F[k];
          if (f[0] === 0) continue;
          var pts = [], d = 0;
          for (var j = 1; j < f.length; j++) { pts.push(P[f[j]]); d += P[f[j]][5]; }
          var n = normal(pts).map(function (c) { return c * flip; });
          if (n[1] * cp - n[2] * sp > 0.02) continue; // facing away from the camera
          var shade = 0.62 + 0.38 * Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
          list.push([d / pts.length, pts, f[0], shade]);
        }
        list.sort(function (a, b) { return b[0] - a[0]; });
        list.forEach(function (it) {
          var c = COL[it[2]];
          var rgb = 'rgb(' + Math.round(c[0] * it[3]) + ',' + Math.round(c[1] * it[3]) + ',' + Math.round(c[2] * it[3]) + ')';
          ctx.beginPath();
          it[1].forEach(function (p, i) { if (i) ctx.lineTo(p[3], p[4]); else ctx.moveTo(p[3], p[4]); });
          ctx.closePath();
          ctx.fillStyle = rgb; ctx.fill();
          ctx.strokeStyle = rgb; ctx.lineWidth = 0.6; ctx.stroke();
        });
      }
      function frame() {
        raf = 0;
        if (!canvas.isConnected || !box.classList.contains('show-3d')) return;
        if (!dragging && !still && Date.now() > idle) yaw += 0.006;
        draw();
        if (!still || dragging) raf = requestAnimationFrame(frame);
      }
      function start() { if (!box.clientWidth) return; size(); if (!raf) raf = requestAnimationFrame(frame); }
      canvas.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); start(); });
      canvas.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        yaw += (e.clientX - lastX) * 0.012;
        pitch = Math.max(0.25, Math.min(1.2, pitch + (e.clientY - lastY) * 0.006));
        lastX = e.clientX; lastY = e.clientY;
        if (still) draw();
      });
      canvas.addEventListener('pointerup', function () { dragging = false; idle = Date.now() + 2500; });
      var refit = function () { if (canvas.isConnected && box.clientWidth) { size(); draw(); start(); } };
      if ('ResizeObserver' in window) new ResizeObserver(refit).observe(box);
      else window.addEventListener('resize', refit);
      start();
      track('model_3d_shown', { page: location.pathname });
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

    // After sending: a check mark that draws itself and what happens next, step by step.
    function thanks(data) {
      var first = String(data.name || '').split(' ')[0];
      var callback = form.hasAttribute('data-callback');
      var steps = callback ? M.thanksCallSteps : M.thanksSteps;
      var box = document.createElement('div');
      box.className = 'thanks';
      box.innerHTML = '<svg class="thanks-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg>' +
        '<p class="thanks-title">' + escHtml(M.thanksTitle.replace('{name}', first)) + '</p>' +
        '<ol class="thanks-steps">' + steps.map(function (s, i) { return '<li class="' + (i === 0 ? 'done' : '') + '" style="--i:' + i + '"><span></span>' + escHtml(s) + '</li>'; }).join('') + '</ol>';
      if (!callback) box.appendChild(salePlan(data));
      status.parentNode.insertBefore(box, status);
    }

    // "Uw verkoopplan": the next steps and the papers that help, chosen by what the seller told us.
    function salePlan(data) {
      var D = M.docs, page = data.page || location.pathname, docs = [];
      var heirs = data.situation === 'geerfd' || /erf/.test(page);
      var divorce = data.situation === 'scheiding' || /scheiding/.test(page);
      var rented = data.occupancy === 'verhuurd' || /verhuur|beleggingspand|portefeuille|bedrijfspand/.test(page) || data.form_type === 'verhuurd' || data.form_type === 'commercieel' || data.form_type === 'funnel_portfolio';
      if (heirs) docs.push(D.heirs, D.heirsAgree);
      if (divorce) docs.push(D.divorce);
      if (rented) docs.push(D.rent);
      if (data.situation === 'buitenland' || /buitenland/.test(page)) docs.push(D.abroad);
      if (data.property_type === 'appartement') docs.push(D.vve);
      if (data.mortgage !== 'nee') docs.push(D.mortgage);
      if (data.situation === 'onderhoud' || data.form_type === 'funnel_asis' || /onderhoud|zoals/.test(page)) docs.push(D.defects);
      docs.push(D.label, D.photos, D.id);
      var el = document.createElement('section');
      el.className = 'plan';
      el.innerHTML = '<h3>' + escHtml(M.planTitle) + '</h3><p class="plan-intro">' + escHtml(M.planIntro) + '</p>' +
        '<h4>' + escHtml(M.planDocs) + '</h4><ul class="plan-docs">' + docs.map(function (d) { return '<li><span class="plan-box" aria-hidden="true"></span>' + escHtml(d) + '</li>'; }).join('') + '</ul>' +
        '<p class="plan-note">' + escHtml(M.planNote) + '</p><button type="button" class="btn btn-plain plan-print">' + escHtml(M.planPrint) + '</button>';
      el.querySelector('.plan-print').addEventListener('click', function () {
        var sheet = document.createElement('div');
        sheet.className = 'print-sheet';
        sheet.innerHTML = '<p class="print-brand">Windmill Invest</p>' + el.innerHTML.replace(/<button[\s\S]*<\/button>/, '') + '<h4>' + escHtml(M.planSteps) + '</h4><ol>' + M.thanksSteps.map(function (s) { return '<li>' + escHtml(s) + '</li>'; }).join('') + '</ol><p class="print-date">' + new Date().toLocaleDateString(M.locale) + '</p>';
        document.body.appendChild(sheet);
        document.body.classList.add('print-plan');
        var done = function () { document.body.classList.remove('print-plan'); sheet.remove(); window.removeEventListener('afterprint', done); };
        window.addEventListener('afterprint', done);
        track('sale_plan_print', { page: location.pathname });
        window.print();
      });
      return el;
    }

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
            thanks(data);
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

  // ---------- Scroll animations: elements with .reveal fade in when they reach the screen ----------
  var revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealed, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealed, function (el) { el.classList.add('in'); });
  }

  // ---------- Quick start in the home hero: postcode + house number fill in the form's first step ----------
  each('[data-quick]', function (quick) {
    quick.addEventListener('submit', function (e) {
      var form = document.querySelector('[data-lead-form]:not([data-callback]):not([data-drawer])');
      if (!form || !form.elements.postcode) return; // without a form, the browser follows action="#formulier"
      e.preventDefault();
      var pc = quick.elements.q_postcode.value.trim();
      var nr = quick.elements.q_number.value.trim();
      track('quick_start', { page: location.pathname, has_address: !!(pc && nr) });
      form.elements.postcode.value = pc;
      form.elements.house_number.value = nr;
      ['postcode', 'house_number'].forEach(function (n) { form.elements[n].dispatchEvent(new Event('input', { bubbles: true })); });
      form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      // Step 1 now shows their home (address, aerial photo, facts); the Next button is ready for them.
      var next = form.querySelector('.form-step:not([hidden]) [data-step-next]');
      setTimeout(function () {
        var target = pc && nr ? next || form.elements.house_number : pc ? form.elements.house_number : form.elements.postcode;
        if (target) target.focus({ preventScroll: true });
      }, 700);
    });
  });

  // ---------- Mobile action bar: out of the way while a form (or the hero quick start) is on screen ----------
  var bar = document.querySelector('[data-mobile-bar]');
  var forms = Array.prototype.slice.call(document.querySelectorAll('[data-lead-form]:not([data-callback]):not([data-drawer]), [data-quick]'));
  if (bar && forms.length && 'IntersectionObserver' in window) {
    var onScreen = new Set();
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) onScreen.add(en.target); else onScreen.delete(en.target); });
      bar.classList.toggle('away', onScreen.size > 0);
    }, { threshold: 0.05 });
    forms.forEach(function (f) { obs.observe(f); });
  }

  // ---------- Speak instead of type (browsers with speech recognition: Chrome, Edge, Safari) ----------
  var Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Speech) {
    each('[data-mic]', function (mic) {
      var area = mic.parentNode.querySelector('textarea');
      var rec = null;
      mic.hidden = false;
      var stop = function () { if (rec) rec.stop(); };
      mic.addEventListener('click', function () {
        if (rec) { stop(); return; }
        rec = new Speech();
        rec.lang = LANG === 'en' ? 'en-GB' : 'nl-NL';
        rec.interimResults = false;
        rec.continuous = true;
        var before = area.value;
        var said = '';
        rec.onresult = function (e) {
          for (var i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) said += (said ? ' ' : '') + e.results[i][0].transcript.trim();
          area.value = (before ? before.replace(/\s*$/, ' ') : '') + said;
          area.dispatchEvent(new Event('input', { bubbles: true }));
        };
        rec.onend = function () { rec = null; mic.classList.remove('on'); mic.setAttribute('aria-pressed', 'false'); area.placeholder = ''; };
        rec.onerror = function () { area.placeholder = M.micOff; };
        try {
          rec.start();
          mic.classList.add('on');
          mic.setAttribute('aria-pressed', 'true');
          area.placeholder = M.listening;
          track('voice_input', { page: location.pathname });
        } catch (e) { rec = null; }
      });
    });
  }

  // ---------- Scroll story: "Zo werkt het" follows the step in view ----------
  each('[data-story]', function (story) {
    var stage = story.querySelector('[data-story-stage]');
    var cards = story.querySelectorAll('[data-story-step]');
    if (!stage || !cards.length || !('IntersectionObserver' in window)) return;
    var cap = story.querySelector('[data-story-caption]');
    var num = story.querySelector('[data-story-num]');
    var show = function (i) {
      stage.style.setProperty('--step', i + 1);
      each('[data-story-icon]', function (ic) { ic.classList.toggle('on', Number(ic.getAttribute('data-story-icon')) === i); }, stage);
      each('[data-story-step]', function (c) { c.classList.toggle('active', Number(c.getAttribute('data-story-step')) === i); }, story);
      var tpl = story.querySelector('[data-story-text="' + i + '"]');
      if (cap && tpl) cap.innerHTML = tpl.innerHTML;
      if (num) num.textContent = String(i + 1).padStart(2, '0');
    };
    show(0);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) show(Number(en.target.getAttribute('data-story-step'))); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    Array.prototype.forEach.call(cards, function (c) { io.observe(c); });
  });

  // ---------- Offer form sliding in from the side (header button) ----------
  var drawer = document.querySelector('[data-offer-drawer]');
  if (drawer && typeof drawer.showModal === 'function') {
    each('[data-offer-open]', function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        if (nav && nav.classList.contains('open')) toggle.click();
        drawer.showModal();
        var first = drawer.querySelector('.form-step:not([hidden]) input:not([type=hidden]), .form-step:not([hidden]) select');
        if (first) first.focus();
        track('offer_drawer_open', { page: location.pathname });
      });
    });
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer || e.target.closest('[data-drawer-close]')) drawer.close();
      // The call-back link inside the drawer: swap to the call-back dialog.
      if (e.target.closest('[data-callback-open]')) drawer.close();
    });
  }

  // ---------- Letter page: the code from the letter becomes the lead's campaign data ----------
  var letter = document.querySelector('[data-letter-code]');
  if (letter) {
    var setLetter = function (code) {
      attribution.utm_source = 'brief';
      attribution.utm_medium = 'direct_mail';
      if (code) attribution.utm_content = code.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 20);
      else delete attribution.utm_content;
      set('sessionStorage', 'attribution_v1', JSON.stringify(attribution));
    };
    var fromUrl = new URLSearchParams(location.search).get('code');
    if (fromUrl) letter.value = fromUrl.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 20);
    setLetter(letter.value);
    letter.addEventListener('input', function () { setLetter(letter.value.trim()); });
  }

  // ---------- Explainer video: loads and plays only when asked ----------
  var vd = document.querySelector('[data-video-dialog]');
  if (vd && typeof vd.showModal === 'function') {
    var video = vd.querySelector('video');
    each('[data-video-open]', function (b) {
      b.addEventListener('click', function () {
        if (!video.src) video.src = video.getAttribute('data-src');
        vd.showModal();
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
        track('video_open', { page: location.pathname });
      });
    });
    var closeVideo = function () { video.pause(); };
    vd.addEventListener('close', closeVideo);
    vd.addEventListener('click', function (e) { if (e.target === vd || e.target.closest('[data-video-close]')) vd.close(); });
    video.addEventListener('ended', function () { track('video_complete', { page: location.pathname }); });
  } else {
    each('[data-video-open]', function (b) { b.hidden = true; });
  }

  // ---------- "Bel mij terug" dialog ----------
  var dialog = document.querySelector('[data-callback-dialog]');
  if (dialog && typeof dialog.showModal === 'function') {
    each('[data-callback-open]', function (b) {
      b.addEventListener('click', function () {
        dialog.showModal();
        var first = dialog.querySelector('input:not([type=hidden]):not([tabindex="-1"])');
        if (first) first.focus();
        track('callback_open', { page: location.pathname });
      });
    });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog || e.target.closest('[data-callback-close]')) dialog.close();
    });
  } else {
    // Old browsers without <dialog>: the buttons call instead.
    each('[data-callback-open]', function (b) { b.hidden = true; });
  }

  // ---------- Reviews: approved ones from the server, and the "write a review" dialog ----------
  var rvSection = document.querySelector('[data-reviews]');
  if (rvSection) {
    var RT = JSON.parse(rvSection.getAttribute('data-text') || '{}');
    var STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';
    var starRow = function (n) {
      var s = '';
      for (var i = 1; i <= 5; i++) s += '<i class="' + (i <= Math.round(n) ? 'on' : '') + '">' + STAR + '</i>';
      return '<span class="stars" role="img" aria-label="' + escHtml(RT.stars.replace('{n}', n)) + '">' + s + '</span>';
    };
    var list = rvSection.querySelector('[data-reviews-list]');
    var reviewCard = function (r) {
      var date = new Date(r.date + 'T12:00:00Z').toLocaleDateString(M.locale, { month: 'long', year: 'numeric' });
      return '<figure class="review-card reveal in">' + starRow(r.rating) + '<blockquote>' + escHtml(r.text) + '</blockquote>' +
        '<figcaption><span class="review-avatar" aria-hidden="true">' + escHtml(r.name.charAt(0).toUpperCase()) + '</span><span><strong>' + escHtml(r.name) + '</strong>' +
        '<small>' + escHtml([r.place, date].filter(Boolean).join(' · ')) + '</small></span></figcaption></figure>';
    };
    fetch('/api/reviews').then(function (res) { return res.ok ? res.json() : null; }).then(function (data) {
      if (!data || !data.reviews || !data.reviews.length) return;
      var shown = 6;
      var render = function () {
        list.innerHTML = data.reviews.slice(0, shown).map(reviewCard).join('');
        if (data.reviews.length > shown) {
          var more = document.createElement('button');
          more.type = 'button';
          more.className = 'btn btn-plain review-more';
          more.textContent = RT.more;
          more.addEventListener('click', function () { shown += 6; render(); });
          list.appendChild(more);
        }
      };
      render();
      var score = rvSection.querySelector('[data-reviews-score]');
      score.querySelector('[data-reviews-avg]').textContent = data.avg.toLocaleString(M.locale, { minimumFractionDigits: 1 });
      score.querySelector('[data-reviews-stars]').outerHTML = starRow(data.avg);
      score.querySelector('[data-reviews-count]').textContent = RT.of + ' · ' + data.count + ' ' + (data.count === 1 ? RT.one.replace(/^1 /, '') : RT.many);
      score.hidden = false;
    }).catch(function () { /* the empty text stays */ });

    var rvDialog = document.querySelector('[data-review-dialog]');
    if (rvDialog && typeof rvDialog.showModal === 'function') {
      var rvForm = rvDialog.querySelector('[data-review-form]');
      var rvStatus = rvForm.querySelector('.form-status');
      var RV = LANG === 'en'
        ? { short: 'Please write at least 20 characters.', stars: 'Please choose 1 to 5 stars.', consent: 'Please tick this box so we may show your review.', thanks: 'Thank you! Your review will appear on the site after a check.' }
        : { short: 'Schrijf minimaal 20 tekens.', stars: 'Kies 1 tot 5 sterren.', consent: 'Vink dit aan, zodat we uw review mogen tonen.', thanks: 'Bedankt! Uw review verschijnt na controle op de site.' };
      each('[data-review-open]', function (b) {
        b.addEventListener('click', function () {
          rvDialog.showModal();
          track('review_open', { page: location.pathname });
        });
      });
      rvDialog.addEventListener('click', function (e) { if (e.target === rvDialog || e.target.closest('[data-review-close]')) rvDialog.close(); });
      var showErr = function (name, msg) {
        var p = rvForm.querySelector('[data-error-for="' + name + '"]');
        if (p) { p.textContent = msg || ''; p.hidden = !msg; }
      };
      rvForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var f = rvForm.elements;
        var rating = (rvForm.querySelector('input[name=rating]:checked') || {}).value;
        var errs = {
          rating: rating ? '' : RV.stars,
          name: f.name.value.trim().length >= 2 ? '' : M.required,
          text: f.text.value.trim().length >= 20 ? '' : RV.short,
          email: !f.email.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()) ? '' : M.email,
          consent: f.consent.checked ? '' : RV.consent,
        };
        var bad = false;
        for (var k in errs) { showErr(k, errs[k]); if (errs[k]) bad = true; }
        if (bad) { rvStatus.textContent = M.check; return; }
        rvStatus.textContent = M.sending;
        var btn = rvForm.querySelector('[type=submit]');
        btn.disabled = true;
        fetch('/api/reviews', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ rating: Number(rating), name: f.name.value, place: f.place.value, text: f.text.value, email: f.email.value, consent: true, lang: LANG, page: location.pathname, website: f.website.value }),
        }).then(function (res) {
          btn.disabled = false;
          if (res.status === 429) { rvStatus.textContent = M.tooMany; return; }
          if (!res.ok) { rvStatus.textContent = M.failed; return; }
          rvForm.reset();
          rvForm.classList.add('sent');
          rvStatus.textContent = RV.thanks;
          track('review_submit', { page: location.pathname, rating: Number(rating) });
        }, function () { btn.disabled = false; rvStatus.textContent = M.offline; });
      });
    } else {
      each('[data-review-open]', function (b) { b.hidden = true; });
    }
  }

  if (SITE.template === 'article') track('article_view', { page: location.pathname, language: LANG });
})();
