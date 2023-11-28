export interface SelectProps {
  options: string[];
  placeholder: string;
  action: (_: string) => void;
}
