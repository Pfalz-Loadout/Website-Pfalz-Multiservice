export interface TestimonialCardProps {
  quote: string;
  name: string;
  /** e.g. "Google-Bewertung · Landau" */
  meta?: string;
  rating?: number;
}
export declare function TestimonialCard(props: TestimonialCardProps): JSX.Element;