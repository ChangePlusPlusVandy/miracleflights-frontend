import type { LegType } from "../../components/FlightTicket/FlightTicket.definitions";

export interface FlightDetailsModalProps {
  //isOpen: boolean;
  onClose: () => void;
  date: string;
  departingAirport: string;
  arrivingAirport: string;
  airline: string;
  legType: LegType;
  // what other info do I need to pass to the modal?
}
