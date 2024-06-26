/* eslint-disable autofix/no-unused-vars */

import type { FlightLegData } from "../../../../interfaces/flight-leg.interface";

export interface FlightTicketProps {
  flight: FlightLegData;
  index: number;
  isDeparture: boolean;
}

export enum FlightTicketColorVariant {
  RED = "red",
  BLUE = "blue",
}
