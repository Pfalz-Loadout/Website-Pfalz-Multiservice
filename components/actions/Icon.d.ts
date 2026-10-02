export interface IconProps {
  /** Lucide icon name (kebab-case), e.g. "truck", "warehouse", "phone" */
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;