import type { UseFormRegister } from "react-hook-form";

export interface ReusableInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}
