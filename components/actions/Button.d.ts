/**
 * Uppercase tracked CTA button.
 * @startingPoint section="Actions" subtitle="Primary, outline and link CTAs" viewport="700x320"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'accent' | 'outline' | 'outline-light' | 'link';
  size?: 'sm' | 'md' | 'lg';
  /** Trailing Lucide icon name, e.g. "arrow-right" */
  icon?: string;
  /** Leading Lucide icon name, e.g. "phone" */
  iconLeft?: string;
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: any) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;