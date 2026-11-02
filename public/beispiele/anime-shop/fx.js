/* KIRA KIRA · Effekte: Intro, Holo-Karten, Booster-Opening, Gacha (Three.js Toon-Shading), Partikel,
   Manga-Seitenwechsel, Kapsel-Flug in den Warenkorb, Lenis + GSAP ScrollTrigger.
   Reduzierte Bewegung oder kein WebGL → ruhige, statische Varianten. Kein Flackern schneller als 3×/s. */
(function (K) {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var RM = document.documentElement.classList.contains('reduce-motion');
  var G = window.gsap, ST = window.ScrollTrigger;
  var fx = K.fx = {};
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var cleanups = [];
  var hasWebGL = (function () { try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { return false; } })();

  /* ---------- Init: Lenis, Intro, Holo-Steuerung ---------- */
  fx.init = function () {
    if (G && ST) G.registerPlugin(ST);
    if (!RM && window.Lenis && G) {
      fx.lenis = new window.Lenis({ lerp: 0.13, smoothWheel: true });
      fx.lenis.on('scroll', function () { if (ST) ST.update(); });
      G.ticker.add(function (t) { fx.lenis.raf(t * 1000); });
      G.ticker.lagSmoothing(0);
    }
    ['#cartList', '#searchRes', '#mmenu', '#modalRoot'].forEach(function (s) { var e = $(s); if (e) e.setAttribute('data-lenis-prevent', ''); });
    intro();
    bindHolo();
    autoGyro();
  };

  /* ---------- Intro (max. 2 s, überspringbar, 1× pro Sitzung) ---------- */
  function intro() {
    var seen = false; try { seen = sessionStorage.getItem('kira-intro') === '1'; } catch (e) {}
    if (RM || seen || !G) return;
    try { sessionStorage.setItem('kira-intro', '1'); } catch (e) {}
    var el = $('#intro'); el.hidden = false; el.removeAttribute('aria-hidden');
    var letters = $$('.intro-logo span', el);
    var tl = G.timeline({ onComplete: end });
    // Röhren zünden nacheinander: weiches Aufleuchten statt Stroboskop
    letters.forEach(function (s, i) { tl.call(function () { s.classList.add('on'); }, null, 0.12 + i * 0.07); tl.fromTo(s, { opacity: .08 }, { opacity: 1, duration: .16, ease: 'power1.out' }, 0.12 + i * 0.07); });
    tl.fromTo($('.momo-svg', el), { y: -140, opacity: 0, scaleY: 1.2 }, { y: 0, opacity: 1, scaleY: 1, duration: .45, ease: 'bounce.out' }, .7);
    tl.to($('.intro-k', el), { opacity: 1, duration: .25 }, 1.0);
    tl.to(el, { clipPath: 'inset(0 0 100% 0)', duration: .38, ease: 'power3.in' }, 1.62);
    function end() { tl.kill(); el.hidden = true; el.setAttribute('aria-hidden', 'true'); el.style.clipPath = ''; document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') end(); }
    $('#introSkip').addEventListener('click', end);
    el.addEventListener('click', end);
    document.addEventListener('keydown', onKey);
  }

  /* ---------- Holo-Karten: Maus, Touch, Neigung ---------- */
  function setCard(el, x, y, on) {
    var s = el.style;
    s.setProperty('--rx', ((0.5 - y) * 24).toFixed(2) + 'deg');
    s.setProperty('--ry', ((x - 0.5) * 30).toFixed(2) + 'deg');
    s.setProperty('--mx', (x * 100).toFixed(1) + '%');
    s.setProperty('--my', (y * 100).toFixed(1) + '%');
    s.setProperty('--px', (x * 100).toFixed(1) + '%');
    s.setProperty('--py', (y * 100).toFixed(1) + '%');
    s.setProperty('--o', on == null ? 1 : on);
  }
  function resetCard(el) { ['--rx', '--ry', '--mx', '--my', '--px', '--py', '--o'].forEach(function (p) { el.style.removeProperty(p); }); el.classList.remove('is-on'); }
  fx.setCard = setCard;
  var activeTcg = null, activeTilt = null, raf = 0, last = null;
  function bindHolo() {
    document.addEventListener('pointermove', function (e) {
      last = e; if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0; var ev = last;
        var t = ev.target.closest && ev.target.closest('.tcg');
        if (activeTcg && activeTcg !== t) { resetCard(activeTcg); activeTcg = null; }
        if (t && !t.closest('.bcard.locked') && !(fx.viewerDrag && t.id === 'bigCard')) {
          var r = t.getBoundingClientRect();
          var x = clamp((ev.clientX - r.left) / r.width, 0, 1), y = clamp((ev.clientY - r.top) / r.height, 0, 1);
          if (RM) { t.style.setProperty('--mx', (x * 100) + '%'); t.style.setProperty('--my', (y * 100) + '%'); t.style.setProperty('--px', (x * 100) + '%'); t.style.setProperty('--py', (y * 100) + '%'); t.style.setProperty('--o', .7); }
          else { t.classList.add('is-on'); setCard(t, x, y); }
          activeTcg = t;
        }
        // leichtes Kippen der Produktkarten
        var p = ev.target.closest && ev.target.closest('[data-tilt]');
        if (activeTilt && activeTilt !== p) { activeTilt.style.removeProperty('--rx'); activeTilt.style.removeProperty('--ry'); activeTilt = null; }
        if (p && !RM && ev.pointerType === 'mouse') {
          var pr = p.getBoundingClientRect(), px = (ev.clientX - pr.left) / pr.width - .5, py = (ev.clientY - pr.top) / pr.height - .5;
          p.style.setProperty('--rx', (-py * 7).toFixed(2) + 'deg'); p.style.setProperty('--ry', (px * 8).toFixed(2) + 'deg'); activeTilt = p;
        }
      });
    }, { passive: true });
    var off = function () { if (activeTcg) { resetCard(activeTcg); activeTcg = null; } if (activeTilt) { activeTilt.style.removeProperty('--rx'); activeTilt.style.removeProperty('--ry'); activeTilt = null; } };
    document.addEventListener('pointerleave', off);
    document.addEventListener('pointercancel', off);
    document.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') setTimeout(off, 600); });
    // Tastatur: fokussierte Karte schimmert
    document.addEventListener('focusin', function (e) { var t = e.target.querySelector && e.target.querySelector('.tcg'); if (t && !RM) { setCard(t, .7, .3, .8); setTimeout(function () { resetCard(t); }, 900); } });
  }
  /* Neigung (Gyroskop) */
  var gyroOn = false, gyroSeen = false;
  function onOrient(e) {
    if (e.gamma == null) return; gyroSeen = true;
    var x = clamp(.5 + e.gamma / 50, 0, 1), y = clamp(.5 + ((e.beta || 45) - 45) / 50, 0, 1);
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0; var vh = window.innerHeight;
      $$('.tcg').forEach(function (t) {
        if (t === activeTcg) return; var r = t.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh || r.width === 0) return;
        t.classList.add('is-on'); setCard(t, x, y, .85);
      });
    });
  }
  function startGyro(btn) {
    if (gyroOn) return; gyroOn = true;
    window.addEventListener('deviceorientation', onOrient, { passive: true });
    if (btn) setTimeout(function () { if (!gyroSeen) { K.toast('Dein Gerät liefert keine Neigungsdaten. Nutze Maus oder Finger.'); gyroOn = false; window.removeEventListener('deviceorientation', onOrient); } else { $$('[data-gyro]').forEach(function (b) { b.innerHTML = '✓ Neigung aktiv'; }); K.say('Kipp dein Handy! Siehst du den Regenbogen? 🌈', 'wink'); } }, 1500);
  }
  fx.enableGyro = function (btn) {
    if (RM) { K.toast('Bei reduzierter Bewegung bleibt die Neigung aus.'); return; }
    var D = window.DeviceOrientationEvent;
    if (!D) { K.toast('Neigung wird hier nicht unterstützt.'); return; }
    if (typeof D.requestPermission === 'function') D.requestPermission().then(function (s) { if (s === 'granted') startGyro(btn); else K.toast('Neigung nicht erlaubt.'); }).catch(function () { K.toast('Neigung nicht verfügbar.'); });
    else startGyro(btn);
  };
  function autoGyro() {
    // Android & Co. brauchen keine Erlaubnis: bei Touch-Geräten automatisch an
    var D = window.DeviceOrientationEvent;
    if (RM || !D || typeof D.requestPermission === 'function') return;
    if (window.matchMedia && matchMedia('(hover: none) and (pointer: coarse)').matches) startGyro(null);
  }

  /* ---------- Seitenwechsel & Scroll-Animationen ---------- */
  fx.beforePage = function () {
    cleanups.forEach(function (f) { try { f(); } catch (e) {} }); cleanups = [];
    if (ST) ST.getAll().forEach(function (t) { t.kill(); });
    activeTcg = null; activeTilt = null;
  };
  fx.onPage = function (root) {
    var f = $('#filters'); if (f) f.setAttribute('data-lenis-prevent', '');
    if (RM || !G || !ST) return;
    // Ruhezustand ist immer sichtbar – animiert wird erst beim Eintreten (fromTo), nie dauerhaft versteckt
    $$('.slam', root).forEach(function (el) {
      var burst = $('.slam-burst', el);
      ST.create({ trigger: el, start: 'top 96%', once: true, onEnter: function () {
        G.fromTo(el, { opacity: 0, scale: .35, rotation: -7 }, { opacity: 1, scale: 1, rotation: 0, duration: .55, ease: 'back.out(2.8)' });
        if (burst) G.fromTo(burst, { opacity: .95, scale: .3 }, { opacity: 0, scale: 1.25, duration: .7, ease: 'power2.out' });
      } });
    });
    var groups = '.tile, .trust li, .step, .soc, .ev, .rel, .scard, .pd > *, .about > *, .contact > *';
    var els = $$(groups, root);
    if (els.length) {
      ST.batch(els, { start: 'top 98%', once: true, onEnter: function (b) { G.fromTo(b, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: 'power3.out', overwrite: true, clearProps: 'transform' }); } });
    }
    // Sicherheitsnetz: nichts bleibt unsichtbar
    var safe = setTimeout(function () { $$('.slam,' + groups, root).forEach(function (e) { if (getComputedStyle(e).opacity === '0' && e.getBoundingClientRect().top < innerHeight) G.to(e, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: .3 }); }); }, 2500);
    cleanups.push(function () { clearTimeout(safe); });
    requestAnimationFrame(function () { ST.refresh(); });
  };
  fx.refreshCards = function (wrap) {
    if (RM || !G || !wrap) return;
    var kids = Array.prototype.slice.call(wrap.children, 0, 16);
    G.fromTo(kids, { opacity: 0, y: 14, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: .32, stagger: .02, ease: 'power2.out', overwrite: true, clearProps: 'transform' });
  };
  var SFX = ['ドン!', 'バン!', 'シュッ!', 'キラッ!', 'ドドド!'];
  fx.wipe = function (fn) {
    if (!G) { fn(); return; }
    var w = $('#wipe'), bars = $$('i', w), word = $('b', w);
    word.textContent = SFX[Math.floor(Math.random() * SFX.length)];
    var tl = G.timeline();
    tl.set(bars, { transformOrigin: '50% 0%' })
      .to(bars, { scaleY: 1, duration: .22, ease: 'power3.in', stagger: .045 })
      .to(word, { scale: 1, rotation: -8, duration: .2, ease: 'back.out(3)' }, '-=.12')
      .call(function () { fn(); document.documentElement.classList.add('glitch-on'); setTimeout(function () { document.documentElement.classList.remove('glitch-on'); }, 340); })
      .set(bars, { transformOrigin: '50% 100%' })
      .to(word, { scale: 0, duration: .15, ease: 'power2.in' }, '+=.04')
      .to(bars, { scaleY: 0, duration: .24, ease: 'power3.out', stagger: .045 }, '<');
  };

  /* ---------- Kapsel fliegt in den Warenkorb ---------- */
  fx.flyToCart = function (src, target, done) {
    if (!G) { done(); return; }
    var a = src.getBoundingClientRect(), b = target.getBoundingClientRect();
    var cap = document.createElement('div'); cap.className = 'capsule-fly';
    var colors = ['#FF2E93', '#00E5FF', '#E6FF00', '#9D4DFF'];
    cap.style.background = 'linear-gradient(' + colors[Math.floor(Math.random() * 4)] + ' 50%, #fff 50%)';
    cap.style.left = (a.left + a.width / 2 - 15) + 'px'; cap.style.top = (a.top + a.height / 2 - 15) + 'px';
    document.body.appendChild(cap);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    var lift = Math.min(-60, dy - 90);
    G.fromTo(cap, { scale: .3 }, { scale: 1.2, duration: .2, ease: 'back.out(3)' });
    G.to(cap, { x: dx, duration: .72, ease: 'power1.inOut' });
    G.to(cap, { keyframes: [{ y: lift, duration: .3, ease: 'power2.out' }, { y: dy, duration: .42, ease: 'power2.in' }] });
    G.to(cap, { rotation: 540, duration: .72, ease: 'none' });
    G.to(cap, { scale: .5, duration: .25, delay: .5, onComplete: function () { cap.remove(); done(); } });
  };

  /* ---------- Konfetti ---------- */
  function confetti(canvas) {
    if (RM || !canvas) return;
    var ctx = canvas.getContext('2d'), w = canvas.width = canvas.offsetWidth, h = canvas.height = canvas.offsetHeight;
    var cols = ['#FF2E93', '#00E5FF', '#E6FF00', '#9D4DFF', '#FFFFFF', '#FF8A00'], ps = [];
    for (var i = 0; i < 130; i++) { var a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9; ps.push({ x: w / 2, y: h * .45, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5, r: Math.random() * 6, s: 4 + Math.random() * 6, c: cols[i % cols.length], vr: (Math.random() - .5) * .4, star: i % 5 === 0 }); }
    var t0 = performance.now();
    (function loop(t) {
      var k = (t - t0) / 1700; ctx.clearRect(0, 0, w, h); if (k > 1) return;
      ctx.globalAlpha = 1 - k * k;
      ps.forEach(function (p) {
        p.vy += .32; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        if (p.star) { ctx.beginPath(); for (var j = 0; j < 10; j++) { var rr = j % 2 ? p.s * .45 : p.s, aa = j * Math.PI / 5; ctx.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr); } ctx.fill(); }
        else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      });
      requestAnimationFrame(loop);
    })(t0);
  }
  fx.confetti = confetti;

  /* ---------- Booster-Opening ---------- */
  var CRITS = ['kurage', 'hoshi', 'fuwa', 'chochin', 'bitto', 'hibana'];
  var PAL = [['#00E5FF', '#9D4DFF'], ['#FFD23F', '#FF2E93'], ['#B8F1FF', '#FF9FCB'], ['#FF5A36', '#FFD23F'], ['#9D4DFF', '#00E5FF'], ['#FF8A00', '#E6FF00']];
  var SUFFIX = ['Nachtlicht', 'Funkel', 'Sternchen', 'Neon', 'Turbo', 'Mondtanz', 'Glitzer'];
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  fx.booster = function (el) {
    var opened = false;
    function build() {
      opened = false;
      var cards = [];
      var rar = ['common', 'common', 'reverse', 'holo'];
      for (var i = 0; i < 4; i++) { var a = CRITS[(i + Math.floor(Math.random() * 6)) % 6], p = PAL[CRITS.indexOf(a)]; cards.push({ name: K.CREATURE_NAMES[a] + ' ' + rnd(SUFFIX), rarity: rar[i], art: a, c1: p[0], c2: p[1], set: 'NBF', no: String(10 + Math.floor(Math.random() * 80)).padStart(3, '0'), lang: 'JP', pwr: 40 + i * 20 }); }
      var hitR = Math.random() < .55 ? 'gold' : 'fullart';
      var hitA = Math.random() < .5 ? 'momo' : rnd(CRITS);
      var hp = hitA === 'momo' ? ['#FF2E93', '#FFD23F'] : PAL[CRITS.indexOf(hitA)];
      cards.push({ name: (hitA === 'momo' ? 'Momo' : K.CREATURE_NAMES[hitA]) + (hitR === 'gold' ? ' ★ Gold' : ' Full Art'), rarity: hitR, art: hitA, c1: hp[0], c2: hp[1], set: 'NBF', no: '1' + String(Math.floor(Math.random() * 99)).padStart(2, '0'), lang: 'JP', pwr: 180 });
      el.innerHTML = '<p class="booster-hint">✂ <span>Zieh über die Zacken oder tipp aufs Pack</span></p>' +
        '<div class="bcards" aria-hidden="true"><i class="burst"></i>' + cards.map(function (c, i) { return '<div class="bcard' + (i === 4 ? ' hit' : '') + '">' + K.card(c) + '</div>'; }).join('') + '</div>' +
        '<button class="pack" type="button" aria-label="Booster-Pack aufreißen">' +
          '<span class="pack-top"></span>' +
          '<span class="pack-body"><span class="pack-logo">KIRA KIRA</span><span class="pack-sub">BOOSTER · 新弾</span>' + K.momo('wink') + '<span class="pack-foot">5 KARTEN · 1 HIT!</span></span>' +
          '<span class="tear-guide" aria-hidden="true"><i>✂</i></span>' +
        '</button>' +
        '<span class="hit-label" aria-hidden="true">HIT! キラッ</span><canvas class="confetti" aria-hidden="true"></canvas>' +
        '<div class="booster-ui" aria-live="polite"></div>';
      el._hit = cards[4];
      bind();
    }
    function bind() {
      var pack = $('.pack', el), top = $('.pack-top', el), sx = 0, sy = 0, drag = false, down = false, w = 1;
      pack.addEventListener('pointerdown', function (e) { down = true; drag = false; sx = e.clientX; sy = e.clientY; w = pack.offsetWidth; });
      pack.addEventListener('pointermove', function (e) {
        if (!down || opened) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (!drag && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { drag = true; try { pack.setPointerCapture(e.pointerId); } catch (er) {} }
        if (drag) {
          var k = clamp(Math.abs(dx) / w, 0, 1);
          top.style.transform = 'rotate(' + (-k * 28 * Math.sign(dx)) + 'deg) translateY(' + (-k * 14) + 'px)';
          top.style.transformOrigin = dx > 0 ? '0% 100%' : '100% 100%';
          if (k > .55) { down = false; open(); }
        }
      });
      var up = function () { if (!down) return; down = false; if (drag && !opened) top.style.transform = ''; };
      pack.addEventListener('pointerup', up); pack.addEventListener('pointercancel', up);
      pack.addEventListener('click', function () { if (!drag) open(); drag = false; });
    }
    function layout() {
      var narrow = el.offsetWidth < 520, cw = $('.bcard', el).offsetWidth;
      var sp = narrow ? cw * .62 : cw * .78;
      return { x: [-1.5 * sp, -.5 * sp, .5 * sp, 1.5 * sp], y: [30, 6, 6, 30], r: [-16, -6, 6, 16], top: narrow ? -40 : -30 };
    }
    function finish() {
      var ui = $('.booster-ui', el);
      var code = 'KIRA-' + rnd(['MOMO', 'HOLO', 'GACHA', 'NEON']) + '10';
      ui.innerHTML = '<div class="coupon"><div><small>Dein Gutschein (fiktiv) · 10 % auf alles</small><b>' + code + '</b></div><button class="btn btn-s" type="button" data-copy="' + code + '">Kopieren</button><button class="btn btn-s btn-ghost" type="button" data-again style="color:#140A2E;border-color:#140A2E">Noch ein Pack</button></div>';
      if (G && !RM) G.from(ui.firstChild, { y: 40, opacity: 0, duration: .45, ease: 'back.out(2)' });
      $('[data-copy]', ui).addEventListener('click', function (e) {
        var c = e.currentTarget.dataset.copy;
        var ok = function () { K.toast('Code ' + c + ' kopiert! (fiktiv)'); };
        try { navigator.clipboard.writeText(c).then(ok, ok); } catch (er) { ok(); }
      });
      $('[data-again]', ui).addEventListener('click', function () { build(); $('.pack', el).focus(); });
      K.say(el._hit.rarity === 'gold' ? 'WAAAH! Eine GOLD-Karte! ✨ Gutschein ist deiner!' : 'Full Art! Sugoi! Hier ist dein Gutschein ★', 'cheer', 4200);
    }
    function open() {
      if (opened) return; opened = true;
      var pack = $('.pack', el), top = $('.pack-top', el), body = $('.pack-body', el), cards = $$('.bcard', el), hit = cards[4], hitTcg = $('.tcg', hit);
      var normal = cards.slice(0, 4), L = layout();
      $('.booster-hint', el).style.visibility = 'hidden';
      pack.setAttribute('aria-hidden', 'true'); pack.tabIndex = -1;
      if (RM || !G) {
        pack.style.display = 'none';
        cards.forEach(function (c, i) { c.style.opacity = 1; c.style.left = '50%'; c.style.top = '50%'; c.style.transform = i < 4 ? 'translate(-50%,-50%) translate(' + L.x[i] + 'px,' + (L.y[i] + L.top) + 'px) rotate(' + L.r[i] + 'deg)' : 'translate(-50%,-50%) translate(0,' + (L.top - 10) + 'px) scale(1.12)'; });
        finish(); return;
      }
      hitTcg.style.setProperty('--flip', '180deg');
      G.set(cards, { left: '50%', top: '50%', xPercent: -50, yPercent: -50, x: 0, y: 60, opacity: 0, scale: .82 });
      var tl = G.timeline();
      tl.to(top, { x: 120, y: -110, rotation: 48, opacity: 0, duration: .5, ease: 'power2.out' })
        .to(cards, { opacity: 1, duration: .1 }, .15)
        .to(cards, { y: -150, duration: .4, ease: 'power2.out', stagger: .04 }, .18)
        .to(body, { y: 300, opacity: 0, duration: .5, ease: 'power2.in' }, .3)
        .set(pack, { display: 'none' })
        .to(normal, { x: function (i) { return L.x[i]; }, y: function (i) { return L.y[i] + L.top; }, rotation: function (i) { return L.r[i]; }, scale: 1, duration: .6, ease: 'back.out(1.7)', stagger: .06 }, .75)
        .to(hit, { x: 0, y: L.top - 16, scale: 1.16, rotation: 0, duration: .5, ease: 'back.out(1.8)' }, .95)
        .to($('.burst', el), { scale: 1, duration: .5, ease: 'back.out(2)' }, 1.45)
        .to(hitTcg, { '--flip': '0deg', duration: .75, ease: 'back.out(1.5)' }, 1.45)
        .call(function () { confetti($('.confetti', el)); setCardTemp(hitTcg); }, null, 1.75)
        .fromTo($('.hit-label', el), { opacity: 0, scale: .2, rotation: -12 }, { opacity: 1, scale: 1, rotation: -6, duration: .45, ease: 'back.out(3)' }, 1.8)
        .to($('.burst', el), { rotation: 90, duration: 6, ease: 'none' }, 1.9)
        .call(finish, null, 2.1);
    }
    function setCardTemp(t) { var k = { v: 0 }; G.to(k, { v: 1, duration: 1.2, ease: 'sine.inOut', onUpdate: function () { setCard(t, .2 + k.v * .6, .3 + Math.sin(k.v * 3.14) * .3, 1 - k.v * .6); }, onComplete: function () { resetCard(t); } }); }
    build();
  };

  /* ---------- Hero-Partikel: Sakura & Glitzer, pausieren außerhalb des Sichtbereichs ---------- */
  fx.particles = function (canvas, section) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2), w, h, ps = [], running = false, vis = false, id = 0;
    function size() { w = canvas.offsetWidth; h = canvas.offsetHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); var n = Math.round(clamp(w * h / 22000, 14, 54)); ps = []; for (var i = 0; i < n; i++) ps.push(mk(true)); }
    function mk(any) { return { x: Math.random() * w, y: any ? Math.random() * h : -20, s: 4 + Math.random() * 7, vx: -.3 + Math.random() * .9, vy: .35 + Math.random() * .8, r: Math.random() * 6, vr: (Math.random() - .5) * .04, glit: Math.random() < .4, ph: Math.random() * 6.28, sp: .8 + Math.random() * 1.2 }; }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      var day = document.documentElement.getAttribute('data-mode') === 'day';
      ps.forEach(function (p) {
        if (p.glit) {
          var a = .35 + .55 * (.5 + .5 * Math.sin(t / 1000 * p.sp + p.ph)); // langsames Funkeln (< 1 Hz)
          ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = a; ctx.fillStyle = day ? '#9D4DFF' : (p.ph > 3 ? '#00E5FF' : '#E6FF00');
          ctx.beginPath(); var s = p.s * .55; ctx.moveTo(0, -s); ctx.quadraticCurveTo(0, 0, s, 0); ctx.quadraticCurveTo(0, 0, 0, s); ctx.quadraticCurveTo(0, 0, -s, 0); ctx.quadraticCurveTo(0, 0, 0, -s); ctx.fill(); ctx.restore();
        } else {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = .8; ctx.fillStyle = day ? '#FF7EB8' : '#FF9FCB';
          ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .55, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(-p.s * .3, -p.s * .1, p.s * .35, p.s * .18, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        }
      });
    }
    function step(t) {
      if (!running) return;
      ps.forEach(function (p, i) { if (p.glit) { p.y += p.vy * .15; } else { p.x += p.vx + Math.sin(t / 900 + i) * .3; p.y += p.vy; p.r += p.vr; } if (p.y > h + 20 || p.x < -30 || p.x > w + 30) ps[i] = mk(false); });
      draw(t); id = requestAnimationFrame(step);
    }
    function upd() { var should = vis && !document.hidden && !RM; if (should && !running) { running = true; id = requestAnimationFrame(step); } else if (!should && running) { running = false; cancelAnimationFrame(id); } }
    size(); draw(0);
    var io = new IntersectionObserver(function (en) { vis = en[0].isIntersecting; upd(); }); io.observe(section || canvas);
    var ro = new ResizeObserver(function () { size(); draw(performance.now()); }); ro.observe(canvas);
    document.addEventListener('visibilitychange', upd);
    cleanups.push(function () { running = false; cancelAnimationFrame(id); io.disconnect(); ro.disconnect(); document.removeEventListener('visibilitychange', upd); });
  };

  /* ---------- Karten-Viewer (Detailseite) ---------- */
  fx.viewer = function (card, stage, flipBtn) {
    if (!card) return;
    var spin = 0;
    stage.tabIndex = 0; stage.setAttribute('role', 'img'); stage.setAttribute('aria-label', 'Holo-Karte. Pfeiltasten links/rechts drehen die Karte.');
    var apply = function (v, anim) { spin = v; if (anim && G && !RM) G.to(card, { '--flip': v + 'deg', duration: .7, ease: 'back.out(1.4)' }); else card.style.setProperty('--flip', v + 'deg'); };
    var sx = 0, base = 0, down = false;
    stage.addEventListener('pointerdown', function (e) { down = true; sx = e.clientX; base = spin; fx.viewerDrag = false; });
    stage.addEventListener('pointermove', function (e) {
      if (!down) return; var dx = e.clientX - sx;
      if (!fx.viewerDrag && Math.abs(dx) > 10) { fx.viewerDrag = true; card.classList.add('is-on'); try { stage.setPointerCapture(e.pointerId); } catch (er) {} }
      if (fx.viewerDrag) apply(base + dx * .7);
    });
    var up = function () { if (!down) return; down = false; if (fx.viewerDrag) { apply(Math.round(spin / 180) * 180, true); setTimeout(function () { fx.viewerDrag = false; card.classList.remove('is-on'); }, 50); } };
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
    stage.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); apply(spin + (e.key === 'ArrowRight' ? 180 : -180), true); } });
    if (flipBtn) flipBtn.addEventListener('click', function () { apply(spin + 180, true); });
    // kleiner Begrüßungs-Schwenk
    if (!RM && G) { var k = { v: 0 }; G.to(k, { v: 1, duration: 1.4, delay: .5, ease: 'sine.inOut', onUpdate: function () { if (!fx.viewerDrag && card !== activeTcg) setCard(card, .5 + Math.sin(k.v * 6.28) * .35, .4, .9 - k.v * .5); }, onComplete: function () { if (card !== activeTcg) resetCard(card); } }); }
  };

  /* ---------- Gacha-Automat ---------- */
  var SVG2D = function () {
    return '<svg viewBox="0 0 200 240" aria-hidden="true"><ellipse cx="100" cy="230" rx="70" ry="8" fill="#140A2E" opacity=".3"/>' +
      '<circle cx="100" cy="70" r="58" fill="#BFF6FF" fill-opacity=".35" stroke="#140A2E" stroke-width="5"/>' +
      ['#FF2E93', '#E6FF00', '#00E5FF', '#9D4DFF', '#FF8A00', '#FF2E93', '#00E5FF', '#E6FF00'].map(function (c, i) { var x = 62 + (i % 4) * 25, y = 84 + Math.floor(i / 4) * 22 - (i % 2) * 6; return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (i * 37) + ')"><circle r="11" fill="#fff" stroke="#140A2E" stroke-width="3"/><path d="M-11 0a11 11 0 0 1 22 0z" fill="' + c + '" stroke="#140A2E" stroke-width="3"/></g>'; }).join('') +
      '<ellipse cx="100" cy="66" rx="40" ry="16" fill="#fff" opacity=".25" transform="rotate(-20 100 66)"/>' +
      '<rect x="40" y="118" width="120" height="16" rx="6" fill="#E6FF00" stroke="#140A2E" stroke-width="4"/>' +
      '<rect x="32" y="132" width="136" height="92" rx="14" fill="#FF2E93" stroke="#140A2E" stroke-width="5"/>' +
      '<rect x="48" y="140" width="104" height="18" rx="5" fill="#E6FF00" stroke="#140A2E" stroke-width="3"/><text x="100" y="154" text-anchor="middle" font-family="Dela Gothic One" font-size="12" fill="#140A2E">ガチャ DEAL</text>' +
      '<g class="crank"><circle cx="100" cy="182" r="19" fill="#00E5FF" stroke="#140A2E" stroke-width="4"/><rect x="96" y="160" width="8" height="44" rx="4" fill="#fff" stroke="#140A2E" stroke-width="3"/><circle cx="100" cy="160" r="7" fill="#E6FF00" stroke="#140A2E" stroke-width="3"/></g>' +
      '<rect x="128" y="196" width="28" height="22" rx="5" fill="#140A2E"/>' +
      '<g class="cap-out"><circle cx="142" cy="207" r="10" fill="#fff" stroke="#140A2E" stroke-width="3"/><path d="M132 207a10 10 0 0 1 20 0z" fill="#FF2E93" stroke="#140A2E" stroke-width="3"/></g></svg>';
  };
  fx.gacha = function (stage, btn, dealEl, hint) {
    if (!stage) return;
    var busy = false, three = null, dead = false;
    var twoD = document.createElement('div'); twoD.className = 'gacha-2d'; twoD.innerHTML = SVG2D(); stage.insertBefore(twoD, stage.firstChild);
    twoD.style.cursor = 'pointer';
    function showDeal() {
      dealEl.classList.add('show'); hint.style.visibility = 'hidden'; busy = false;
      btn.innerHTML = K.I.spin + ' Nochmal drehen';
      K.say('Kapsel auf! Heute: ' + K.dealOfDay().p.name.replace(/„|“/g, '') + ' für −25 % ★', 'cheer', 4200);
      var f = $('button', dealEl); if (f) f.focus({ preventScroll: true });
    }
    function spin() {
      if (busy) return; busy = true;
      if (dealEl.classList.contains('show')) dealEl.classList.remove('show');
      if (RM) { showDeal(); return; }
      if (three) three.spin(showDeal);
      else { twoD.classList.remove('spin'); void twoD.offsetWidth; twoD.classList.add('spin'); setTimeout(showDeal, 2300); }
    }
    btn.addEventListener('click', spin);
    twoD.addEventListener('click', spin);
    cleanups.push(function () { dead = true; if (three) three.dispose(); });
    if (RM || !hasWebGL) return;
    // Three.js erst laden, wenn der Automat in Sichtweite kommt
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return; io.disconnect();
      loadThree(function () { if (dead || !window.THREE) return; try { three = makeGacha(stage, spin); twoD.style.display = 'none'; } catch (e) { three = null; } });
    }, { rootMargin: '300px' });
    io.observe(stage);
    cleanups.push(function () { io.disconnect(); });
  };
  var threeLoading = null;
  function loadThree(cb) {
    if (window.THREE) { cb(); return; }
    if (threeLoading) { threeLoading.push(cb); return; }
    threeLoading = [cb];
    var s = document.createElement('script'); s.src = (K.LIB && K.LIB.three) || 'js/three.min.js'; s.async = true;
    s.onload = function () { threeLoading.forEach(function (f) { f(); }); threeLoading = null; };
    s.onerror = function () { threeLoading = null; };
    document.head.appendChild(s);
  }
  function makeGacha(stage, onClickSpin) {
    var T = window.THREE;
    var renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    var canvas = renderer.domElement; canvas.setAttribute('aria-hidden', 'true'); canvas.style.cursor = 'grab';
    stage.insertBefore(canvas, stage.firstChild);
    var scene = new T.Scene();
    var cam = new T.PerspectiveCamera(30, 1, .1, 100); cam.position.set(0, 2.6, 11.2); cam.lookAt(0, 2.1, 0);
    scene.add(new T.AmbientLight(0xffffff, .5));
    var dl = new T.DirectionalLight(0xffffff, .85); dl.position.set(3.5, 6, 5); scene.add(dl);
    // Toon-Verlauf: 3 harte Stufen (Cel-Shading)
    var gm = new T.DataTexture(new Uint8Array([110, 110, 110, 255, 185, 185, 185, 255, 255, 255, 255, 255]), 3, 1, T.RGBAFormat);
    gm.minFilter = gm.magFilter = T.NearestFilter; gm.generateMipmaps = false; gm.needsUpdate = true;
    var toon = function (c, o) { var m = new T.MeshToonMaterial(Object.assign({ color: c, gradientMap: gm }, o || {})); return m; };
    var lineMat = new T.MeshBasicMaterial({ color: 0x140a2e, side: T.BackSide });
    var geos = [], mats = [toon, lineMat];
    function mesh(geo, mat, line) { geos.push(geo); var m = new T.Mesh(geo, mat); if (line) { var o = new T.Mesh(geo, lineMat); o.scale.setScalar(line); m.add(o); } return m; }
    var M = new T.Group(); scene.add(M);
    // Sockel
    var base = mesh(new T.BoxGeometry(2.8, 2.3, 2.1), toon(0xff2e93), 1.035); base.position.y = 1.25; M.add(base);
    var plinth = mesh(new T.BoxGeometry(3.0, .25, 2.3), toon(0x9d4dff), 1.06); plinth.position.y = .12; M.add(plinth);
    // Label mit Canvas-Textur
    var lc = document.createElement('canvas'); lc.width = 512; lc.height = 160; var lx = lc.getContext('2d');
    var drawLabel = function () { lx.fillStyle = '#E6FF00'; lx.fillRect(0, 0, 512, 160); lx.fillStyle = '#140A2E'; lx.font = '78px "Dela Gothic One", sans-serif'; lx.textAlign = 'center'; lx.textBaseline = 'middle'; lx.fillText('ガチャ DEAL', 256, 84); tex.needsUpdate = true; };
    var tex = new T.CanvasTexture(lc);
    var label = mesh(new T.BoxGeometry(2.2, .66, .06), new T.MeshBasicMaterial({ map: tex }), 1.06); label.position.set(0, 2.0, 1.07); M.add(label);
    drawLabel(); if (document.fonts && document.fonts.load) document.fonts.load('78px "Dela Gothic One"').then(drawLabel, function () {});
    // Kurbel
    var crank = new T.Group(); crank.position.set(-.55, 1.05, 1.12); M.add(crank);
    var disc = mesh(new T.CylinderGeometry(.46, .46, .14, 32), toon(0x00e5ff), 1.08); disc.rotation.x = Math.PI / 2; crank.add(disc);
    var bar = mesh(new T.BoxGeometry(.18, .95, .14), toon(0xffffff), 1.12); bar.position.set(0, 0, .14); crank.add(bar);
    var knob = mesh(new T.SphereGeometry(.17, 20, 14), toon(0xe6ff00), 1.12); knob.position.set(0, .48, .24); crank.add(knob);
    // Ausgabeschacht
    var chute = mesh(new T.BoxGeometry(.9, .62, .2), toon(0x140a2e)); chute.position.set(.72, .72, 1.06); M.add(chute);
    var flap = mesh(new T.BoxGeometry(.78, .5, .05), toon(0x2e1b66)); flap.position.set(.72, .72, 1.17); M.add(flap);
    // Kragen, Kuppel, Deckel
    var collar = mesh(new T.CylinderGeometry(1.32, 1.42, .32, 40), toon(0xe6ff00), 1.05); collar.position.y = 2.55; M.add(collar);
    var domeMat = toon(0xbff6ff, { transparent: true, opacity: .14, depthWrite: false });
    var dome = mesh(new T.SphereGeometry(1.38, 40, 28), domeMat); dome.position.y = 3.62; M.add(dome);
    var ring = mesh(new T.RingGeometry(1.38, 1.47, 64), new T.MeshBasicMaterial({ color: 0x140a2e, side: T.DoubleSide })); ring.position.set(0, 3.62, 0); M.add(ring);
    var shine = mesh(new T.CircleGeometry(.32, 24), new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .55 })); shine.position.set(-.55, 4.2, 1.3); shine.scale.set(1, .55, 1); shine.rotation.z = .6; M.add(shine);
    var cap = mesh(new T.CylinderGeometry(.42, .52, .32, 28), toon(0xff2e93), 1.08); cap.position.y = 5.02; M.add(cap);
    var capStar = mesh(new T.OctahedronGeometry(.22), toon(0xffe34d), 1.15); capStar.position.y = 5.42; M.add(capStar);
    // Kapseln in der Kuppel
    var COLS = [0xff2e93, 0x00e5ff, 0xe6ff00, 0x9d4dff, 0xff8a00, 0x3dffb5];
    var hemiTop = new T.SphereGeometry(.27, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), hemiBot = new T.SphereGeometry(.27, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), capLine = new T.SphereGeometry(.27, 16, 12);
    geos.push(hemiTop, hemiBot, capLine);
    var whiteMat = toon(0xffffff);
    function capsule(color, s) {
      var g = new T.Group();
      var a = new T.Mesh(hemiTop, toon(color)), b = new T.Mesh(hemiBot, whiteMat), l = new T.Mesh(capLine, lineMat);
      l.scale.setScalar(1.12); g.add(a); g.add(b); g.add(l); g.scale.setScalar(s || 1); g.userData.top = a; return g;
    }
    var caps = [];
    for (var i = 0; i < 16; i++) {
      var c = capsule(COLS[i % COLS.length]);
      var ang = i * 2.39, rad = .25 + (i % 4) * .22, layer = Math.floor(i / 6);
      c.position.set(Math.cos(ang) * rad * 1.1, 2.95 + layer * .48 + (i % 3) * .06, Math.sin(ang) * rad * .9);
      c.rotation.set(i * .7, i * 1.3, i * .4);
      c.userData.base = c.position.clone(); c.userData.ph = i;
      M.add(c); caps.push(c);
    }
    // Ausgabe-Kapsel
    var out = capsule(0xff2e93, 1.5); out.visible = false; scene.add(out);
    var sparks = [];
    for (var s = 0; s < 14; s++) { var sp = mesh(new T.OctahedronGeometry(.08), new T.MeshBasicMaterial({ color: [0xe6ff00, 0xff2e93, 0x00e5ff, 0xffffff][s % 4] })); sp.visible = false; scene.add(sp); sparks.push(sp); }
    // Schatten
    var sh = mesh(new T.CircleGeometry(2.3, 40), new T.MeshBasicMaterial({ color: 0x140a2e, transparent: true, opacity: .25 })); sh.rotation.x = -Math.PI / 2; sh.position.y = .005; sh.scale.set(1, .55, 1); scene.add(sh);

    var W = 1, H = 1;
    function resize() { W = stage.clientWidth; H = stage.clientHeight; renderer.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); }
    resize();
    var ro = new ResizeObserver(resize); ro.observe(stage);
    // Interaktion: Kurbel ziehen oder klicken
    var mouse = { x: 0, y: 0 }, ray = new T.Raycaster(), ndc = new T.Vector2();
    var dragging = false, lastAng = 0, acc = 0, moved = 0, spinning = false;
    function angAt(e) { var r = canvas.getBoundingClientRect(); var p = crank.getWorldPosition(new T.Vector3()).project(cam); var cx = r.left + (p.x + 1) / 2 * r.width, cy = r.top + (1 - p.y) / 2 * r.height; return Math.atan2(e.clientY - cy, e.clientX - cx); }
    function hitCrank(e) { var r = canvas.getBoundingClientRect(); ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, cam); return ray.intersectObject(crank, true).length > 0; }
    canvas.addEventListener('pointermove', function (e) {
      var r = canvas.getBoundingClientRect(); mouse.x = (e.clientX - r.left) / r.width - .5; mouse.y = (e.clientY - r.top) / r.height - .5;
      if (dragging && !spinning) {
        var a = angAt(e), d = a - lastAng; if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2;
        lastAng = a; crank.rotation.z -= d; acc += Math.abs(d); moved += Math.abs(d);
        caps.forEach(function (c, i) { c.position.y = c.userData.base.y + Math.sin(acc * 3 + i) * .05; });
        if (acc > Math.PI * 1.6) { dragging = false; canvas.style.cursor = 'grab'; release(pendingDone || onDone); }
      } else canvas.style.cursor = hitCrank(e) ? 'grab' : 'pointer';
    });
    canvas.addEventListener('pointerdown', function (e) { moved = 0; if (spinning) return; if (hitCrank(e)) { dragging = true; acc = 0; lastAng = angAt(e); canvas.style.cursor = 'grabbing'; try { canvas.setPointerCapture(e.pointerId); } catch (er) {} e.preventDefault(); } });
    canvas.addEventListener('pointerup', function () { if (dragging) { dragging = false; canvas.style.cursor = 'grab'; if (moved < .2) onClickSpin(); else G.to(crank.rotation, { z: Math.round(crank.rotation.z / (Math.PI * 2)) * Math.PI * 2, duration: .4, ease: 'back.out(2)' }); } else if (!spinning) onClickSpin(); });
    var pendingDone = null, onDone = function () {};
    function release(done) {
      spinning = true; pendingDone = null;
      var tl = G.timeline({ onComplete: function () { spinning = false; done(); } });
      tl.to(out.position, { duration: 0 });
      // Kapseln wirbeln
      caps.forEach(function (c, i) { tl.to(c.rotation, { x: '+=' + (2 + i % 3), y: '+=' + (1 + i % 2), duration: .9, ease: 'power2.out' }, 0); tl.to(c.position, { y: c.userData.base.y + .25, duration: .25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, i * .02); });
      tl.to(flap.rotation, { x: -1.1, duration: .2, ease: 'power2.out' }, .45);
      tl.call(function () { out.visible = true; out.position.set(.72, .72, 1.0); out.rotation.set(0, 0, 0); out.scale.setScalar(1.5); out.userData.top.position.set(0, 0, 0); out.userData.top.rotation.set(0, 0, 0); }, null, .5);
      tl.to(out.position, { z: 2.6, duration: .7, ease: 'power1.out' }, .5);
      tl.to(out.position, { keyframes: [{ y: .42, duration: .3, ease: 'power2.in' }, { y: .75, duration: .18, ease: 'power2.out' }, { y: .42, duration: .18, ease: 'power2.in' }] }, .5);
      tl.to(out.position, { x: 0, duration: .7, ease: 'power1.inOut' }, .5);
      tl.to(out.rotation, { x: 6, duration: .7, ease: 'power1.out' }, .5);
      tl.to(out.rotation, { x: 0, z: 0, duration: .25, ease: 'back.out(2)' }, 1.2);
      tl.to(flap.rotation, { x: 0, duration: .3 }, 1.0);
      tl.to(out.scale, { x: 1.9, y: 1.3, z: 1.9, duration: .12, yoyo: true, repeat: 1 }, 1.45);
      tl.to(out.userData.top.position, { y: .9, z: -.2, duration: .45, ease: 'back.out(2)' }, 1.7);
      tl.to(out.userData.top.rotation, { x: -1.4, duration: .45, ease: 'back.out(2)' }, 1.7);
      tl.call(function () {
        sparks.forEach(function (sp, i) {
          var a = i / sparks.length * Math.PI * 2; sp.visible = true; sp.position.copy(out.position); sp.position.y += .4;
          G.to(sp.position, { x: '+=' + Math.cos(a) * 1.6, y: '+=' + (1 + Math.sin(a) * 1.2), duration: .7, ease: 'power2.out' });
          G.to(sp.rotation, { x: 6, y: 6, duration: .7 });
          G.to(sp.scale, { x: .01, y: .01, z: .01, duration: .7, ease: 'power2.in', onComplete: function () { sp.visible = false; sp.scale.setScalar(1); } });
        });
      }, null, 1.75);
    }
    function spin(done) {
      if (spinning) return;
      // Automatisch eine Umdrehung kurbeln
      spinning = true;
      G.to(crank.rotation, { z: crank.rotation.z - Math.PI * 2, duration: .85, ease: 'back.inOut(1.4)', onComplete: function () { spinning = false; release(done); } });
    }
    // Render-Schleife nur bei Sichtbarkeit
    var running = false, vis = false, id = 0, clock = new T.Clock();
    function loop() {
      if (!running) return;
      var t = clock.getElapsedTime();
      M.rotation.y += ((mouse.x * .5) - M.rotation.y) * .06;
      M.rotation.x += ((mouse.y * .12) - M.rotation.x) * .06;
      capStar.rotation.y = t * 1.2;
      if (!spinning && !dragging) caps.forEach(function (c) { c.position.y = c.userData.base.y + Math.sin(t * 1.4 + c.userData.ph) * .025; });
      ring.quaternion.copy(cam.quaternion);
      renderer.render(scene, cam); id = requestAnimationFrame(loop);
    }
    function upd() { var should = vis && !document.hidden; if (should && !running) { running = true; id = requestAnimationFrame(loop); } else if (!should && running) { running = false; cancelAnimationFrame(id); } }
    var io = new IntersectionObserver(function (en) { vis = en[0].isIntersecting; upd(); }); io.observe(stage);
    document.addEventListener('visibilitychange', upd);
    if (G) G.from(M.scale, { x: .7, y: .7, z: .7, duration: .7, ease: 'back.out(2)' });
    return {
      spin: spin,
      dispose: function () {
        running = false; cancelAnimationFrame(id); io.disconnect(); ro.disconnect(); document.removeEventListener('visibilitychange', upd);
        scene.traverse(function (o) { if (o.material && o.material.dispose && o.material !== lineMat) o.material.dispose(); });
        geos.forEach(function (g) { g.dispose(); }); tex.dispose(); gm.dispose(); lineMat.dispose(); renderer.dispose(); void mats;
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  }

  fx.onTheme = function () {};
})(window.KIRA);
