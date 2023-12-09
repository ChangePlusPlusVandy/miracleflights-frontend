import type { FlightLegData } from "../interfaces/flight-leg.interface";

/**
 * Given a date of birth, returns the age of the person
 * @param dateOfBirth the date of birth to calculate age from
 * @returns the age of the person
 */
export const getAge = (dateOfBirth: string) => {
  const today = new Date();

  // Convert dateOfBirth to Date object
  const birthDate = new Date(dateOfBirth);

  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();

  // Calculate month difference
  const m = today.getMonth() - birthDate.getMonth();

  // If today's month is less than the birth month, subtract 1 from age
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // If age is negative, return 0
  if (age < 0) {
    return 0;
  }

  // If age is NaN, return 0. This happens when dateOfBirth is not a valid date
  if (isNaN(age)) {
    return 0;
  }

  return age;
};

/**
 * Formats a date string to MM/DD/YYYY
 * @param date the date to format
 * @returns a string in the format MM/DD/YYYY
 */
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

/**
 * Given an array of flight legs, returns a string in the format MM/DD/YYYY - MM/DD/YYYY representing the time frame of the trip
 * @param trip the array of flight legs
 * @returns a string in the format MM/DD/YYYY - MM/DD/YYYY
 */
export const formatTimeFrame = (trip: FlightLegData[]) => {
  // return the earliest and latest start dates for flights concatenated
  return (
    formatDate(trip[0].fields["Departure Date/Time"]) +
    " - " +
    formatDate(trip[trip.length - 1].fields["Departure Date/Time"])
  );
};
