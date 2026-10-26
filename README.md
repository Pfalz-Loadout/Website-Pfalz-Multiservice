# Pfalz Multiservice – Next.js-Website

Nachbau des UI-Kits „Pfalz Multiservice“ als Next.js-16-Projekt, animiert mit GSAP (ScrollTrigger, SplitText) und Lenis.

## Lokal starten
```bash
npm install
npm run dev      # http://localhost:3000
```

## Auf Vercel veröffentlichen
**Variante A – über GitHub (empfohlen):**
1. Neues Repository auf github.com anlegen und diesen Ordner hochladen.
2. vercel.com → „Add New → Project“ → Repository importieren → „Deploy“.
3. Fertig: Die Seite läuft unter `https://<projektname>.vercel.app`. Eigene Domain unter Project → Settings → Domains.

**Variante B – per Kommandozeile:**
```bash
npm install
npx vercel --prod
```

## Fotos & Logo
Alle Fotos liegen in `public/images/` (Zuordnung in `lib/data.ts`):
Hero `transporter-halle.png` · E-Commerce `ecommerce-shop.png` · Reselling `reselling-ware.png` · Storage `storage-unit.png` ·
Clearance `transporter-verladung.png` · Web `webseite-laptop.png` · Solutions & Support `wartung-technik.png` · Smart Home `smarthome-knx.png` ·
Über uns `lager-ware.png` · Einzugsgebiet `pfalz-landschaft.png` · Abschluss-Band `lagerraum-hoch.png` · Kontakt `lagergang.png`.
Zum Austauschen einfach eine Datei mit gleichem Namen ersetzen.

Logo: `public/logo-white.png` (weiß, transparent – aus dem Original-Logo erzeugt), Monogramm `public/logo-mark-white.png`
(Intro-Animation), Favicon `app/icon.png`.

## Kontaktformular
Versand direkt über das Strato-Postfach (SMTP), ohne Drittanbieter. In Vercel unter Settings → Environment Variables
(Production und Preview) eintragen:
- `SMTP_USER` = kontakt@pfalz-multiservice.de
- `SMTP_PASS` = Passwort des Postfachs
- optional `SMTP_HOST` (Standard smtp.strato.de), `SMTP_PORT` (Standard 465), `CONTACT_TO` (Standard = SMTP_USER)
- optional `NEXT_PUBLIC_SITE_URL` = endgültige Adresse (für Sitemap/Metadaten)

Ohne diese Einträge öffnet das Formular das E-Mail-Programm des Besuchers mit vorausgefüllter Nachricht.
Nach dem Eintragen einmal neu deployen.

## Aufbau
- `lib/data.ts` – alle Texte, Leistungen, Kontaktdaten
- `app/` – Seiten: Start, `/leistungen/[id]`, `/kontakt`, `/impressum`, `/datenschutz`
- `components/motion/` – Intro-Vorhang, Smooth Scroll, Scroll-Reveals, Cursor, Fortschrittsbalken
- `app/globals.css` – Design-Tokens 1:1 aus dem Design-System
- Animationen respektieren „Bewegung reduzieren“ im Betriebssystem.
