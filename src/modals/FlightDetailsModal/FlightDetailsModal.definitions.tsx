import type { FlightLegData } from "../../interfaces/flight-leg.interface";

export interface FlightDetailsModalProps {
  onClose: () => void;
  flight: FlightLegData;
  // date: string;
  // departingAirport: string;
  // arrivingAirport: string;
  // airline: string;
  // legType: LegType;
  // what other info do I need to pass to the modal?
}
