/* KIRA KIRA · Shop-Prototyp: Router, Seiten, Filter, Suche, Warenkorb, Formulare.
   Musterdesign von Pfalz Multiservice – fiktiver Shop. */
(function (K) {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var main = $('#main');
  var RM = document.documentElement.classList.contains('reduce-motion');
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  K.store = store;
  var eur = function (n) { return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'; };
  K.eur = eur;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var norm = function (s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss'); };
  var gameById = {}; K.GAMES.forEach(function (g) { gameById[g.id] = g; });
  var typeById = {}; K.TYPES.forEach(function (t) { typeById[t.id] = t; });
  var rarById = {}; K.RARITIES.forEach(function (r) { rarById[r.id] = r; });
  var condById = {}; K.CONDITIONS.forEach(function (c) { condById[c.id] = c; });
  var setById = {}; K.SETS.forEach(function (s) { setById[s.id] = s; });
  var relById = {}; K.RELEASES.forEach(function (r) { relById[r.id] = r; });
  var MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  var DOW = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  var fmtDate = function (d) { return DOW[d.getDay()] + ', ' + d.getDate() + '. ' + MONTHS[d.getMonth()]; };

  /* ---------- Icons ---------- */
  var ic = function (d, extra) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' + (extra || '') + '>' + d + '</svg>'; };
  var I = {
    plus: ic('<path d="M12 5v14M5 12h14"/>', 'stroke-width="3.2"'),
    search: ic('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
    left: ic('<path d="M15 5l-7 7 7 7"/>', 'stroke-width="3"'),
    right: ic('<path d="M9 5l7 7-7 7"/>', 'stroke-width="3"'),
    truck: ic('<path d="M2 6h11v10H2zM13 9h5l4 4v3h-9"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
    shield: ic('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
    box: ic('<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'),
    store: ic('<path d="M3 9l2-5h14l2 5M4 9v11h16V9"/><path d="M3 9h18M9 20v-6h6v6"/>'),
    star: ic('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'),
    bell: ic('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>'),
    check: ic('<path d="M5 12.5l4.5 4.5L19 7"/>', 'stroke-width="3"'),
    upload: ic('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>'),
    pin: ic('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    phone: ic('<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>'),
    mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    clock: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    filter: ic('<path d="M4 5h16l-6 7v6l-4 2v-8z"/>'),
    swap: ic('<path d="M4 8h13l-3-3M20 16H7l3 3"/>'),
    x: ic('<path d="M6 6l12 12M18 6L6 18"/>', 'stroke-width="3"'),
    tilt: ic('<rect x="7" y="3" width="10" height="18" rx="2" transform="rotate(-12 12 12)"/><path d="M2 12a10 10 0 0 0 3 7M22 12a10 10 0 0 0-3-7"/>'),
    spin: ic('<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>')
  };
  K.I = I;

  /* ---------- Navigation ---------- */
  var NAV = [
    { r: 'shop', l: 'Shop', k: '店' },
    { r: 'singles', l: 'Einzelkarten', k: 'カード' },
    { r: 'vorbestellungen', l: 'Vorbestellen', k: '予約' },
    { r: 'ankauf', l: 'Ankauf', k: '買取' },
    { r: 'events', l: 'Events', k: '大会' },
    { r: 'laden', l: 'Laden', k: '店舗' },
    { r: 'kontakt', l: 'Kontakt & FAQ', k: '連絡' }
  ];
  $('#nav').innerHTML = NAV.map(function (n) { return '<a href="#/' + n.r + '" data-r="' + n.r + '">' + n.l + '</a>'; }).join('');
  $('#mnav').innerHTML = '<a href="#/" data-r="">Start <span>ホーム</span></a>' + NAV.map(function (n) { return '<a href="#/' + n.r + '" data-r="' + n.r + '">' + n.l + ' <span>' + n.k + '</span></a>'; }).join('');
  $('[data-slot="logo-momo"]').innerHTML = K.momo('happy');
  $('[data-slot="intro-momo"]').innerHTML = K.momo('cheer');
  $('#buddyBtn').innerHTML = K.momo('happy');

  /* ---------- Theme ---------- */
  function setTheme(t, animate) {
    document.documentElement.setAttribute('data-mode', t);
    store.set('kira-theme', t); try { localStorage.setItem('kira-theme', t); } catch (e) {}
    $$('[data-theme-toggle]').forEach(function (b) { b.setAttribute('aria-pressed', t === 'day' ? 'true' : 'false'); });
    var mc = $('meta[name="theme-color"]'); if (mc) mc.setAttribute('content', t === 'day' ? '#FFF3FA' : '#140A2E');
    if (animate && !RM) { document.documentElement.classList.add('glitch-on'); setTimeout(function () { document.documentElement.classList.remove('glitch-on'); }, 340); }
    if (K.fx && K.fx.onTheme) K.fx.onTheme(t);
  }
  setTheme(document.documentElement.getAttribute('data-mode') || 'night');
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-theme-toggle]')) {
      var t = document.documentElement.getAttribute('data-mode') === 'day' ? 'night' : 'day';
      setTheme(t, true);
      say(t === 'day' ? 'Guten Morgen, Harajuku! ☀️ Kawaii-Modus an.' : 'Neon an! 🌙 Akihabara bei Nacht.', 'wink');
    }
  });

  /* ---------- Toast ---------- */
  var toastT;
  function toast(msg) {
    var t = $('#toast'); t.innerHTML = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  K.toast = toast;

  /* ---------- Momo-Buddy ---------- */
  var bubbleT, buddyOff = false;
  try { buddyOff = sessionStorage.getItem('kira-buddy-off') === '1'; } catch (e) {}
  function say(text, mood, ms) {
    var btn = $('#buddyBtn');
    btn.innerHTML = K.momo(mood || 'happy');
    btn.classList.remove('jump'); void btn.offsetWidth; btn.classList.add('jump');
    if (buddyOff && mood !== 'cheer') return;
    $('#bubbleT').textContent = text;
    $('#bubble').classList.add('show');
    clearTimeout(bubbleT);
    bubbleT = setTimeout(function () { $('#bubble').classList.remove('show'); btn.innerHTML = K.momo('happy'); }, ms || 5200);
  }
  K.say = say;
  var TIPS = {
    '': ['Psst! Reiß das Booster-Pack auf. Da steckt ein Gutschein drin ✨', 'Dreh an der Gacha-Kurbel: Da wartet der Deal des Tages!'],
    shop: ['Tipp: Mit „Nur auf Lager“ siehst du nur Sachen, die sofort rausgehen.', 'Drück „/“ für die Schnellsuche. Ich find alles!'],
    singles: ['Fahr mit der Maus über die Karten, oder kipp dein Handy. Holo-Glitzer garantiert!', 'Gegradete Karten erkennst du am Slab mit Etikett.'],
    karte: ['Zieh die Karte zur Seite, dann dreht sie sich, Rückseite inklusive!'],
    produkt: ['Toploader nicht vergessen! Deine Karten werden es dir danken.'],
    vorbestellungen: ['Klick auf „Erinnere mich“, dann stups ich dich zum Release an!'],
    ankauf: ['Gute Fotos = besseres Angebot. Vorder- und Rückseite bitte!'],
    events: ['Freitag ist Trade-Night! Bring deinen Binder mit.'],
    laden: ['Komm vorbei! Ich wohne im Gacha-Automaten neben der Kasse.'],
    kontakt: ['Fragen zu Versand oder Echtheit? Schau zuerst ins FAQ.']
  };
  var tipIdx = 0, tipTimer;
  function routeTip(r) {
    clearTimeout(tipTimer);
    tipTimer = setTimeout(function () { var t = TIPS[r] || TIPS['']; say(t[0], 'wink'); tipIdx = 0; }, r === '' ? 3800 : 1800);
  }
  $('#buddyBtn').addEventListener('click', function () {
    buddyOff = false; try { sessionStorage.removeItem('kira-buddy-off'); } catch (e) {}
    var t = TIPS[cur.path] || TIPS['']; tipIdx = (tipIdx + 1) % t.length;
    var extra = ['Ich bin Momo, ein Mochi-Geist. Mein Stern leuchtet, wenn du Holos ziehst ⭐', 'Gratis-Versand gibt es ab ' + K.FREE_SHIP + ' €. Ich rechne mit!'];
    say((t.concat(extra))[(tipIdx + Math.floor(Math.random() * 2)) % (t.length + extra.length)], Math.random() > .5 ? 'wink' : 'happy');
  });
  $('#bubbleX').addEventListener('click', function () {
    $('#bubble').classList.remove('show'); buddyOff = true;
    try { sessionStorage.setItem('kira-buddy-off', '1'); } catch (e) {}
    $('#buddyBtn').innerHTML = K.momo('sleepy');
  });

  /* ---------- Warenkorb ---------- */
  var cart = store.get('kira-cart', []).filter(function (l) { return K.byId[l.id]; });
  function maxQty(p) { return p.preorder ? 10 : Math.min(p.stock, p.kind === 'single' ? p.stock : 10); }
  function linePrice(l) { return l.price != null ? l.price : K.byId[l.id].price; }
  function cartCount() { return cart.reduce(function (a, l) { return a + l.qty; }, 0); }
  function cartSum() { return cart.reduce(function (a, l) { return a + l.qty * linePrice(l); }, 0); }
  function saveCart() { store.set('kira-cart', cart); renderCart(); }
  function addToCart(id, qty, src, price) {
    var p = K.byId[id]; if (!p) return;
    qty = qty || 1;
    if (!p.preorder && p.stock <= 0) { toast('Leider ausverkauft.'); return; }
    var key = id + (price != null ? '~deal' : '');
    var line = cart.filter(function (l) { return l.key === key; })[0];
    if (line) {
      if (line.qty + qty > maxQty(p)) { toast('Mehr haben wir davon gerade nicht auf Lager.'); say('Uff, mehr ist nicht im Lager!', 'shock'); return; }
      line.qty += qty;
    } else cart.push({ key: key, id: id, qty: Math.min(qty, maxQty(p)), price: price != null ? price : null });
    saveCart();
    var btn = $('#cartBtn');
    var done = function () {
      btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
      say(['Yatta! ★ Ab in den Korb!', 'Sugoi! Gute Wahl!', 'Kira kira! Liegt im Korb.'][Math.floor(Math.random() * 3)], 'cheer', 2600);
      var rest = K.FREE_SHIP - cartSum();
      toast(I.check.replace('<svg', '<svg style="width:20px;height:20px;color:#00A36C"') + '<span>' + esc(p.name) + ' liegt im Warenkorb.' + (rest > 0 ? ' Noch ' + eur(rest) + ' bis Gratis-Versand.' : ' Gratis-Versand! 🎉') + '</span>');
    };
    if (src && K.fx && K.fx.flyToCart && !RM) K.fx.flyToCart(src, btn, done); else done();
  }
  K.addToCart = addToCart;
  function renderCart() {
    var n = cartCount(), sum = cartSum();
    $('#cartN').textContent = n;
    $('#cartBtn').setAttribute('aria-label', 'Warenkorb öffnen, ' + n + ' Artikel');
    var rest = Math.max(0, K.FREE_SHIP - sum), pct = Math.min(100, sum / K.FREE_SHIP * 100);
    $('#ship').innerHTML = n ? '<p>' + (rest > 0 ? 'Noch <span style="color:var(--pink)">' + eur(rest) + '</span> bis zum Gratis-Versand' : '🎉 Gratis-Versand freigeschaltet!') + '</p><div class="ship-bar' + (rest > 0 ? '' : ' full') + '" role="progressbar" aria-label="Fortschritt bis Gratis-Versand" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(pct) + '"><i style="width:' + pct + '%"></i></div>' : '<p>Gratis-Versand ab ' + eur(K.FREE_SHIP) + ', versichert und mit Kartenschutz.</p>';
    if (!n) {
      $('#cartList').innerHTML = '<div class="cart-empty">' + K.momo('sleepy') + '<b class="h-s" style="display:block;font-family:var(--f-head);margin-bottom:6px">Hier ist es leer …</b><p style="color:var(--ink2)">Momo schläft, bis du etwas hinzufügst.</p><a class="btn" href="#/shop" data-close-cart>Zum Shop</a></div>';
      $('#cartFoot').innerHTML = '';
      return;
    }
    $('#cartList').innerHTML = cart.map(function (l) {
      var p = K.byId[l.id];
      return '<div class="citem"><div class="citem-img">' + (p.kind === 'single' ? K.card(p) : K.productArt(p)) + '</div>' +
        '<div><b>' + esc(p.name) + '</b><small>' + gameById[p.game].name + (p.kind === 'single' ? ' · ' + condById[p.cond].short + (p.grade !== 'Raw' ? ' · ' + p.grade : '') : ' · ' + p.lang) + (l.price != null ? ' · <span style="color:var(--pink)">Gacha-Deal</span>' : '') + (p.preorder ? ' · Vorbestellung' : '') + '</small>' +
        '<div class="qty"><button type="button" data-q="-1" data-k="' + l.key + '" aria-label="Menge verringern">−</button><span aria-label="Menge">' + l.qty + '</span><button type="button" data-q="1" data-k="' + l.key + '" aria-label="Menge erhöhen"' + (l.qty >= maxQty(p) ? ' disabled' : '') + '>+</button></div></div>' +
        '<div class="citem-r"><b>' + eur(l.qty * linePrice(l)) + '</b><button class="rm" type="button" data-rm="' + l.key + '">Entfernen</button></div></div>';
    }).join('');
    var ship = rest > 0 ? K.SHIP_COST : 0;
    $('#cartFoot').innerHTML = '<div class="sum"><span>Zwischensumme</span><span>' + eur(sum) + '</span></div><div class="sum"><span>Versand (versichert)</span><span>' + (ship ? eur(ship) : 'gratis') + '</span></div><div class="sum total"><span>Gesamt</span><span>' + eur(sum + ship) + '</span></div><small style="color:var(--ink2)">inkl. MwSt. · Preise erfunden</small><button class="btn btn-p" type="button" data-checkout>Zur Kasse</button>';
  }
  $('#drawer').addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]');
    if (q) {
      var l = cart.filter(function (x) { return x.key === q.dataset.k; })[0]; if (!l) return;
      l.qty += +q.dataset.q;
      if (l.qty > maxQty(K.byId[l.id])) l.qty = maxQty(K.byId[l.id]);
      if (l.qty <= 0) cart.splice(cart.indexOf(l), 1);
      saveCart();
      var again = $('[data-k="' + q.dataset.k + '"][data-q="' + q.dataset.q + '"]'); if (again) again.focus();
    }
    if (rm) { cart = cart.filter(function (x) { return x.key !== rm.dataset.rm; }); saveCart(); $('#drawer .ibtn').focus(); }
    if (e.target.closest('[data-checkout]')) { closeCart(); checkout(); }
  });
  var lastFocus = null;
  function trap(el) {
    el.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', el).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
  }
  trap($('#drawer')); trap($('#search')); trap($('#mmenu'));
  function openCart() {
    lastFocus = document.activeElement; renderCart();
    $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); $('#backdrop').classList.add('open');
    lockScroll(true); setTimeout(function () { $('#drawer .ibtn').focus(); }, 60);
  }
  function closeCart() {
    if (!$('#drawer').classList.contains('open')) return;
    $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true'); $('#backdrop').classList.remove('open');
    lockScroll(false); if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  K.openCart = openCart;
  function lockScroll(on) {
    document.body.style.overflow = on ? 'hidden' : '';
    if (K.fx && K.fx.lenis) { on ? K.fx.lenis.stop() : K.fx.lenis.start(); }
  }
  K.lockScroll = lockScroll;
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-cart]')) openCart();
    if (e.target.closest('[data-close-cart]') || e.target === $('#backdrop')) closeCart();
    var add = e.target.closest('[data-add]');
    if (add) { e.preventDefault(); var qi = add.dataset.qtyFrom ? +$(add.dataset.qtyFrom).textContent : 1; addToCart(add.dataset.add, qi, add, add.dataset.price ? +add.dataset.price : null); }
  });

  /* ---------- Modal ---------- */
  function modal(html, onOpen) {
    var root = $('#modalRoot'); var prev = document.activeElement;
    root.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mT"><div class="modal-box">' + '<button class="ibtn modal-x" type="button" data-mclose aria-label="Schließen">' + I.x + '</button>' + html + '</div></div>';
    var m = $('.modal', root); trap(m); lockScroll(true);
    var close = function () { root.innerHTML = ''; lockScroll(false); if (prev && prev.focus) prev.focus(); document.removeEventListener('keydown', onKey); };
    var onKey = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    m.addEventListener('click', function (e) { if (e.target === m || e.target.closest('[data-mclose]')) close(); });
    setTimeout(function () { var f = $('input,button:not(.modal-x)', m) || $('.modal-x', m); f.focus(); }, 40);
    if (onOpen) onOpen(m, close);
    return close;
  }
  K.modal = modal;
  function checkout() {
    var step = 0, labels = ['Adresse', 'Versand', 'Zahlung', 'Fertig'];
    modal('<h2 id="mT">Kasse <span class="pix" style="font-size:.6em;color:var(--pink)">レジ</span></h2><p style="color:var(--ink2)">Der Checkout ist in diesem Musterdesign nur angedeutet. Es wird nichts bestellt und nichts bezahlt.</p><div class="co-steps" id="coSteps"></div><div id="coBody"></div>', function (m, close) {
      function draw() {
        $('#coSteps', m).innerHTML = labels.map(function (l, i) { return '<span class="' + (i <= step ? 'on' : '') + '">' + (i + 1) + ' · ' + l + '</span>'; }).join('');
        var b = $('#coBody', m);
        if (step === 0) b.innerHTML = '<div class="form"><label>Vorname<input class="fld" autocomplete="off" placeholder="z. B. Alex"></label><label>Nachname<input class="fld" autocomplete="off" placeholder="[Platzhalter]"></label><label class="full">Straße &amp; Hausnummer<input class="fld" autocomplete="off" placeholder="[Platzhalter]"></label></div><div class="buy-row"><button class="btn" type="button" data-next>Weiter zum Versand</button></div>';
        if (step === 1) b.innerHTML = '<div class="info-list"><label class="acc" style="padding:14px 16px;display:flex;gap:10px;align-items:center"><input type="radio" name="sh" checked> <span><b>Versicherter Versand</b><br><small style="color:var(--ink2)">mit Kartenschutz · 1–2 Werktage</small></span></label><label class="acc" style="padding:14px 16px;display:flex;gap:10px;align-items:center"><input type="radio" name="sh"> <span><b>Abholung im Laden</b><br><small style="color:var(--ink2)">Ludwigshafen · kostenlos</small></span></label></div><div class="buy-row"><button class="btn" type="button" data-next>Weiter zur Zahlung</button></div>';
        if (step === 2) b.innerHTML = '<p>Summe: <b>' + eur(cartSum() + (cartSum() >= K.FREE_SHIP ? 0 : K.SHIP_COST)) + '</b></p><div class="pay" style="margin-bottom:14px"><span class="badge">PayPal</span><span class="badge">Karte</span><span class="badge">Klarna</span><span class="badge">Vorkasse</span></div><div class="buy-row"><button class="btn btn-p" type="button" data-next>Zahlungspflichtig bestellen (Demo)</button></div>';
        if (step === 3) b.innerHTML = '<div style="text-align:center">' + K.momo('cheer') .replace('class="momo-svg"', 'class="momo-svg" style="width:120px;margin:0 auto"') + '<p class="h-s" style="font-family:var(--f-head);margin:10px 0">Arigatō! (Demo)</p><p style="color:var(--ink2)">Hier würde jetzt die Bestellbestätigung kommen. Das ist ein Musterdesign von Pfalz Multiservice.</p><button class="btn" type="button" data-mclose>Schließen</button></div>';
      }
      m.addEventListener('click', function (e) { if (e.target.closest('[data-next]')) { step++; draw(); var f = $('#coBody input, #coBody button', m); if (f) f.focus(); if (step === 3) say('Bestellung (Demo) abgeschickt! ★', 'cheer'); } });
      draw();
    });
  }

  /* ---------- Suche ---------- */
  var PAGES = [{ t: 'Vorbestellungen & Release-Kalender', r: 'vorbestellungen', k: 'release kalender preorder vorbestellung' }, { t: 'Ankauf: Wir kaufen deine Sammlung', r: 'ankauf', k: 'ankauf verkaufen sammlung' },
    { t: 'Events: Trade-Nights & Turniere', r: 'events', k: 'event turnier trade night anmeldung' }, { t: 'Laden & Öffnungszeiten', r: 'laden', k: 'laden ludwigshafen öffnungszeiten anfahrt' }, { t: 'FAQ: Versand, Echtheit, Rückgabe', r: 'kontakt', k: 'faq versand echtheit rückgabe kontakt kartenschutz' }];
  function haystack(p) { return norm([p.name, gameById[p.game].name, typeById[p.type].name, p.lang, p.set ? setById[p.set].name : '', p.rarity ? rarById[p.rarity].name : '', p.grade || '', p.art, K.CREATURE_NAMES[p.art] || ''].join(' ')); }
  K.ALL.forEach(function (p) { p._h = haystack(p); });
  function matchQ(p, q) { if (!q) return true; return norm(q).split(/\s+/).every(function (w) { return p._h.indexOf(w) > -1; }); }
  function hl(text, q) { if (!q) return esc(text); var t = esc(text); norm(q).split(/\s+/).filter(Boolean).forEach(function (w) { var i = norm(t).indexOf(w); if (i > -1) t = t.slice(0, i) + '<mark>' + t.slice(i, i + w.length) + '</mark>' + t.slice(i + w.length); }); return t; }
  var sel = -1;
  function srItem(p, q) {
    var href = p.kind === 'single' ? '#/karte/' + p.id : '#/produkt/' + p.id;
    return '<a class="sr-item" role="option" href="' + href + '"><span class="sr-img">' + (p.kind === 'single' ? K.card(p) : K.productArt(p)) + '</span><span><b>' + hl(p.name, q) + '</b><small>' + gameById[p.game].name + ' · ' + (p.kind === 'single' ? rarById[p.rarity].name + ' · ' + p.grade : typeById[p.type].name + ' · ' + p.lang) + '</small></span><span class="sr-price">' + eur(p.price) + '</span></a>';
  }
  function runSearch() {
    var q = $('#q').value.trim(), res = $('#searchRes'); sel = -1;
    if (!q) {
      res.innerHTML = '<div class="sr-group">Beliebt</div>' + K.ALL.slice().sort(function (a, b) { return b.pop - a.pop; }).slice(0, 4).map(function (p) { return srItem(p); }).join('') +
        '<div class="sr-group">Schnellsuche</div><div class="search-sugg">' + ['Booster', 'Display', 'PSA 10', 'Gold', 'Momo', 'Japan', 'Toploader', 'Lorcana'].map(function (s) { return '<button class="chip" type="button" data-sugg="' + s + '">' + s + '</button>'; }).join('') + '</div>';
      return;
    }
    var prods = K.PRODUCTS.filter(function (p) { return matchQ(p, q); }).slice(0, 6);
    var sing = K.SINGLES.filter(function (p) { return matchQ(p, q); }).slice(0, 6);
    var pages = PAGES.filter(function (p) { return norm(p.t + ' ' + p.k).indexOf(norm(q)) > -1; });
    if (!prods.length && !sing.length && !pages.length) {
      res.innerHTML = '<div class="empty" style="border:0">' + K.momo('shock') + '<b>Keine Treffer für „' + esc(q) + '“</b><p>Momo hat überall gesucht, sogar unter der Theke. Probier „Booster“, „PSA“ oder „Plüsch“.</p></div>';
      return;
    }
    res.innerHTML = (prods.length ? '<div class="sr-group">Produkte · ' + prods.length + '</div>' + prods.map(function (p) { return srItem(p, q); }).join('') : '') +
      (sing.length ? '<div class="sr-group">Einzelkarten · ' + sing.length + '</div>' + sing.map(function (p) { return srItem(p, q); }).join('') : '') +
      (pages.length ? '<div class="sr-group">Seiten</div>' + pages.map(function (p) { return '<a class="sr-item" role="option" href="#/' + p.r + '"><span class="sr-img">' + I.right + '</span><span><b>' + hl(p.t, q) + '</b></span><span></span></a>'; }).join('') : '') +
      '<div class="search-sugg"><a class="btn btn-s btn-c" href="#/shop?q=' + encodeURIComponent(q) + '">Alle Treffer im Shop zeigen</a></div>';
  }
  function openSearch() { lastFocus = document.activeElement; $('#search').hidden = false; lockScroll(true); $('#q').value = ''; runSearch(); setTimeout(function () { $('#q').focus(); }, 30); }
  function closeSearch() { if ($('#search').hidden) return; $('#search').hidden = true; lockScroll(false); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  $('#q').addEventListener('input', runSearch);
  $('#q').addEventListener('keydown', function (e) {
    var items = $$('#searchRes .sr-item');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); if (!items.length) return;
      sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach(function (x, i) { x.classList.toggle('sel', i === sel); x.setAttribute('aria-selected', i === sel); });
      items[sel].scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'Enter') { e.preventDefault(); if (sel > -1 && items[sel]) items[sel].click(); else if ($('#q').value.trim()) location.hash = '#/shop?q=' + encodeURIComponent($('#q').value.trim()); }
  });
  $('#search').addEventListener('click', function (e) {
    if (e.target === $('#search') || e.target.closest('[data-close-search]') || e.target.closest('a')) closeSearch();
    var s = e.target.closest('[data-sugg]'); if (s) { $('#q').value = s.dataset.sugg; runSearch(); $('#q').focus(); }
  });
  document.addEventListener('click', function (e) { if (e.target.closest('[data-open-search]')) openSearch(); });

  /* ---------- Mobil-Menü ---------- */
  function openMenu() { $('#mmenu').hidden = false; $('[data-open-menu]').setAttribute('aria-expanded', 'true'); lockScroll(true); setTimeout(function () { $('#mmenu [data-close-menu]').focus(); }, 30); }
  function closeMenu() { if ($('#mmenu').hidden) return; $('#mmenu').hidden = true; $('[data-open-menu]').setAttribute('aria-expanded', 'false'); lockScroll(false); }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-menu]')) openMenu();
    if (e.target.closest('[data-close-menu]') || e.target.closest('#mnav a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); closeCart(); closeMenu(); closeSheet(); }
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && tag !== 'input' && tag !== 'textarea' && $('#search').hidden) { e.preventDefault(); openSearch(); }
  });

  /* ---------- Bausteine ---------- */
  function stockHtml(p) {
    if (p.preorder) return '<span class="stock pre">Vorbestellung · ' + fmtDate(relById[p.preorder].date).replace(/^.., /, '') + '</span>';
    if (p.stock <= 0) return '<span class="stock out">Ausverkauft</span>';
    if (p.stock <= 5) return '<span class="stock low">Nur noch ' + p.stock + '</span>';
    return '<span class="stock">Auf Lager</span>';
  }
  K.stockHtml = stockHtml;
  function peel(p) {
    var t = p.tag || (p.isNew ? 'NEU' : '');
    if (!t) return '';
    var c = t === 'HOT' ? 'hot' : t === '限定' ? 'lim' : 'nw';
    return '<span class="peel ' + c + '" aria-hidden="true"><span>' + t + '</span></span>';
  }
  function priceTag(p, extra) { return '<span class="tag-price ' + (extra || '') + '"><b>' + eur(p.price) + '</b><small>inkl. MwSt.</small></span>'; }
  function pcard(p) {
    var single = p.kind === 'single';
    var href = single ? '#/karte/' + p.id : '#/produkt/' + p.id;
    var canBuy = p.preorder || p.stock > 0;
    return '<article class="pcard" data-tilt style="--c1:' + p.c1 + '">' + peel(p) +
      '<div class="pcard-img">' + (single ? K.card(p) : (K.IMAGES[p.img] && K.IMAGES[p.img].ready ? K.ph(p.img, { sizes: '(max-width:700px) 46vw, 260px' }) : K.productArt(p) + '<span class="pcard-imgid">' + p.img + '</span>')) + '</div>' +
      '<div class="pcard-body"><div class="pcard-meta"><span>' + gameById[p.game].short + '</span>·<span>' + (single ? rarById[p.rarity].name : typeById[p.type].name) + '</span><span class="badge">' + p.lang + '</span>' + (single && p.grade !== 'Raw' ? '<span class="badge badge-y">' + p.grade + '</span>' : '') + '</div>' +
      '<h3><a href="' + href + '">' + esc(p.name) + '</a></h3>' + stockHtml(p) +
      '<div class="pcard-row">' + priceTag(p) + '<button class="add" type="button" data-add="' + p.id + '" aria-label="' + esc(p.name) + ' in den Warenkorb"' + (canBuy ? '' : ' disabled') + '>' + I.plus + '</button></div></div></article>';
  }
  K.pcard = pcard;
  function scard(c) {
    var inner = K.card(c);
    if (c.grade !== 'Raw') inner = '<div class="slab"><div class="slab-label"><span>' + c.grade.split(' ')[0] + ' · ' + c.set + ' ' + c.no + '</span><b>' + c.grade.split(' ')[1] + '</b></div>' + inner + '</div>';
    return '<article class="scard"><a href="#/karte/' + c.id + '" aria-label="' + esc(c.name) + ', ' + rarById[c.rarity].name + ', Details ansehen">' + inner + '</a>' +
      '<div class="scard-info"><div><h3>' + esc(c.name) + '</h3><div class="pcard-meta"><span>' + gameById[c.game].short + '</span><span class="badge">' + condById[c.cond].short + '</span><span class="badge ' + (c.rarity === 'gold' ? 'badge-y' : c.rarity === 'fullart' ? 'badge-p' : c.rarity !== 'common' ? 'badge-c' : '') + '">' + rarById[c.rarity].name + '</span></div></div>' +
      '<button class="add" type="button" data-add="' + c.id + '" aria-label="' + esc(c.name) + ' in den Warenkorb"' + (c.stock > 0 ? '' : ' disabled') + '>' + I.plus + '</button></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">' + priceTag(c) + stockHtml(c) + '</div></article>';
  }
  function slam(text, cls, tag) { return '<' + (tag || 'h2') + ' class="' + (cls || 'h-l') + '"><span class="slam">' + text + '<i class="slam-burst" aria-hidden="true"></i></span></' + (tag || 'h2') + '>'; }
  function mq(items, cls) {
    var row = items.concat(items).map(function (t) { return '<span class="mq-item">' + t + '</span>'; }).join('');
    return '<div class="mq ' + (cls || '') + '" aria-hidden="true"><div class="mq-track">' + row + row + '</div></div>';
  }
  function phead(title, kanji, lead, crumb) {
    return '<header class="phead"><span class="big-kanji" aria-hidden="true">' + kanji + '</span><div class="wrap"><nav class="crumbs" aria-label="Brotkrumen"><a href="#/">Start</a><span aria-hidden="true">›</span>' + (crumb || '<span>' + title + '</span>') + '</nav>' + slam(title, 'neon-p', 'h1') + (lead ? '<p class="lead">' + lead + '</p>' : '') + '</div></header>';
  }

  /* ---------- Seite: Start ---------- */
  var countdownTimer;
  function dealOfDay() {
    var pool = K.PRODUCTS.filter(function (p) { return !p.preorder && p.stock > 0 && p.price > 15; });
    var d = new Date(), doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
    var p = pool[doy % pool.length];
    return { p: p, price: Math.round(p.price * .75 * 10) / 10 - .01 };
  }
  K.dealOfDay = dealOfDay;
  function cityWindows() {
    var s = '', seed = 7; var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var blds = [[0, 60, 130], [70, 40, 90], [118, 80, 170], [205, 50, 110], [262, 70, 200], [340, 46, 120], [392, 90, 160], [490, 54, 230], [552, 70, 140], [630, 44, 100], [680, 90, 190], [778, 60, 130], [845, 80, 250], [932, 50, 150], [990, 70, 120], [1066, 60, 210], [1132, 68, 140]];
    blds.forEach(function (b) {
      s += '<rect class="bld" x="' + b[0] + '" y="' + (300 - b[2]) + '" width="' + b[1] + '" height="' + b[2] + '"/>';
      for (var y = 300 - b[2] + 10; y < 290; y += 14) for (var x = b[0] + 6; x < b[0] + b[1] - 8; x += 12) if (rnd() > .62) s += '<rect class="win" x="' + x + '" y="' + y + '" width="6" height="7"/>';
    });
    return '<svg class="city-svg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' + s + '</svg>';
  }
  var TILES = [
    { h: '#/shop?type=booster', t: 'Booster & Displays', s: 'Frisch versiegelt', k: '新弾', c: 'var(--pink)', art: 'booster', big: 1 },
    { h: '#/singles', t: 'Einzelkarten', s: 'Raw & gegradet', k: 'カード', c: 'var(--cyan)', art: 'card' },
    { h: '#/shop?lang=JP', t: 'Japan-Import', s: 'Direkt aus Tokyo', k: '日本', c: 'var(--yellow)', art: 'jp' },
    { h: '#/shop?type=figure', t: 'Figuren', s: 'Vinyl & Resin', k: '人形', c: 'var(--violet)', art: 'figure' },
    { h: '#/shop?type=manga', t: 'Manga', s: 'DE & JP', k: '漫画', c: '#FF8A00', art: 'manga' },
    { h: '#/shop?type=plush', t: 'Plüsch', s: 'Zum Knuddeln', k: 'もち', c: '#FF9FCB', art: 'plush' },
    { h: '#/vorbestellungen', t: 'Vorbestellen', s: 'Release-Kalender', k: '予約', c: '#fff', art: 'pre' },
    { h: '#/shop?type=acc', t: 'Zubehör', s: 'Sleeves, Toploader, Binder', k: '保護', c: 'var(--mint)', art: 'acc', big: 1 },
    { h: '#/ankauf', t: 'Wir kaufen deine Sammlung', s: 'Angebot in 48 Stunden', k: '買取', c: 'var(--pink)', art: 'buy', big: 1 }
  ];
  function tileArt(a) {
    if (a === 'booster') return K.productArt(K.byId.p01);
    if (a === 'card') return '<svg viewBox="0 0 120 120"><rect x="30" y="14" width="62" height="88" rx="6" fill="#fff" stroke="#140A2E" stroke-width="4" transform="rotate(-10 60 60)"/><rect x="38" y="20" width="62" height="88" rx="6" fill="#FF2E93" stroke="#140A2E" stroke-width="4" transform="rotate(8 60 60)"/><polygon points="' + K.starPts(69, 62, 18, 8) + '" fill="#E6FF00" stroke="#140A2E" stroke-width="3" transform="rotate(8 60 60)"/></svg>';
    if (a === 'jp') return '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="44" fill="#fff" stroke="#140A2E" stroke-width="4"/><circle cx="60" cy="60" r="20" fill="#D3002F"/><path d="M20 98 L100 98" stroke="#140A2E" stroke-width="4"/></svg>';
    if (a === 'figure') return K.productArt(K.byId.p14);
    if (a === 'manga') return K.productArt(K.byId.p16);
    if (a === 'plush') return K.creature('chochin', '#FF5A36', '#FFD23F');
    if (a === 'acc') return K.productArt(K.byId.p22);
    if (a === 'buy') return K.momo('cheer');
    return '<svg viewBox="0 0 120 120"><rect x="18" y="24" width="84" height="78" rx="10" fill="#fff" stroke="#140A2E" stroke-width="4"/><rect x="18" y="24" width="84" height="22" rx="10" fill="#FF2E93" stroke="#140A2E" stroke-width="4"/><text x="60" y="88" font-family="DotGothic16" font-size="34" text-anchor="middle" fill="#140A2E">' + K.RELEASES[0].date.getDate() + '</text></svg>';
  }
  function pageHome() {
    var nr = K.RELEASES[0], deal = dealOfDay();
    var newItems = K.ALL.filter(function (p) { return p.isNew; }).sort(function (a, b) { return b.pop - a.pop; }).slice(0, 10);
    var hit = { name: 'Momo, Funkelgeist', rarity: 'gold', art: 'momo', c1: '#FF2E93', c2: '#FFD23F', set: 'NBF', no: '001', lang: 'JP', pwr: 120 };
    main.innerHTML =
      '<section class="hero" aria-labelledby="heroT">' +
        '<div class="hero-city" aria-hidden="true"><div class="sky"></div>' + (K.IMAGES.H01.ready ? '<div class="hero-photo">' + K.ph('H01', { sizes: '100vw' }) + '</div>' : '') + cityWindows() + '<div class="hero-floor"></div></div>' +
        '<canvas class="hero-canvas" id="heroCanvas" aria-hidden="true"></canvas>' +
        '<span class="hero-kanji" aria-hidden="true">キラキラ</span>' +
        '<span class="sign sign-1 flicker" aria-hidden="true">カード</span><span class="sign sign-2 flicker d2" aria-hidden="true">ガチャ</span><span class="sign sign-3 flicker d3" aria-hidden="true">アニメ</span>' +
        (K.IMAGES.H01.ready ? '' : '<span class="ph-flag">H01 · Hintergrundfoto Neon-Straße (Platzhalter)</span>') +
        '<div class="wrap hero-grid">' +
          '<div class="hero-copy"><p class="kicker">Ludwigshafen am Rhein · Online-Shop &amp; Laden</p>' +
          '<h1 id="heroT"><span class="slam neon-p">Shiny Stuff</span><span class="l2 slam">für Nerds.</span></h1>' +
          '<p class="hero-sub">Booster, Displays, Japan-Importe und gegradete Einzelkarten. Dazu Figuren, Manga und Plüsch. Versichert verschickt, echt garantiert, mit Herz verpackt.</p>' +
          '<div class="hero-cta"><a class="btn" href="#/shop">Zum Shop ' + I.right + '</a><a class="btn btn-c" href="#/singles">Einzelkarten</a></div>' +
          '<div class="hero-mini"><span>Versand am selben Tag</span><span>Echtheitsgarantie</span><span>Ankauf von Sammlungen</span></div></div>' +
          '<div class="booster" id="booster" aria-label="Booster-Opening: Pack aufreißen und Gutschein gewinnen"></div>' +
        '</div>' +
      '</section>' +
      mq(K.MARQUEE_A, 'mq-tilt') + mq(K.MARQUEE_B, 'mq-c rev mq-tilt2') +
      '<section class="sec" aria-labelledby="catT"><span class="big-kanji" style="left:-3vw;top:4%" aria-hidden="true">種類</span><div class="wrap" style="position:relative">' +
        '<div class="sec-head"><div><p class="kicker">Kategorien · 種類</p>' + slam('Was suchst du?', 'h-l').replace('<h2', '<h2 id="catT"') + '</div><a class="btn btn-ghost btn-s" href="#/shop">Alle Produkte</a></div>' +
        '<div class="tiles">' + TILES.map(function (t) { return '<a class="tile' + (t.big ? ' big' : '') + '" href="' + t.h + '" style="background:' + t.c + '"><span class="tile-k" aria-hidden="true">' + t.k + '</span>' + tileArt(t.art).replace('<svg', '<svg aria-hidden="true"') + '<b>' + t.t + '</b><span>' + t.s + '</span></a>'; }).join('') + '</div>' +
      '</div></section>' +
      '<section class="sec sec-alt" aria-labelledby="newT"><div class="wrap">' +
        '<div class="sec-head"><div><p class="kicker">新入荷 · Diese Woche</p>' + slam('Neu eingetroffen', 'h-l').replace('<h2', '<h2 id="newT"') + '</div><div class="slider-nav"><button class="ibtn" type="button" data-slide="-1" aria-label="Zurück blättern">' + I.left + '</button><button class="ibtn" type="button" data-slide="1" aria-label="Weiter blättern">' + I.right + '</button></div></div>' +
        '<div class="slider"><div class="slider-track" id="newTrack" tabindex="0" aria-label="Neu eingetroffen, horizontal scrollbar">' + newItems.map(pcard).join('') + '</div></div>' +
      '</div></section>' +
      '<section class="sec" aria-labelledby="gachaT"><span class="big-kanji" style="right:-2vw;top:2%" aria-hidden="true">ガチャ</span><div class="wrap gacha" style="position:relative">' +
        '<div><p class="kicker">Deal des Tages · 今日の特価</p>' + slam('Dreh die<br>Gacha!', 'h-l').replace('<h2', '<h2 id="gachaT"') +
        '<p class="lead" style="margin-top:16px">Jeden Tag steckt ein anderer Deal in der Kapsel. Kurbel drehen, Kapsel fangen, sparen. Momo hat versprochen, nicht zu schummeln.</p>' +
        '<div class="gacha-btns"><button class="btn btn-p" type="button" id="gachaBtn">' + I.spin + ' Kurbel drehen</button><span class="badge badge-y" style="align-self:center">−25 % heute</span></div></div>' +
        '<div class="gacha-stage" id="gachaStage"><span class="gacha-hint" id="gachaHint">Klick oder zieh an der Kurbel ⟳</span>' +
          '<div class="gacha-deal" id="gachaDeal" role="status" aria-live="polite"><span class="stk stk-y pct">−25 %</span>' + K.productArt(deal.p) + '<span class="badge badge-p">DEAL DES TAGES</span><h3>' + esc(deal.p.name) + '</h3>' +
          '<div style="display:flex;justify-content:center;align-items:center;gap:12px;margin-bottom:12px"><span class="tag-price sale"><s>' + eur(deal.p.price) + '</s><b>' + eur(deal.price) + '</b><small>nur heute</small></span></div>' +
          '<button class="btn btn-p btn-s" type="button" data-add="' + deal.p.id + '" data-price="' + deal.price + '">In den Warenkorb</button></div>' +
        '</div>' +
      '</div></section>' +
      '<section class="sec" style="padding-top:0" aria-labelledby="cdT"><div class="wrap"><div class="cd-wrap">' +
        '<div><p class="kicker">Nächstes Release · 発売</p><h2 class="h-m" id="cdT" style="margin-bottom:10px">' + gameById[nr.game].name + ' <span class="neon-y">„' + nr.set + '“</span></h2><p style="opacity:.85">' + fmtDate(nr.date) + ' · ' + nr.lang + ' · ' + nr.note + '</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px"><a class="btn" href="#/vorbestellungen">Jetzt vorbestellen</a><button class="btn btn-ghost" type="button" data-remind="' + nr.id + '">' + I.bell + ' Erinnere mich</button></div></div>' +
        '<div class="cd" id="cd" role="timer" aria-label="Countdown bis zum Release"></div>' +
      '</div></div></section>' +
      '<section class="sec sec-alt" aria-labelledby="socT"><div class="wrap">' +
        '<div class="sec-head"><div><p class="kicker">@kirakira.lu · Instagram &amp; TikTok</p>' + slam('Pulls der Woche', 'h-l').replace('<h2', '<h2 id="socT"') + '</div><span class="pix" style="color:var(--ink2)">#kirakirapulls</span></div>' +
        '<div class="social">' + ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07'].map(function (id, i) { var net = i % 2 ? 'TikTok' : 'Instagram'; return '<div class="soc">' + K.ph(id) + '<span class="soc-badge">' + net + '</span><div class="soc-meta"><span>@kirakira.lu</span><span>♥ ' + [2.4, 1.1, 3.8, .9, 5.2, 1.7, 2.9][i].toLocaleString('de-DE') + ' Tsd.</span></div></div>'; }).join('') + '</div>' +
        '<p style="color:var(--ink3);font-size:13px;margin-top:12px">Social-Wand mit erfundenen Beiträgen und Zahlen. Später per Feed eingebunden.</p>' +
      '</div></section>' +
      trustBar();
    // Booster & Gacha initialisieren
    if (K.fx) { K.fx.booster($('#booster')); K.fx.gacha($('#gachaStage'), $('#gachaBtn'), $('#gachaDeal'), $('#gachaHint')); K.fx.particles($('#heroCanvas'), $('.hero')); }
    $$('[data-slide]').forEach(function (b) { b.addEventListener('click', function () { var t = $('#newTrack'); t.scrollBy({ left: +b.dataset.slide * t.clientWidth * .8, behavior: RM ? 'auto' : 'smooth' }); }); });
    var tick = function () {
      var ms = Math.max(0, nr.date - new Date()), s = Math.floor(ms / 1000);
      var parts = [[Math.floor(s / 86400), 'TAGE'], [Math.floor(s / 3600) % 24, 'STD'], [Math.floor(s / 60) % 60, 'MIN'], [s % 60, 'SEK']];
      var el = $('#cd'); if (!el) return;
      el.innerHTML = parts.map(function (p) { return '<span class="cd-u"><span class="cd-n">' + String(p[0]).padStart(2, '0') + '</span><span class="cd-l">' + p[1] + '</span></span>'; }).join('');
    };
    tick(); countdownTimer = setInterval(tick, 1000);
    void hit;
  }
  function trustBar() {
    return '<section class="sec" aria-label="Darauf kannst du dich verlassen"><div class="wrap"><ul class="trust">' +
      [[I.truck, 'Versicherter Versand', 'Mit Sendungsverfolgung, gratis ab ' + K.FREE_SHIP + ' €'], [I.box, 'Kartenschutz', 'Hülle, Toploader, Kartonplatten'], [I.shield, 'Echtheitsgarantie', 'Jede Karte ab 20 € geprüft'], [I.store, 'Laden in Ludwigshafen', 'Abholen, tauschen, zocken'], [I.star, '4,9 von 5 Sternen', '1.284 Bewertungen (fiktiv)']]
        .map(function (t) { return '<li>' + t[0] + '<div><b>' + t[1] + '</b><span>' + t[2] + '</span></div></li>'; }).join('') + '</ul></div></section>';
  }

  /* ---------- Filter-Seiten (Shop & Einzelkarten) ---------- */
  var sheetOpen = false;
  function openSheet() { var f = $('#filters'); if (!f) return; sheetOpen = true; f.classList.add('open'); $('#sheetBg').classList.add('open'); lockScroll(true); setTimeout(function () { var x = $('input', f); if (x) x.focus(); }, 60); }
  function closeSheet() { var f = $('#filters'); if (!f || !sheetOpen) return; sheetOpen = false; f.classList.remove('open'); $('#sheetBg').classList.remove('open'); lockScroll(false); var b = $('.fbtn'); if (b) b.focus(); }
  function filterPage(cfg, params) {
    var items = cfg.items;
    var st = { q: params.q || '', sort: params.sort || 'pop', min: '', max: '', stock: false };
    cfg.groups.forEach(function (g) { st[g.key] = params[g.key] ? params[g.key].split(',') : []; });
    if (params.cat) { if (typeById[params.cat]) st.type = [params.cat]; else if (gameById[params.cat]) st.game = [params.cat]; }
    var prices = items.map(function (p) { return p.price; });
    var pmax = Math.ceil(Math.max.apply(null, prices));
    main.innerHTML = phead(cfg.title, cfg.kanji, cfg.lead) +
      '<div class="wrap">' +
      (cfg.cats ? '<div class="cats" role="group" aria-label="Schnellauswahl">' + cfg.cats.map(function (c) { return '<button class="chip" type="button" data-cat="' + c[0] + '" data-val="' + c[1] + '" aria-pressed="false">' + c[2] + '</button>'; }).join('') + '</div>' : '') +
      '<div class="shop" style="padding-top:' + (cfg.cats ? '6px' : '28px') + '">' +
        '<aside class="filters" id="filters" aria-label="Filter"><div class="sheet-grip" aria-hidden="true"></div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><b class="h-s" style="font-family:var(--f-head)">Filter</b><button class="rm" type="button" data-reset>Alle zurücksetzen</button></div>' +
          cfg.groups.map(function (g) {
            return '<fieldset class="fgroup"><legend>' + g.label + '</legend><div class="fopts">' + g.opts.map(function (o) {
              var n = items.filter(function (p) { return g.get(p) === o[0]; }).length; if (!n) return '';
              return '<label class="ck"><input type="checkbox" name="' + g.key + '" value="' + o[0] + '"' + (st[g.key].indexOf(o[0]) > -1 ? ' checked' : '') + '><span>' + o[1] + ' <span class="n">' + n + '</span></span></label>';
            }).join('') + '</div></fieldset>';
          }).join('') +
          '<fieldset class="fgroup"><legend>Preis</legend><div class="range"><label>von €<input type="number" inputmode="decimal" min="0" name="min" placeholder="0"></label><label>bis €<input type="number" inputmode="decimal" min="0" name="max" placeholder="' + pmax + '"></label></div><input type="range" min="0" max="' + pmax + '" value="' + pmax + '" name="maxr" aria-label="Höchstpreis" style="margin-top:12px"></fieldset>' +
          '<div class="fgroup"><label class="switch">Nur auf Lager<input type="checkbox" name="stock"></label></div>' +
          '<div class="sheet-actions"><button class="btn btn-ghost" type="button" data-reset>Zurücksetzen</button><button class="btn" type="button" data-close-sheet id="sheetApply">Treffer zeigen</button></div>' +
        '</aside>' +
        '<section aria-label="Ergebnisse">' +
          '<div class="shop-top"><div class="shop-search">' + I.search + '<label class="sr" for="fq">' + cfg.searchLabel + '</label><input class="fld" id="fq" type="search" placeholder="' + cfg.searchPh + '" value="' + esc(st.q) + '" autocomplete="off"></div>' +
          '<label class="sr" for="fsort">Sortierung</label><select class="fld sort" id="fsort"><option value="pop">Beliebtheit</option><option value="new">Neuheiten zuerst</option><option value="asc">Preis aufsteigend</option><option value="desc">Preis absteigend</option><option value="az">Name A–Z</option></select></div>' +
          '<div class="active-f" id="activeF"></div><p class="rescount" id="rescount" role="status" aria-live="polite"></p>' +
          '<div class="' + cfg.gridCls + '" id="results"></div>' +
        '</section>' +
      '</div></div>' +
      '<button class="btn fbtn" type="button" data-open-sheet aria-controls="filters">' + I.filter + ' Filter <span id="fcount"></span></button><div class="sheet-bg" id="sheetBg"></div>';
    $('#fsort').value = st.sort;
    var f = $('#filters');
    function readForm() {
      cfg.groups.forEach(function (g) { st[g.key] = $$('input[name="' + g.key + '"]:checked', f).map(function (i) { return i.value; }); });
      st.min = $('input[name="min"]', f).value; st.max = $('input[name="max"]', f).value; st.stock = $('input[name="stock"]', f).checked;
    }
    function apply() {
      var min = parseFloat(st.min) || 0, max = parseFloat(st.max) || Infinity;
      var res = items.filter(function (p) {
        if (!matchQ(p, st.q)) return false;
        for (var i = 0; i < cfg.groups.length; i++) { var g = cfg.groups[i]; if (st[g.key].length && st[g.key].indexOf(g.get(p)) < 0) return false; }
        if (p.price < min || p.price > max) return false;
        if (st.stock && !(p.stock > 0 && !p.preorder)) return false;
        return true;
      });
      var s = st.sort;
      res.sort(function (a, b) { return s === 'asc' ? a.price - b.price : s === 'desc' ? b.price - a.price : s === 'az' ? a.name.localeCompare(b.name, 'de') : s === 'new' ? (b.isNew - a.isNew) || (b.pop - a.pop) : b.pop - a.pop; });
      var chips = [];
      cfg.groups.forEach(function (g) { st[g.key].forEach(function (v) { var o = g.opts.filter(function (x) { return x[0] === v; })[0]; chips.push('<button class="chip chip-x" type="button" data-unset="' + g.key + ':' + v + '">' + (o ? o[1] : v) + ' ×</button>'); }); });
      if (st.q) chips.push('<button class="chip chip-x" type="button" data-unset="q:">„' + esc(st.q) + '“ ×</button>');
      if (st.min || st.max) chips.push('<button class="chip chip-x" type="button" data-unset="price:">' + (st.min || 0) + '–' + (st.max || pmax) + ' € ×</button>');
      if (st.stock) chips.push('<button class="chip chip-x" type="button" data-unset="stock:">Auf Lager ×</button>');
      $('#activeF').innerHTML = chips.join('');
      $('#fcount').textContent = chips.length ? '(' + chips.length + ')' : '';
      $('#rescount').textContent = res.length + (res.length === 1 ? ' Treffer' : ' Treffer') + ' · ' + items.length + ' insgesamt';
      $('#sheetApply').textContent = res.length + ' Treffer zeigen';
      $('#results').innerHTML = res.length ? res.map(cfg.render).join('') : '<div class="empty">' + K.momo('shock') + '<b>Keine Treffer</b><p>Momo hat alles umgedreht, sogar die Gacha-Kapseln. Vielleicht ein Filter zu viel?</p><button class="btn" type="button" data-reset>Filter zurücksetzen</button></div>';
      $$('.cats .chip').forEach(function (c) { c.setAttribute('aria-pressed', st[c.dataset.cat] && st[c.dataset.cat].length === 1 && st[c.dataset.cat][0] === c.dataset.val ? 'true' : 'false'); });
      // URL aktuell halten (ohne Seitenwechsel)
      var qs = []; cfg.groups.forEach(function (g) { if (st[g.key].length) qs.push(g.key + '=' + st[g.key].join(',')); }); if (st.q) qs.push('q=' + encodeURIComponent(st.q)); if (st.sort !== 'pop') qs.push('sort=' + st.sort);
      try { history.replaceState(null, '', '#/' + cfg.route + (qs.length ? '?' + qs.join('&') : '')); } catch (e) {}
      if (K.fx) K.fx.refreshCards($('#results'));
    }
    var qT;
    $('#fq').addEventListener('input', function () { clearTimeout(qT); qT = setTimeout(function () { st.q = $('#fq').value.trim(); apply(); }, 90); });
    $('#fsort').addEventListener('change', function () { st.sort = $('#fsort').value; apply(); });
    f.addEventListener('change', function (e) {
      if (e.target.name === 'maxr') { $('input[name="max"]', f).value = e.target.value < pmax ? e.target.value : ''; }
      readForm(); apply();
    });
    f.addEventListener('input', function (e) { if (e.target.name === 'maxr') { $('input[name="max"]', f).value = e.target.value < pmax ? e.target.value : ''; readForm(); apply(); } });
    function reset() { $$('input[type="checkbox"]', f).forEach(function (i) { i.checked = false; }); $('input[name="min"]', f).value = ''; $('input[name="max"]', f).value = ''; $('input[name="maxr"]', f).value = pmax; $('#fq').value = ''; st.q = ''; readForm(); apply(); }
    main.addEventListener('click', function onC(e) {
      if (!document.body.contains(f)) { main.removeEventListener('click', onC); return; }
      if (e.target.closest('[data-reset]')) reset();
      if (e.target.closest('[data-open-sheet]')) openSheet();
      if (e.target.closest('[data-close-sheet]') || e.target.id === 'sheetBg') closeSheet();
      var u = e.target.closest('[data-unset]');
      if (u) {
        var kv = u.dataset.unset.split(':');
        if (kv[0] === 'q') { st.q = ''; $('#fq').value = ''; }
        else if (kv[0] === 'price') { $('input[name="min"]', f).value = ''; $('input[name="max"]', f).value = ''; $('input[name="maxr"]', f).value = pmax; }
        else if (kv[0] === 'stock') $('input[name="stock"]', f).checked = false;
        else { var i = $('input[name="' + kv[0] + '"][value="' + kv[1] + '"]', f); if (i) i.checked = false; }
        readForm(); apply();
      }
      var c = e.target.closest('[data-cat]');
      if (c) {
        var on = c.getAttribute('aria-pressed') === 'true';
        $$('input[name="' + c.dataset.cat + '"]', f).forEach(function (i) { i.checked = !on && i.value === c.dataset.val; });
        readForm(); apply();
      }
    });
    readForm(); st.q = $('#fq').value.trim(); apply();
  }
  var G_GAME = { key: 'game', label: 'Spiel', get: function (p) { return p.game; }, opts: K.GAMES.map(function (g) { return [g.id, g.short]; }) };
  var G_LANG = { key: 'lang', label: 'Sprache', get: function (p) { return p.lang; }, opts: K.LANGS.map(function (l) { return [l, l === 'JP' ? 'JP 日本語' : l]; }) };
  var G_RAR = { key: 'rarity', label: 'Seltenheit', get: function (p) { return p.rarity || ''; }, opts: K.RARITIES.map(function (r) { return [r.id, r.sym + ' ' + r.name]; }) };
  var G_COND = { key: 'cond', label: 'Zustand', get: function (p) { return p.cond; }, opts: K.CONDITIONS.map(function (c) { return [c.id, c.name]; }) };
  function pageShop(params) {
    filterPage({
      route: 'shop', title: 'Shop', kanji: '店', lead: 'Alles an einem Ort: versiegelte Ware, Einzelkarten, Merch und Zubehör. Filter links, Suche oben, Warenkorb rechts.',
      items: K.ALL, gridCls: 'pgrid', render: pcard, searchLabel: 'Shop durchsuchen', searchPh: 'Live-Suche: z. B. „Display JP“ oder „Momo“',
      cats: [['type', 'booster', 'Booster'], ['type', 'display', 'Displays'], ['type', 'etb', 'Elite-Trainer-Boxen'], ['type', 'single', 'Einzelkarten'], ['lang', 'JP', 'Japan-Import'], ['type', 'figure', 'Figuren'], ['type', 'manga', 'Manga'], ['type', 'plush', 'Plüsch'], ['type', 'acc', 'Zubehör']],
      groups: [G_GAME, { key: 'type', label: 'Produktart', get: function (p) { return p.type; }, opts: K.TYPES.map(function (t) { return [t.id, t.name]; }) }, G_LANG, G_RAR, G_COND]
    }, params);
  }
  function pageSingles(params) {
    filterPage({
      route: 'singles', title: 'Einzelkarten', kanji: 'カード', lead: 'Raw und gegradet, Near Mint bis Played. Fahr mit der Maus über eine Karte oder kipp dein Handy: Jede Seltenheit hat ihre eigene Holo-Folie.',
      items: K.SINGLES, gridCls: 'sgrid idle-on-touch', render: scard, searchLabel: 'Einzelkarten durchsuchen', searchPh: 'Kartenname, Set oder „PSA 10“',
      groups: [G_GAME, { key: 'set', label: 'Set', get: function (p) { return p.set; }, opts: K.SETS.map(function (s) { return [s.id, s.name]; }) }, G_RAR, { key: 'cond', label: 'Zustand', get: function (p) { return p.cond; }, opts: K.CONDITIONS.slice(2).map(function (c) { return [c.id, c.name + ' (' + c.short + ')']; }) },
        { key: 'grade', label: 'Grading', get: function (p) { return p.grade; }, opts: K.GRADES.map(function (g) { return [g, g === 'Raw' ? 'Raw (ungegradet)' : g]; }) }, G_LANG]
    }, params);
    var r = $('#results');
    r.insertAdjacentHTML('beforebegin', '<div class="tilt-tip">' + I.tilt + '<span>Am Handy: Karte antippen und ziehen, oder Neigung aktivieren.</span><button class="btn btn-s btn-c" type="button" data-gyro>Holo per Neigung</button></div>');
  }

  /* ---------- Produktdetail ---------- */
  function pageProduct(id) {
    var p = K.byId[id];
    if (!p || p.kind !== 'product') return notFound();
    var g = gameById[p.game];
    var fits = ['p20', 'p21', 'p25', 'p22', 'p23', 'p24'].filter(function (x) { return x !== p.id; }).slice(0, 4).map(function (x) { return K.byId[x]; });
    var canBuy = p.preorder || p.stock > 0;
    main.innerHTML = '<div class="wrap"><div class="pd" style="--c1:' + p.c1 + '">' +
      '<div><div class="gal-main" id="galMain">' + K.productArt(p) + '</div>' +
        '<div class="gal-thumbs" role="group" aria-label="Ansichten">' +
          '<button type="button" data-view="" aria-pressed="true" aria-label="Vorderseite">' + K.productArt(p) + '</button>' +
          '<button type="button" data-view="v3d" aria-pressed="false" aria-label="3D-Ansicht">3D</button>' +
          '<button type="button" data-view="vzoom" aria-pressed="false" aria-label="Detail">ZOOM</button>' +
          '<button type="button" data-view="photo" aria-pressed="false" aria-label="Produktfoto ' + p.img + '">' + p.img + '</button>' +
        '</div></div>' +
      '<div><nav class="crumbs" aria-label="Brotkrumen"><a href="#/">Start</a><span>›</span><a href="#/shop">Shop</a><span>›</span><a href="#/shop?type=' + p.type + '">' + typeById[p.type].name + '</a></nav>' +
        '<div class="pcard-meta"><span class="badge badge-c">' + g.name + '</span><span class="badge">' + p.lang + '</span><span class="badge">' + condById[p.cond].name + '</span>' + (p.tag ? '<span class="badge badge-p">' + p.tag + '</span>' : '') + '</div>' +
        '<h1>' + esc(p.name) + '</h1>' +
        '<p style="color:var(--ink2)">' + (p.type === 'display' ? 'Das ganze Display, original versiegelt. Für alle, die nicht Pack für Pack hoffen wollen.' : p.type === 'booster' ? 'Ein Pack, fünf Sekunden Herzklopfen. Original versiegelt, direkt vom Distributor.' : 'Aus unserem Sortiment, sorgfältig geprüft und sicher verpackt.') + '</p>' +
        '<div class="pd-price">' + priceTag(p, 'big') + stockHtml(p) + '</div>' +
        '<div class="buy-row"><div class="qty" role="group" aria-label="Menge"><button type="button" id="qm" aria-label="Menge verringern">−</button><span id="qv" aria-live="polite">1</span><button type="button" id="qp" aria-label="Menge erhöhen">+</button></div>' +
        '<button class="btn btn-p" type="button" data-add="' + p.id + '" data-qty-from="#qv"' + (canBuy ? '' : ' disabled') + '>' + (p.preorder ? 'Vorbestellen' : canBuy ? 'In den Warenkorb' : 'Ausverkauft') + '</button></div>' +
        '<div class="info-list">' +
          '<details class="acc" open><summary>' + (p.type === 'display' || p.type === 'etb' || p.type === 'box' ? 'Inhalt der Box' : 'Details') + '</summary><div class="acc-b"><ul class="checks">' + p.content.map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ul></div></details>' +
          '<details class="acc"><summary>Versand &amp; Kartenschutz</summary><div class="acc-b"><p>Versand am selben Werktag bei Bestellung bis 14 Uhr. Versichert, mit Sendungsverfolgung. Displays reisen im Umkarton mit Kantenschutz. Gratis ab ' + K.FREE_SHIP + ' €.</p></div></details>' +
          '<details class="acc"><summary>Echtheitsgarantie</summary><div class="acc-b"><p>Wir kaufen nur bei offiziellen Distributoren. Sollte je etwas nicht stimmen, bekommst du dein Geld zurück, ohne Diskussion.</p></div></details>' +
        '</div>' +
      '</div></div>' +
      '<section class="sec" style="padding-top:10px"><div class="sec-head"><div><p class="kicker">Passt dazu · 一緒に</p>' + slam('Schütz deine Pulls', 'h-m') + '</div></div><div class="pgrid">' + fits.map(pcard).join('') + '</div></section></div>';
    var q = 1, max = p.preorder ? 10 : Math.max(1, Math.min(10, p.stock));
    var upd = function () { $('#qv').textContent = q; $('#qm').disabled = q <= 1; $('#qp').disabled = q >= max; };
    $('#qm').addEventListener('click', function () { q = Math.max(1, q - 1); upd(); });
    $('#qp').addEventListener('click', function () { q = Math.min(max, q + 1); upd(); });
    upd();
    $$('[data-view]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-view]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        var gm = $('#galMain'); gm.className = 'gal-main ' + (b.dataset.view !== 'photo' ? b.dataset.view : '');
        gm.innerHTML = b.dataset.view === 'photo' ? K.ph(p.img, { sizes: '(max-width:1000px) 92vw, 46vw' }) : K.productArt(p);
      });
    });
  }

  /* ---------- Karten-Detail ---------- */
  function pageCard(id) {
    var c = K.byId[id];
    if (!c || c.kind !== 'single') return notFound();
    var condIdx = ['nm', 'ex', 'gd', 'lp', 'pl'].indexOf(c.cond);
    var more = K.SINGLES.filter(function (x) { return x.id !== c.id && (x.game === c.game || x.art === c.art); }).slice(0, 4);
    var cardHtml = K.card(c, { cls: 'big', attrs: ' id="bigCard"' });
    if (c.grade !== 'Raw') cardHtml = '<div class="slab"><div class="slab-label"><span>' + c.grade.split(' ')[0] + ' · ' + c.set + ' ' + c.no + ' · ' + esc(c.name) + '</span><b>' + c.grade.split(' ')[1] + '</b></div>' + cardHtml + '</div>';
    main.innerHTML = '<div class="wrap"><div class="pd" style="--c1:' + c.c1 + '">' +
      '<div><div class="viewer" id="viewer" style="--c1:' + c.c1 + '">' + cardHtml + '</div>' +
        '<div class="viewer-ui"><button class="btn btn-s btn-c" type="button" id="flipBtn">' + I.swap + ' Umdrehen</button><button class="btn btn-s btn-ghost" type="button" data-gyro>' + I.tilt + ' Holo per Neigung</button></div>' +
        '<p class="viewer-hint">Maus bewegen = kippen · seitlich ziehen = drehen · Pfeiltasten auf der Karte</p></div>' +
      '<div><nav class="crumbs" aria-label="Brotkrumen"><a href="#/">Start</a><span>›</span><a href="#/singles">Einzelkarten</a><span>›</span><span>' + c.set + ' ' + c.no + '</span></nav>' +
        '<div class="pcard-meta"><span class="badge badge-c">' + gameById[c.game].name + '</span><span class="badge">' + setById[c.set].name + '</span><span class="badge">' + c.lang + '</span><span class="badge ' + (c.rarity === 'gold' ? 'badge-y' : 'badge-p') + '">' + rarById[c.rarity].sym + ' ' + rarById[c.rarity].name + '</span></div>' +
        '<h1>' + esc(c.name) + '</h1>' +
        '<p style="color:var(--ink2)">Eigenes, frei erfundenes Kartenmotiv für dieses Musterdesign. Set „' + setById[c.set].name + '“, Nummer ' + c.no + '.</p>' +
        '<div class="pd-price">' + priceTag(c, 'big') + stockHtml(c) + '</div>' +
        '<div class="buy-row"><button class="btn btn-p" type="button" data-add="' + c.id + '"' + (c.stock > 0 ? '' : ' disabled') + '>' + (c.stock > 0 ? 'In den Warenkorb' : 'Ausverkauft') + '</button><a class="btn btn-ghost" href="#/ankauf">Ähnliche verkaufen?</a></div>' +
        '<div class="info-list">' +
          '<details class="acc" open><summary>Zustand: ' + condById[c.cond].name + ' (' + condById[c.cond].short + ')</summary><div class="acc-b"><div class="cond-scale">' + ['NM', 'EX', 'GD', 'LP', 'PL'].map(function (s, i) { return '<span class="' + (i === condIdx ? 'on' : '') + '">' + s + '</span>'; }).join('') + '</div><p style="margin-top:10px">' + ['Wie frisch aus dem Pack. Höchstens minimale Spuren unter Lupe.', 'Sehr gut, leichte Kantenspuren möglich.', 'Gut erhalten, sichtbare Spuren an Ecken oder Rückseite.', 'Bespielt, deutliche Spuren, aber keine Knicke.', 'Stark bespielt, ideal fürs Deck, nicht für die Vitrine.'][condIdx] + '</p></div></details>' +
          '<details class="acc"' + (c.grade !== 'Raw' ? ' open' : '') + '><summary>Grading: ' + c.grade + '</summary><div class="acc-b"><p>' + (c.grade === 'Raw' ? 'Ungegradet. Wir haben die Karte unter Licht und Lupe geprüft und ihren Zustand eingeschätzt.' : 'Von ' + c.grade.split(' ')[0] + ' bewertet und im Slab versiegelt. Die Zertifikatsnummer prüfst du nach dem Kauf direkt bei der Grading-Firma (fiktiv).') + '</p></div></details>' +
          '<details class="acc"><summary>Versand mit Kartenschutz</summary><div class="acc-b"><p>Hülle + Toploader + Schutztasche zwischen zwei Kartonplatten. Versichert, mit Sendungsverfolgung.</p></div></details>' +
        '</div></div></div>' +
      (more.length ? '<section class="sec" style="padding-top:10px"><div class="sec-head"><div><p class="kicker">Mehr davon</p>' + slam('Auch funkelnd', 'h-m') + '</div></div><div class="sgrid">' + more.map(scard).join('') + '</div></section>' : '') + '</div>';
    if (K.fx) K.fx.viewer($('#bigCard'), $('#viewer'), $('#flipBtn'));
  }

  /* ---------- Vorbestellungen & Kalender ---------- */
  var calOffset = 0;
  function pageReleases() {
    var reminds = store.get('kira-remind', []);
    main.innerHTML = phead('Vorbestellen', '予約', 'Release-Kalender mit Countdown für jedes Set. Vorbestellen sichert dir deine Menge zum Release-Tag, und „Erinnere mich“ stupst dich rechtzeitig an.') +
      '<div class="wrap cal-wrap"><div class="cal"><div class="cal-head"><button class="ibtn" type="button" data-cal="-1" aria-label="Vorheriger Monat">' + I.left + '</button><h2 id="calT" aria-live="polite"></h2><button class="ibtn" type="button" data-cal="1" aria-label="Nächster Monat">' + I.right + '</button></div><div class="cal-grid" id="calGrid"></div>' +
      '<div class="pcard-meta" style="margin-top:12px;gap:10px">' + K.GAMES.slice(0, 5).map(function (g) { return '<span style="display:flex;align-items:center;gap:5px"><i class="cal-ev g-' + g.id + '" style="width:14px;height:10px;padding:0;font-size:0"></i>' + g.short + '</span>'; }).join('') + '</div></div>' +
      '<div><h2 class="h-m" style="margin-bottom:14px">Nächste Releases</h2><div class="rel-list">' + K.RELEASES.map(function (r) {
        var p = r.product ? K.byId[r.product] : null; var on = reminds.indexOf(r.id) > -1;
        return '<article class="rel" id="rel-' + r.id + '"><div class="rel-date"><b>' + r.date.getDate() + '</b><span>' + MONTHS[r.date.getMonth()].slice(0, 3).toUpperCase() + '</span></div><div><span class="pcard-meta"><span>' + gameById[r.game].name + '</span><span class="badge">' + r.lang + '</span></span><h3>„' + r.set + '“</h3><p class="rel-cd" data-cd="' + r.date.getTime() + '"></p><p style="margin:0 0 8px;color:var(--ink2);font-size:14px">' + r.note + '</p><div class="rel-actions">' +
          (p ? '<button class="btn btn-s btn-p" type="button" data-add="' + p.id + '">Vorbestellen · ' + eur(p.price) + '</button>' : '<span class="badge badge-out">Vorbestellung bald</span>') +
          '<button class="btn btn-s ' + (on ? 'btn-c' : 'btn-ghost') + '" type="button" data-remind="' + r.id + '" aria-pressed="' + on + '">' + I.bell + (on ? ' Erinnerung aktiv' : ' Erinnere mich') + '</button></div></div></article>';
      }).join('') + '</div></div></div>';
    calOffset = 0; drawCal();
    $$('[data-cal]').forEach(function (b) { b.addEventListener('click', function () { calOffset += +b.dataset.cal; drawCal(); }); });
    var tick = function () { $$('[data-cd]').forEach(function (el) { var ms = Math.max(0, +el.dataset.cd - Date.now()), s = Math.floor(ms / 1000); el.textContent = 'Noch ' + Math.floor(s / 86400) + ' T · ' + String(Math.floor(s / 3600) % 24).padStart(2, '0') + ':' + String(Math.floor(s / 60) % 60).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }); };
    tick(); countdownTimer = setInterval(tick, 1000);
  }
  function drawCal() {
    var base = new Date(); base.setDate(1); base.setMonth(base.getMonth() + calOffset);
    var y = base.getFullYear(), m = base.getMonth();
    $('#calT').textContent = MONTHS[m] + ' ' + y;
    var first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate(), today = new Date();
    var h = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(function (d) { return '<div class="cal-dow">' + d + '</div>'; }).join('');
    for (var i = 0; i < first; i++) h += '<div class="cal-day out" aria-hidden="true"></div>';
    for (var d = 1; d <= days; d++) {
      var evs = K.RELEASES.filter(function (r) { return r.date.getFullYear() === y && r.date.getMonth() === m && r.date.getDate() === d; });
      var isT = today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
      h += '<div class="cal-day' + (evs.length ? ' has' : '') + (isT ? ' today' : '') + '"><span>' + d + (isT ? ' · heute' : '') + '</span>' + evs.map(function (r) { return '<button class="cal-ev g-' + r.game + '" type="button" data-jump="' + r.id + '" aria-label="' + gameById[r.game].name + ' ' + r.set + ' am ' + d + '. ' + MONTHS[m] + '">' + r.set + '</button>'; }).join('') + '</div>';
    }
    $('#calGrid').innerHTML = h;
  }
  document.addEventListener('click', function (e) {
    var j = e.target.closest('[data-jump]');
    if (j) { var el = $('#rel-' + j.dataset.jump); if (el) { if (K.fx && K.fx.lenis) K.fx.lenis.scrollTo(el, { offset: -90 }); else el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } }
    var r = e.target.closest('[data-remind]');
    if (r) {
      var list = store.get('kira-remind', []), id = r.dataset.remind, i = list.indexOf(id);
      if (i > -1) list.splice(i, 1); else list.push(id);
      store.set('kira-remind', list);
      var on = i < 0;
      $$('[data-remind="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', on); b.classList.toggle('btn-c', on); b.classList.toggle('btn-ghost', !on); b.innerHTML = I.bell + (on ? ' Erinnerung aktiv' : ' Erinnere mich'); });
      var rel = relById[id];
      if (on) say('Notiert! Ich stups dich vor „' + rel.set + '“ an. 🔔 (Demo)', 'wink'); else toast('Erinnerung entfernt.');
    }
  });

  /* ---------- Formular-Hilfen ---------- */
  function validate(form) {
    var ok = true;
    $$('[required]', form).forEach(function (el) {
      var bad = el.type === 'checkbox' ? !el.checked : el.type === 'email' ? !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value) : !el.value.trim();
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      var err = el.closest('label') && $('.err', el.closest('label'));
      if (err) err.textContent = bad ? (el.type === 'email' ? 'Bitte eine gültige E-Mail-Adresse eingeben.' : el.type === 'checkbox' ? 'Bitte bestätigen.' : 'Bitte ausfüllen.') : '';
      if (bad && ok) { el.focus(); ok = false; }
    });
    return ok;
  }

  /* ---------- Ankauf ---------- */
  function pageBuy() {
    main.innerHTML = phead('Wir kaufen deine Sammlung', '買取', 'Vom einzelnen Binder bis zur ganzen Kiste: Wir machen dir ein faires Angebot, transparent und ohne Druck.') +
      '<section class="sec"><div class="wrap"><ol class="steps">' +
        '<li class="step"><b>Fotos &amp; Liste schicken</b><p>Lade ein paar Fotos hoch und beschreib grob, was du hast. Bei Einzelkarten über 20 € bitte Vorder- und Rückseite.</p></li>' +
        '<li class="step"><b>Angebot in 48 Stunden</b><p>Wir schätzen anhand aktueller Marktpreise und schicken dir ein verbindliches Angebot, auf Wunsch als Bar- oder Store-Guthaben (+10 %).</p></li>' +
        '<li class="step"><b>Bezahlt werden</b><p>Versicherter Versand auf unsere Kosten oder vorbeibringen im Laden. Nach der Prüfung zahlen wir innerhalb von 2 Werktagen aus.</p></li>' +
      '</ol></div></section>' +
      '<section class="sec sec-alt"><div class="wrap about"><div id="buyWrap"><h2 class="h-m" style="margin-bottom:16px">Ankauf-Anfrage</h2><form class="form" id="buyForm" novalidate>' +
        '<label>Name<input class="fld" name="name" required autocomplete="name"><span class="err"></span></label>' +
        '<label>E-Mail<input class="fld" name="email" type="email" required autocomplete="email"><span class="err"></span></label>' +
        '<label>Spiel(e)<select class="fld" name="game"><option>Gemischt</option>' + K.GAMES.slice(0, 5).map(function (g) { return '<option>' + g.name + '</option>'; }).join('') + '</select></label>' +
        '<label>Umfang<select class="fld" name="size"><option>Bis 100 Karten</option><option>100–1.000 Karten</option><option>Über 1.000 Karten</option><option>Versiegelte Ware</option><option>Gegradete Karten</option></select></label>' +
        '<label class="full">Beschreibung <small>Highlights, Zustand, Sprache</small><textarea class="fld" name="msg" required placeholder="z. B. 2 Binder Japan-Karten von 2019–2023, viele Holos, alles in Hüllen …"></textarea><span class="err"></span></label>' +
        '<div class="full"><div class="drop" id="drop">' + I.upload + '<b>Fotos hierher ziehen oder antippen</b><br><small style="color:var(--ink2)">JPG/PNG/HEIC, bis 10 Fotos (Demo: bleibt auf deinem Gerät)</small><input type="file" id="files" accept="image/*" multiple aria-label="Fotos auswählen"></div><div class="thumbs" id="thumbs"></div></div>' +
        '<label class="consent full"><input type="checkbox" required> <span>Ich bin einverstanden, dass KIRA KIRA meine Angaben zur Bearbeitung der Anfrage nutzt. (Musterdesign, es wird nichts gesendet.)</span><span class="err"></span></label>' +
        '<div class="full"><button class="btn btn-p" type="submit">Angebot anfragen</button></div>' +
      '</form></div>' +
      '<div><div class="note"><b>So bewerten wir:</b> Grundlage sind die aktuellen Verkaufspreise, nicht Wunschpreise. Für Einzelkarten zahlen wir je nach Zustand 50–70 % des Marktwerts, für versiegelte Ware bis 80 %. Gegradete Karten bewerten wir einzeln.</div>' +
      '<div style="margin-top:18px">' + K.ph('A01') + '</div></div></div></section>';
    var files = [];
    var drop = $('#drop'), inp = $('#files');
    function show() { $('#thumbs').innerHTML = files.map(function (f, i) { return '<figure><img src="' + f.url + '" alt="Vorschau ' + esc(f.name) + '"><button type="button" data-rmf="' + i + '" aria-label="Foto ' + esc(f.name) + ' entfernen">×</button></figure>'; }).join(''); }
    function addFiles(list) { Array.prototype.slice.call(list).filter(function (f) { return /^image\//.test(f.type); }).slice(0, 10 - files.length).forEach(function (f) { files.push({ name: f.name, url: URL.createObjectURL(f) }); }); show(); if (files.length) say(files.length + (files.length === 1 ? ' Foto' : ' Fotos') + ' dabei. Sieht vielversprechend aus! 👀', 'wink'); }
    inp.addEventListener('change', function () { addFiles(inp.files); inp.value = ''; });
    ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
    drop.addEventListener('drop', function (e) { addFiles(e.dataTransfer.files); });
    $('#thumbs').addEventListener('click', function (e) { var b = e.target.closest('[data-rmf]'); if (b) { files.splice(+b.dataset.rmf, 1); show(); } });
    $('#buyForm').addEventListener('submit', function (e) {
      e.preventDefault(); if (!validate(e.target)) return;
      $('#buyWrap').innerHTML = '<div class="form-ok" tabindex="-1" id="ok">' + K.momo('cheer') + '<h2 class="h-m">Danke! Anfrage ist da.</h2><p style="color:var(--ink2);margin-top:8px">Wir melden uns innerhalb von 48 Stunden mit einem Angebot. (Musterdesign: Es wurde nichts gesendet.)</p><a class="btn" href="#/shop">Weiter stöbern</a></div>';
      $('#ok').focus(); say('Juhu! Ich freu mich schon auf deine Karten. ★', 'cheer');
    });
  }

  /* ---------- Events ---------- */
  function pageEvents() {
    var taken = store.get('kira-ev', {});
    var filter = 'all';
    main.innerHTML = phead('Events im Laden', '大会', 'Trade-Nights, Turniere und Prereleases bei uns in Ludwigshafen. Plätze sind begrenzt, also schnell anmelden.') +
      '<section class="sec" style="padding-top:36px"><div class="wrap"><div class="faq-tabs" role="group" aria-label="Nach Spiel filtern"><button class="chip" type="button" data-evf="all" aria-pressed="true">Alle</button>' + K.GAMES.slice(0, 5).map(function (g) { return '<button class="chip" type="button" data-evf="' + g.id + '" aria-pressed="false">' + g.short + '</button>'; }).join('') + '</div><div class="evs" id="evs"></div></div></section>';
    function draw() {
      var list = K.EVENTS.filter(function (e) { return filter === 'all' || e.game === filter || e.game === 'all'; });
      $('#evs').innerHTML = list.length ? list.map(function (e) {
        var t = e.taken + (taken[e.id] || 0), free = Math.max(0, e.spots - t), full = free <= 0;
        return '<article class="ev"><div class="ev-date"><span>' + DOW[e.date.getDay()].toUpperCase() + '</span><b>' + e.date.getDate() + '</b><span>' + MONTHS[e.date.getMonth()].slice(0, 3).toUpperCase() + '</span></div>' +
          '<div><div class="ev-meta"><span class="badge badge-c">' + (e.game === 'all' ? 'Alle Spiele' : gameById[e.game].short) + '</span><span class="badge">' + String(e.h).padStart(2, '0') + ':' + String(e.m).padStart(2, '0') + '–' + e.end + '</span><span class="badge badge-y">' + (e.fee ? eur(e.fee) : 'Eintritt frei') + '</span></div>' +
          '<h3 style="margin-top:8px">' + esc(e.title) + '</h3><p>' + e.text + '</p><div class="spots"><div class="spots-bar"><i style="width:' + Math.min(100, t / e.spots * 100) + '%"></i></div><small>' + (full ? 'Ausgebucht · Warteliste möglich' : 'Noch ' + free + ' von ' + e.spots + ' Plätzen frei') + '</small></div></div>' +
          '<div class="ev-side"><button class="btn ' + (full ? 'btn-ghost' : 'btn-p') + '" type="button" data-ev="' + e.id + '">' + (taken[e.id] ? 'Angemeldet ✓' : full ? 'Auf Warteliste' : 'Anmelden') + '</button></div></article>';
      }).join('') : '<div class="empty">' + K.momo('sleepy') + '<b>Gerade keine Events</b><p>Für dieses Spiel steht nichts an. Schau bald wieder rein!</p></div>';
    }
    draw();
    main.querySelector('.faq-tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-evf]'); if (!b) return; filter = b.dataset.evf; $$('[data-evf]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); draw(); });
    $('#evs').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-ev]'); if (!b) return;
      var e = K.EVENTS.filter(function (x) { return x.id === b.dataset.ev; })[0];
      if (taken[e.id]) { toast('Du bist schon angemeldet. Bis ' + DOW[e.date.getDay()] + '!'); return; }
      modal('<h2 id="mT">' + esc(e.title) + '</h2><p style="color:var(--ink2)">' + fmtDate(e.date) + ' · ' + String(e.h).padStart(2, '0') + ':' + String(e.m).padStart(2, '0') + ' Uhr · ' + (e.fee ? eur(e.fee) + ' vor Ort' : 'Eintritt frei') + '</p>' +
        '<form class="form" id="evForm" novalidate style="margin-top:14px"><label class="full">Name<input class="fld" required autocomplete="name"><span class="err"></span></label><label class="full">E-Mail<input class="fld" type="email" required autocomplete="email"><span class="err"></span></label><label class="full">Spieler-ID <small>optional</small><input class="fld" autocomplete="off" placeholder="z. B. 0000-1234"></label><div class="full"><button class="btn btn-p" type="submit">Verbindlich anmelden (Demo)</button></div></form>', function (m, close) {
        $('#evForm', m).addEventListener('submit', function (s) {
          s.preventDefault(); if (!validate(s.target)) return;
          taken[e.id] = 1; store.set('kira-ev', taken); close(); draw(); say('Du bist dabei! Ich halt dir einen Platz frei. ★', 'cheer'); toast('Anmeldung für „' + esc(e.title) + '“ gespeichert (Demo).');
        });
      });
    });
  }

  /* ---------- Über uns & Laden ---------- */
  var HOURS = [['Montag', null], ['Dienstag', [12, 20]], ['Mittwoch', [12, 20]], ['Donnerstag', [12, 20]], ['Freitag', [12, 22]], ['Samstag', [10, 18]], ['Sonntag', null]];
  function pageStore() {
    var now = new Date(), di = (now.getDay() + 6) % 7, h = HOURS[di][1], hr = now.getHours() + now.getMinutes() / 60, open = h && hr >= h[0] && hr < h[1];
    main.innerHTML = phead('Unser Laden', '店舗', 'Online-Shop und kleiner Laden in Ludwigshafen am Rhein: zum Abholen, Tauschen, Zocken und Quatschen.') +
      '<section class="sec"><div class="wrap about"><div class="manga-panels">' + K.ph('L01') + K.ph('L02') + K.ph('L03') + '</div>' +
        '<div><p class="kicker">Story · 物語</p>' + slam('Vom Tauschtisch zum Laden', 'h-m') +
        '<p class="lead" style="margin-top:16px">Angefangen hat KIRA KIRA mit einem Klapptisch auf Tauschbörsen und einer Kiste voller Japan-Booster. Heute haben wir einen Laden mit Neonschild, Turniertischen und einem Gacha-Automaten, in dem angeblich Momo wohnt.</p>' +
        '<p style="color:var(--ink2)">Unser Versprechen ist geblieben: faire Preise, echte Ware und ein Ort, an dem man sich nicht erklären muss, warum man sich über eine Karte so freut.</p>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><span class="stk stk-y" style="transform:rotate(-4deg)">seit 2019*</span><span class="stk stk-c" style="transform:rotate(3deg)">3.000+ Pulls</span><span class="stk stk-p" style="transform:rotate(-2deg)">Trade-Night jeden Fr</span></div><p style="color:var(--ink3);font-size:12.5px;margin-top:10px">* alle Angaben erfunden</p></div></div></section>' +
      '<section class="sec sec-alt"><div class="wrap about" style="align-items:start"><div><h2 class="h-m" style="margin-bottom:14px">Öffnungszeiten</h2><p class="open-now ' + (open ? 'on' : 'off') + '">' + (open ? 'Jetzt geöffnet bis ' + h[1] + ':00' : 'Gerade geschlossen') + '</p><div class="hours">' + HOURS.map(function (x, i) { return '<div class="' + (i === di ? 'today' : '') + '"><span>' + x[0] + '</span><span>' + (x[1] ? x[1][0] + ':00–' + x[1][1] + ':00' : 'geschlossen') + '</span></div>'; }).join('') + '</div>' +
        '<div class="cinfo" style="margin-top:18px"><div>' + I.pin + '<span>[Straße und Hausnummer]<br>[PLZ] Ludwigshafen am Rhein</span></div><div>' + I.phone + '<span>[Telefonnummer]</span></div></div></div>' +
        '<div><h2 class="h-m" style="margin-bottom:14px">Anfahrt</h2><div class="map" role="img" aria-label="Stilisierte Karte: Laden in Ludwigshafen nahe Rhein und Hauptbahnhof">' + mapSvg() + '</div><p style="color:var(--ink2);margin-top:12px;font-size:14.5px">Stilisierte Karte. 5 Minuten zu Fuß von der Haltestelle, Parkhaus um die Ecke. Für die Route: <a href="https://www.google.com/maps/search/Ludwigshafen+am+Rhein" target="_blank" rel="noopener" style="color:var(--link)">in Google Maps öffnen</a>.</p></div></div></section>' + trustBar();
  }
  function mapSvg() {
    return '<svg viewBox="0 0 600 420" aria-hidden="true"><rect class="land" width="600" height="420"/>' +
      '<path class="water" d="M430 0 C470 80 520 120 540 200 C560 290 520 360 560 420 L600 420 L600 0Z"/>' +
      '<text class="lbl" x="520" y="120" transform="rotate(70 520 120)">RHEIN · ライン川</text>' +
      '<g fill="none" stroke-linecap="round"><path class="road" stroke-width="14" d="M0 140 H460"/><path class="road" stroke-width="14" d="M0 300 C160 290 320 300 520 260"/><path class="road" stroke-width="10" d="M120 0 V420"/><path class="road" stroke-width="10" d="M300 0 C290 150 310 280 300 420"/><path class="road-b" stroke-width="18" d="M0 60 C200 70 380 40 470 10"/><path class="road" stroke-width="8" d="M120 220 H300"/></g>' +
      '<g><rect x="44" y="160" width="60" height="44" rx="8" fill="#00E5FF" stroke="#140A2E" stroke-width="3"/><text x="74" y="188" text-anchor="middle" font-family="DotGothic16" font-size="14" fill="#140A2E">Hbf</text></g>' +
      '<g><circle cx="300" cy="140" r="9" fill="#E6FF00" stroke="#140A2E" stroke-width="3"/><text class="lbl" x="314" y="130">Haltestelle</text></g>' +
      '<g><rect x="150" y="320" width="70" height="40" rx="8" fill="#9D4DFF" stroke="#140A2E" stroke-width="3"/><text x="185" y="345" text-anchor="middle" font-family="DotGothic16" font-size="14" fill="#fff">P</text></g>' +
      '<circle class="pin-pulse" cx="214" cy="232" r="24" fill="#FF2E93" opacity=".5"/>' +
      '<g transform="translate(184 160)"><path d="M30 72 C30 72 0 44 0 26 A30 30 0 0 1 60 26 C60 44 30 72 30 72Z" fill="#FF2E93" stroke="#140A2E" stroke-width="4"/><circle cx="30" cy="26" r="14" fill="#fff" stroke="#140A2E" stroke-width="3"/><polygon points="' + K.starPts(30, 26, 9, 4) + '" fill="#E6FF00" stroke="#140A2E" stroke-width="2"/></g>' +
      '<g><rect x="232" y="176" width="124" height="34" rx="10" fill="#fff" stroke="#140A2E" stroke-width="3"/><text x="294" y="199" text-anchor="middle" font-family="Dela Gothic One" font-size="16" fill="#140A2E">KIRA KIRA</text></g></svg>';
  }

  /* ---------- Kontakt & FAQ ---------- */
  function pageContact() {
    var cats = ['Alle'].concat(K.FAQ.map(function (f) { return f.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    main.innerHTML = phead('Kontakt &amp; FAQ', '連絡', 'Frag uns alles über Versand, Kartenschutz, Echtheit, Rückgabe und Vorbestellungen. Oder schreib uns direkt.') +
      '<section class="sec"><div class="wrap contact"><div><h2 class="h-m" style="margin-bottom:14px">Schreib uns</h2><div class="cinfo"><div>' + I.mail + '<span>[E-Mail-Adresse]</span></div><div>' + I.phone + '<span>[Telefonnummer] · Di–Sa im Laden</span></div><div>' + I.pin + '<span>[Adresse], Ludwigshafen am Rhein</span></div></div>' +
        '<div id="cWrap" style="margin-top:20px"><form class="form" id="cForm" novalidate><label>Name<input class="fld" required autocomplete="name"><span class="err"></span></label><label>E-Mail<input class="fld" type="email" required autocomplete="email"><span class="err"></span></label>' +
        '<label class="full">Thema<select class="fld"><option>Frage zur Bestellung</option><option>Versand &amp; Kartenschutz</option><option>Echtheit</option><option>Rückgabe</option><option>Vorbestellung</option><option>Etwas anderes</option></select></label>' +
        '<label class="full">Nachricht<textarea class="fld" required></textarea><span class="err"></span></label><label class="consent full"><input type="checkbox" required> <span>Ich bin mit der Verarbeitung meiner Angaben einverstanden. (Musterdesign, nichts wird gesendet.)</span><span class="err"></span></label><div class="full"><button class="btn btn-p" type="submit">Nachricht senden</button></div></form></div></div>' +
        '<div><h2 class="h-m" style="margin-bottom:14px">Häufige Fragen</h2><div class="faq-tabs" role="group" aria-label="FAQ-Themen">' + cats.map(function (c, i) { return '<button class="chip" type="button" data-faq="' + c + '" aria-pressed="' + (i === 0) + '">' + c + '</button>'; }).join('') + '</div><div class="faq" id="faq"></div></div></div></section>';
    function draw(c) { $('#faq').innerHTML = K.FAQ.filter(function (f) { return c === 'Alle' || f.cat === c; }).map(function (f, i) { return '<details class="acc"' + (i === 0 ? ' open' : '') + '><summary>' + f.q + '</summary><div class="acc-b"><p><span class="badge" style="margin-right:6px">' + f.cat + '</span>' + f.a + '</p></div></details>'; }).join(''); }
    draw('Alle');
    main.querySelector('.faq-tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-faq]'); if (!b) return; $$('[data-faq]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); draw(b.dataset.faq); });
    $('#cForm').addEventListener('submit', function (e) { e.preventDefault(); if (!validate(e.target)) return; $('#cWrap').innerHTML = '<div class="form-ok" tabindex="-1" id="ok">' + K.momo('cheer') + '<h2 class="h-m">Nachricht ist raus!</h2><p style="color:var(--ink2);margin-top:8px">Wir antworten meist am selben Tag. (Musterdesign: Es wurde nichts gesendet.)</p></div>'; $('#ok').focus(); say('Abgeschickt! Wir melden uns ganz schnell. ✉️', 'cheer'); });
  }

  function notFound() {
    main.innerHTML = '<section class="sec"><div class="wrap empty" style="max-width:640px">' + K.momo('shock') + '<b>404 · Seite verschwunden</b><p>Diese Seite hat sich in eine Gacha-Kapsel verkrochen.</p><a class="btn" href="#/">Zur Startseite</a></div></section>';
  }

  /* ---------- Footer ---------- */
  $('#ftr').innerHTML = '<span class="big-kanji" aria-hidden="true">キラキラ</span><div class="wrap"><div class="ftr-grid">' +
    '<div><div class="logo" style="margin-bottom:12px">' + K.momo('wink') .replace('class="momo-svg"', 'class="momo-svg" style="width:46px;height:46px"') + '<span class="logo-t" style="color:#fff">KIRA KIRA</span></div><p style="color:#CFC3F5;max-width:40ch">Anime &amp; Trading Cards aus Ludwigshafen am Rhein. Online-Shop und kleiner Laden mit Trade-Nights und Turnieren.</p>' +
    '<form class="newsl" id="newsl" novalidate><label class="sr" for="nl">E-Mail für den Newsletter</label><input class="fld" id="nl" type="email" placeholder="E-Mail für Release-News" autocomplete="email"><button class="btn btn-s" type="submit">Abonnieren</button></form></div>' +
    '<div><h4>Shop</h4><ul><li><a href="#/shop">Alle Produkte</a></li><li><a href="#/singles">Einzelkarten</a></li><li><a href="#/vorbestellungen">Vorbestellungen</a></li><li><a href="#/shop?lang=JP">Japan-Import</a></li></ul></div>' +
    '<div><h4>KIRA KIRA</h4><ul><li><a href="#/ankauf">Ankauf</a></li><li><a href="#/events">Events</a></li><li><a href="#/laden">Laden &amp; Anfahrt</a></li><li><a href="#/kontakt">Kontakt &amp; FAQ</a></li></ul></div>' +
    '<div><h4>Service</h4><ul><li><a href="#/kontakt">Versand &amp; Kartenschutz</a></li><li><a href="#/kontakt">Echtheitsgarantie</a></li><li><a href="#/kontakt">Rückgabe</a></li><li><span style="color:#CFC3F5;font-size:14px">Impressum · Datenschutz [Platzhalter]</span></li></ul><div class="pay" style="margin-top:12px"><span>PAYPAL</span><span>VISA</span><span>KLARNA</span><span>VORKASSE</span></div></div>' +
    '</div><div class="ftr-bottom"><span>© 2026 KIRA KIRA · Fiktiver Shop · Musterdesign von <a href="https://www.pfalz-multiservice.de" target="_blank" rel="noopener">Pfalz Multiservice</a></span><span class="pix">MADE WITH ★ IN DER PFALZ</span></div></div>';
  $('#newsl').addEventListener('submit', function (e) { e.preventDefault(); var v = $('#nl').value; if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { $('#nl').setAttribute('aria-invalid', 'true'); toast('Bitte eine gültige E-Mail-Adresse eingeben.'); $('#nl').focus(); return; } $('#nl').value = ''; $('#nl').removeAttribute('aria-invalid'); say('Angemeldet! Release-News kommen zu dir. 📮 (Demo)', 'cheer'); });

  /* ---------- Router ---------- */
  var cur = { path: null };
  function parse() {
    var h = location.hash.replace(/^#\/?/, ''); var qi = h.indexOf('?');
    var path = qi > -1 ? h.slice(0, qi) : h, qs = qi > -1 ? h.slice(qi + 1) : '';
    var params = {}; qs.split('&').forEach(function (kv) { if (!kv) return; var p = kv.split('='); params[p[0]] = decodeURIComponent(p[1] || ''); });
    var parts = path.split('/');
    return { path: parts[0], id: parts[1], params: params, full: path };
  }
  function render(r) {
    clearInterval(countdownTimer);
    if (K.fx) K.fx.beforePage();
    closeSheet();
    var p = r.path;
    if (p === '' ) pageHome();
    else if (p === 'shop') pageShop(r.params);
    else if (p === 'singles') pageSingles(r.params);
    else if (p === 'karte') pageCard(r.id);
    else if (p === 'produkt') pageProduct(r.id);
    else if (p === 'vorbestellungen') pageReleases();
    else if (p === 'ankauf') pageBuy();
    else if (p === 'events') pageEvents();
    else if (p === 'laden') pageStore();
    else if (p === 'kontakt') pageContact();
    else notFound();
    var navKey = p === 'karte' ? 'singles' : p === 'produkt' ? 'shop' : p;
    $$('#nav a, #mnav a').forEach(function (a) { if (a.dataset.r === navKey) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var titles = { '': 'Anime & Trading Cards', shop: 'Shop', singles: 'Einzelkarten', karte: (K.byId[r.id] || {}).name, produkt: (K.byId[r.id] || {}).name, vorbestellungen: 'Vorbestellungen', ankauf: 'Ankauf', events: 'Events', laden: 'Laden', kontakt: 'Kontakt & FAQ' };
    document.title = (titles[p] || 'Seite nicht gefunden') + ' · KIRA KIRA (Musterdesign)';
    if (K.fx) K.fx.onPage(main, p);
    routeTip(p === 'karte' ? 'karte' : p === 'produkt' ? 'produkt' : p);
  }
  var first = true;
  function go() {
    var r = parse(); // Filter schreiben per replaceState – das löst kein hashchange aus, jede Änderung hier ist echte Navigation
    var wasFirst = first; first = false;
    closeMenu(); closeSearch();
    var doIt = function () {
      cur = r; render(r);
      if (K.fx && K.fx.lenis) K.fx.lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
      if (!wasFirst) main.focus({ preventScroll: true });
    };
    if (wasFirst || RM || !K.fx) doIt(); else K.fx.wipe(doIt);
  }
  window.addEventListener('hashchange', go);
  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-gyro]'); if (g && K.fx) K.fx.enableGyro(g);
  });

  renderCart();
  if (K.fx) K.fx.init();
  go();
})(window.KIRA);
