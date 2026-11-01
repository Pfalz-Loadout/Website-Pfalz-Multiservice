/* KIRA KIRA · eigene Illustrationen als SVG: Maskottchen Momo, erfundene Wesen, Karten- und Produktgrafiken.
   Alles frei erfunden – keine bekannten Figuren, Logos oder Kartenmotive. */
(function (K) {
  'use strict';
  var INK = '#140A2E';
  var uid = 0;
  function nid(p) { uid += 1; return p + uid; }

  function star(cx, cy, r1, r2, n) {
    n = n || 5; var pts = [];
    for (var i = 0; i < n * 2; i++) {
      var r = i % 2 ? r2 : r1, a = Math.PI / n * i - Math.PI / 2;
      pts.push((cx + Math.cos(a) * r).toFixed(1) + ',' + (cy + Math.sin(a) * r).toFixed(1));
    }
    return pts.join(' ');
  }
  K.starPts = star;

  /* ---------- Momo: runder, rosa Mochi-Geist mit Sternchen auf der Stirn ---------- */
  K.momo = function (mood, opts) {
    mood = mood || 'happy'; opts = opts || {};
    var g = nid('mg');
    var eyes;
    if (mood === 'wink') eyes = '<ellipse cx="46" cy="62" rx="5" ry="7" fill="' + INK + '"/><circle cx="47.5" cy="59" r="2" fill="#fff"/><path d="M68 63 q6 -6 12 0" stroke="' + INK + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
    else if (mood === 'sleepy') eyes = '<path d="M40 63 q6 4 12 0 M68 63 q6 4 12 0" stroke="' + INK + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
    else if (mood === 'shock') eyes = '<circle cx="46" cy="61" r="7" fill="#fff" stroke="' + INK + '" stroke-width="3"/><circle cx="46" cy="62" r="2.6" fill="' + INK + '"/><circle cx="74" cy="61" r="7" fill="#fff" stroke="' + INK + '" stroke-width="3"/><circle cx="74" cy="62" r="2.6" fill="' + INK + '"/>';
    else if (mood === 'cheer') eyes = '<path d="M40 64 q6 -8 12 0 M68 64 q6 -8 12 0" stroke="' + INK + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
    else eyes = '<ellipse cx="46" cy="62" rx="5" ry="7" fill="' + INK + '"/><ellipse cx="74" cy="62" rx="5" ry="7" fill="' + INK + '"/><circle cx="47.6" cy="59" r="2.1" fill="#fff"/><circle cx="75.6" cy="59" r="2.1" fill="#fff"/><circle cx="44.5" cy="65.5" r="1" fill="#fff"/><circle cx="72.5" cy="65.5" r="1" fill="#fff"/>';
    var mouth;
    if (mood === 'shock') mouth = '<ellipse cx="60" cy="78" rx="4.5" ry="5.5" fill="' + INK + '"/>';
    else if (mood === 'cheer') mouth = '<path d="M52 74 q8 11 16 0 z" fill="' + INK + '"/><path d="M55 78 q5 4 10 0" fill="#FF5A8A"/>';
    else if (mood === 'sleepy') mouth = '<ellipse cx="60" cy="77" rx="3" ry="2.4" fill="' + INK + '"/>';
    else mouth = '<path d="M53 74 q3.5 4 7 0 q3.5 4 7 0" stroke="' + INK + '" stroke-width="2.8" fill="none" stroke-linecap="round"/>';
    var arms = mood === 'cheer'
      ? '<path d="M18 62 q-10 -14 -4 -24" stroke="' + INK + '" stroke-width="3" fill="#FF9FCB" stroke-linecap="round"/><ellipse cx="13" cy="37" rx="6" ry="6" fill="#FF9FCB" stroke="' + INK + '" stroke-width="3"/><ellipse cx="107" cy="37" rx="6" ry="6" fill="#FF9FCB" stroke="' + INK + '" stroke-width="3"/>'
      : '<ellipse cx="15" cy="76" rx="6.5" ry="5" fill="#FF9FCB" stroke="' + INK + '" stroke-width="3" transform="rotate(-25 15 76)"/><ellipse cx="105" cy="76" rx="6.5" ry="5" fill="#FF9FCB" stroke="' + INK + '" stroke-width="3" transform="rotate(25 105 76)"/>';
    if (mood === 'cheer') arms = '<ellipse cx="14" cy="44" rx="6.5" ry="5" fill="#FF9FCB" stroke="' + INK + '" stroke-width="3" transform="rotate(-60 14 44)"/><ellipse cx="106" cy="44" rx="6.5" ry="5" fill="#FF9FCB" stroke="' + INK + '" stroke-width="3" transform="rotate(60 106 44)"/>';
    var zz = mood === 'sleepy' ? '<text x="92" y="26" font-family="DotGothic16, monospace" font-size="14" fill="#00E5FF">z</text><text x="102" y="14" font-family="DotGothic16, monospace" font-size="10" fill="#00E5FF">z</text>' : '';
    return '<svg class="momo-svg' + (opts.cls ? ' ' + opts.cls : '') + '" viewBox="0 0 120 120" ' + (opts.label ? 'role="img" aria-label="' + opts.label + '"' : 'aria-hidden="true"') + ' focusable="false">' +
      '<defs><radialGradient id="' + g + '" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#FFD3E8"/><stop offset=".55" stop-color="#FF9FCB"/><stop offset="1" stop-color="#F06AAE"/></radialGradient></defs>' +
      '<ellipse cx="60" cy="110" rx="34" ry="5" fill="' + INK + '" opacity=".18"/>' +
      '<path d="M98 92 q16 4 14 -10 q-1 -7 -8 -5" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M98 92 q16 4 14 -10" fill="none" stroke="#FF9FCB" stroke-width="1.6" stroke-linecap="round"/>' +
      arms +
      '<path d="M14 72 C14 40 36 22 60 22 C84 22 106 40 106 72 C106 90 96 99 86 95 C80 101 71 101 65 96 C59 101 49 101 43 96 C35 101 22 98 18 89 C15 84 14 78 14 72Z" fill="url(#' + g + ')" stroke="' + INK + '" stroke-width="3.2" stroke-linejoin="round"/>' +
      '<ellipse cx="38" cy="40" rx="11" ry="6" fill="#fff" opacity=".55" transform="rotate(-30 38 40)"/>' +
      '<polygon points="' + star(60, 39, 9, 4) + '" fill="#FFE34D" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<ellipse cx="34" cy="73" rx="7" ry="4.2" fill="#FF5A8A" opacity=".55"/><ellipse cx="86" cy="73" rx="7" ry="4.2" fill="#FF5A8A" opacity=".55"/>' +
      eyes + mouth + zz + '</svg>';
  };

  /* ---------- Erfundene Wesen ---------- */
  function face(cx, cy, gap, small) {
    var r = small ? 3.6 : 4.6;
    return '<ellipse cx="' + (cx - gap) + '" cy="' + cy + '" rx="' + r + '" ry="' + (r * 1.35) + '" fill="' + INK + '"/>' +
      '<ellipse cx="' + (cx + gap) + '" cy="' + cy + '" rx="' + r + '" ry="' + (r * 1.35) + '" fill="' + INK + '"/>' +
      '<circle cx="' + (cx - gap + 1.4) + '" cy="' + (cy - 2) + '" r="1.6" fill="#fff"/><circle cx="' + (cx + gap + 1.4) + '" cy="' + (cy - 2) + '" r="1.6" fill="#fff"/>' +
      '<path d="M' + (cx - 4) + ' ' + (cy + 8) + ' q4 4 8 0" stroke="' + INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  }
  var S = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"';
  var CREATURES = {
    momo: function () { return null; },
    kurage: function (c1, c2) {
      return '<path d="M40 74 q-4 18 4 30 M54 78 q4 14 -2 28 M68 78 q-4 16 4 26 M80 74 q6 16 0 28" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M40 74 q-4 18 4 30 M54 78 q4 14 -2 28 M68 78 q-4 16 4 26 M80 74 q6 16 0 28" fill="none" stroke="' + c2 + '" stroke-width="3.4" stroke-linecap="round"/>' +
        '<polygon points="' + star(44, 105, 6, 2.6) + '" fill="#FFE34D" ' + S + ' stroke-width="2"/><polygon points="' + star(80, 103, 6, 2.6) + '" fill="#FFE34D" ' + S + ' stroke-width="2"/>' +
        '<path d="M24 70 C24 36 44 20 60 20 C76 20 96 36 96 70 q-6 8 -12 0 q-6 8 -12 0 q-6 8 -12 0 q-6 8 -12 0 q-6 8 -12 0 q-6 8 -12 0Z" fill="' + c1 + '" ' + S + '/>' +
        '<ellipse cx="44" cy="36" rx="9" ry="5" fill="#fff" opacity=".6" transform="rotate(-30 44 36)"/>' +
        '<circle cx="74" cy="32" r="3" fill="#fff" opacity=".8"/>' + face(60, 52, 12);
    },
    hoshi: function (c1, c2) {
      return '<path d="M86 70 l22 -6 l-10 14 l12 6 l-24 2z" fill="' + c2 + '" ' + S + '/>' +
        '<polygon points="' + star(60, 26, 16, 7) + '" fill="#FFE34D" ' + S + '/>' +
        '<ellipse cx="60" cy="68" rx="32" ry="30" fill="' + c1 + '" ' + S + '/>' +
        '<path d="M30 70 q-16 -2 -18 12 q12 4 22 -4z" fill="' + c2 + '" ' + S + '/>' +
        '<ellipse cx="60" cy="78" rx="18" ry="14" fill="#fff" opacity=".55"/>' +
        '<path d="M56 70 l8 0 l-4 7z" fill="#FF8A00" ' + S + ' stroke-width="2"/>' +
        '<ellipse cx="50" cy="60" rx="4.4" ry="6" fill="' + INK + '"/><ellipse cx="70" cy="60" rx="4.4" ry="6" fill="' + INK + '"/><circle cx="51.4" cy="58" r="1.6" fill="#fff"/><circle cx="71.4" cy="58" r="1.6" fill="#fff"/>' +
        '<path d="M48 100 l-3 10 M72 100 l3 10" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>';
    },
    fuwa: function (c1, c2) {
      return '<path d="M38 92 v14 M52 96 v12 M68 96 v12 M82 92 v14" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M30 60 a16 16 0 0 1 22 -22 a18 18 0 0 1 30 2 a16 16 0 0 1 16 24 a16 16 0 0 1 -8 28 a18 18 0 0 1 -28 6 a18 18 0 0 1 -28 -8 a16 16 0 0 1 -4 -30z" fill="' + c1 + '" ' + S + '/>' +
        '<path d="M34 40 q-12 -4 -10 8 q4 6 10 2 M86 40 q12 -4 10 8 q-4 6 -10 2" fill="none" stroke="' + c2 + '" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M34 40 q-12 -4 -10 8 q4 6 10 2 M86 40 q12 -4 10 8 q-4 6 -10 2" fill="none" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/>' +
        '<ellipse cx="60" cy="66" rx="20" ry="16" fill="' + INK + '"/>' +
        '<ellipse cx="52" cy="64" rx="3.6" ry="4.6" fill="#fff"/><ellipse cx="68" cy="64" rx="3.6" ry="4.6" fill="#fff"/>' +
        '<path d="M56 73 q4 3 8 0" stroke="#FF9FCB" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M88 24 l-6 12 h8 l-6 12" fill="none" stroke="#FFE34D" stroke-width="3" stroke-linejoin="round"/>';
    },
    chochin: function (c1, c2) {
      return '<rect x="46" y="14" width="28" height="10" rx="3" fill="' + INK + '"/>' +
        '<rect x="46" y="100" width="28" height="10" rx="3" fill="' + INK + '"/>' +
        '<ellipse cx="60" cy="62" rx="34" ry="40" fill="' + c1 + '" ' + S + '/>' +
        '<path d="M27 50 h66 M26 64 h68 M28 78 h64 M33 92 h54 M33 36 h54" stroke="' + INK + '" stroke-width="1.8" opacity=".35"/>' +
        '<ellipse cx="44" cy="44" rx="8" ry="5" fill="#fff" opacity=".5" transform="rotate(-30 44 44)"/>' +
        '<ellipse cx="50" cy="58" rx="5" ry="7" fill="' + INK + '"/><ellipse cx="72" cy="58" rx="5" ry="7" fill="' + INK + '"/><circle cx="51.6" cy="55.6" r="1.8" fill="#fff"/><circle cx="73.6" cy="55.6" r="1.8" fill="#fff"/>' +
        '<path d="M52 72 q9 10 18 0 z" fill="' + INK + '"/><path d="M58 76 q4 10 8 0" fill="' + c2 + '" ' + S + ' stroke-width="2"/>' +
        '<path d="M60 110 q-3 6 0 10" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    },
    bitto: function (c1, c2) {
      return '<line x1="60" y1="22" x2="60" y2="8" stroke="' + INK + '" stroke-width="3"/><circle cx="60" cy="8" r="6" fill="' + c2 + '" ' + S + ' stroke-width="2.4"/>' +
        '<rect x="44" y="84" width="32" height="22" rx="6" fill="' + c2 + '" ' + S + '/>' +
        '<rect x="24" y="22" width="72" height="64" rx="16" fill="' + c1 + '" ' + S + '/>' +
        '<rect x="34" y="34" width="52" height="38" rx="9" fill="' + INK + '"/>' +
        '<rect x="44" y="44" width="8" height="10" fill="#00E5FF"/><rect x="68" y="44" width="8" height="10" fill="#00E5FF"/>' +
        '<rect x="52" y="60" width="16" height="4" fill="#FF2E93"/>' +
        '<rect x="14" y="48" width="10" height="16" rx="4" fill="' + c2 + '" ' + S + ' stroke-width="2.4"/><rect x="96" y="48" width="10" height="16" rx="4" fill="' + c2 + '" ' + S + ' stroke-width="2.4"/>' +
        '<circle cx="32" cy="28" r="2" fill="#fff" opacity=".8"/>';
    },
    hibana: function (c1, c2) {
      return '<path d="M60 108 C30 108 20 84 26 64 C30 50 38 46 36 30 L50 42 C54 34 58 26 60 14 C64 26 68 34 72 42 L84 30 C84 46 90 50 94 64 C100 84 90 108 60 108Z" fill="' + c1 + '" ' + S + '/>' +
        '<path d="M60 102 C44 102 38 90 42 78 C46 70 54 70 60 60 C66 70 74 70 78 78 C82 90 76 102 60 102Z" fill="' + c2 + '" opacity=".9"/>' +
        face(60, 76, 11, true) +
        '<circle cx="30" cy="22" r="3" fill="#FFE34D"/><circle cx="94" cy="18" r="2.4" fill="#FFE34D"/>';
    }
  };
  K.creature = function (art, c1, c2, opts) {
    opts = opts || {};
    if (art === 'momo' || !CREATURES[art]) return K.momo(opts.mood || 'happy', { cls: opts.cls });
    return '<svg class="crit-svg' + (opts.cls ? ' ' + opts.cls : '') + '" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' + CREATURES[art](c1 || '#00E5FF', c2 || '#FF2E93') + '</svg>';
  };
  K.CREATURE_NAMES = { momo: 'Momo', kurage: 'Kurage', hoshi: 'Hoshidori', fuwa: 'Fuwa', chochin: 'Chōchin', bitto: 'Bitto', hibana: 'Hibana' };

  /* ---------- Sammelkarte (eigenes Design) ---------- */
  var RAR = {}; K.RARITIES.forEach(function (r) { RAR[r.id] = r; });
  K.cardArtBg = function (c1, c2) {
    var g = nid('cb'), h = nid('ht');
    return '<svg class="tcg-bg" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
      '<radialGradient id="' + g + '" cx="50%" cy="55%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></radialGradient>' +
      '<pattern id="' + h + '" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="' + INK + '" opacity=".22"/></pattern></defs>' +
      '<rect width="100" height="80" fill="url(#' + g + ')"/>' +
      '<g stroke="#fff" stroke-width=".8" opacity=".55">' + (function () { var s = ''; for (var i = 0; i < 24; i++) { var a = i / 24 * Math.PI * 2; s += '<line x1="' + (50 + Math.cos(a) * 18).toFixed(1) + '" y1="' + (44 + Math.sin(a) * 18).toFixed(1) + '" x2="' + (50 + Math.cos(a) * 80).toFixed(1) + '" y2="' + (44 + Math.sin(a) * 80).toFixed(1) + '"/>'; } return s; })() + '</g>' +
      '<rect width="100" height="80" fill="url(#' + h + ')"/></svg>';
  };
  K.card = function (c, opts) {
    opts = opts || {};
    var r = RAR[c.rarity] || RAR.common;
    var setO = K.SETS.filter(function (s) { return s.id === c.set; })[0];
    var face = opts.back ? '' :
      '<div class="tcg-front">' +
        '<div class="tcg-head"><b class="tcg-name">' + c.name + '</b><span class="tcg-pwr">' + (c.pwr || 60) + '<small>PWR</small></span></div>' +
        '<div class="tcg-art">' + K.cardArtBg(c.c1, c.c2) + K.creature(c.art, c.c1, c.c2, { mood: c.rarity === 'gold' ? 'cheer' : 'wink' }) + (c.rarity === 'holo' ? '<i class="foil foil-art"></i>' : '') + '</div>' +
        '<div class="tcg-text"><p><b>Kira-Wirbel</b> <span>✦✦</span></p><p class="tcg-flavor">' + (opts.flavor || 'Leuchtet heller, je später die Nacht.') + '</p></div>' +
        '<div class="tcg-foot"><span>' + (setO ? setO.id : 'KIRA') + ' ' + (c.no || '000') + '</span><span class="tcg-sym" title="' + r.name + '">' + r.sym + '</span><span>' + (c.lang || 'JP') + '</span></div>' +
        (c.rarity !== 'common' && c.rarity !== 'holo' ? '<i class="foil"></i>' : '') + '<i class="glitter"></i><i class="glare"></i>' +
      '</div>';
    var back = '<div class="tcg-back" aria-hidden="true"><div class="tcg-back-in"><span class="tcg-back-k">キラ<br>キラ</span>' + K.momo('happy') + '<span class="tcg-back-t">KIRA KIRA</span></div><i class="glare"></i></div>';
    return '<div class="tcg r-' + c.rarity + (opts.cls ? ' ' + opts.cls : '') + '" style="--c1:' + c.c1 + ';--c2:' + c.c2 + '"' + (opts.attrs || '') + '>' +
      '<div class="tcg-rot">' + face + back + '</div></div>';
  };

  /* ---------- Produktgrafiken (neutrale, versiegelte Packs etc. im eigenen Design) ---------- */
  function setName(p) { var m = /„([^“]+)“/.exec(p.name); return m ? m[1] : 'KIRA'; }
  function crit(p, x, y, s) {
    var inner;
    if (p.art === 'momo') inner = K.momo('wink').replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    else if (CREATURES[p.art]) inner = CREATURES[p.art](p.c1, p.c2);
    else inner = K.momo('happy').replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + inner + '</g>';
  }
  function txt(x, y, s, t, fill, extra) {
    return '<text x="' + x + '" y="' + y + '" font-family="Dela Gothic One, sans-serif" font-size="' + s + '" fill="' + (fill || '#fff') + '" text-anchor="middle" ' + (extra || '') + '>' + t + '</text>';
  }
  K.productArt = function (p) {
    var g = nid('pg'), h = nid('ph'), sh = nid('ps');
    var defs = '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + p.c1 + '"/><stop offset="1" stop-color="' + p.c2 + '"/></linearGradient>' +
      '<linearGradient id="' + h + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".55"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<pattern id="' + sh + '" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1" fill="#140A2E" opacity=".18"/></pattern></defs>';
    var b = '', sn = setName(p);
    var art = p.art, t = p.type;
    if (t === 'booster') {
      b = '<path d="M52 18 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 V182 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 Z" fill="url(#' + g + ')" ' + S + '/>' +
        '<rect x="52" y="18" width="96" height="164" fill="url(#' + sh + ')"/>' +
        '<rect x="52" y="30" width="96" height="16" fill="#140A2E" opacity=".85"/>' + txt(100, 43, 10, sn.toUpperCase(), '#fff') +
        crit(p, 62, 58, .64) +
        '<rect x="52" y="140" width="96" height="22" fill="#fff" opacity=".9"/>' + txt(100, 156, 11, 'BOOSTER', '#140A2E') +
        txt(100, 176, 8, '新弾 · ' + p.lang, '#fff') +
        '<rect x="52" y="18" width="96" height="164" fill="url(#' + h + ')" class="sheen"/>';
    } else if (t === 'display') {
      b = '<path d="M28 70 L100 52 L172 70 L172 172 L100 190 L28 172Z" fill="url(#' + g + ')" ' + S + '/>' +
        '<path d="M28 70 L100 52 L172 70 L100 88Z" fill="#140A2E" opacity=".9"/>' +
        (function () { var s = ''; for (var i = 0; i < 6; i++) { s += '<path d="M' + (44 + i * 20) + ' ' + (66 + Math.abs(2.5 - i) * -3 + 6) + ' l14 -4 v-12 l-14 4z" fill="' + (i % 2 ? p.c1 : p.c2) + '" stroke="#140A2E" stroke-width="1.5"/>'; } return s; })() +
        crit(p, 60, 94, .56) + '<rect x="28" y="150" width="144" height="16" fill="#140A2E" opacity=".85"/>' + txt(100, 162, 10, 'DISPLAY · ' + sn.toUpperCase(), '#fff');
    } else if (t === 'etb' || t === 'box') {
      b = '<rect x="30" y="40" width="140" height="140" rx="8" fill="url(#' + g + ')" ' + S + '/>' +
        '<rect x="30" y="40" width="140" height="34" rx="8" fill="#140A2E"/>' + txt(100, 63, 11, t === 'etb' ? 'ELITE BOX' : 'COLLECTION', '#fff') +
        '<rect x="30" y="74" width="140" height="106" fill="url(#' + sh + ')"/>' +
        crit(p, 54, 78, .76) + txt(100, 172, 10, sn.toUpperCase(), '#fff', 'stroke="#140A2E" stroke-width="3" paint-order="stroke"') +
        '<rect x="30" y="40" width="140" height="140" rx="8" fill="url(#' + h + ')" class="sheen"/>';
    } else if (t === 'figure') {
      b = '<ellipse cx="100" cy="170" rx="58" ry="14" fill="#140A2E"/><ellipse cx="100" cy="164" rx="58" ry="14" fill="url(#' + g + ')" ' + S + '/>' +
        crit(p, 34, 24, 1.1) +
        '<polygon points="' + star(160, 40, 9, 3.5) + '" fill="#FFE34D"/><polygon points="' + star(40, 60, 6, 2.5) + '" fill="#fff"/>';
    } else if (t === 'plush') {
      b = crit(p, 30, 28, 1.16) + '<rect x="128" y="132" width="26" height="34" rx="4" fill="#fff" ' + S + ' stroke-width="2" transform="rotate(12 141 149)"/>' + txt(142, 154, 9, 'もち', '#FF2E93', 'transform="rotate(12 141 149)"');
    } else if (t === 'manga') {
      b = '<rect x="46" y="20" width="112" height="164" rx="4" fill="#140A2E"/><rect x="52" y="20" width="106" height="164" rx="3" fill="url(#' + g + ')" ' + S + '/>' +
        '<g stroke="#fff" stroke-width="1.4" opacity=".5">' + (function () { var s = ''; for (var i = 0; i < 18; i++) { var a = i / 18 * Math.PI * 2; s += '<line x1="' + (105 + Math.cos(a) * 20).toFixed(0) + '" y1="' + (100 + Math.sin(a) * 20).toFixed(0) + '" x2="' + (105 + Math.cos(a) * 90).toFixed(0) + '" y2="' + (100 + Math.sin(a) * 90).toFixed(0) + '"/>'; } return s; })() + '</g>' +
        (art === 'manga1' ? '<path d="M80 150 l20 -70 l10 0 l-8 30 l30 -40 l6 4 l-26 50 l20 26z" fill="#140A2E"/><circle cx="118" cy="62" r="16" fill="#fff"/>' : '<circle cx="105" cy="104" r="34" fill="#fff" ' + S + '/><path d="M80 104 h50" stroke="#140A2E" stroke-width="3"/><polygon points="' + star(105, 90, 10, 4) + '" fill="#FFE34D" ' + S + ' stroke-width="2"/>') +
        '<rect x="140" y="26" width="14" height="78" fill="#fff"/><text x="147" y="40" font-family="Dela Gothic One, sans-serif" font-size="11" fill="#140A2E" text-anchor="middle" style="writing-mode:vertical-rl">' + (art === 'manga1' ? 'ネオン浪人' : '星の台所') + '</text>' +
        txt(98, 176, 13, art === 'manga1' ? 'NEON RONIN' : 'STERNENKÜCHE', '#fff', 'stroke="#140A2E" stroke-width="3" paint-order="stroke"');
    } else if (art === 'sleeves') {
      b = [0, 1, 2].map(function (i) { return '<rect x="' + (44 + i * 18) + '" y="' + (28 + i * 10) + '" width="84" height="124" rx="6" fill="' + (i === 2 ? 'url(#' + g + ')' : i ? p.c2 : p.c1) + '" ' + S + ' transform="rotate(' + (-10 + i * 8) + ' 100 100)"/>'; }).join('') +
        '<rect x="80" y="48" width="84" height="124" rx="6" fill="url(#' + h + ')" transform="rotate(6 100 100)"/>' + txt(122, 120, 14, '100', '#140A2E', 'transform="rotate(6 100 100)"');
    } else if (art === 'toploader') {
      b = '<rect x="50" y="18" width="100" height="166" rx="6" fill="#fff" fill-opacity=".35" ' + S + '/><rect x="60" y="28" width="80" height="112" rx="4" fill="url(#' + g + ')" stroke="#140A2E" stroke-width="2"/>' +
        crit({ art: 'momo' }, 68, 40, .54) + '<rect x="50" y="18" width="100" height="166" rx="6" fill="url(#' + h + ')"/>' + txt(100, 170, 10, '35PT', '#140A2E');
    } else if (art === 'binder') {
      b = '<rect x="36" y="22" width="132" height="162" rx="14" fill="url(#' + g + ')" ' + S + '/><path d="M40 30 q-8 70 0 146" stroke="#E6FF00" stroke-width="4" stroke-dasharray="4 4" fill="none"/>' +
        '<rect x="56" y="40" width="96" height="120" rx="8" fill="#140A2E"/>' +
        (function () { var s = ''; for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) s += '<rect x="' + (62 + c * 30) + '" y="' + (46 + r * 38) + '" width="24" height="33" rx="2" fill="' + ['#FF2E93', '#00E5FF', '#E6FF00', '#9D4DFF'][(r * 3 + c) % 4] + '"/>'; return s; })();
    } else {
      b = '<path d="M50 70 L110 44 L160 66 L100 92Z" fill="' + p.c2 + '" ' + S + '/><path d="M50 70 L100 92 V170 L50 148Z" fill="url(#' + g + ')" ' + S + '/><path d="M100 92 L160 66 V146 L100 170Z" fill="' + p.c1 + '" ' + S + '/>' +
        crit({ art: 'momo' }, 52, 98, .4) + txt(130, 124, 10, 'MAG', '#140A2E');
    }
    return '<svg class="prod-svg" viewBox="0 0 200 200" role="img" aria-label="Produktgrafik: ' + p.name.replace(/"/g, '') + '">' + defs + b + '</svg>';
  };

  /* ---------- Bild-Platzhalter / echtes Bild ---------- */
  K.ph = function (id, opts) {
    opts = opts || {};
    var im = K.IMAGES[id] || { motif: '', ratio: '4/3' };
    var alt = opts.alt || im.motif;
    if (im.ready) {
      return '<img class="kimg ' + (opts.cls || '') + '" src="' + (K.IMG_BASE || 'img/') + id.toLowerCase() + '-640.webp" srcset="' + (K.IMG_BASE || 'img/') + id.toLowerCase() + '-640.webp 640w, ' + (K.IMG_BASE || 'img/') + id.toLowerCase() + '-' + (im.big || 1200) + '.webp ' + (im.big || 1200) + 'w" sizes="' + (opts.sizes || '(max-width: 700px) 92vw, 40vw') + '" loading="lazy" decoding="async" alt="' + alt + '" style="aspect-ratio:' + im.ratio + (im.lqip ? ';background-image:url(' + im.lqip + ');background-size:cover' : '') + '">';
    }
    return '<div class="ph ' + (opts.cls || '') + '" style="aspect-ratio:' + im.ratio + '" role="img" aria-label="Bild-Platzhalter ' + id + ': ' + alt + '"><span class="ph-id">' + id + '</span><span class="ph-motif">' + im.motif + '</span></div>';
  };
})(window.KIRA = window.KIRA || {});
