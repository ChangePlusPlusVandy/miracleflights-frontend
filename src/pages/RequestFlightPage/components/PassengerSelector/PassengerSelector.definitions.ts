import type { PassengerData } from "../../../../interfaces/passenger.interface";

export interface PassengerSelectorProps {
  setStep: (_page: number) => void;
  handleClickPassenger: (_passenger: PassengerData) => void;
  selectedPassengers: PassengerData[];
  selectError: boolean;
}
