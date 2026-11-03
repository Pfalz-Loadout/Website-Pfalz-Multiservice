import Link from "next/link";
import { WEB_PACKAGES } from "@/lib/data";
import { Icon } from "../Icon";

/**
 * Aktions-Ticket im Hero: Eine Schere schneidet durch „199 €", die „1" fällt heraus,
 * übrig bleiben „99 €". Reines CSS, kein Client-JS, keine Bilder.
 */
export function OfferTicket() {
  const p = WEB_PACKAGES[0];
  // Nur wenn der Normalpreis mit dem Aktionspreis endet (199 € → 99 €), fällt eine Ziffer weg
  if (!p.regular || !p.regular.endsWith(p.price)) return null;
  const drop = p.regular.slice(0, -p.price.length);

  return (
    <Link href="/webdesign#pakete" className="tk"
      aria-label={`Aktion: Website-Paket ${p.name} für ${p.price} statt ${p.regular}, 50 Prozent Rabatt. Zu den Paketen`}>
      <span className="tk__frame" aria-hidden="true">
        <span className="tk__ring" />
        <span className="tk__body">
          <span className="tk__stub">
            <span className="tk__pct">−50<small>%</small></span>
            <span className="tk__sparks"><i /><i /><i /></span>
          </span>
          <span className="tk__main">
            <span className="tk__eyebrow"><i className="tk__dot" />Webdesign-Aktion</span>
            <span className="tk__title">Paket {p.name}</span>
            <span className="tk__price">
              <span className="tk__one">{drop}</span>
              <span className="tk__rest"><b className="tk__new">{p.price}</b><span className="tk__unit">{p.unit}</span></span>
            </span>
            <span className="tk__was">Statt <s>{p.regular}</s> · Für Unternehmen</span>
          </span>
          <span className="tk__go"><Icon name="arrow-right" size={22} /></span>
          <span className="tk__sheen" />
        </span>
      </span>
      <span className="tk__cutter" aria-hidden="true">
        <span className="tk__line" />
        <span className="tk__track">
          <svg className="tk__sc" viewBox="0 0 40 64" width="62" height="99">
            <defs>
              <linearGradient id="tk-steel" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#8d8d8d" /><stop offset=".5" stopColor="#ffffff" /><stop offset="1" stopColor="#a9a9a9" />
              </linearGradient>
            </defs>
            <g className="tk__blade tk__blade--a">
              <path d="M20 29 L24 33 L21.4 62 Z" fill="url(#tk-steel)" />
              <path d="M20 30 L12.5 16" stroke="#DDBB4D" strokeWidth="3" strokeLinecap="round" />
              <circle cx="10" cy="10" r="7" fill="none" stroke="#DDBB4D" strokeWidth="3" />
            </g>
            <g className="tk__blade tk__blade--b">
              <path d="M20 29 L16 33 L18.6 62 Z" fill="url(#tk-steel)" />
              <path d="M20 30 L27.5 16" stroke="#DDBB4D" strokeWidth="3" strokeLinecap="round" />
              <circle cx="30" cy="10" r="7" fill="none" stroke="#DDBB4D" strokeWidth="3" />
            </g>
            <circle cx="20" cy="30" r="2.2" fill="#000" stroke="#DDBB4D" strokeWidth="1.2" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
