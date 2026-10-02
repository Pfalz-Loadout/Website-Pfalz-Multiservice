export interface ProcessStepProps {
  /** Two-digit step number, e.g. "01" */
  number: string;
  title: string;
  text?: string;
  dark?: boolean;
  last?: boolean;
}
export declare function ProcessStep(props: ProcessStepProps): JSX.Element;