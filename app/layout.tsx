import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Cursor } from "@/components/motion/Cursor";
import { SITE, SITE_NAME, TITLE, DESC, OG_IMAGE } from "@/lib/site";
import { AREA, CONTACT, SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: `%s · ${SITE_NAME}` },
  description: DESC,
  applicationName: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", locale: "de_DE", url: "/", siteName: SITE_NAME, title: TITLE, description: DESC, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [OG_IMAGE.url] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: SITE_NAME,
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#business`,
      name: SITE_NAME,
      url: SITE,
      logo: `${SITE}/logo-white.png`,
      image: `${SITE}${OG_IMAGE.url}`,
      description: DESC,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: { "@type": "PostalAddress", streetAddress: "Wormser Landstraße 117", postalCode: "67551", addressLocality: "Worms", addressRegion: "Rheinland-Pfalz", addressCountry: "DE" },
      areaServed: AREA.map((name) => ({ "@type": "City", name })),
      knowsAbout: SERVICES.map((s) => s.title),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Leistungen",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.short, url: `${SITE}/leistungen/${s.id}` },
        })),
      },
    },
  ],
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

// Vor dem ersten Paint: Motion-Klasse setzen, damit Intro-Elemente nicht aufblitzen
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('pm-motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
