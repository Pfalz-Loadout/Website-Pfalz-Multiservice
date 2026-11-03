import Link from "next/link";
import { WEB_PACKAGES } from "@/lib/data";
import { Icon } from "../Icon";

/**
 * Aktions-Ticket im Hero: Paket Start zum halben Preis.
 * Reines CSS, kein Client-JS, keine Bilder. Animiert nur transform/opacity.
 */
export function OfferTicket() {
  const p = WEB_PACKAGES[0];
  if (!p.regular) return null;

  return (
    <Link href="/webdesign#pakete" className="tk"
      aria-label={`Aktion: Website-Paket ${p.name} für ${p.price} statt ${p.regular}, 50 Prozent Rabatt. Zu den Paketen`}>
      <span className="tk__ring" aria-hidden="true" />
      <span className="tk__body" aria-hidden="true">
        <span className="tk__stub">
          <span className="tk__pct">−50<small>%</small></span>
          <span className="tk__sparks"><i /><i /><i /></span>
        </span>
        <span className="tk__main">
          <span className="tk__eyebrow"><i className="tk__dot" />Webdesign-Aktion</span>
          <span className="tk__title">Paket {p.name}</span>
          <span className="tk__prices">
            <span className="tk__old">{p.regular}<i className="tk__strike" /></span>
            <b className="tk__new">{p.price}</b>
            <span className="tk__unit">{p.unit}</span>
          </span>
        </span>
        <span className="tk__go"><Icon name="arrow-right" size={20} /></span>
        <span className="tk__sheen" />
      </span>
    </Link>
  );
}
