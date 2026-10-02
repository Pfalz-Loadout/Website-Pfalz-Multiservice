/**
 * Closing call-to-action band on dark navy (optionally over a photo).
 * @startingPoint section="Content" subtitle="Dark CTA band" viewport="1280x420"
 */
export interface CtaBandProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  intro?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  image?: string;
}
export declare function CtaBand(props: CtaBandProps): JSX.Element;