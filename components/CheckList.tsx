import { Icon } from "./Icon";

export function CheckList({ items }: { items: { title: string; text?: string }[] }) {
  return (
    <ul className="checklist">
      {items.map((t) => (
        <li key={t.title} className="checklist__item">
          <span className="checklist__box"><Icon name="check" size={16} /></span>
          <span className="checklist__txt">
            <strong>{t.title}{t.text ? ": " : ""}</strong>
            {t.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
