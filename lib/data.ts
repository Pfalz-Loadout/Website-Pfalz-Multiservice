import { tidyDeep } from "./typo";
// Inhalte 1:1 aus dem UI-Kit (ui_kits/website/data.jsx)
export const IMG = "/images/";

export const CONTACT = {
  phone: "+49 160 5086983",
  phoneHref: "tel:+491605086983",
  email: "kontakt@pfalz-multiservice.de",
  city: "67551 Worms",
  whatsapp: "https://wa.me/491605086983",
};

export type IconName =
  | "shopping-cart" | "recycle" | "warehouse" | "truck" | "monitor-cog" | "wrench"
  | "lightbulb" | "layers" | "file-check" | "map-pin" | "message-circle" | "phone"
  | "mail" | "check" | "arrow-right" | "chevron-down" | "chevron-right"
  | "circle-arrow-right" | "star" | "menu" | "x" | "arrow-up" | "external-link" | "layout-template"
  | "clapperboard" | "camera" | "pen-tool" | "languages"
  | "key-round" | "lock-keyhole" | "folder-code" | "copyright" | "search-check" | "clipboard-list" | "gauge" | "pencil-line";

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  short: string;
  text: string;
  image: string;
  side?: boolean;
  /** eigene Zielseite statt /leistungen/<id> */
  href?: string;
  /** Meta-Beschreibung (max. ca. 155 Zeichen) */
  seo?: string;
  /** Seitentitel im Suchergebnis mit Ort (max. ca. 38 Zeichen, „ · Pfalz Multiservice“ kommt dazu) */
  seoTitle?: string;
  /** Häufige Fragen auf der Leistungsseite */
  faq?: Faq[];
  /** Kasten „Typische Anliegen“ auf der Leistungsseite */
  points?: { title: string; items: string[]; note?: string };
  /** Kleingedrucktes unter dem Inhalt (z. B. Markenhinweis) */
  legal?: string;
};

export type Faq = [question: string, answer: string];

/** Angaben zum Unternehmen für „Über uns“, Footer und strukturierte Daten */
export const COMPANY = {
  owner: "Jasmin Beer",
  founded: "2021",
  hours: "Termine nach Vereinbarung",
  /** Ortsmitte Worms (bewusst ohne Straße) */
  geo: { latitude: 49.6341, longitude: 8.3507 },
};

const PRICE_FAQ = (what: string): Faq => [
  `Was kostet ${what}?`,
  "Nach einer kurzen Bedarfsanalyse erhalten Sie ein verbindliches Angebot. Sie kennen Umfang und Kosten, bevor wir beginnen – ohne versteckte Posten.",
];

export const SERVICES: Service[] = tidyDeep([
  {
    id: "web",
    seo: "Webdesign und Website-Wartung aus Worms: individuelle Websites ab 99 €, Betreuung ab 19 € im Monat. Persönlich, ohne Baukasten.",
    href: "/webdesign",
    icon: "monitor-cog",
    title: "Web Maintenance & Management",
    short: "Stabile Systeme, aktuelle Inhalte",
    text: "Laufende technische Betreuung von Websites und Online-Shops: Updates, Sicherheitsmonitoring, Content-Pflege und Systemverwaltung. Aus dem Betrieb eigener E-Commerce-Plattformen bringen wir praxisnahes Know-how mit.",
    image: IMG + "webseite-laptop.png",
  },
  {
    id: "reselling",
    seoTitle: "Reselling & Restpostenankauf Worms",
    faq: [
      ["Welche Ware kaufen Sie an?", "Überbestände, Restposten und Retourenware. Schildern Sie uns kurz Art, Menge und Zustand – am besten mit ein paar Fotos."],
      ["Was passiert mit der angekauften Ware?", "Wir bereiten sie auf und bringen sie über unsere eigenen Vertriebskanäle zurück in den Markt, statt sie abzuschreiben oder zu entsorgen."],
      ["Welche Vorteile habe ich als Händler?", "Gebundenes Kapital wird schnell wieder flüssig, Lagerfläche wird frei und die Ware wird weiter genutzt statt vernichtet."],
    ],
    seo: "Reselling & Asset Recovery: Wir kaufen Überbestände, Restposten und Retouren an und bringen sie zurück in den Markt. Schnelle Liquidität aus Worms.",
    icon: "recycle",
    title: "Reselling & Asset Recovery",
    short: "Werterhalt statt Abschreibung",
    text: "Überbestände, Restposten und Retourenware binden Kapital und Lagerfläche. Wir kaufen Warenbestände an, bereiten sie auf und führen sie über unsere Vertriebskanäle in den Markt zurück. Für unsere Partner bedeutet das schnelle Liquidität, reduzierte Lagerkosten und einen nachhaltigen Umgang mit Ressourcen.",
    image: IMG + "reselling-ware.png",
  },
  {
    id: "ecommerce",
    seoTitle: "E-Commerce & Fulfillment in Worms",
    faq: [
      ["Was umfasst der Bereich E-Commerce?", "Den gesamten Ablauf im Online-Handel: Beschaffung, Listing der Artikel, Verkauf und Fulfillment, also Lagerung, Verpackung und Versand."],
      ["Verkaufen Sie über eigene Shops oder über Marktplätze?", "Beides. Wir betreiben eigene Online-Shops und nutzen zusätzlich etablierte Marktplätze. So erreichen Artikel mehr Käufer, ohne dass die Abläufe aufwendig werden."],
      PRICE_FAQ("die Unterstützung im E-Commerce"),
    ],
    seo: "E-Commerce aus Worms: eigene Online-Shops und Marktplätze, Listing, Versand und Fulfillment aus einer Hand. Pfalz Multiservice – jetzt anfragen.",
    icon: "shopping-cart",
    title: "E-Commerce",
    short: "Digitaler Handel mit Fokus auf Effizienz",
    text: "Wir betreiben eigene E-Commerce-Plattformen und vertreiben unsere Sortimente über Online-Shops sowie etablierte Marktplätze. Unser Multichannel-Ansatz ermöglicht eine breite Marktabdeckung bei schlanken Prozessen, von der Beschaffung über das Listing bis zum Fulfillment.",
    image: IMG + "ecommerce-shop.png",
  },
  {
    id: "storage",
    seoTitle: "Lagerfläche mieten in Worms",
    faq: [
      ["Für wen ist die Lagerfläche gedacht?", "Für Gewerbekunden mit saisonalen Spitzen ebenso wie für Privatkunden in Übergangsphasen, etwa bei Umzug oder Renovierung."],
      ["Wie lange kann ich einlagern?", "Kurzfristig oder langfristig – die Fläche richtet sich nach Ihrem Bedarf und ist ohne starre Vertragsbindung."],
      PRICE_FAQ("die Lagerfläche"),
    ],
    seo: "Lagerfläche in Worms nach Bedarf: für Gewerbe mit Saisonspitzen und Privatkunden in Übergangsphasen, ohne starre Vertragsbindung. Jetzt anfragen.",
    icon: "warehouse",
    title: "Storage Solutions",
    short: "Lagerkapazität nach Bedarf",
    text: "Wir stellen Lagerflächen für temporäre und langfristige Anforderungen bereit, skalierbar und ohne starre Vertragsbindung. Für Gewerbekunden mit saisonalen Spitzen ebenso wie für Privatkunden in Übergangsphasen.",
    image: IMG + "storage-unit.png",
  },
  {
    id: "clearance",
    seoTitle: "Räumung & Entrümpelung in Worms",
    faq: [
      ["Welche Flächen räumen Sie?", "Garagen, Lager, Hallen und Gewerbeflächen in Worms und der Pfalz – vollständig bis zur besenreinen Übergabe."],
      ["Wie läuft eine Räumung ab?", "Bestandsaufnahme vor Ort, verbindliches Festpreis-Angebot, Durchführung zum vereinbarten Termin und besenreine Übergabe."],
      ["Was passiert mit dem Räumgut?", "Verwertbare Bestände führen wir in den Wirtschaftskreislauf zurück, alles Weitere wird fachgerecht entsorgt."],
    ],
    seo: "Räumung von Garagen, Lagern, Hallen und Gewerbeflächen in Worms und der Pfalz: Festpreis-Angebot, fachgerechte Verwertung, besenreine Übergabe.",
    icon: "truck",
    title: "Clearance Services",
    short: "Strukturierte Räumung, fachgerechte Verwertung",
    text: "Vollständige Räumung von Garagen, Lagern, Hallen und Gewerbeflächen: Bestandsaufnahme, verbindliches Angebot, Durchführung und besenreine Übergabe. Verwertbare Bestände werden in den Wirtschaftskreislauf zurückgeführt, alles Weitere fachgerecht entsorgt.",
    image: IMG + "transporter-verladung.png",
  },
  {
    id: "facility",
    seoTitle: "Solutions & Support in Worms",
    faq: [
      ["Bei welchen Anliegen helfen Sie?", "Bei kurzfristigen Engpässen, organisatorischen Aufgaben und Anliegen, für die es sonst keinen passenden Ansprechpartner gibt."],
      ["Wie gehen Sie vor?", "Wir sehen uns die Situation an, schlagen eine pragmatische Lösung vor und setzen sie um. Bei Bedarf binden wir Partner aus unserem Netzwerk ein."],
      PRICE_FAQ("ein Einsatz"),
    ],
    seo: "Solutions & Support aus Worms: pragmatische Lösungen für Engpässe und Aufgaben ohne passenden Ansprechpartner. Pfalz Multiservice – jetzt anfragen.",
    icon: "wrench",
    title: "Solutions & Support",
    short: "Für jede Aufgabe eine schnelle Lösung",
    text: "Nicht jede Anforderung passt in eine feste Kategorie. Ob kurzfristiger Engpass, organisatorische Herausforderung oder ein Anliegen, für das es keinen passenden Ansprechpartner gibt: Wir analysieren die Situation, entwickeln eine pragmatische Lösung und setzen sie zuverlässig um. Flexibel, lösungsorientiert und mit einem Netzwerk, das wir bei Bedarf einbinden.",
    image: IMG + "wartung-technik.png",
  },
  {
    id: "smarthome",
    seoTitle: "KNX-Anlage ändern & erweitern Worms",
    faq: [
      ["Was kostet eine Änderung an meiner KNX-Anlage?", "Änderungen gibt es ab 59 €. Nach einer kurzen, ehrlichen Einschätzung erhalten Sie vorab einen Festpreis."],
      ["Ich habe keine Projektdatei mehr. Geht das trotzdem?", "Projektdatei vorhanden? Super. Wenn nicht, finden wir eine Lösung. Schildern Sie uns kurz Ihre Anlage, dann sagen wir Ihnen ehrlich, was möglich ist."],
      ["Übernehmen Sie auch Elektroinstallation oder Planung?", "Nein. Wir programmieren und ändern bestehende KNX-Anlagen. Elektroinstallation und die Planung neuer Anlagen gehören nicht zu unserem Angebot."],
      ["Wie läuft ein Auftrag ab?", "Sie schildern uns Ihr Anliegen, wir geben Ihnen eine ehrliche Einschätzung, Sie erhalten vorab einen Festpreis, und wir setzen um, testen und übergeben."],
    ],
    seo: "KNX-Anlage ändern oder erweitern ab 59 €: Lichtszenen, Jalousien, neue Geräte, Fehlersuche. Programmierung bestehender Anlagen in Worms und der Pfalz.",
    side: true,
    icon: "lightbulb",
    title: "Smart Home & KNX",
    short: "KNX-Anlagen ändern und erweitern ab 59 €",
    text: "Sie haben eine KNX-Anlage und brauchen Hilfe? Wir programmieren und ändern Ihre bestehende Anlage – schnell, fair und ohne Fachchinesisch. Der Elektriker ist nicht mehr erreichbar, die Programmierung nicht auffindbar oder die Anlage soll einfach etwas Neues können? Schildern Sie uns kurz Ihr Anliegen, wir sagen Ihnen ehrlich, was möglich ist.",
    points: {
      title: "Typische Anliegen",
      items: [
        "Lichtszenen, Zeitschaltungen und Automatisierungen anpassen oder neu anlegen",
        "Jalousien- und Beschattungssteuerung ändern",
        "Neue Geräte in Ihre bestehende Anlage einbinden",
        "Funktionen umprogrammieren, die nicht mehr wie gewünscht laufen",
        "Fehlersuche, wenn Ihre Anlage nicht mehr richtig reagiert",
        "Sicherung (Backup) Ihrer KNX-Projektdatei",
      ],
      note: "Projektdatei vorhanden? Super – wenn nicht, finden wir eine Lösung. Wir programmieren und ändern, Elektroinstallation gehört nicht zu unserem Angebot.",
    },
    legal: "KNX ist eine eingetragene Marke der KNX Association.",
    image: IMG + "smarthome-knx.png",
  },
]);

/** Link einer Leistung: eigene Seite (z. B. /webdesign) oder /leistungen/<id> */
export const serviceHref = (s: Service) => s.href ?? `/leistungen/${s.id}`;

/** Kacheln auf der Startseite */
export function homeServiceOrder(): Service[] {
  // Reihenfolge wie SERVICES: Hauptthemen Web, Reselling, E-Commerce zuerst
  return SERVICES.filter((s) => !s.side);
}

export const USPS: { title: string; text: string; lines?: [string, string] }[] = tidyDeep([
  { title: "Alles aus einer Hand", text: "Ein Kontakt für alle Aufgaben\nstatt vieler einzelner Dienstleister.", lines: ["Ein Kontakt für alle Aufgaben statt", "vieler einzelner Dienstleister."] },
  { title: "Verbindliche Angebote", text: "Sie kennen Umfang und Kosten,\nbevor wir beginnen.", lines: ["Sie kennen Umfang und Kosten,", "bevor wir beginnen."] },
  { title: "Schnell vor Ort", text: "Regional in Worms verankert und\nkurzfristig einsatzbereit.", lines: ["Regional in Worms verankert und", "kurzfristig einsatzbereit."] },
]);

export const STEPS: [string, string, string][] = tidyDeep([
  ["01", "Anfrage", "Sie schildern Ihr Anliegen per Formular, Telefon oder WhatsApp."],
  ["02", "Bedarfsanalyse", "Persönliches Gespräch oder Besichtigung vor Ort."],
  ["03", "Angebot", "Verbindlich und mit transparentem Leistungsumfang."],
  ["04", "Umsetzung", "Termingerecht, und wir bleiben Ihr Ansprechpartner."],
]);

/** Häufige Fragen auf der Startseite */
export const HOME_FAQ: Faq[] = tidyDeep([
  ["Welche Leistungen bietet Pfalz Multiservice an?", "Web Maintenance & Management mit Webdesign, Reselling & Asset Recovery, E-Commerce sowie Lagerfläche, Räumungen, Solutions & Support und Änderungen an bestehenden KNX-Anlagen – alles mit einem Ansprechpartner."],
  ["In welchem Gebiet sind Sie tätig?", "In Worms und der Umgebung, unter anderem in Frankenthal, Ludwigshafen, Mannheim, Alzey, Grünstadt und Bensheim. Webdesign bieten wir auch überregional an."],
  ["Arbeiten Sie für Firmen und Privatkunden?", "Ja. Wir arbeiten für Unternehmen ebenso wie für Privatkunden, zum Beispiel bei Lagerung oder Räumung."],
  ["Wie läuft eine Anfrage ab?", "Sie schildern Ihr Anliegen per Formular, Telefon oder WhatsApp. Nach einem Gespräch oder einer Besichtigung erhalten Sie ein verbindliches Angebot, danach setzen wir den Auftrag termingerecht um."],
  ["Was kostet ein Auftrag?", "Das hängt vom Umfang ab. Sie erhalten vorab ein verbindliches Angebot und kennen die Kosten, bevor wir beginnen. Für Websites gibt es Festpreise ab 99 €."],
  ["Wann sind Sie erreichbar?", "Telefonisch und per WhatsApp unter +49 160 5086983 oder per E-Mail an kontakt@pfalz-multiservice.de. Termine vor Ort vereinbaren wir individuell."],
]);

export const AREA = ["Worms", "Frankenthal", "Ludwigshafen", "Mannheim", "Alzey", "Grünstadt", "Bensheim"];

export const FOOTER_TEXT = tidyDeep(
  "Von E-Commerce und Warenankauf über Lagerung und Räumung bis zur Betreuung von Websites und Objekten: Pfalz Multiservice bündelt Dienstleistungen für Unternehmen und Privatkunden in der Region Worms.");

export const CTA = tidyDeep({
  title: "Lassen Sie uns über Ihr",
  highlight: "Vorhaben sprechen",
  intro: "Schildern Sie uns kurz Ihr Anliegen. Wir melden uns zeitnah mit einem passenden Lösungsvorschlag.",
});

/** Webdesign-Musterdesigns (statische Seiten unter public/beispiele/<slug>) */
export type Example = {
  slug: string;
  name: string;
  branch: string;
  text: string;
  tags: string[];
};

export const EXAMPLES: Example[] = tidyDeep([
  {
    slug: "weingut",
    name: "Weingut Hollerbach",
    branch: "Weingut · Südliche Weinstraße",
    text: "Editorial-Design mit großer Serifen-Typografie: Weinkarte mit Filter, Porträts der Lagen und Buchung von Weinproben.",
    tags: ["Editorial Design", "Weinkarte", "Weinprobe buchen"],
  },
  {
    slug: "autovermietung",
    name: "Rheinfront Drive",
    branch: "Premium-Autovermietung · Worms",
    text: "Showroom bei Nacht: 3D-Lichtinszenierung, Flotte mit Filter, Anlässe, Ablauf und transparente Mietpreise.",
    tags: ["3D / WebGL", "Fahrzeugfilter", "Dark Design"],
  },
  {
    slug: "restaurant",
    name: "Gasthaus Zum Rebstock",
    branch: "Gehobene Pfälzer Küche · Deidesheim",
    text: "Warme Gasthaus-Atmosphäre mit Live-Öffnungsstatus, Speisekarte, Karte der Partnerhöfe und Raumplan für Feiern.",
    tags: ["Live-Öffnungszeiten", "Speisekarte", "Tischreservierung"],
  },
  {
    slug: "elektriker",
    name: "Elektro Kaiser",
    branch: "Elektro · Photovoltaik · Smart Home",
    text: "Interaktives 3D-Haus mit Energiefluss, PV-Rechner, Tagesverlauf der Anlage und Smart-Home-Szenen.",
    tags: ["3D-Energiefluss", "PV-Rechner", "Smart Home"],
  },
]);

/** Klassische Musterdesigns mit Menü – Unterseiten für den Seiten-Umschalter */
export type ClassicExample = Example & {
  pages: { key: string; label: string; path: string }[];
};

export const CLASSIC_EXAMPLES: ClassicExample[] = tidyDeep([
  {
    slug: "seifenmanufaktur",
    name: "Honigstück",
    branch: "Seifenmanufaktur · Online-Shop",
    text: "Ruhiger, warmer Online-Shop: Produktfilter, Warenkorb, Geschenkideen und eine Karte, woher die Zutaten kommen.",
    tags: ["6 Seiten", "Produktfilter", "Warenkorb"],
    pages: [
      { key: "start", label: "Start", path: "" },
      { key: "shop", label: "Shop", path: "" },
      { key: "geschenke", label: "Geschenke", path: "" },
      { key: "zutaten", label: "Zutaten", path: "" },
      { key: "manufaktur", label: "Manufaktur", path: "" },
      { key: "kontakt", label: "Kontakt", path: "" },
    ],
  },
  {
    slug: "beratungsbuero",
    name: "Umraum",
    branch: "Beratungsbüro · Ludwigshafen",
    text: "Seriöser Auftritt für ein Beratungsbüro: Leistungen mit Schnell-Check, Projekte mit Vorher-Nachher-Grundriss, klarer Ablauf und Team.",
    tags: ["6 Seiten", "Schnell-Check", "Projektgalerie"],
    pages: [
      { key: "start", label: "Start", path: "" },
      { key: "leistungen", label: "Leistungen", path: "/leistungen" },
      { key: "projekte", label: "Projekte", path: "/projekte" },
      { key: "ablauf", label: "Ablauf", path: "/ablauf" },
      { key: "ueber-uns", label: "Über uns", path: "/ueber-uns" },
      { key: "kontakt", label: "Kontakt", path: "/kontakt" },
    ],
  },
]);

/** Webdesign-Seite: Pakete, Ablauf, FAQ */
export const WEB_PROBLEMS: [string, string][] = tidyDeep([
  ["Veraltete Website", "Die Seite ist in die Jahre gekommen, lädt langsam und ist auf dem Smartphone kaum zu bedienen."],
  ["Kaum Anfragen", "Besucher finden nicht schnell genug, was Sie anbieten und wie man Sie erreicht."],
  ["Baukasten-Look", "Eine Vorlage von der Stange: Ihr Betrieb sieht aus wie tausend andere."],
  ["Keine Zeit", "Texte, Bilder, Technik, Updates: Neben dem Tagesgeschäft bleibt die Website liegen."],
]);

export type WebPackage = { name: string; price: string; unit?: string; note: string; items: string[]; badge?: string };
/** Inhalte 1:1 aus der Preisliste (Preisliste_Pfalz-Multiservice.pdf, Stand 28.10.2026) */
export const WEB_PACKAGES: WebPackage[] = tidyDeep([
  {
    name: "Start", price: "99 €", unit: "einmalig", note: "OnePager · bis 5 Abschnitte",
    items: ["Alle Inhalte übersichtlich auf einer Seite", "Ideal für Gründer, Selbstständige und Vereine", "Alle Inklusivleistungen", "Übergabe-Paket"],
  },
  {
    name: "Business", price: "149 €", unit: "einmalig", note: "OnePager oder mehrseitige Website · bis 8 Seiten", badge: "Beliebt",
    items: ["Als OnePager oder mit mehreren Seiten und Menü", "Ideal für Handwerk, Gastronomie und Dienstleister", "Alle Inklusivleistungen", "Übergabe-Paket"],
  },
  {
    name: "Shop / Premium", price: "individuell", unit: "nach Angebot", note: "Bis 20 Seiten, Online-Shop oder Sonderprojekt",
    items: ["Online-Shop oder umfangreiche Website", "Ideal für Händler und größere Angebote", "Alle Inklusivleistungen", "Übergabe-Paket"],
  },
]);

/** Betreuung nach dem Livegang */
export const WEB_CARE: WebPackage[] = tidyDeep([
  {
    name: "Wartung", price: "19 €", unit: "/ Monat", note: "Die Basis-Betreuung",
    items: ["Bis 1 Std. Änderungen pro Monat", "Domain- und E-Mail-Einrichtung"],
  },
  {
    name: "Wartung Pro", price: "29 €", unit: "/ Monat", note: "Für aktive Unternehmens-Websites",
    items: ["Bis 2 Std. Änderungen pro Monat", "KI-Fotos & 3D-Motion-Clips\nMenge nach Bedarf", "Google-Unternehmensprofil einrichten, optimieren & pflegen", "Einrichtung von Domain, E-Mail und Hosting"],
  },
  {
    name: "Wartung Premium", price: "69 €", unit: "/ Monat", note: "Für große Projekte mit viel Content",
    items: ["Bis 6 Std. Änderungen pro Monat", "Neue Inhalte mehrmals pro Woche: Beiträge, Einträge, Bilder", "Ideal für Blogs, Community- und Suchportale", "KI-Fotos & 3D-Motion-Clips im erweiterten Umfang", "Google-Unternehmensprofil einrichten, optimieren & pflegen", "Einrichtung von Domain, E-Mail und Hosting", "Bevorzugte Bearbeitung Ihrer Anfragen"],
  },
]);

/** In allen Paketen inklusive – ohne Aufpreis */
export const WEB_INCLUDED = tidyDeep([
  "Design für Smartphone und Desktop", "Menü und Navigation", "FAQ-Bereich", "Kontaktformular", "WhatsApp-Button",
  "Anfahrt mit Link zu Google Maps", "Social-Media-Links", "Texte erstellen oder\nalte Inhalte übernehmen",
  "Kuratierte Bildauswahl, professionell eingebunden", "SEO: Suchbegriffe und Meta-Texte", "Vorbereitet für Google- und KI-Suche",
  "Online-Terminbuchung", "Google-Bewertungen einbinden", "Vorher-Nachher-Galerie",
]);

/** Übergabe-Paket – in jedem Paket gleich enthalten */
export type HandoverItem = { icon: IconName; title: string; text: string };
export const WEB_FIX_DAYS = 30;
export const WEB_HANDOVER: { group: string; items: HandoverItem[] }[] = tidyDeep([
  {
    group: "Eigentum & Unabhängigkeit",
    items: [
      { icon: "key-round", title: "Domain & Hosting auf Ihren Namen", text: "Der Vertrag läuft direkt zwischen Ihnen und dem Anbieter, zum Beispiel IONOS, nicht über uns." },
      { icon: "lock-keyhole", title: "Alle Zugangsdaten gehören Ihnen", text: "Sicher bei der Übergabe überreicht, nicht im Klartext per E-Mail." },
      { icon: "folder-code", title: "Quellcode & Dateien", text: "Als ZIP oder Git-Repository, ohne Lock-in.\nSie können jederzeit wechseln." },
      { icon: "copyright", title: "Nutzungsrechte an Texten & Bildern", text: "Alles, was wir für Sie erstellen, dürfen Sie unbefristet nutzen." },
    ],
  },
  {
    group: "Dokumentation",
    items: [
      { icon: "search-check", title: "SEO- & KI-Dokumentation", text: "Prüfbericht mit 43 Punkten als PDF: wie Ihre Website für Google und die KI-Suche aufgestellt ist." },
      { icon: "clipboard-list", title: "Übergabeblatt", text: "Domain, Hosting, E-Mail-Postfach, Ziel des Kontaktformulars und Vertragslaufzeiten auf einen Blick." },
      { icon: "gauge", title: "PageSpeed-Messung", text: "Ladezeit auf Smartphone und Desktop, gemessen und dokumentiert zum Livegang." },
    ],
  },
  {
    group: "Nach dem Livegang",
    items: [
      { icon: "pencil-line", title: `${WEB_FIX_DAYS} Tage kostenlose Korrekturen`, text: "Kleine Korrekturen nach dem Livegang übernehmen wir ohne Berechnung." },
    ],
  },
]);

/** Zusatzleistungen – optional zu jedem Paket (Preise bewusst nicht auf der Website) */
export const WEB_ADDONS: { icon: IconName; title: string; text: string }[] = tidyDeep([
  { icon: "clapperboard", title: "3D Motion & Cinematic Video", text: "Animierte Website mit KI-Videoclips in Kino-Optik:\nDolly-Zoom, 360°-Orbit, FPV-Drohnenflug." },
  { icon: "camera", title: "KI-Fotografie in Studioqualität", text: "Fotorealistische Produkt- und Szenen-Shots mit\nRelight und Upscale, so viele, wie nötig." },
  { icon: "pen-tool", title: "Logo-Design", text: "Ein eigenes Logo für Ihren Auftritt." },
  { icon: "languages", title: "Mehrsprachigkeit", text: "Ihre Website zusätzlich in einer anderen Sprache." },
]);

export const WEB_STEPS: [string, string, string][] = tidyDeep([
  ["01", "Anfrage", "Sie schildern kurz Ihr Vorhaben, per Formular, Telefon oder WhatsApp. Kostenlos."],
  ["02", "Gespräch", "Wir klären gemeinsam, was Sie wirklich brauchen, und was nicht."],
  ["03", "Angebot", "Sie erhalten einen Festpreis mit klarem Leistungsumfang."],
  ["04", "Entwurf & Freigabe", "Sie sehen alles vorab. Nichts geht ohne Ihr OK online."],
  ["05", "Livegang", "Ihre Website geht online. Auf Wunsch betreuen wir sie danach weiter."],
]);

export const WEB_FAQ: [string, string][] = tidyDeep([
  ["Was kostet eine Website?", "Start (OnePager, bis 5 Abschnitte) kostet 99 €, Business (OnePager oder mehrseitige Website, bis 8 Seiten) 149 €, jeweils als einmaliger Festpreis. Online-Shops und Sonderprojekte bis 20 Seiten bieten wir individuell nach Angebot an. Versteckte Kosten gibt es nicht."],
  ["Was ist im Preis enthalten?", "In allen Paketen ohne Aufpreis: Design für Smartphone und Desktop, Menü und Navigation, FAQ-Bereich, Kontaktformular, WhatsApp-Button, Anfahrt mit Link zu Google Maps, Social-Media-Links, Texte erstellen oder übernehmen, kuratierte Bildauswahl, SEO-Grundlagen, Vorbereitung für Google- und KI-Suche, Online-Terminbuchung, Google-Bewertungen und Vorher-Nachher-Galerie."],
  ["Mit welcher Technik bauen Sie Websites?", "Je nach Bedarf: als schlanke HTML-Website oder mit Node.js, wenn interaktive Funktionen wie Rechner, Filter oder Animationen gefragt sind. Wir arbeiten ohne Baukasten, deshalb laden die Seiten schnell und sehen nicht aus wie tausend andere."],
  ["Wie funktioniert das Kontaktformular auf meiner Website?", "Anfragen aus dem Kontaktformular verschicken wir über den E-Mail-Server (SMTP) Ihres eigenen Postfachs direkt zu Ihnen. Es ist kein Drittanbieter zwischengeschaltet, die Daten Ihrer Kunden bleiben bei Ihnen."],
  ["Welchen Hoster empfehlen Sie?", "Wir sind Agentur-Partner von IONOS und empfehlen IONOS für Hosting, Domain und E-Mail-Postfach aus einer Hand. Sie können aber auch jeden anderen Anbieter wählen oder Ihr bestehendes Paket behalten."],
  ["Muss ich mich selbst um Domain, Hosting und E-Mail kümmern?", "Nein. Auf Wunsch begleiten wir Sie durch den kompletten Ablauf: Domain sichern, Hosting und E-Mail-Postfach einrichten, Kontaktformular anbinden, Website veröffentlichen und das Google-Unternehmensprofil anlegen. Die Einrichtung von Domain, E-Mail und Hosting ist in Wartung Pro und Premium enthalten."],
  ["Gehört mir die Website am Ende?", "Ja, vollständig – in jedem Paket. Domain und Hosting laufen auf Ihren Namen, alle Zugangsdaten gehören Ihnen und Sie erhalten den Quellcode als ZIP oder Git-Repository. Texte und Bilder, die wir erstellen, dürfen Sie unbefristet nutzen. Dazu bekommen Sie ein Übergabeblatt, eine SEO- und KI-Dokumentation als PDF und eine PageSpeed-Messung zum Livegang. Kleine Korrekturen in den ersten 30 Tagen nach dem Livegang sind kostenlos."],
  ["Gibt es ein Abo oder eine Vertragsbindung?", "Nein. Kein Abo, kein Zwang. Die Website kostet einmalig und gehört Ihnen. Wartung können Sie auf Wunsch ab 19 € im Monat dazubuchen, monatlich kündbar, müssen es aber nicht."],
  ["Wie lange dauert es, bis meine Website online ist?", "Das hängt vom Umfang ab. Den Zeitplan legen wir vorab gemeinsam fest, damit Sie vor dem Start wissen, wann Ihre Seite online geht."],
  ["Was brauchen Sie von mir?", "Ihr Logo, ein paar Fotos und Stichpunkte zu Ihren Leistungen reichen für den Anfang. Texte erstellen wir auf Wunsch, eine kuratierte Bildauswahl ist inklusive. Alles Weitere besprechen wir im Gespräch."],
  ["Kümmern Sie sich auch nach dem Livegang um die Website?", "Ja, wenn Sie möchten. Sie melden Ihre Änderungen, wir setzen sie um: mit Wartung (19 € im Monat, bis 1 Std.), Wartung Pro (29 € im Monat, bis 2 Std.) oder Wartung Premium (69 € im Monat, bis 6 Std.), jeweils monatlich kündbar. Einzelne Änderungen ohne Paket kosten 29 € pro Stunde. Die laufenden Kosten für Hosting und Domain zahlen Sie direkt beim Anbieter Ihrer Wahl."],
  ["Ich habe schon eine Website. Können Sie die übernehmen?", "Ja. Wir überarbeiten auch bestehende Websites und übernehmen alte Inhalte. Schicken Sie uns zuerst den Link für den kostenlosen Website-Check."],
  ["Sind die Beispiele echte Kunden?", "Nein. Die Beispiele sind Musterdesigns für erfundene Betriebe. Sie zeigen, was möglich ist. Ihre Website gestalten wir individuell für Ihren Betrieb."],
]);
