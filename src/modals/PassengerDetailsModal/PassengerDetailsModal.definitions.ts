import type { PassengerData } from "../../interfaces/passenger.interface";

export interface PassengerDetailsModalProps {
  passenger: PassengerData;
  onClose: () => void;
}
