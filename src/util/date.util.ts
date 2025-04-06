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
export const formatDate = (
  dateString: string | number | Date | null | undefined,
): string => {
  if (!dateString) {
    return "";
  }

  // Important: Parsing non-ISO strings like "MM/DD/YYYY" is unreliable.
  // Prefer ISO format "YYYY-MM-DD" for inputs if possible.
  // new Date('2003-01-01') is generally interpreted as UTC midnight.
  // new Date('01/01/2003') interpretation can vary more between environments.
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.error("Invalid date string provided:", dateString);
    return "";
  }

  // Use UTC methods to avoid local timezone shifts
  const month = date.getUTCMonth() + 1; // getUTCMonth is 0-indexed
  const day = date.getUTCDate(); // getUTCDate is 1-indexed
  const year = date.getUTCFullYear();

  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  return `${formattedMonth}/${formattedDay}/${year}`;
};

/**
 * Given an array of flight legs, returns a string in the format MM/DD/YYYY - MM/DD/YYYY representing the time frame of the trip
 * @param trip the array of flight legs
 * @returns a string in the format MM/DD/YYYY - MM/DD/YYYY
 */
export const formatTimeFrame = (trip: FlightLegData[]) => {
  // return the earliest and latest start dates for flights concatenated
  return (
    formatDate(trip[0]["Departure Date/Time"]) +
    " - " +
    formatDate(trip[trip.length - 1]["Departure Date/Time"])
  );
};
