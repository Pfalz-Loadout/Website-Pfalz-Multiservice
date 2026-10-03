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
  | "circle-arrow-right" | "star" | "menu" | "x" | "arrow-up";

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
    image: IMG + "ecommerce-shop.webp",
  },
  {
    id: "reselling",
    icon: "recycle",
    title: "Reselling & Asset Recovery",
    short: "Werterhalt statt Abschreibung",
    text: "Überbestände, Restposten und Retourenware binden Kapital und Lagerfläche. Wir kaufen Warenbestände an, bereiten sie auf und führen sie über unsere Vertriebskanäle in den Markt zurück. Für unsere Partner bedeutet das schnelle Liquidität, reduzierte Lagerkosten und einen nachhaltigen Umgang mit Ressourcen.",
    image: IMG + "reselling-ware.webp",
  },
  {
    id: "storage",
    icon: "warehouse",
    title: "Storage Solutions",
    short: "Lagerkapazität nach Bedarf",
    text: "Wir stellen Lagerflächen für temporäre und langfristige Anforderungen bereit, skalierbar und ohne starre Vertragsbindung. Für Gewerbekunden mit saisonalen Spitzen ebenso wie für Privatkunden in Übergangsphasen.",
    image: IMG + "storage-unit.webp",
  },
  {
    id: "clearance",
    icon: "truck",
    title: "Clearance Services",
    short: "Strukturierte Räumung, fachgerechte Verwertung",
    text: "Vollständige Räumung von Garagen, Lagern, Hallen und Gewerbeflächen: Bestandsaufnahme, verbindliches Angebot, Durchführung und besenreine Übergabe. Verwertbare Bestände werden in den Wirtschaftskreislauf zurückgeführt, alles Weitere fachgerecht entsorgt.",
    image: IMG + "transporter-verladung.webp",
  },
  {
    id: "web",
    icon: "monitor-cog",
    title: "Web Maintenance & Management",
    short: "Stabile Systeme, aktuelle Inhalte",
    text: "Laufende technische Betreuung von Websites und Online-Shops: Updates, Sicherheitsmonitoring, Content-Pflege und Systemverwaltung. Aus dem Betrieb eigener E-Commerce-Plattformen bringen wir praxisnahes Know-how mit.",
    image: IMG + "webseite-laptop.webp",
  },
  {
    id: "facility",
    icon: "wrench",
    title: "Solutions & Support",
    short: "Für jede Aufgabe eine schnelle Lösung",
    text: "Nicht jede Anforderung passt in eine feste Kategorie. Ob kurzfristiger Engpass, organisatorische Herausforderung oder ein Anliegen, für das es keinen passenden Ansprechpartner gibt: Wir analysieren die Situation, entwickeln eine pragmatische Lösung und setzen sie zuverlässig um. Flexibel, lösungsorientiert und mit einem Netzwerk, das wir bei Bedarf einbinden.",
    image: IMG + "wartung-technik.webp",
  },
  {
    id: "smarthome",
    side: true,
    icon: "lightbulb",
    title: "Smart Home & KNX",
    short: "Programmierung von Gebäudeautomation",
    text: "Als ergänzende Leistung übernehmen wir die Programmierung von Smart-Home-Systemen auf KNX-Basis: Parametrierung mit der ETS, Einrichtung von Licht-, Jalousie- und Heizungssteuerung, Szenen und Visualisierung sowie Anpassungen an bestehenden Anlagen.",
    image: IMG + "smarthome-knx.webp",
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
