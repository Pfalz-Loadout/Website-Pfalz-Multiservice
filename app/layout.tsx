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

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pfalz-multiservice.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Pfalz Multiservice · Viele Leistungen. Ein Ansprechpartner.", template: "%s · Pfalz Multiservice" },
  description:
    "E-Commerce, Reselling, Lagerung, Räumung, Web Maintenance und Support: Pfalz Multiservice bündelt Dienstleistungen für Unternehmen und Privatkunden in der Region Worms.",
  openGraph: {
    type: "website", locale: "de_DE", siteName: "Pfalz Multiservice",
    title: "Pfalz Multiservice · Viele Leistungen. Ein Ansprechpartner.",
    description: "Dienstleistungen für Unternehmen und Privatkunden in der Region Worms.",
    images: ["/images/transporter-halle.png"],
  },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

// Vor dem ersten Paint: Motion-Klasse setzen, damit Intro-Elemente nicht aufblitzen
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('pm-motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
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
