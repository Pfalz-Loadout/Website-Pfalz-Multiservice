/**
 * Image card for a service, location or project.
 * @startingPoint section="Content" subtitle="Service / area / project card" viewport="700x460"
 */
export interface ServiceCardProps {
  image?: string;
  title: string;
  text?: string;
  linkLabel?: string;
  href?: string;
  /** Lucide icon shown in a navy tile overlapping the image (stacked variant) */
  icon?: string;
  /** Small status label, e.g. "Bald verfügbar" */
  status?: string;
  variant?: 'stacked' | 'overlay';
  onClick?: (e: any) => void;
}
export declare function ServiceCard(props: ServiceCardProps): JSX.Element;