/* eslint-disable autofix/no-unused-vars */

export interface FlightTicketProps {
  date: string;
  departingAirport: string;
  arrivingAirport: string;
  airline: string;
  legType: LegType;
}

export enum LegType {
  DEPARTURE = "Departure",
  CONNECTING = "Connecting",
  RETURN = "Return",
}
