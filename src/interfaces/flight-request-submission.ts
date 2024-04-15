/**
 * Represents a flight request submission.
 */
export interface FlightRequestSubmission {
  enoughDaysAway: string;
  travelType: string;
  ScheduledMedicalAppointmentDate: string; // Needs to be in ISO string format (use .toISOString())
  DepartureDate: string; // Needs to be in ISO string format (use .toISOString())
  AirportOfOrigin: string;
  AlternateAirportOfOrigin: string;
  DestinationAirport: string;
  AlternateDestinationAirport: string;
  ReturnDate: string;
  FullNameOfTreatmentSite: string;
  FullNameOfPrimaryTreatmentSiteDoctor: string;
}

export interface TreatmentInfoType {
  FullNameOfTreatmentSite: string;
  FullNameOfPrimaryTreatmentSiteDoctor: string;
  ScheduledMedicalAppointmentDate: string;
}
