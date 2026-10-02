/**
 * Eyebrow + uppercase light headline whose final word is extrabold + intro paragraph.
 * @startingPoint section="Content" subtitle="Signature section heading" viewport="700x300"
 */
export interface SectionHeadingProps {
  eyebrow?: string;
  /** Light-weight part of the headline */
  title: string;
  /** Final word(s), set in extrabold */
  highlight?: string;
  intro?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  level?: 1 | 2 | 3;
  size?: 'hero' | 'h1' | 'h2';
  maxWidth?: number;
  style?: React.CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;