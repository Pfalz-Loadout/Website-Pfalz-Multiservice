export interface CheckListItem { title?: string; text?: string; }
export interface CheckListProps {
  /** Strings or {title,text} — title renders bold with a colon */
  items: (string | CheckListItem)[];
  dark?: boolean;
  icon?: string;
}
export declare function CheckList(props: CheckListProps): JSX.Element;