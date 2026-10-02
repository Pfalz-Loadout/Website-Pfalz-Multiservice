export interface SelectFieldProps {
  label?: string;
  options: string[];
  value?: string;
  onChange?: (e: any) => void;
  required?: boolean;
  placeholder?: string;
  name?: string;
  dark?: boolean;
}
export declare function SelectField(props: SelectFieldProps): JSX.Element;