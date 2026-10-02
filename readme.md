# Pfalz Multiservice — Design System

**Pfalz Multiservice** ("Ihr starker Partner in der Region") is a regional service company in the Pfalz (Rhineland-Palatinate, DE). Based on the supplied imagery, the offer covers **transport & courier runs** (Sprinter-class vans), **self-storage units**, **warehouse / fulfillment** (shelved stock, parcel dispatch) and a **digital customer overview** (project/order portal on laptop, tablet, phone). One product surface: the marketing website.

## Sources
- `uploads/pfalz-multiservice-onepage-v2.html` — company structure and **all website copy** (6 service areas, Über uns, Ablauf, Einzugsgebiet, Kontakt). Kit copy is taken verbatim; review and reference placeholders ([Name], [Ort]) are kept as in the source.
- `uploads/Pfalz Multiservice Logo (1).png` → `assets/logo*.png` (background removed, white variants derived programmatically)
- 6 photos/renders → `assets/images/` (transporter-halle, logistik-hud, pfalz-landschaft, lagerraeume, lager-regale, digital-portal)
- Layout reference: https://blueskydesignandbuild.com/ — a local-contractor site. We adopted its **structure and rhythm** (utility bar, dropdown header with phone + CTA, dark video/photo hero with service chips, trust strip, image service cards, split "why us", 01–04 process, service areas, FAQ, reviews, closing CTA band, 3-column footer) and its headline treatment (uppercase, final word bold). Brand, colours, logo, imagery and copy are Pfalz Multiservice's own; nothing of the reference brand is reused.
- No codebase, Figma or font files were provided.

## Index
- `styles.css` — entry; imports `tokens/*.css`
- `tokens/` — fonts, colors, typography, spacing, effects, base
- `guidelines/` — 19 foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — `actions/`, `content/`, `forms/`, `navigation/` (each with card HTML)
- `ui_kits/website/` — click-through site: Startseite, Leistungsseite, Kontakt
- `assets/` — logo.png, logo-white.png, logo-mark.png, logo-mark-white.png, images/
- `SKILL.md`, `thumbnail.html`

## Components
- **Actions:** Button, Icon
- **Content:** Eyebrow, SectionHeading, ServiceCard, ServiceChip, CheckList, ProcessStep, TestimonialCard, FAQItem, CtaBand
- **Forms:** TextField, SelectField
- **Navigation:** TopBar, SiteHeader, SiteFooter

Intentional additions: **Icon** (wrapper for the Lucide CDN set, tinted with currentColor); **TestimonialCard** (reference shows review screenshots; we need a native card since no review images exist).

## Content fundamentals
- **Language:** German. Address customers with **"Sie"** (formal), the company speaks as **"wir"**. Never "du".
- **Tone:** grounded, dependable, regional. Promise concrete things (Zeitfenster, fester Preis, versichert) instead of superlatives. Short declarative sentences.
- **Headlines:** UPPERCASE, light weight, last word(s) extrabold: "ALLES AUS EINER **HAND**", "VOM AUFTRAG BIS ZUR **ZUSTELLUNG**". Triads are on-brand (from imagery): "Schneller. Sicherer. Zuverlässiger."
- **Eyebrows:** 1–3 words, tracked caps: "Unsere Leistungen", "So arbeiten wir", "Noch Fragen?".
- **CTAs:** imperative / noun, uppercase: "Angebot anfragen", "Kostenloses Angebot", "Mehr erfahren", "Anfrage senden". Phone number is always a secondary CTA.
- **Body:** sentence case, 1–3 sentences per block. Bold lead-in + colon in benefit lists ("**Fester Preis:** Angebot vor Auftragsbeginn.").
- **Numbers:** steps as "01–04"; German formats (06321 000 000, Mo–Fr 7–18 Uhr, „Anführungszeichen").
- **Emoji:** never. Unicode only for · separators and en dashes.

## Visual foundations
Colours and type are taken 1:1 from blueskydesignandbuild.com (sampled from screenshots `uploads/Unbenannt1.JPG`, `uploads/Unbenann2t.JPG`).
- **Colour:** dark throughout. Page `#000000`, cards `#121212` with a `#191919` hairline. One accent: **gold `#DDBB4D`** (buttons, eyebrows) / `#D9B13A` (highlight words). Headings white, body `#C7C7C7`, card copy `#DBDBDB`. No other hues except status.
- **Section rhythm:** black → black, separated by spacing, not by colour. Hero = video/photo under a flat 55% black scrim.
- **Type:** **Poppins** only. Hero H1 700 caps, +0.01em, last words gold + underlined. Section H2 800 caps, tight −0.035em, last word gold. H3 700 caps ~22px. Eyebrow 700 14px caps +0.15em gold. Body 400 17px / 1.75. Nav 500 14px caps. Buttons 600 15px caps.
- **Buttons:** square (radius 0). Primary gold fill + black text; secondary 2px white outline + white text. Hover: gold darkens to `#C9A83E`, outline fills white.
- **Imagery:** warm, golden-hour and night shots with practical lights. Full-bleed in hero, 3:2 inside cards (inset by card padding).
- **Protection:** flat black scrim (`--overlay-hero`) on hero; bottom gradient (`--overlay-card`) on overlay cards. No capsules.
- **Transparency/blur:** header is solid black; no glass.
- **Radii:** 0 buttons/inputs, 4px cards, 0 images.
- **Cards:** `#121212` fill, 1px `#191919` border, no shadow; image inset 24px; title H3 caps white; copy grey.
- **Shadows:** almost none on black; `--shadow-lg` only for dropdowns; gold glow for focus.
- **Borders/rules:** 1px `#191919` hairlines; gold rules/segments as accents.
- **Hover/press:** colour shifts only (150ms); arrow icons slide 4px; 1px press nudge. Focus: gold border + ring.
- **Motion:** ease-out cubic-bezier(.22,.61,.36,1); 150ms colour, 250ms accordion, 500ms image zoom. No bounces.
- **Footer:** black, 1170px, three equal columns. Left: logo, white 500 16px blurb, plain white social glyphs. Middle: centred caps heading (700 20px) and centred links with gold circle-arrow bullets, 32px apart. Right: gold address/phone/email with gold icons, optional map image. Bottom: 1px `#3A3A3A` rule, white copyright, gold legal links split by "|".
- **Layout:** 1240px container, fluid 20–40px gutters, 28px grid gap, 72–112px section padding. Header 88px black bar: logo left, nav + gold CTA right. Section heads centred.

## Iconography
- **Lucide** (outline, 2px stroke, rounded joins) via CDN `lucide-static@0.460.0`, rendered with the `Icon` component (CSS mask → inherits colour). This is a **substitution**: the brand imagery uses similar thin outline icons (box, truck, pin, shield) in hexagon frames, but no icon files were provided.
- Common: truck, warehouse, package, layout-dashboard, map-pin, phone, mail, clock, shield-check, check, arrow-right, chevron-down, plus/minus, star, social brand icons.
- Icons sit inline at 14–20px in gold on black, or in square gold tiles with black glyphs.
- No emoji, no icon font, no PNG icons.

## Fonts
**Poppins** (Google Fonts), the single family used on the reference site for headings, nav, buttons and body. JetBrains Mono only for token labels in specimen cards.
