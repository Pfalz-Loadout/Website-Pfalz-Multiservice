export interface EyebrowProps {
  children?: React.ReactNode;
  tone?: 'accent' | 'primary' | 'light' | 'warm';
  /** Short leading rule (and trailing when centered) */
  rule?: boolean;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;