import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export interface ReusableInputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isRequired: boolean;
  label: string;
  type: string;
  placeholder: string;
  defaultValue: string;
  errorText: string;
}
