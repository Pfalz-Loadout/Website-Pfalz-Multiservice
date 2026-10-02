export interface NavLink { label: string; id?: string; href?: string; icon?: string; children?: NavLink[]; }
/**
 * Main site header: logo, dropdown nav, phone block, CTA.
 * @startingPoint section="Navigation" subtitle="Header with dropdown nav + CTA" viewport="1280x420"
 */
export interface SiteHeaderProps {
  logoSrc: string;
  /** White logo used when transparent (over hero) */
  logoDarkSrc?: string;
  nav?: NavLink[];
  /** id/label of active top-level item */
  active?: string;
  /** null hides the phone block */
  phone?: string | null;
  /** null hides the CTA button */
  ctaLabel?: string | null;
  onCta?: () => void;
  onNavigate?: (id: string) => void;
  /** Glass-dark version for placement over hero imagery */
  transparent?: boolean;
  sticky?: boolean;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;