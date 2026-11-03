/** Ratgeber: wenige, sachliche Artikel für Suchanfragen, bewusst ohne Bilder und ohne Platz auf Start- und Leistungsseiten */
export type GuideSection = { h: string; p?: string[]; l?: string[] };
export type Guide = {
  slug: string;
  title: string;
  teaser: string;
  /** ISO-Datum der Veröffentlichung */
  date: string;
  /** Anzeige, z. B. „3. November 2026“ */
  dateLabel: string;
  sections: GuideSection[];
  faq?: [string, string][];
};

export const GUIDES: Guide[] = [
  {
    slug: "website-neu-oder-ueberarbeiten",
    title: "Website neu bauen oder überarbeiten: Woran Sie erkennen, was Ihr Betrieb braucht",
    teaser: "Fünf Minuten genügen, um einzuschätzen, ob eine Auffrischung reicht oder ein Neustart sinnvoller ist.",
    date: "2026-11-03",
    dateLabel: "3. November 2026",
    sections: [
      {
        h: "Kurz gesagt",
        p: ["Wenn Aufbau und Technik Ihrer Website noch passen und nur Texte und Bilder veraltet sind, reicht eine Überarbeitung. Sind Struktur, Technik oder Bedienung auf dem Smartphone das Problem, ist ein Neustart meist die ehrlichere und am Ende günstigere Lösung."],
      },
      {
        h: "Diese Anzeichen sprechen für einen Neustart",
        l: [
          "Die Seite lädt auf dem Smartphone langsam oder lässt sich nur seitlich scrollen.",
          "Besucher finden nicht sofort, was Sie anbieten und wie sie Sie erreichen.",
          "Die Technik wird nicht mehr gepflegt: Updates fehlen, Erweiterungen sind veraltet, niemand fühlt sich zuständig.",
          "Impressum und Datenschutzerklärung sind veraltet oder schwer zu finden.",
          "Kleine Änderungen dauern lange oder gehen nur über den Ersteller der Seite.",
        ],
      },
      {
        h: "Diese Anzeichen sprechen für eine Überarbeitung",
        l: [
          "Aufbau und Menü sind klar, Besucher finden den Kontakt schnell.",
          "Die Seite ist technisch aktuell und lädt zügig.",
          "Nur einzelne Inhalte, Fotos oder Öffnungszeiten sind nicht mehr aktuell.",
        ],
      },
      {
        h: "Sie haben noch gar keine Website?",
        p: ["Dann reicht für den Start oft eine einseitige Website mit Leistungen, Kontakt und Anfahrt. Sie wächst später mit: weitere Seiten, ein Kontaktformular, Terminbuchung oder ein Shop lassen sich ergänzen, ohne dass Sie von vorn beginnen müssen."],
      },
      {
        h: "So prüfen Sie Ihre Seite in fünf Minuten",
        l: [
          "Öffnen Sie die Seite auf dem Smartphone: Ist alles lesbar, ohne zu zoomen oder seitlich zu wischen?",
          "Suchen Sie den Kontaktweg: Ist er ohne Suchen sichtbar?",
          "Messen Sie die Ladezeit mit einem kostenlosen Test wie Google PageSpeed Insights.",
          "Prüfen Sie, ob Impressum und Datenschutzerklärung vorhanden und aktuell sind.",
          "Suchen Sie bei Google nach Ihrem Firmennamen und Ihrem Ort: Erscheint Ihre Seite mit passendem Titel?",
        ],
      },
    ],
    faq: [
      ["Kann ich meine alten Texte und Bilder weiterverwenden?", "Ja. Brauchbare Inhalte übernehmen wir gern in die neue Website und ergänzen oder überarbeiten, was fehlt."],
      ["Können Sie meine Seite vorab prüfen?", "Ja, der Website-Check ist kostenlos und unverbindlich. Senden Sie uns den Link per WhatsApp oder Formular."],
    ],
  },
  {
    slug: "website-wartung-was-gehoert-dazu",
    title: "Website-Wartung: Was dazugehört und was nicht",
    teaser: "Worauf es bei einer Betreuung nach dem Livegang ankommt und welche Fragen Sie vor dem Vertrag stellen sollten.",
    date: "2026-11-03",
    dateLabel: "3. November 2026",
    sections: [
      {
        h: "Warum eine Website Pflege braucht",
        p: ["Eine Website ist nach dem Livegang nicht fertig. Öffnungszeiten ändern sich, Angebote kommen dazu, Technik altert und Formulare müssen weiter zuverlässig funktionieren. Wer das nicht selbst übernehmen möchte, kann es an eine Betreuung abgeben."],
      },
      {
        h: "Das gehört typischerweise dazu",
        l: [
          "Änderungen an Texten, Bildern, Öffnungszeiten und Preisen in einem vereinbarten Zeitrahmen.",
          "Regelmäßige Sicherungen, damit sich die Seite nach Fehlern wiederherstellen lässt.",
          "Kontrolle, ob die Seite erreichbar ist und das Kontaktformular funktioniert.",
          "Technische Aktualisierungen, soweit die Seite sie benötigt.",
          "Auf Wunsch Pflege des Google-Unternehmensprofils.",
        ],
      },
      {
        h: "Das ist meist nicht enthalten",
        p: ["Ein neues Design, neue Funktionen, die Behebung von Schäden durch fremde Zugriffe und Fehler, die durch Eingriffe Dritter entstanden sind, gehören in der Regel nicht in eine Monatspauschale. Das wird nach Aufwand berechnet, am besten vorher mit Ihnen abgestimmt."],
      },
      {
        h: "Das sollten Sie vor dem Vertrag klären",
        l: [
          "Wie viele Stunden Änderungen pro Monat sind enthalten, und verfallen ungenutzte Stunden?",
          "Wie schnell wird auf Ihre Meldung reagiert?",
          "Wie lange läuft der Vertrag, und wie kündigen Sie?",
          "Wem gehören Domain, Zugänge und Dateien, wenn Sie wechseln möchten?",
        ],
      },
      {
        h: "Bei uns",
        p: ["Unsere Wartung ist freiwillig und monatlich kündbar. Die Reaktionszeit beträgt bei Wartung Premium 24 Stunden, bei Wartung und Wartung Pro 48 Stunden, jeweils werktags. Domain, Zugangsdaten und Dateien gehören Ihnen. Die aktuellen Pakete finden Sie auf der Seite Webdesign."],
      },
    ],
    faq: [
      ["Muss ich eine Wartung buchen?", "Nein. Die Website gehört Ihnen und läuft auch ohne Wartung. Einzelne Änderungen lassen sich auch ohne Paket beauftragen."],
      ["Betreuen Sie auch Websites, die andere gebaut haben?", "Das prüfen wir im Einzelfall. Schicken Sie uns den Link, wir schauen uns die Seite an und sagen Ihnen ehrlich, ob und wie wir sie betreuen können."],
    ],
  },
  {
    slug: "domain-hosting-zugangsdaten",
    title: "Domain, Hosting, Zugangsdaten: Was Ihnen nach dem Livegang gehören sollte",
    teaser: "Eine kurze Checkliste, damit Sie von Ihrem Webdesigner nicht abhängig werden.",
    date: "2026-11-03",
    dateLabel: "3. November 2026",
    sections: [
      {
        h: "Domain und Hosting auseinanderhalten",
        p: ["Die Domain ist Ihre Adresse im Internet, zum Beispiel ihrbetrieb.de. Das Hosting ist der Speicherplatz, auf dem die Dateien Ihrer Website liegen. Beides wird bei Anbietern gebucht und kostet laufend ein paar Euro im Monat."],
      },
      {
        h: "Das sollte auf Ihren Namen laufen",
        l: [
          "Die Domain: Sie sollten als Inhaber eingetragen sein.",
          "Der Hosting-Vertrag: Er läuft am besten direkt zwischen Ihnen und dem Anbieter.",
          "Alle Zugangsdaten: Sie erhalten sie sicher übergeben, nicht im Klartext per E-Mail.",
        ],
      },
      {
        h: "Was Sie zusätzlich verlangen können",
        l: [
          "Den Quellcode und alle Dateien Ihrer Website, zum Beispiel als ZIP oder Git-Repository.",
          "Die Nutzungsrechte an Texten und Bildern, die für Sie erstellt wurden.",
          "Ein Übergabeblatt mit Domain, Hosting, E-Mail-Postfach und Vertragslaufzeiten auf einen Blick.",
        ],
      },
      {
        h: "Warum das wichtig ist",
        p: ["Gehören Domain und Zugänge dem Ersteller, sind Sie bei einem Wechsel oder Streit schnell festgesetzt. Wenn alles auf Ihren Namen läuft, können Sie jederzeit zu einem anderen Betreuer oder Anbieter wechseln."],
      },
      {
        h: "Bei uns",
        p: ["Domain und Hosting laufen auf Ihren Namen, Zugangsdaten und Dateien gehören Ihnen, und Sie erhalten ein Übergabeblatt. Wir arbeiten mit einigen Hosting-Anbietern zusammen und beraten Sie gern, welcher zu Ihrem Vorhaben passt. Eine Ausnahme ist das Wartungspaket Premium, bei dem wir das Hosting selbst betreiben; Domain und Inhalte gehören auch dort Ihnen."],
      },
    ],
    faq: [
      ["Muss ich mich selbst um Domain und Hosting kümmern?", "Nein. Auf Wunsch begleiten wir Sie durch Domain, Hosting und E-Mail-Postfach. Der Vertrag läuft trotzdem auf Ihren Namen."],
      ["Kann ich meinen Anbieter später wechseln?", "Ja. Weil Domain, Zugänge und Dateien Ihnen gehören, können Sie jederzeit wechseln oder die Seite von jemand anderem betreuen lassen."],
    ],
  },
];

export const guideHref = (slug: string) => `/ratgeber/${slug}`;
