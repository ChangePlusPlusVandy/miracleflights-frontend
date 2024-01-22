// definitions
import type { UseFormRegister } from "react-hook-form";

export interface SelectProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  options: string[];
  label?: string;
  placeholder?: string;
}
