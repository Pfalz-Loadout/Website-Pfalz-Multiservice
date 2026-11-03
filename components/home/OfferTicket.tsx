import Link from "next/link";
import type { ReactNode } from "react";
import { WEB_PACKAGES } from "@/lib/data";
import { Icon } from "../Icon";

/** Zackenkante der Abrisslinie: Ticket und Streifen greifen exakt ineinander */
const TEETH = 16;
const TOOTH = 6;
const edge = Array.from({ length: TEETH + 1 }, (_, k) => ({ x: k % 2 ? TOOTH : 0, y: `${((k * 100) / TEETH).toFixed(3)}%` }));
const BODY_CLIP = `polygon(100% 0, 100% 100%, ${[...edge].reverse().map((p) => `${p.x}px ${p.y}`).join(", ")})`;
const STRIP_CLIP = `polygon(0 0, ${edge.map((p) => `calc(var(--tk-strip) + ${p.x}px) ${p.y}`).join(", ")}, 0 100%)`;

/**
 * Aktions-Ticket im Hero: Der Streifen mit der „1" von „199 €" reißt ab wie die Lasche
 * einer Verpackung, übrig bleiben „99 €" auf einem schwebenden Hologramm-Ticket.
 * Reines CSS, kein Client-JS, keine Bilder.
 */
export function OfferTicket() {
  const p = WEB_PACKAGES[0];
  // Nur wenn der Normalpreis mit dem Aktionspreis endet (199 € → 99 €), reißt eine Ziffer ab
  if (!p.regular || !p.regular.endsWith(p.price)) return null;
  const drop = p.regular.slice(0, -p.price.length);

  // Unsichtbare Zeilen im Streifen halten die „1" exakt auf Höhe der Preiszeile
  const rows = (price: ReactNode) => (
    <>
      <span className="tk__eyebrow"><i className="tk__dot" />Webdesign-Aktion</span>
      <span className="tk__title">Paket {p.name}</span>
      <span className="tk__price">{price}</span>
      <span className="tk__was">Statt <s>{p.regular}</s><span className="tk__b2b"> · Für Unternehmen</span></span>
    </>
  );

  return (
    <Link href="/webdesign#pakete" className="tk"
      aria-label={`Aktion: Website-Paket ${p.name} für ${p.price} statt ${p.regular}, 50 Prozent Rabatt. Zu den Paketen`}>
      <span className="tk__card" aria-hidden="true">
        <span className="tk__strip" style={{ clipPath: STRIP_CLIP }}>
          <span className="tk__main tk__main--strip">{rows(<span className="tk__one">{drop}</span>)}</span>
        </span>
        <span className="tk__frame" style={{ clipPath: BODY_CLIP }}>
          <span className="tk__ring" />
          <span className="tk__body">
            <span className="tk__main">{rows(<><b className="tk__new">{p.price}</b><span className="tk__unit">{p.unit}</span></>)}</span>
            <span className="tk__go"><Icon name="arrow-right" size={22} /></span>
            <span className="tk__stub">
              <span className="tk__pct">−50<small>%</small></span>
              <span className="tk__flash" />
              <span className="tk__sparks"><i /><i /><i /></span>
            </span>
            <span className="tk__holo" />
            <span className="tk__sheen" />
          </span>
        </span>
        <span className="tk__rip" />
        <span className="tk__burst" />
      </span>
    </Link>
  );
}
