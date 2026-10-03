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
Hero `transporter-halle.webp` · E-Commerce `ecommerce-shop.webp` · Reselling `reselling-ware.webp` · Storage `storage-unit.webp` ·
Clearance `transporter-verladung.webp` · Web `webseite-laptop.webp` · Solutions & Support `wartung-technik.webp` · Smart Home `smarthome-knx.webp` ·
Über uns `lager-ware.webp` · Einzugsgebiet `pfalz-landschaft.webp` · Abschluss-Band `lagerraum-hoch.webp` · Kontakt `lagergang.webp`.
Zum Austauschen eine WebP-Datei (max. ca. 1920 px breit, < 300 KB) mit gleichem Namen ablegen – große PNGs bremsen Ladezeit und Google-Ranking.

Logo: `public/logo-white.png` (weiß, transparent – aus dem Original-Logo erzeugt), Monogramm `public/logo-mark-white.png`
(Intro-Animation), Favicon `app/icon.png`.

## Kontaktformular
Ohne Konfiguration öffnet das Formular das E-Mail-Programm des Besuchers mit vorausgefüllter Nachricht.
Für echten Versand in Vercel unter Settings → Environment Variables eintragen (Konto bei resend.com, kostenlos bis 3.000 Mails/Monat):
- `RESEND_API_KEY`
- `CONTACT_TO` = kontakt@pfalz-loadout.de
- `CONTACT_FROM` = z. B. `Pfalz Multiservice <anfrage@ihre-domain.de>` (Domain bei Resend verifizieren)
- optional `NEXT_PUBLIC_SITE_URL` = endgültige Adresse (für Sitemap/Metadaten)

## Aufbau
- `lib/data.ts` – alle Texte, Leistungen, Kontaktdaten
- `app/` – Seiten: Start, `/leistungen/[id]`, `/kontakt`, `/impressum`, `/datenschutz`
- `components/motion/` – Intro-Vorhang, Smooth Scroll, Scroll-Reveals, Cursor, Fortschrittsbalken
- `app/globals.css` – Design-Tokens 1:1 aus dem Design-System
- Animationen respektieren „Bewegung reduzieren“ im Betriebssystem.
