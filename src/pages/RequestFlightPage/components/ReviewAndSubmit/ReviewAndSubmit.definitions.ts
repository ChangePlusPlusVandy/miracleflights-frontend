import type { TreatmentInfoType } from "../../../../interfaces/flight-request-submission";
import type { PassengerData } from "../../../../interfaces/passenger.interface";
import type { FlightInfoType } from "../FlightTimeSelector/FlightTimeSelector.definitions";

export interface ReviewAndSubmitProps {
  passengers: PassengerData[];
  flightInfo: FlightInfoType | null | undefined;
  treatmentInfo: TreatmentInfoType;
  setStep: (_step: number) => void;
  onSubmit: () => void;
}
