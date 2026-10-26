// Inhalte 1:1 aus dem UI-Kit (ui_kits/website/data.jsx)
export const IMG = "/images/";

export const CONTACT = {
  phone: "+49 160 5086983",
  phoneHref: "tel:+491605086983",
  email: "kontakt@pfalz-loadout.de",
  city: "67551 Worms",
  whatsapp: "https://wa.me/491605086983",
};

export type IconName =
  | "shopping-cart" | "recycle" | "warehouse" | "truck" | "monitor-cog" | "wrench"
  | "lightbulb" | "layers" | "file-check" | "map-pin" | "message-circle" | "phone"
  | "mail" | "check" | "arrow-right" | "chevron-down" | "chevron-right"
  | "circle-arrow-right" | "star" | "menu" | "x" | "arrow-up" | "external-link" | "layout-template";

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  short: string;
  text: string;
  image: string;
  side?: boolean;
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

export type WebPackage = { name: string; price: string; note: string; items: string[]; highlight?: boolean };
export const WEB_PACKAGES: WebPackage[] = [
  {
    name: "Start", price: "ab 99 €", note: "Ideal für Gründer, Selbstständige und Vereine", highlight: true,
    items: ["One-Page-Website im individuellen Design", "Optimiert für Smartphone, Tablet und PC", "Impressum & Datenschutzerklärung eingebunden", "SSL-Verschlüsselung", "Anmeldung bei Google", "Schnelle Ladezeiten & SEO-Grundlagen"],
  },
  {
    name: "Business", price: "auf Anfrage", note: "Für Handwerk, Gastronomie und Dienstleister",
    items: ["Mehrere Seiten mit Menü", "Kontaktformular, Google Maps & WhatsApp-Button", "Ausrichtung auf Ihre Region und Leistungen", "Alles aus dem Start-Paket"],
  },
  {
    name: "Shop & Premium", price: "auf Anfrage", note: "Für Händler und größere Angebote",
    items: ["Online-Shop oder umfangreiche Website", "Warenkorb, Zahlung, Versand oder Terminbuchung", "Aufwendiges Design mit Animationen", "Alles aus dem Business-Paket"],
  },
  {
    name: "Wartung & Betreuung", price: "auf Anfrage", note: "Auch für bestehende Websites",
    items: ["Hosting, Updates und Backups", "Kleine Änderungen an Texten, Bildern, Öffnungszeiten", "Überwachung der Erreichbarkeit", "Egal, wer die Seite gebaut hat"],
  },
];

export const WEB_EXTRAS = ["Bildergalerie", "Kundenbewertungen", "Terminbuchung", "Mehrsprachigkeit", "Weitere Unterseiten", "Domain & E-Mail-Adresse", "Google-Unternehmensprofil"];

export const WEB_STEPS: [string, string, string][] = [
  ["01", "Anfrage", "Sie schildern kurz Ihr Vorhaben, per Formular, Telefon oder WhatsApp. Kostenlos."],
  ["02", "Gespräch", "Wir klären gemeinsam, was Sie wirklich brauchen, und was nicht."],
  ["03", "Angebot", "Sie erhalten einen Festpreis mit klarem Leistungsumfang."],
  ["04", "Entwurf & Freigabe", "Sie sehen alles vorab. Nichts geht ohne Ihr OK online."],
  ["05", "Livegang", "Ihre Website geht online. Auf Wunsch betreuen wir sie danach weiter."],
];

export const WEB_FAQ: [string, string][] = [
  ["Was kostet eine Website?", "Eine One-Page-Website gibt es ab 99 € zum Festpreis. Für größere Websites und Online-Shops erhalten Sie nach einem kurzen Gespräch ein verbindliches Festpreis-Angebot. Versteckte Kosten gibt es nicht."],
  ["Gibt es ein Abo oder eine Vertragsbindung?", "Nein. Kein Abo, kein Zwang. Die Website gehört Ihnen. Wartung und Betreuung können Sie auf Wunsch dazubuchen, müssen es aber nicht."],
  ["Wie lange dauert es, bis meine Website online ist?", "Das hängt vom Umfang ab. Den Zeitplan legen wir vorab gemeinsam fest, damit Sie vor dem Start wissen, wann Ihre Seite online geht."],
  ["Was brauchen Sie von mir?", "Ihr Logo, ein paar Fotos und Stichpunkte zu Ihren Leistungen reichen für den Anfang. Alles Weitere besprechen wir im Gespräch."],
  ["Kümmern Sie sich auch nach dem Livegang um die Website?", "Ja, wenn Sie möchten. Hosting, Updates, Backups und kleine Änderungen übernehmen wir im Rahmen von Wartung & Betreuung. Den Preis nennen wir Ihnen auf Anfrage."],
  ["Ich habe schon eine Website. Können Sie die übernehmen?", "Ja. Wir betreuen auch bestehende Websites, egal wer sie gebaut hat. Schicken Sie uns zuerst den Link für den kostenlosen Website-Check."],
  ["Sind die Beispiele echte Kunden?", "Nein. Die Beispiele sind Musterdesigns für erfundene Betriebe. Sie zeigen, was möglich ist. Ihre Website gestalten wir individuell für Ihren Betrieb."],
];
