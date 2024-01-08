import type { FlightLegData } from "../../interfaces/flight-leg.interface";

export interface FlightDetailsModalProps {
  onClose: () => void;
  flight: FlightLegData;
}
