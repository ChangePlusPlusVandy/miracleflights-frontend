import type { UseFormRegister } from "react-hook-form";

export interface ReusableInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error: string | undefined;
  label: string;
  type: string;
  placeholder: string;
}
