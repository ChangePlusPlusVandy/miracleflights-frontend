export type DateValue = Date | null | [Date, Date];

export interface FormTypes {
  departDate: DateValue;
  arrivalDate: DateValue;
  oneWay: boolean;
  departureAirportPrimary: string;
  departureAirportAlternate: string;
  arrivalAirportPrimary: string;
  arrivalAirportAlternate: string;
}
