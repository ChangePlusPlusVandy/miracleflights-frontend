import type { TreatmentInfoType } from "../../../../interfaces/flight-request-submission";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

export interface TreatmentInfoProps {
  setStep: (_value: number) => void;
  register: UseFormRegister<TreatmentInfoType>;
  errors: FieldErrors<TreatmentInfoType>;
  watch: UseFormWatch<TreatmentInfoType>;
}
