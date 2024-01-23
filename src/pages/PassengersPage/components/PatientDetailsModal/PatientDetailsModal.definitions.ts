import type { PassengerData } from "../../../../interfaces/passenger.interface";

export interface PatientDetailsModalProps {
  patient: PassengerData;
  onClose: () => void;
}
