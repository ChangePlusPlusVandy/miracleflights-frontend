export type DateValue = Date | null | [Date, Date];

export interface FlightInfoType {
  departDate: DateValue;
  arrivalDate: DateValue;
  oneWay: boolean;
  departureAirportPrimary: string;
  departureAirportAlternate: string;
  arrivalAirportPrimary: string;
  arrivalAirportAlternate: string;
}

export interface FlightTimeSelectorProps {
  setStep: (_step: number) => void;
  defaultFlightInfo?: FlightInfoType | null;
  setFlightInfo: (_flightInfo: FlightInfoType) => void;
}
