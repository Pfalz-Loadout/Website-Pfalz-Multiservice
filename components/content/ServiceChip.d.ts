export interface ServiceChipProps {
  children?: React.ReactNode;
  icon?: string;
  /** Glassy chip for use over hero imagery */
  dark?: boolean;
  active?: boolean;
  onClick?: () => void;
}
export declare function ServiceChip(props: ServiceChipProps): JSX.Element;