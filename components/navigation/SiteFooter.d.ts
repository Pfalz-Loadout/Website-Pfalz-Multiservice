export interface FooterColumn { title: string; links: (string | { label: string; id?: string })[]; }
export interface SiteFooterProps {
  /** Light logo for black background */
  logoSrc: string;
  text?: string;
  /** Centered link columns (reference uses one: services) */
  columns?: FooterColumn[];
  contactTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  /** Optional static map image shown between address and phone */
  mapSrc?: string;
  socials?: string[];
  company?: string;
  legal?: string[];
  credit?: { prefix?: string; name: string };
  year?: number;
  onNavigate?: (id: string) => void;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
