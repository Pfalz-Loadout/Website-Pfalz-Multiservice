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
  | "clapperboard" | "camera" | "pen-tool" | "languages";

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
};

export const SERVICES: Service[] = [
  {
    id: "ecommerce",
    icon: "shopping-cart",
    title: "E-Commerce",
    short: "Digitaler Handel mit Fokus auf Effizienz",
    text: "Wir betreiben eigene E-Commerce-Plattformen und vertreiben unsere Sortimente über Online-Shops sowie etablierte Marktplätze. Unser Multichannel-Ansatz ermöglicht eine breite Marktabdeckung bei schlanken Prozessen, von der Beschaffung über das Listing bis zum Fulfillment.",
    image: IMG + "ecommerce-shop.png",
  },
  {
    id: "reselling",
    icon: "recycle",
    title: "Reselling & Asset Recovery",
    short: "Werterhalt statt Abschreibung",
    text: "Überbestände, Restposten und Retourenware binden Kapital und Lagerfläche. Wir kaufen Warenbestände an, bereiten sie auf und führen sie über unsere Vertriebskanäle in den Markt zurück. Für unsere Partner bedeutet das schnelle Liquidität, reduzierte Lagerkosten und einen nachhaltigen Umgang mit Ressourcen.",
    image: IMG + "reselling-ware.png",
  },
  {
    id: "storage",
    icon: "warehouse",
    title: "Storage Solutions",
    short: "Lagerkapazität nach Bedarf",
    text: "Wir stellen Lagerflächen für temporäre und langfristige Anforderungen bereit, skalierbar und ohne starre Vertragsbindung. Für Gewerbekunden mit saisonalen Spitzen ebenso wie für Privatkunden in Übergangsphasen.",
    image: IMG + "storage-unit.png",
  },
  {
    id: "clearance",
    icon: "truck",
    title: "Clearance Services",
    short: "Strukturierte Räumung, fachgerechte Verwertung",
    text: "Vollständige Räumung von Garagen, Lagern, Hallen und Gewerbeflächen: Bestandsaufnahme, verbindliches Angebot, Durchführung und besenreine Übergabe. Verwertbare Bestände werden in den Wirtschaftskreislauf zurückgeführt, alles Weitere fachgerecht entsorgt.",
    image: IMG + "transporter-verladung.png",
  },
  {
    id: "web",
    href: "/webdesign",
    icon: "monitor-cog",
    title: "Web Maintenance & Management",
    short: "Stabile Systeme, aktuelle Inhalte",
    text: "Laufende technische Betreuung von Websites und Online-Shops: Updates, Sicherheitsmonitoring, Content-Pflege und Systemverwaltung. Aus dem Betrieb eigener E-Commerce-Plattformen bringen wir praxisnahes Know-how mit.",
    image: IMG + "webseite-laptop.png",
  },
  {
    id: "facility",
    icon: "wrench",
    title: "Solutions & Support",
    short: "Für jede Aufgabe eine schnelle Lösung",
    text: "Nicht jede Anforderung passt in eine feste Kategorie. Ob kurzfristiger Engpass, organisatorische Herausforderung oder ein Anliegen, für das es keinen passenden Ansprechpartner gibt: Wir analysieren die Situation, entwickeln eine pragmatische Lösung und setzen sie zuverlässig um. Flexibel, lösungsorientiert und mit einem Netzwerk, das wir bei Bedarf einbinden.",
    image: IMG + "wartung-technik.png",
  },
  {
    id: "smarthome",
    side: true,
    icon: "lightbulb",
    title: "Smart Home & KNX",
    short: "Programmierung von Gebäudeautomation",
    text: "Als ergänzende Leistung übernehmen wir die Programmierung von Smart-Home-Systemen auf KNX-Basis: Parametrierung mit der ETS, Einrichtung von Licht-, Jalousie- und Heizungssteuerung, Szenen und Visualisierung sowie Anpassungen an bestehenden Anlagen.",
    image: IMG + "smarthome-knx.png",
  },
];

/** Link einer Leistung: eigene Seite (z. B. /webdesign) oder /leistungen/<id> */
export const serviceHref = (s: Service) => s.href ?? `/leistungen/${s.id}`;

/** Reihenfolge der Kacheln auf der Startseite (wie im Kit: E-Commerce↔Reselling und Clearance↔Web getauscht) */
export function homeServiceOrder(): Service[] {
  const m = SERVICES.filter((s) => !s.side);
  const swap = (a: string, b: string) => {
    const i = m.findIndex((s) => s.id === a);
    const j = m.findIndex((s) => s.id === b);
    [m[i], m[j]] = [m[j], m[i]];
  };
  swap("ecommerce", "reselling");
  swap("clearance", "web");
  return m;
}

export const USPS: { title: string; text: string; lines?: [string, string] }[] = [
  { title: "Alles aus einer Hand", text: "Ein Kontakt für alle Aufgaben statt vieler einzelner Dienstleister.", lines: ["Ein Kontakt für alle Aufgaben statt", "vieler einzelner Dienstleister."] },
  { title: "Verbindliche Angebote", text: "Sie kennen Umfang und Kosten, bevor wir beginnen.", lines: ["Sie kennen Umfang und Kosten,", "bevor wir beginnen."] },
  { title: "Schnell vor Ort", text: "Regional in Worms verankert und kurzfristig einsatzbereit." },
];

export const STEPS: [string, string, string][] = [
  ["01", "Anfrage", "Sie schildern Ihr Anliegen per Formular, Telefon oder WhatsApp."],
  ["02", "Bedarfsanalyse", "Persönliches Gespräch oder Besichtigung vor Ort."],
  ["03", "Angebot", "Verbindlich und mit transparentem Leistungsumfang."],
  ["04", "Umsetzung", "Termingerecht, und wir bleiben Ihr Ansprechpartner."],
];

export const AREA = ["Worms", "Frankenthal", "Ludwigshafen", "Mannheim", "Alzey", "Grünstadt", "Bensheim"];

export const FOOTER_TEXT =
  "Von E-Commerce und Warenankauf über Lagerung und Räumung bis zur Betreuung von Websites und Objekten: Pfalz Multiservice bündelt Dienstleistungen für Unternehmen und Privatkunden in der Region Worms.";

export const CTA = {
  title: "Lassen Sie uns über Ihr",
  highlight: "Vorhaben sprechen",
  intro: "Schildern Sie uns kurz Ihr Anliegen. Wir melden uns zeitnah mit einem passenden Lösungsvorschlag.",
};

/** Webdesign-Musterdesigns (statische Seiten unter public/beispiele/<slug>) */
export type Example = {
  slug: string;
  name: string;
  branch: string;
  text: string;
  tags: string[];
};

export const EXAMPLES: Example[] = [
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
];

/** Klassische Musterdesigns mit Menü – Unterseiten für den Seiten-Umschalter */
export type ClassicExample = Example & {
  pages: { key: string; label: string; path: string }[];
};

export const CLASSIC_EXAMPLES: ClassicExample[] = [
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
];

/** Webdesign-Seite: Pakete, Ablauf, FAQ */
export const WEB_PROBLEMS: [string, string][] = [
  ["Veraltete Website", "Die Seite ist in die Jahre gekommen, lädt langsam und ist auf dem Smartphone kaum zu bedienen."],
  ["Kaum Anfragen", "Besucher finden nicht schnell genug, was Sie anbieten und wie man Sie erreicht."],
  ["Baukasten-Look", "Eine Vorlage von der Stange: Ihr Betrieb sieht aus wie tausend andere."],
  ["Keine Zeit", "Texte, Bilder, Technik, Updates: Neben dem Tagesgeschäft bleibt die Website liegen."],
];

export type WebPackage = { name: string; price: string; unit?: string; note: string; items: string[]; badge?: string };
/** Inhalte 1:1 aus der Preisliste (Preisliste_Pfalz-Multiservice.pdf) */
export const WEB_PACKAGES: WebPackage[] = [
  {
    name: "Start", price: "99 €", unit: "einmalig", note: "OnePager · bis 5 Abschnitte",
    items: ["Alle Inhalte übersichtlich auf einer Seite", "Ideal für Gründer, Selbstständige und Vereine", "Alle Inklusivleistungen"],
  },
  {
    name: "Business", price: "149 €", unit: "einmalig", note: "Mehrseitige Website · bis 8 Seiten", badge: "Beliebt",
    items: ["Mehrere Seiten mit Menü", "Ideal für Handwerk, Gastronomie und Dienstleister", "Alle Inklusivleistungen"],
  },
  {
    name: "Shop / Premium", price: "individuell", unit: "nach Angebot", note: "Bis 20 Seiten, Online-Shop oder Sonderprojekt",
    items: ["Online-Shop oder umfangreiche Website", "Ideal für Händler und größere Angebote", "Alle Inklusivleistungen"],
  },
  {
    name: "Wartung", price: "ab 19 €", unit: "/ Monat", note: "Monatlich kündbar · Sie melden Änderungen, wir setzen sie um",
    items: [
      "Wartung 19 €: bis 1 Std. Änderungen pro Monat",
      "Wartung Pro 29 €: bis 2 Std. Änderungen pro Monat, neue KI-Fotos & 3D-Motion-Clips nach Bedarf, Pflege Ihres Google-Profils",
      "Domain und E-Mail-Adressen einrichten",
      "Änderungen ohne Paket: 29 € einmalig pro Stunde",
    ],
  },
];

/** In allen Paketen inklusive – ohne Aufpreis */
export const WEB_INCLUDED = [
  "Design für Smartphone und Desktop", "Kontaktformular", "WhatsApp-Button", "Google-Maps-Karte", "Social-Media-Links",
  "Texte erstellen oder alte Inhalte übernehmen", "Stockfotos, Auswahl und Einbau", "SEO: Suchbegriffe, Meta-Texte, FAQ",
  "Vorbereitet für Google- und KI-Suche", "Google-Unternehmensprofil einrichten und optimieren", "Online-Terminbuchung",
  "Google-Bewertungen einbinden", "Vorher-Nachher-Galerie",
];

/** Zusatzleistungen – optional zu jedem Paket (Preise bewusst nicht auf der Website) */
export const WEB_ADDONS: { icon: IconName; title: string; text: string }[] = [
  { icon: "clapperboard", title: "3D Motion & Cinematic Video", text: "Animierte Website mit KI-Videoclips in Kino-Optik: Kamerafahrten wie Dolly-Zoom, 360°-Orbit oder FPV-Drohnenflug, für OnePager oder mehrere Seiten." },
  { icon: "camera", title: "KI-Fotografie in Studioqualität", text: "Fotorealistische Produkt- und Szenen-Shots mit Relight und Upscale für gestochen scharfe Darstellung, so viele, wie Ihre Website benötigt." },
  { icon: "pen-tool", title: "Logo-Design", text: "Ein eigenes Logo für Ihren Auftritt." },
  { icon: "languages", title: "Mehrsprachigkeit", text: "Ihre Website zusätzlich in einer anderen Sprache." },
];

export const WEB_STEPS: [string, string, string][] = [
  ["01", "Anfrage", "Sie schildern kurz Ihr Vorhaben, per Formular, Telefon oder WhatsApp. Kostenlos."],
  ["02", "Gespräch", "Wir klären gemeinsam, was Sie wirklich brauchen, und was nicht."],
  ["03", "Angebot", "Sie erhalten einen Festpreis mit klarem Leistungsumfang."],
  ["04", "Entwurf & Freigabe", "Sie sehen alles vorab. Nichts geht ohne Ihr OK online."],
  ["05", "Livegang", "Ihre Website geht online. Auf Wunsch betreuen wir sie danach weiter."],
];

export const WEB_FAQ: [string, string][] = [
  ["Was kostet eine Website?", "Start (OnePager, bis 5 Abschnitte) kostet 99 €, Business (mehrseitige Website, bis 8 Seiten) 149 €, jeweils als einmaliger Festpreis. Online-Shops und Sonderprojekte bis 20 Seiten bieten wir individuell nach Angebot an. Versteckte Kosten gibt es nicht."],
  ["Was ist im Preis enthalten?", "In allen Paketen ohne Aufpreis: Design für Smartphone und Desktop, Kontaktformular, WhatsApp-Button, Google-Maps-Karte, Social-Media-Links, Texte erstellen oder übernehmen, Stockfotos, SEO-Grundlagen, Vorbereitung für Google- und KI-Suche, Google-Unternehmensprofil, Online-Terminbuchung, Google-Bewertungen und Vorher-Nachher-Galerie."],
  ["Mit welcher Technik bauen Sie Websites?", "Je nach Bedarf: als schlanke HTML-Website oder mit Node.js, wenn interaktive Funktionen wie Rechner, Filter oder Animationen gefragt sind. Wir arbeiten ohne Baukasten, deshalb laden die Seiten schnell und sehen nicht aus wie tausend andere."],
  ["Wie funktioniert das Kontaktformular auf meiner Website?", "Anfragen aus dem Kontaktformular verschicken wir über den E-Mail-Server (SMTP) Ihres eigenen Postfachs direkt zu Ihnen. Es ist kein Drittanbieter zwischengeschaltet, die Daten Ihrer Kunden bleiben bei Ihnen."],
  ["Welchen Hoster empfehlen Sie?", "Wir sind Agentur-Partner von IONOS und empfehlen IONOS für Hosting, Domain und E-Mail-Postfach aus einer Hand. Sie können aber auch jeden anderen Anbieter wählen oder Ihr bestehendes Paket behalten."],
  ["Muss ich mich selbst um Domain, Hosting und E-Mail kümmern?", "Nein. Auf Wunsch begleiten wir Sie durch den kompletten Ablauf: Domain sichern, Hosting und E-Mail-Postfach einrichten, Kontaktformular anbinden, Website veröffentlichen und das Google-Unternehmensprofil anlegen."],
  ["Gibt es ein Abo oder eine Vertragsbindung?", "Nein. Kein Abo, kein Zwang. Die Website kostet einmalig und gehört Ihnen. Wartung können Sie auf Wunsch ab 19 € im Monat dazubuchen, monatlich kündbar, müssen es aber nicht."],
  ["Wie lange dauert es, bis meine Website online ist?", "Das hängt vom Umfang ab. Den Zeitplan legen wir vorab gemeinsam fest, damit Sie vor dem Start wissen, wann Ihre Seite online geht."],
  ["Was brauchen Sie von mir?", "Ihr Logo, ein paar Fotos und Stichpunkte zu Ihren Leistungen reichen für den Anfang. Texte erstellen wir auf Wunsch, Stockfotos sind inklusive. Alles Weitere besprechen wir im Gespräch."],
  ["Kümmern Sie sich auch nach dem Livegang um die Website?", "Ja, wenn Sie möchten. Mit Wartung (19 € im Monat, bis 1 Std. Änderungen) oder Wartung Pro (29 € im Monat, bis 2 Std. Änderungen) setzen wir Ihre Änderungen um. Einzelne Änderungen ohne Paket kosten 29 € pro Stunde. Hosting und Domain buchen Sie direkt beim Anbieter Ihrer Wahl, gern helfen wir bei der Auswahl."],
  ["Ich habe schon eine Website. Können Sie die übernehmen?", "Ja. Wir überarbeiten auch bestehende Websites und übernehmen alte Inhalte. Schicken Sie uns zuerst den Link für den kostenlosen Website-Check."],
  ["Sind die Beispiele echte Kunden?", "Nein. Die Beispiele sind Musterdesigns für erfundene Betriebe. Sie zeigen, was möglich ist. Ihre Website gestalten wir individuell für Ihren Betrieb."],
];
