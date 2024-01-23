/* eslint-disable autofix/no-unused-vars */

import type { FlightLegData } from "../../../../interfaces/flight-leg.interface";

export interface FlightTicketProps {
  flight: FlightLegData;
}

// export enum LegType {
//   DEPARTURE = "Departure",
//   CONNECTING = "Connecting",
//   RETURN = "Return",
// }

export enum FlightTicketColorVariant {
  RED = "red",
  BLUE = "blue",
}
