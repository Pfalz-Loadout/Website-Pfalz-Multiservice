/* KIRA KIRA · Musterdesign · alle Produkte, Preise, Bewertungen und Events sind frei erfunden.
   Spiel- und Markennamen erscheinen nur als Text (Kategorie / Produktname). Alle Motive sind eigene Designs. */
(function (K) {
  'use strict';

  /* ---------- Spiele, Produktarten, Filterwerte ---------- */
  K.GAMES = [
    { id: 'pkm', name: 'Pokémon TCG', short: 'Pokémon', c1: '#FFD23F', c2: '#FF2E93' },
    { id: 'op', name: 'One Piece Card Game', short: 'One Piece', c1: '#FF5A36', c2: '#9D4DFF' },
    { id: 'ygo', name: 'Yu-Gi-Oh!', short: 'Yu-Gi-Oh!', c1: '#9D4DFF', c2: '#00E5FF' },
    { id: 'dbs', name: 'Dragon Ball Super', short: 'Dragon Ball', c1: '#FF8A00', c2: '#E6FF00' },
    { id: 'lor', name: 'Disney Lorcana', short: 'Lorcana', c1: '#00E5FF', c2: '#9D4DFF' },
    { id: 'kira', name: 'KIRA KIRA Merch', short: 'Merch', c1: '#FF2E93', c2: '#00E5FF' }
  ];
  K.TYPES = [
    { id: 'booster', name: 'Booster' },
    { id: 'display', name: 'Display' },
    { id: 'etb', name: 'Elite-Trainer-Box' },
    { id: 'box', name: 'Box & Kollektion' },
    { id: 'single', name: 'Einzelkarte' },
    { id: 'figure', name: 'Figur' },
    { id: 'manga', name: 'Manga' },
    { id: 'plush', name: 'Plüsch' },
    { id: 'acc', name: 'Zubehör' }
  ];
  K.LANGS = ['JP', 'EN', 'DE'];
  K.RARITIES = [
    { id: 'common', name: 'Common', sym: '●' },
    { id: 'holo', name: 'Holo', sym: '★' },
    { id: 'reverse', name: 'Reverse Holo', sym: '☆' },
    { id: 'fullart', name: 'Full Art', sym: '★★' },
    { id: 'gold', name: 'Gold', sym: '♛' }
  ];
  K.CONDITIONS = [
    { id: 'sealed', name: 'Versiegelt', short: 'OVP' },
    { id: 'new', name: 'Neu', short: 'NEU' },
    { id: 'nm', name: 'Near Mint', short: 'NM' },
    { id: 'ex', name: 'Excellent', short: 'EX' },
    { id: 'gd', name: 'Good', short: 'GD' },
    { id: 'lp', name: 'Light Played', short: 'LP' },
    { id: 'pl', name: 'Played', short: 'PL' }
  ];
  K.GRADES = ['Raw', 'PSA 10', 'PSA 9', 'CGC 10', 'CGC 9.5'];

  /* ---------- Fiktive Sets ---------- */
  K.SETS = [
    { id: 'NBF', name: 'Nebelfunken', game: 'pkm' },
    { id: 'KRF', name: 'Kristallflut', game: 'pkm' },
    { id: 'MDS', name: 'Mondscherben', game: 'pkm' },
    { id: 'GLK', name: 'Glutkrone', game: 'op' },
    { id: 'SAR', name: 'Schattenarchiv', game: 'ygo' },
    { id: 'STR', name: 'Sternenriss', game: 'dbs' },
    { id: 'TMR', name: 'Tintenmeer', game: 'lor' }
  ];

  /* ---------- Produkte (Sealed, Merch, Zubehör) ----------
     art: Motiv der eigenen SVG-Produktgrafik · img: Bild-Platzhalter-ID für das spätere Foto */
  var P = [
    { id: 'p01', img: 'P01', game: 'pkm', type: 'booster', lang: 'JP', name: 'Booster „Nebelfunken“', price: 6.9, stock: 140, art: 'kurage', c1: '#00E5FF', c2: '#9D4DFF', tag: '新入荷', isNew: 1, pop: 98,
      content: ['5 Karten pro Booster', 'Mindestens 1 Holo oder besser', 'Japanische Ausgabe'] },
    { id: 'p02', img: 'P02', game: 'pkm', type: 'display', lang: 'JP', name: 'Display „Nebelfunken“ (30 Booster)', price: 159, stock: 6, art: 'kurage', c1: '#00E5FF', c2: '#9D4DFF', tag: 'HOT', isNew: 1, pop: 95,
      content: ['30 Booster à 5 Karten', 'Original versiegelt (Shrink)', 'Japan-Import, Versand im Karton mit Kantenschutz'] },
    { id: 'p03', img: 'P03', game: 'pkm', type: 'etb', lang: 'DE', name: 'Elite-Trainer-Box „Kristallflut“', price: 59.9, stock: 18, art: 'hoshi', c1: '#FFD23F', c2: '#FF2E93', tag: 'HOT', pop: 92,
      content: ['9 Booster', '65 Kartenhüllen', '45 Energiekarten', 'Würfel, Marker & Aufbewahrungsbox'] },
    { id: 'p04', img: 'P04', game: 'pkm', type: 'booster', lang: 'DE', name: 'Booster „Kristallflut“', price: 5.49, stock: 300, art: 'hoshi', c1: '#FFD23F', c2: '#FF2E93', pop: 80,
      content: ['10 Karten pro Booster', 'Deutsche Ausgabe'] },
    { id: 'p05', img: 'P05', game: 'op', type: 'booster', lang: 'EN', name: 'Booster „Glutkrone“', price: 5.9, stock: 90, art: 'hibana', c1: '#FF5A36', c2: '#9D4DFF', isNew: 1, pop: 88,
      content: ['12 Karten pro Booster', 'Englische Ausgabe'] },
    { id: 'p06', img: 'P06', game: 'op', type: 'display', lang: 'JP', name: 'Display „Glutkrone“ (24 Booster)', price: 119, stock: 3, art: 'hibana', c1: '#FF5A36', c2: '#9D4DFF', tag: '限定', pop: 90,
      content: ['24 Booster à 6 Karten', 'Japan-Import', 'Limitierte Erstauflage'] },
    { id: 'p07', img: 'P07', game: 'ygo', type: 'booster', lang: 'DE', name: 'Booster „Schattenarchiv“', price: 4.49, stock: 210, art: 'chochin', c1: '#9D4DFF', c2: '#00E5FF', pop: 70,
      content: ['9 Karten pro Booster', 'Deutsche 1. Auflage'] },
    { id: 'p08', img: 'P08', game: 'ygo', type: 'display', lang: 'DE', name: 'Display „Schattenarchiv“ (24 Booster)', price: 79.9, stock: 9, art: 'chochin', c1: '#9D4DFF', c2: '#00E5FF', pop: 72,
      content: ['24 Booster à 9 Karten', 'Deutsche 1. Auflage', 'Versiegelt'] },
    { id: 'p09', img: 'P09', game: 'dbs', type: 'booster', lang: 'EN', name: 'Booster „Sternenriss“', price: 4.99, stock: 120, art: 'bitto', c1: '#FF8A00', c2: '#E6FF00', pop: 60,
      content: ['12 Karten pro Booster', 'Englische Ausgabe'] },
    { id: 'p10', img: 'P10', game: 'dbs', type: 'display', lang: 'EN', name: 'Display „Sternenriss“ (24 Booster)', price: 99, stock: 0, art: 'bitto', c1: '#FF8A00', c2: '#E6FF00', pop: 58,
      content: ['24 Booster à 12 Karten', 'Englische Ausgabe'] },
    { id: 'p11', img: 'P11', game: 'lor', type: 'booster', lang: 'DE', name: 'Booster „Tintenmeer“', price: 6.49, stock: 75, art: 'fuwa', c1: '#00E5FF', c2: '#9D4DFF', isNew: 1, pop: 77,
      content: ['12 Karten pro Booster', 'Deutsche Ausgabe'] },
    { id: 'p12', img: 'P12', game: 'lor', type: 'box', lang: 'DE', name: 'Schatzkiste „Tintenmeer“', price: 54.9, stock: 11, art: 'fuwa', c1: '#00E5FF', c2: '#FFD23F', pop: 74,
      content: ['8 Booster', 'Spielmarken & Lore-Zähler', 'Stabile Aufbewahrungsbox'] },
    { id: 'p13', img: 'P13', game: 'pkm', type: 'box', lang: 'JP', name: 'High-Class-Box „Mondscherben“', price: 89, stock: 25, art: 'hoshi', c1: '#9D4DFF', c2: '#FFD23F', tag: '限定', preorder: 'r1', pop: 99,
      content: ['10 Booster', '1 Promo-Karte (fiktiv)', 'Japan-Import, Vorbestellung'] },
    { id: 'p14', img: 'P14', game: 'kira', type: 'figure', lang: 'JP', name: 'Vinylfigur „Momo · Neon Edition“ 12 cm', price: 34.9, stock: 40, art: 'momo', c1: '#FF2E93', c2: '#00E5FF', tag: 'NEU', isNew: 1, pop: 94,
      content: ['Vinyl, handbemalt', 'Leuchtet im Dunkeln', 'Mit Sammelbox'] },
    { id: 'p15', img: 'P15', game: 'kira', type: 'figure', lang: 'JP', name: 'Resin-Figur „Momo Galaxy“', price: 79, stock: 4, art: 'momo', c1: '#9D4DFF', c2: '#00E5FF', tag: '限定', pop: 81,
      content: ['Klares Resin mit Galaxie-Einschluss, 18 cm', 'Leuchtsockel mit LED', 'Limitiert auf 300 Stück, nummeriertes Zertifikat'] },
    { id: 'p16', img: 'P16', game: 'kira', type: 'manga', lang: 'DE', name: 'Manga „Neon Ronin“ Band 1', price: 7.99, stock: 60, art: 'manga1', c1: '#FF2E93', c2: '#140A2E', pop: 66,
      content: ['192 Seiten', 'Deutsche Ausgabe', 'Erste Auflage mit Farbseiten'] },
    { id: 'p17', img: 'P17', game: 'kira', type: 'manga', lang: 'JP', name: 'Manga „Sternenküche“ Band 3 (JP)', price: 9.5, stock: 14, art: 'manga2', c1: '#FFD23F', c2: '#00A3B5', isNew: 1, pop: 55,
      content: ['208 Seiten', 'Japanische Originalausgabe'] },
    { id: 'p18', img: 'P18', game: 'kira', type: 'plush', lang: 'JP', name: 'Plüsch „Momo Mochi“ 25 cm', price: 24.9, stock: 33, art: 'momo', c1: '#FF9FCB', c2: '#FF2E93', tag: 'HOT', pop: 97,
      content: ['Super weich, Mochi-Füllung', 'Stern-Stickerei', 'Ab 3 Jahren'] },
    { id: 'p19', img: 'P19', game: 'kira', type: 'plush', lang: 'JP', name: 'Plüsch „Chōchin Lampion“ 20 cm', price: 19.9, stock: 12, art: 'chochin', c1: '#FF5A36', c2: '#FFD23F', pop: 63,
      content: ['Mit Leuchtfaden-Details', 'Ab 3 Jahren'] },
    { id: 'p20', img: 'P20', game: 'kira', type: 'acc', lang: 'DE', name: 'Kartenhüllen „Holo Pink“ (100 Stück)', price: 9.9, stock: 200, art: 'sleeves', c1: '#FF2E93', c2: '#FFD23F', pop: 85,
      content: ['Standardgröße 66 × 91 mm', 'Matte Rückseite', 'Säurefrei'] },
    { id: 'p21', img: 'P21', game: 'kira', type: 'acc', lang: 'DE', name: 'Toploader 35pt (25 Stück)', price: 4.9, stock: 500, art: 'toploader', c1: '#00E5FF', c2: '#FFFFFF', pop: 89,
      content: ['Hartplastik, glasklar', 'Für Standardkarten mit Hülle'] },
    { id: 'p22', img: 'P22', game: 'kira', type: 'acc', lang: 'DE', name: 'Binder „Neon Night“ 9-Pocket', price: 29.9, stock: 22, art: 'binder', c1: '#9D4DFF', c2: '#E6FF00', tag: 'NEU', isNew: 1, pop: 79,
      content: ['360 Karten, seitlich befüllbar', 'Reißverschluss', 'Säurefreie Taschen'] },
    { id: 'p23', img: 'P23', game: 'kira', type: 'acc', lang: 'DE', name: 'Deckbox „Momo Mag“', price: 14.9, stock: 41, art: 'deckbox', c1: '#FF2E93', c2: '#9D4DFF', pop: 64,
      content: ['Für 100 Karten mit Hülle', 'Magnetverschluss'] },
    { id: 'p24', img: 'P24', game: 'kira', type: 'acc', lang: 'DE', name: 'Kartenhüllen Japan-Größe (60 Stück)', price: 7.9, stock: 90, art: 'sleeves', c1: '#00E5FF', c2: '#9D4DFF', pop: 57,
      content: ['62 × 89 mm', 'Für japanische Karten'] },
    { id: 'p25', img: 'P25', game: 'kira', type: 'acc', lang: 'DE', name: 'Magnet-Case One-Touch 35pt', price: 3.5, stock: 160, art: 'toploader', c1: '#E6FF00', c2: '#FFFFFF', pop: 76,
      content: ['UV-Schutz', 'Magnetverschluss'] },
    { id: 'p26', img: 'P26', game: 'op', type: 'box', lang: 'JP', name: 'Premium-Kollektion „Wellenbrecher“', price: 69, stock: 30, art: 'hibana', c1: '#00A3FF', c2: '#FF5A36', preorder: 'r6', pop: 84,
      content: ['6 Booster', '2 Promo-Karten (fiktiv)', 'Vorbestellung'] },
    { id: 'p27', img: 'P27', game: 'lor', type: 'display', lang: 'EN', name: 'Display „Tintenmeer“ (24 Booster)', price: 129, stock: 40, art: 'fuwa', c1: '#00E5FF', c2: '#9D4DFF', preorder: 'r3', pop: 73,
      content: ['24 Booster à 12 Karten', 'Englische Ausgabe', 'Vorbestellung'] },
    { id: 'p28', img: 'P28', game: 'pkm', type: 'etb', lang: 'EN', name: 'Elite-Trainer-Box „Polarlicht“', price: 54.9, stock: 50, art: 'fuwa', c1: '#9D4DFF', c2: '#00E5FF', preorder: 'r7', pop: 86,
      content: ['9 Booster', 'Hüllen, Würfel & Marker', 'Vorbestellung'] }
  ];
  P.forEach(function (p) { p.kind = 'product'; p.cond = p.type === 'figure' || p.type === 'plush' || p.type === 'manga' || p.type === 'acc' ? 'new' : 'sealed'; });

  /* ---------- Einzelkarten (eigene, erfundene Kartenmotive) ---------- */
  var S = [
    ['s01', 'Momo, Funkelgeist', 'pkm', 'NBF', '001', 'gold', 'nm', 'PSA 10', 249, 'momo', '#FF2E93', '#FFD23F', 'JP'],
    ['s02', 'Kurage der Tiefe', 'pkm', 'NBF', '014', 'fullart', 'nm', 'Raw', 64.9, 'kurage', '#00E5FF', '#9D4DFF', 'JP'],
    ['s03', 'Hoshidori', 'pkm', 'KRF', '033', 'holo', 'nm', 'Raw', 12.5, 'hoshi', '#FFD23F', '#FF8A00', 'DE'],
    ['s04', 'Fuwa Wolkenschaf', 'pkm', 'KRF', '051', 'reverse', 'ex', 'Raw', 3.9, 'fuwa', '#B8F1FF', '#9D4DFF', 'DE'],
    ['s05', 'Chōchin Wächter', 'ygo', 'SAR', '007', 'gold', 'nm', 'CGC 9.5', 139, 'chochin', '#FF5A36', '#FFD23F', 'DE'],
    ['s06', 'Bitto-Maschine', 'dbs', 'STR', '088', 'holo', 'gd', 'Raw', 6.5, 'bitto', '#9D4DFF', '#00E5FF', 'EN'],
    ['s07', 'Hibana Glutfuchs', 'op', 'GLK', '102', 'fullart', 'nm', 'PSA 9', 89, 'hibana', '#FF5A36', '#FF2E93', 'JP'],
    ['s08', 'Kurage Nachtlicht', 'lor', 'TMR', '019', 'reverse', 'nm', 'Raw', 8.9, 'kurage', '#00A3FF', '#E6FF00', 'DE'],
    ['s09', 'Momo im Konbini', 'pkm', 'MDS', '120', 'fullart', 'nm', 'CGC 10', 179, 'momo', '#00E5FF', '#FF2E93', 'JP'],
    ['s10', 'Hoshidori Sternregen', 'pkm', 'MDS', '044', 'holo', 'lp', 'Raw', 7.5, 'hoshi', '#9D4DFF', '#FFD23F', 'EN'],
    ['s11', 'Bitto Turbo', 'dbs', 'STR', '011', 'common', 'nm', 'Raw', 0.9, 'bitto', '#FF8A00', '#00E5FF', 'EN'],
    ['s12', 'Fuwa Gewitter', 'lor', 'TMR', '077', 'gold', 'nm', 'PSA 10', 210, 'fuwa', '#FFD23F', '#9D4DFF', 'EN'],
    ['s13', 'Chōchin Laterne', 'ygo', 'SAR', '041', 'common', 'pl', 'Raw', 0.5, 'chochin', '#FF2E93', '#FF8A00', 'DE'],
    ['s14', 'Hibana Funkenflug', 'op', 'GLK', '056', 'holo', 'ex', 'Raw', 14.9, 'hibana', '#FF8A00', '#E6FF00', 'EN'],
    ['s15', 'Kurage Mondtanz', 'pkm', 'NBF', '063', 'reverse', 'gd', 'Raw', 2.9, 'kurage', '#FF9FCB', '#00E5FF', 'JP'],
    ['s16', 'Momo Party', 'pkm', 'KRF', '150', 'holo', 'nm', 'PSA 9', 39.9, 'momo', '#FFD23F', '#FF2E93', 'DE'],
    ['s17', 'Bitto Neonwerk', 'ygo', 'SAR', '099', 'fullart', 'lp', 'Raw', 24.9, 'bitto', '#00E5FF', '#FF2E93', 'EN'],
    ['s18', 'Hoshidori König', 'dbs', 'STR', '001', 'gold', 'ex', 'CGC 9.5', 119, 'hoshi', '#FFD23F', '#FF5A36', 'JP'],
    ['s19', 'Fuwa Schlummer', 'pkm', 'MDS', '022', 'common', 'nm', 'Raw', 0.7, 'fuwa', '#E8F7FF', '#FF9FCB', 'JP'],
    ['s20', 'Hibana Kaiserin', 'op', 'GLK', '120', 'gold', 'nm', 'PSA 10', 320, 'hibana', '#FF2E93', '#FFD23F', 'JP'],
    ['s21', 'Chōchin Geisterfest', 'lor', 'TMR', '034', 'holo', 'nm', 'Raw', 9.9, 'chochin', '#9D4DFF', '#FF5A36', 'DE'],
    ['s22', 'Kurage Prisma', 'ygo', 'SAR', '070', 'reverse', 'ex', 'Raw', 4.5, 'kurage', '#E6FF00', '#00E5FF', 'EN'],
    ['s23', 'Momo Kira Kira', 'op', 'GLK', '001', 'fullart', 'nm', 'Raw', 54, 'momo', '#9D4DFF', '#FF2E93', 'EN'],
    ['s24', 'Bitto Mini', 'pkm', 'KRF', '009', 'common', 'lp', 'Raw', 0.4, 'bitto', '#00E5FF', '#FFD23F', 'DE']
  ].map(function (a, i) {
    return { id: a[0], kind: 'single', type: 'single', name: a[1], game: a[2], set: a[3], no: a[4], rarity: a[5], cond: a[6], grade: a[7], price: a[8],
      art: a[9], c1: a[10], c2: a[11], lang: a[12], stock: i % 7 === 3 ? 0 : 1 + (i % 3), pop: 50 + ((i * 37) % 50), isNew: i % 4 === 0 ? 1 : 0,
      pwr: 30 + ((i * 47) % 17) * 10 };
  });

  K.PRODUCTS = P;
  K.SINGLES = S;
  K.ALL = P.concat(S);
  K.byId = {};
  K.ALL.forEach(function (x) { K.byId[x.id] = x; });

  /* ---------- Datumshilfen: Release-Kalender und Events bleiben immer in der Zukunft ---------- */
  function atDay(offset, h, m) {
    var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + offset);
    if (h != null) d.setHours(h, m || 0, 0, 0);
    return d;
  }
  function nextWeekday(fromOffset, wd) { // 0 = So … 5 = Fr, 6 = Sa
    var d = atDay(fromOffset); var diff = (wd - d.getDay() + 7) % 7; return fromOffset + diff;
  }
  K.atDay = atDay;

  K.RELEASES = [
    { id: 'r1', set: 'Mondscherben', game: 'pkm', lang: 'JP', day: nextWeekday(4, 5), product: 'p13', note: 'High-Class-Box mit Promo-Karte' },
    { id: 'r2', set: 'Glutkrone · Teil 2', game: 'op', lang: 'JP', day: nextWeekday(10, 6), product: null, note: 'Booster & Display' },
    { id: 'r3', set: 'Tintenmeer', game: 'lor', lang: 'EN', day: nextWeekday(17, 5), product: 'p27', note: 'Display, Starter-Decks' },
    { id: 'r4', set: 'Schattenarchiv Deluxe', game: 'ygo', lang: 'DE', day: nextWeekday(24, 4), product: null, note: 'Sammelbox mit Secret Rares' },
    { id: 'r5', set: 'Sternenriss II', game: 'dbs', lang: 'EN', day: nextWeekday(31, 5), product: null, note: 'Booster & Display' },
    { id: 'r6', set: 'Wellenbrecher', game: 'op', lang: 'JP', day: nextWeekday(45, 6), product: 'p26', note: 'Premium-Kollektion' },
    { id: 'r7', set: 'Polarlicht', game: 'pkm', lang: 'EN', day: nextWeekday(59, 5), product: 'p28', note: 'Elite-Trainer-Box & Booster' }
  ].map(function (r) { r.date = atDay(r.day, 0, 0); return r; });

  K.EVENTS = [
    { id: 'e1', title: 'Trade-Night', game: 'all', day: nextWeekday(1, 5), h: 18, m: 0, end: '22:00', fee: 0, spots: 40, taken: 27, img: 'E01',
      text: 'Bring deinen Binder, tausch mit der Community. Unser Team prüft auf Wunsch Zustand und Echtheit am Tauschtisch.' },
    { id: 'e2', title: 'One Piece Store-Turnier', game: 'op', day: nextWeekday(2, 6), h: 13, m: 0, end: 'ca. 18:00', fee: 8, spots: 24, taken: 21, img: 'E02',
      text: 'Swiss-Format, 4 Runden plus Top 8. Preise in Store-Gutschrift, Teilnahme-Promo für alle (fiktiv).' },
    { id: 'e3', title: 'Pokémon Prerelease „Mondscherben“', game: 'pkm', day: nextWeekday(3, 0), h: 11, m: 0, end: 'ca. 16:00', fee: 32, spots: 32, taken: 32, img: 'E03',
      text: 'Bau dein Deck aus 6 Boostern und spiel 4 Runden. Inklusive Prerelease-Kit.' },
    { id: 'e4', title: 'Lorcana League', game: 'lor', day: nextWeekday(4, 3), h: 18, m: 30, end: '21:30', fee: 5, spots: 20, taken: 9, img: 'E04',
      text: 'Lockerer Liga-Abend für Einsteiger und Profis. Leihdecks vorhanden.' },
    { id: 'e5', title: 'Yu-Gi-Oh! Locals', game: 'ygo', day: nextWeekday(8, 6), h: 14, m: 0, end: 'ca. 19:00', fee: 6, spots: 28, taken: 12, img: 'E05',
      text: 'Advanced-Format, Best of 3. Deckliste bitte vorab mitbringen.' },
    { id: 'e6', title: 'Trade-Night Japan Special', game: 'all', day: nextWeekday(8, 5), h: 18, m: 0, end: '22:00', fee: 0, spots: 40, taken: 15, img: 'E06',
      text: 'Fokus auf Japan-Karten: Grading-Sprechstunde, Tausch-Bingo und Momo-Gacha mit Sticker-Preisen.' }
  ].map(function (e) { e.date = atDay(e.day, e.h, e.m); return e; });

  /* ---------- Bild-Platzhalter ---------- */
  K.IMAGES = {
    H01: { motif: 'Neon-Straße bei Nacht, Akihabara-Stimmung, nasse Straße mit Spiegelungen', ratio: '16/9' },
    A01: { motif: 'Sammlung in Bindern und Kartons auf dem Ankaufstisch, Draufsicht', ratio: '4/3' },
    L01: { motif: 'Ladeninneres: Regalwand mit versiegelten Displays, Neonlicht', ratio: '4/3' },
    L02: { motif: 'Theke mit Vitrine für gegradete Karten, Gacha-Automat daneben', ratio: '4/3' },
    L03: { motif: 'Ladenfront bei Dämmerung mit Neonschild', ratio: '4/3' },
    S01: { motif: 'Hände öffnen einen Booster, Holo-Glitzer', ratio: '1/1' },
    S02: { motif: 'Binder-Seite mit bunten Holo-Karten (eigene Motive)', ratio: '1/1' },
    S03: { motif: 'Plüsch-Momo auf der Ladentheke', ratio: '1/1' },
    S04: { motif: 'Turnier-Tische mit Spielmatten, Vogelperspektive', ratio: '1/1' },
    S05: { motif: 'Gegradete Karte im Slab unter Neonlicht', ratio: '1/1' },
    S06: { motif: 'Gacha-Kapseln in Pastellfarben, Makro', ratio: '1/1' },
    S07: { motif: 'Trade-Night: Binder auf dem Tisch, Neonlicht im Hintergrund', ratio: '1/1' }
  };
  P.forEach(function (p) { K.IMAGES[p.img] = { motif: 'Produktfoto: ' + p.name, ratio: '1/1' }; });
  /* Echte Bilder in img/: <id>-640.webp und <id>-<big>.webp, lqip = 16-px-Vorschau als Base64 */
  var READY = {
    "P17": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAAAQAgCdASoQABAAA4BaJbACdAEN559LQf4AAP722XA0hJ0iHi9ycsM9w1jq9BpOu7ZpGOECRrwFa349jr3jtUU5WH8MHVOoyBxu8kG7Z3KjE6LH7XegZ+BOeV9/GCRC06af5JO4FwcmDGI1pnXSRKQAAAA=",
    "P18": "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAABQAgCdASoQABAAA4BaJbACdAYtBt9m6bxhlEAA/vaOVoMMi+XfKZCu62au8p84T8422V/0z/qIv9R7a8TirxtEMBpfE23t+Fxbmpv8z/CKNGiJzLP/FDJMUCIm7g5P2naKn4koPkZ4IFG+yg0L6dw5XTajy6QA",
    "P19": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwAQCdASoQABAAA4BaJbACdAD5PIWqUdgA/veCW/oyOc2V+kJAP37RDqJH/O6I69UtTKqPNrgH5j80P9QH8fo0q+YLhsB9AdAFmt4q9XJWuctlDaBjK1lCYEtwofDtLQxVglZjAAA=",
    "P20": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAwAgCdASoQABAAA4BaJbACdDBEwV03nCL/UAD+94JascQ7og3uxOUX+INZL9jsBv8r8cGFDepwqR5AxoKC7RFdqLzDkTR3IKWifJZjPybfz+1hrieMzt/u+H3rS+Dz2ldTanhQAAA=",
    "P21": "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAACQAgCdASoQABAAA4BaJbACdDiAN5aBY+E0GFVoAAD+94IJuB5UQTqj1oGIGrfKvpQ/ns+I/mBrexKl7/xmInyqmJdJ+MDhpfFTTojVxMYF+MF69ZbDa7tm77b9PWk2GnqfHA/I8FMH6fME96+yEyRdPAtD5aABRAdZHpuiNr0YPIAA",
    "P22": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAwAgCdASoQABAAA4BaJbACdAYwdvt3QQQU6AD+7FrIxD1wWPWbo2VqPUyPjxwau0GI10MLcNY1ShzH1byAWhI40QSv1vOCyQPdmhEFqzc0xRKxeu+sPgF1pQhMMiOots6PT9A6/AAAAA==",
    "P23": "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoQABAAA4BaJbACdAEQUHvBmAAA/vbg7yIDNBkNYT2Rn9CaD37uzlJNo6GtlCV+nZPkFLjkdv5pqbrZGQBUGtAxG0Nyj9jOcj+1C33j87376SOAAAA=",
    "P24": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAABQAgCdASoQABAAA4BaJbACdGaAAwTexEZzsAAA/veA0O0LKKlE9/8m8lWV44eN0h86bI6pw5NGJYV2wyg8wxD1yLSKTOJdj9/dajPdMOf17cn5aeU1/sf/osmJD/6+AAA=",
    "P25": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwAQCdASoQABAAA4BaJbACdADwx4mVTIAA/vfAJVmH77VrmmqPUm4WYE/prIaV3QSlYHmqcuYTeVXY+cHd2hA2xB0d3kob36uv58FX8v1d0/fODIHg+/Cfr9ESz5mftkNcOqdsAAA=",
    "P26": "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAACQAgCdASoQABAAA4BaJbACdDiK94jBqSkzy70niAD+9KEH0KPhndfNzucq+6j2ZI8zMYnWt75cL3IcuR8sSu/JkXiRPUQFm3muYAQRJ/w6I4e3mHDn1t6vjywrgadQkUilKe/b7q9wli96k3xgU0OVLR6T6DL6+pvsek+uMeiZOVRnRZAAAA==",
    "P27": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAADwAQCdASoQABAAA4BaJbACdADHpNJkzAAA/vXu6TXoG+VTdknk/6XnUWnX32Ww/fbgFs0zbJg6Tx+E4tsFa5YldUEve0ieUjxNDZN03wQAbt5acK8mYM0Mjg/7rF79aVxb1/7F0/dbCKSMpy8wivkwUzemGj8aBgUEE90IAAA=",
    "P28": "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAQAgCdASoQABAAA4BaJbACdAENvdJejjOAAP722SfX5teA1LPI9wTKLROqzpRmkkCidB6AGKOxYvg78aiY3K8pufxlR7rCFBMUf+pefKIuMf3YXs8w+zxmieW00eoOuS8fjIMcryYKreAA",
    "P15": "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAQAgCdASoQABAAA4BaJbACdAEU2zcy2F+iAP72qXLupQh8inZ5vrGMmdXTnNMl17R064oadp/QdIb8MtJ5Q8etLWDoNv3SfrTH8T4tFzsyF854AAA=",
    "P14": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAwAgCdASoQABAAA4BaJbACdAEPApfm0V4IAAD+9qup9v1lKz2dCLHPjuQwJDvw9T+EQrucXi3ViSEDgpCjBaAIkYFlYoK31VrzdJ+tMxiMgCl3g7JbZMQF1gTvgAAA",
    "P01": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADQAQCdASoQABAAA4BaJbACdADwwXKnAAD+94IJtbrfeY2soPgp7tpL9ap/MmJCtcJe1g23o3ks9oq+G2GiwOD6Pi2S08K+FNiv9hXJx4OM/v+ZxIAAAA==",
    "P12": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQAgCdASoQABAAA4BaJbACdAEUpF5g3X6bvIgA/vG8u9v3JjJ5i6N0JaIJbkqa4LzUqvb+qd4EPmOgdLg+tGfzEj9kJkyMZoHoMflw8vcpxRjuzi8oA7MTWUUx+xZzMGogI3aSmgA=",
    "P13": "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAwAgCdASoQABAAA4BaJbACdAEQSbuDuEVeYAD+8by72/cmMnmJNoZuQ5mc6IcnG9x6BBgmUYS9e0VHpWm1oHAq3BYTc5GdZTRa7Ibe7F68g73bSIlRhjaAqe+izcOoMOO3f9ejoaz4VjrgAAA=",
    "P10": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAQAgCdASoQABAAA4BaJbACdAEO7YhYDkjoAP724vpscHBPjArQebmkuJZWTx3w2s7Sah/miSww0qdfn1Mh5mpU1Iu+7zTRcRPXdGSi9SCtaMNCTqntbjpwTr61NZkVpO0IeisMKnaoNp9LlCQAAA==",
    "P09": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADQAQCdASoQABAAA4BaJbACdADw2z7NAAD+94JCqDjFR+o1gzznm5XzNHYbTjfLM/WhP8MUsPToGOvx515/SduRYBm1+LKyaJklBgZ/YEezMYFGbAkwAzs+vrKL2AAA",
    "P08": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABwAgCdASoQABAAA4BaJbACdAYvhv1hHLU7A97AAP70t7iC+hDwtvwUPWHVpTqdjaRt6HbTQeqDTbJG1Z4nembrm5xzOaZ2+No6LgimXNowVyCh9PWl7E4eDNLl0fD4pey/+9L3qpPuvRtEH7AAAA==",
    "P07": "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoQABAAA4BaJbACdADwt5YJxAAA/veCQqg4xUfqNYM85+IPo9X2MvuZMEA67ZuWA28/b2DljAPPF3OkLiNfTO/HgivWi/2xowwAAA==",
    "P06": "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAwAgCdASoQABAAA4BaJbACdAEPdrCgr2U3cAD+81SGem117jRRsHimP3DsLxxphUOv77y9h+j8I2qroosCYV5Mn95Nae3A3+slenmmyol+JTzhpoybKBsnaYfOvMfAzbYn40CuJkAAAA==",
    "P05": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAQAgCdASoQABAAA4BaJbACdAEXeSvNTaqAAP72k+c0bxYx17999Nd8TELVeNUoByjx454CaMnmzYE0HXJ7RjodGVsaez1VbTCB8cZqK30MZmD9h8AAAA==",
    "P02": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQAgCdASoQABAAA4BaJbACdAECmEkQabAAAP712tvWT8zWxMoIj7rkg7hgzbUxarX64JZkqDPoEQ0edst0khHhZrGIPUD5l4AtdZly0WpD8zkD9+6OgwfL+qG27Bg/BAA=",
    "P03": "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAABwAgCdASoQABAAA4BaJbACdFQAA5dFq5+JMThgAP7zXunK0R9JjMER2/22cdeE3D+8Pju7feo7fP1VoQngf5sdLfEw2Vu73LAWAucvB2naHH8QAFKT64AlAack/oSNnbRn9F2dupOu2DNEBtHk9R5njQrIUv8IB7/pJAAA",
    "P04": "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQAgCdASoQABAAA4BaJbACdGaAAq7x2n+oAP72khZ+r9n1V+YwKF5JZQDiZxVNAGPzOtev48D7b7EEYQxzlvcqywcsWJt1M9cahe59i/ESHgy1zUJsi7nR7+lr9dWUYAA=",
    "P11": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAQAgCdASoQABAAA4BaJbACdH8AFjG+WTAAAP72k323yz2ICWXXOvNHDJR7CHoaCO7HT5DzYKoQAO0jry8DQ3qsGwIci/t+R3fd2RgAAAA=",
    "S06": "data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAAAQAgCdASoQABAAA4BaJQBOgMV4q7/RiPZAAP6XCEHHoKM9zA8vby+44fkQaDsgJtlN97P9Fy8WDvtgzdfv86erNn0FpiLOUlNUgMSKMZ7zlhGzUj353eGFI1IK6PHLzbvJZ80Bxx8suB6cRpIOC32Zzof2a8eygUvMmwwyC1OnAGYAAAA=",
    "S02": "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAQAwCdASoQABAAA4BaJbACdH8G6AuwDeXUaARJAVEMCNAA/u0nYY4G/rX0ltj0M3ygDIas4GkZzUO/8B2wvgOPK/GyR98W2YMlNbqgtvJ5ra5xnUSDUUJMd4pOnnIceFfkk9H9KCET67TPl4fipceS8bQAAA==",
    "S04": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABwAgCdASoQABAAA4BaJQBOgMY750qpnJ1HsLzgAP7vW5lONvrrXEwxCjecIeuoRzfLN06gH16Jg8J+6nZJOJkCqfPudW5JFqTylXF9AT+yFjr6UMFtiU12vPD4BTBFE29akWbs0M9CTOouKncSRlAA",
    "L03": "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQAgCdASoQAAwAA4BaJYwC7AYvXvt58AfkY4gA/on8/kv5Ivx/xNrtMTehemz39xFmg/UeYpY5IzeBoLXfSR+cN8BpfeMWyYuMofz9tsi9JRI7HqPCkmqhvAOsqGcMfhjs1FU9AAA="
    };
  var BIG = {"P17": 1024, "P18": 1024, "P19": 1024, "P20": 1024, "P21": 1024, "P22": 1024, "P23": 1024, "P24": 1024, "P25": 1024, "P26": 1024, "P27": 1024, "P28": 1024, "P15": 1024, "P14": 1024, "P01": 1024, "P12": 1024, "P13": 1024, "P10": 1024, "P09": 1024, "P08": 1024, "P07": 1024, "P06": 1024, "P05": 1024, "P02": 1024, "P03": 1024, "P04": 1024, "P11": 1024, "S06": 1024, "S02": 1024, "S04": 1024, "L03": 1200};
  Object.keys(READY).forEach(function (id) { var im = K.IMAGES[id]; if (!im) return; im.ready = true; im.lqip = READY[id]; im.big = BIG[id] || 1200; });

  /* ---------- FAQ ---------- */
  K.FAQ = [
    { cat: 'Versand', q: 'Wie schnell kommt meine Bestellung?', a: 'Bestellungen bis 14 Uhr verschicken wir am selben Werktag. Innerhalb Deutschlands dauert der Versand meist 1–2 Werktage.' },
    { cat: 'Versand', q: 'Ist der Versand versichert?', a: 'Ja. Jede Sendung ist versichert und mit Sendungsverfolgung unterwegs. Ab 60 € versenden wir kostenlos, darunter kostet der Versand 4,90 €.' },
    { cat: 'Kartenschutz', q: 'Wie werden Einzelkarten verpackt?', a: 'Jede Einzelkarte steckt in einer Hülle und einem Toploader, beides zusammen in einer Schutztasche und zwischen zwei Kartonplatten. Gegradete Karten reisen in Luftpolster.' },
    { cat: 'Kartenschutz', q: 'Kommen Displays mit geknickten Ecken an?', a: 'Nein. Displays und Boxen versenden wir im Umkarton mit Kantenschutz. Sollte trotzdem etwas beschädigt ankommen, melde dich mit Fotos innerhalb von 7 Tagen.' },
    { cat: 'Echtheit', q: 'Woher weiß ich, dass die Karten echt sind?', a: 'Wir kaufen Ware nur von Distributoren und geprüften Sammlungen. Jede Einzelkarte über 20 € wird unter Lupe und Licht geprüft. Dafür gibt es unsere Echtheitsgarantie.' },
    { cat: 'Echtheit', q: 'Was bedeutet PSA oder CGC?', a: 'Das sind unabhängige Grading-Firmen. Sie bewerten den Zustand einer Karte auf einer Skala bis 10 und versiegeln sie in einem Slab. Raw heißt: ungegradet.' },
    { cat: 'Rückgabe', q: 'Kann ich Ware zurückgeben?', a: 'Ungeöffnete Ware kannst du innerhalb von 14 Tagen zurückschicken. Geöffnete Booster sind aus Fairness-Gründen vom Umtausch ausgeschlossen.' },
    { cat: 'Vorbestellung', q: 'Wann zahle ich bei einer Vorbestellung?', a: 'Du zahlst bei der Bestellung. Am Release-Tag geht deine Ware als Erstes raus. Ändert sich der Termin, informieren wir dich per E-Mail.' },
    { cat: 'Vorbestellung', q: 'Kann ich eine Vorbestellung stornieren?', a: 'Ja, bis 14 Tage vor Release kostenlos. Danach sind die Mengen beim Händler fest bestellt.' }
  ];

  K.MARQUEE_A = ['NEU EINGETROFFEN', '新入荷', 'JAPAN IMPORT', 'PREORDER OFFEN', '限定', 'TRADE-NIGHT FREITAG', 'キラキラ'];
  K.MARQUEE_B = ['VERSICHERTER VERSAND', '安心', 'ECHTHEITSGARANTIE', 'ANKAUF VON SAMMLUNGEN', 'ガチャ', 'GRATIS-VERSAND AB 60 €', 'PSA · CGC'];

  K.FREE_SHIP = 60;
  K.SHIP_COST = 4.9;
})(window.KIRA = window.KIRA || {});
