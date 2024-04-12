import { AIRLINES } from "./constants.util";
import { faker } from "@faker-js/faker";
import type { PassengerData } from "../interfaces/passenger.interface";
import type { FlightLegData } from "../interfaces/flight-leg.interface";
import type { FlightRequestData } from "../interfaces/flight-request-interface";

/**
 * Creates a test passenger data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test passenger data object
 */
export const createTestPassengerData = (
  manualData: Partial<PassengerData> = {},
): PassengerData => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const birthday = faker.date.past().toISOString();

  return {
    id: faker.string.uuid(),
    createdTime: faker.date.recent().toISOString(),
    Type: faker.helpers.arrayElement([
      "Patient",
      "Accompanying Passenger",
      "Partner Organization",
    ]),
    "First Name": firstName,
    "Last Name": lastName,
    "Date of Birth": birthday,
    Gender: faker.helpers.arrayElement(["Female", "Male"]),
    Street: faker.location.streetAddress(),
    Country: faker.location.country(),
    Email: faker.internet.email({
      firstName: firstName,
      lastName: lastName,
    }),
    "Household Income": faker.number.int({
      min: 5000,
      max: 400000,
    }),
    "Household Size": faker.number.int({
      min: 1,
      max: 8,
    }),
    Ethnicity: faker.helpers.arrayElements(
      [
        "American Indian or Alaska Native",
        "Asian",
        "Black or African American",
        "Hispanic or Latino",
        "Native Hawaiian or Other Pacific Islander",
        "White",
        "Other",
      ],
      faker.number.int({
        min: 1,
        max: 5,
      }),
    ),
    "Military Service": faker.helpers.arrayElement([
      "Active",
      "Veteran",
      "Not Applicable",
    ]),
    "Military Member": faker.helpers.arrayElements(
      ["Self", "Spouse", "Mother", "Father", "Other"],
      faker.number.int({
        min: 0,
        max: 3,
      }),
    ),
    "How did you hear about us": faker.helpers.arrayElements(
      ["Social Media", "Internet Search", "Friend or Family", "Other"],
      faker.number.int({
        min: 1,
        max: 1,
      }),
    ),
    "All Flight Legs": faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    Diagnoses: faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "AirTable Record ID": faker.string.uuid(),
    "# of Flight Legs": faker.number.int({
      min: 1,
      max: 10,
    }),
    "# of Booked Flight Requests": faker.number.int({
      min: 1,
      max: 10,
    }),
    "Birth Month": faker.date.month(),
    "Full Name": `${firstName} ${lastName}`,
    "Passenger Names (from All Flight Legs)": faker.helpers.arrayElements(
      [
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
      ],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    Age: faker.number.int({
      min: 1,
      max: 80,
    }),
    "Latest Trip": faker.date.recent().toISOString(),
    ...manualData,
  };
};

/**
 * Creates a test flight leg data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test flight leg data object
 */
export const createTestFlightLegData = (
  manualData: Partial<FlightLegData> = {},
) => {
  return {
    id: faker.string.uuid(),
    createdTime: faker.date.recent().toISOString(),
    Status: faker.helpers.arrayElement([
      "Pending",
      "Booked",
      "Rescheduled",
      "Rebooked",
      "Canceled",
      "Did Not Fly",
    ]),
    Airline: faker.helpers.arrayElement(AIRLINES),
    "Departure Date/Time": faker.date.anytime().toString(),
    "Arrival Date/Time": faker.date.recent().toISOString(),
    "Nautical Miles": faker.number.int({
      min: 200,
      max: 10000,
    }),
    Passengers: faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Departure Airport": faker.string.alpha(3).toLocaleUpperCase(),
    "Arrival Airport": faker.string.alpha(3).toLocaleUpperCase(),
    "Leg ID": faker.string.uuid(),
    "Leg Type": faker.helpers.arrayElement([
      "Departure",
      "Connecting",
      "Return",
    ]),
    "Total Miles": faker.number.int({
      min: 200,
      max: 10000,
    }),
    "Passenger Names": faker.helpers.arrayElements(
      [
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
      ],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Total Cost": faker.number.int({
      min: 100,
      max: 2000,
    }),
    "AirTable Record ID": faker.string.uuid(),
    "Request AirTable Record ID": faker.helpers.arrayElements(
      ["request1", "request2", "request3", "request4", "request5"],
      faker.number.int({
        min: 1,
        max: 1,
      }),
    ),
    "Passenger AirTable Record IDs": faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Log Airline Credit": {
      label: faker.company.name(),
      url: faker.internet.url(),
    },
    "Patient Name": faker.helpers.arrayElements(
      [
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
      ],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Patient Latest Trip": faker.helpers.arrayElements(
      [
        faker.date.past().toISOString(),
        faker.date.past().toISOString(),
        faker.date.past().toISOString(),
      ],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Is Latest Trip": faker.helpers.arrayElement(["Yes", "No"]),
    ...manualData,
  };
};

/**
 * Creates a test flight leg data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test flight leg data object
 */
export const createTestFlightRequestData = (
  manualData: Partial<FlightRequestData> = {},
) => {
  return {
    id: faker.string.uuid(),
    createdTime: faker.date.recent().toISOString(),
    "Submission ID": faker.string.uuid(),
    "Trip Type": faker.helpers.arrayElement(["One Way", "Round Trip"]),
    "Departure Date": faker.date.future().toISOString(),
    "Request Type": faker.helpers.arrayElement([
      "Medical",
      "Compassionate",
      "Other",
    ]),
    "Household Size": faker.number.int({
      min: 1,
      max: 8,
    }),
    "Passenger 2 Approval Status": faker.helpers.arrayElement([
      "Pending",
      "Approved",
      "Denied",
    ]),
    Diagnoses: faker.helpers.arrayElement([
      "Cancer",
      "Heart Disease",
      "Diabetes",
      "Asthma",
      "Other",
    ]),
    "Passenger 3": faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Patient Type": faker.helpers.arrayElement([
      "Adult",
      "Child",
      "Senior",
      "Other",
    ]),
    Ethnicity: faker.helpers.arrayElements(
      [
        "American Indian or Alaska Native",
        "Asian",
        "Black or African American",
        "Hispanic or Latino",
        "Native Hawaiian or Other Pacific Islander",
        "White",
        "Other",
      ],
      faker.number.int({
        min: 1,
        max: 5,
      }),
    ),
    "Treatment City": faker.location.city(),
    Education: faker.helpers.arrayElement([
      "High School",
      "College",
      "Graduate School",
      "Other",
    ]),
    "Treatment Phone": faker.phone.number(),
    "Submission Date": faker.date.recent().toISOString(),
    "Alt Destination Airport": faker.string.alpha(3).toLocaleUpperCase(),
    "Primary Treatment Doctor": `${faker.person.firstName()} ${faker.person.lastName()}`,
    "Wheelchair?": faker.helpers.arrayElement(["Yes", "No"]),
    "Flight Specialist": `${faker.person.firstName()} ${faker.person.lastName()}`,
    "Appt Date": faker.date.future().toISOString(),
    "Passenger 3 Approval Status": faker.helpers.arrayElement([
      "Pending",
      "Approved",
      "Denied",
    ]),
    "First Request": faker.helpers.arrayElement(["Yes", "No"]),
    "Type of Treatment": faker.helpers.arrayElement([
      "Chemotherapy",
      "Radiation",
      "Surgery",
      "Other",
    ]),
    "Passenger 3 Reason": faker.lorem.sentence(),
    "Flight Legs": faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    Status: faker.helpers.arrayElement([
      "Pending",
      "Booked",
      "Rescheduled",
      "Rebooked",
      "Canceled",
      "Did Not Fly",
    ]),
    "Oxygen?": faker.helpers.arrayElement(["Yes", "No"]),
    "Origin Airport": faker.string.alpha(3).toLocaleUpperCase(),
    "Treatment Fax": faker.phone.number(),
    "Passenger 3 Different Return": faker.helpers.arrayElement(["Yes", "No"]),
    Patient: faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Passenger 2": faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Return Date": faker.date.future().toISOString(),
    "Treatment Site": faker.helpers.arrayElement([
      "Hospital",
      "Clinic",
      "Doctor's Office",
      "Other",
    ]),
    "Treatment State": faker.location.state(),
    "Passenger 3 Return Date": faker.date.future().toISOString(),
    "Patient Age": faker.number.int({
      min: 1,
      max: 80,
    }),
    "Passenger 2 Different Return": faker.helpers.arrayElement(["Yes", "No"]),
    "Destination Airport": faker.string.alpha(3).toLocaleUpperCase(),
    "Alt. Origin Airport": faker.string.alpha(3).toLocaleUpperCase(),
    "AirTable Record ID": faker.string.uuid(),
    "Patient AirTable Record ID": faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Passenger 2 AirTable Record ID": faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Passenger 3 AirTable Record ID": faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Passenger AirTable Record IDs": faker.string.uuid(),
    "Existing Diagnoses": faker.helpers.arrayElements(
      ["Cancer", "Heart Disease", "Diabetes", "Asthma", "Other"],
      faker.number.int({
        min: 1,
        max: 3,
      }),
    ),
    "Total Nautical Miles": faker.number.int({
      min: 200,
      max: 10000,
    }),
    "# of Legs": faker.number.int({
      min: 1,
      max: 10,
    }),
    "Total # of Legs": faker.number.int({
      min: 1,
      max: 10,
    }),
    "Request ID": faker.string.uuid(),
    ...manualData,
  };
};
