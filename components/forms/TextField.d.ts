export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  error?: string;
  hint?: string;
  value?: string;
  onChange?: (e: any) => void;
  name?: string;
  dark?: boolean;
}
export declare function TextField(props: TextFieldProps): JSX.Element;