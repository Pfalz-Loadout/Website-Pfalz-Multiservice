import { lines } from "@/lib/typo";
import { WEB_BASE_ITEMS, type WebPackage } from "@/lib/data";
import { Icon } from "../Icon";

/**
 * Paketkarte. Bei `yearly` steht vorne der rechnerische Monatspreis,
 * darunter der Jahresbetrag – so wie man es von Abo-Preisen kennt.
 */
export function PackageCard({ p, yearly = false }: { p: WebPackage; yearly?: boolean }) {
  const jahr = yearly && !!p.priceYear;
  const price = jahr ? p.priceYearMonthly! : p.price;
  const unit = jahr ? "/ Monat" : p.unit;

  return (
    <div className={`pk ${p.badge ? "pk--hi" : ""} ${p.tagline ? "pk--tag" : ""}`}>
      {p.badge && <span className="pk__badge">{p.badge}</span>}
      <h3 className="pk__name">{p.name}</h3>
      {p.tagline && <p className="pk__tag">{p.tagline}</p>}
      <p className={`pk__price ${/\d/.test(price) ? "" : "pk__price--req"}`}>
        {jahr
          ? <span className="pk__regular">Statt <s>{p.price}</s> im Monat</span>
          : p.regular && <span className="pk__regular"><span className="pk__offer">Angebot</span> Normalpreis <s>{p.regular}</s></span>}
        {price}{unit && <span className="pk__unit"> {unit}</span>}
      </p>
      {jahr && <p className="pk__billed"><b>{p.priceYear}</b> pro Jahr, einmal jährlich abgerechnet</p>}
      <p className="pk__note">{p.note}</p>
      <ul className="pk__list">
        {p.items.map((it) => (
          <li key={it} className={WEB_BASE_ITEMS.includes(it) ? "pk__base" : undefined}><Icon name="check" size={16} />
            {it === "Übergabe-Paket" ? <a href="#uebergabe" className="pk__link">Übergabe-Paket inklusive</a> : <span>{lines(it)}</span>}
          </li>
        ))}
        {p.items.some((it) => WEB_BASE_ITEMS.includes(it)) && (
          <li className="pk__basesum"><Icon name="check" size={16} /><span>Inklusive: {WEB_BASE_ITEMS.join(" · ")}</span></li>
        )}
      </ul>
    </div>
  );
}
