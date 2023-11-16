import { faker } from "@faker-js/faker";
import type { PassengerData } from "../interfaces/passenger.interface";

export const createTestPassengerData = (
  manualData: Partial<PassengerData> = {},
): PassengerData => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const birthday = faker.date.past().toISOString();
  const getPreviousDay = (isoDate: string) =>
    new Date(new Date(isoDate).getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

  return {
    id: faker.string.uuid(),
    createdTime: faker.date.recent().toISOString(),
    fields: {
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
          min: 1,
          max: 3,
        }),
      ),
      "How did you hear about us": faker.helpers.arrayElements(
        ["Social Media", "Internet Search", "Friend or Family", "Other"],
        faker.number.int({
          min: 1,
          max: 4,
        }),
      ),
      "BL - Account Number": faker.finance.accountNumber(),
      "All Flight Legs": faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        }),
      ),
      Diagnosis: faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        }),
      ),
      "Treatment Site Totals 2": [],
      "Passenger ID": faker.string.uuid(),
      "AirTable Record ID": faker.string.uuid(),
      "# of Flight Legs": faker.number.int({
        min: 1,
        max: 10,
      }),
      "# of Booked Flight Requests (Patient)": faker.number.int({
        min: 1,
        max: 3,
      }),
      "# of Booked Flight Requests (Pass 2)": faker.number.int({
        min: 1,
        max: 3,
      }),
      "# of Booked Flight Requests (Pass 3)": faker.number.int({
        min: 1,
        max: 3,
      }),
      "# of Booked Flight Requests (Accompanying)": faker.number.int({
        min: 1,
        max: 3,
      }),
      "# of Booked Flight Requests": faker.number.int({
        min: 1,
        max: 10,
      }),
      "Departure Date/Time (from All Flight Legs)": faker.helpers.arrayElements(
        [
          faker.date.recent().toISOString(),
          faker.date.recent().toISOString(),
          faker.date.recent().toISOString(),
        ],
        faker.number.int({
          min: 1,
          max: 3,
        }),
      ),
      "Name (from Treatment Site Totals 2)": [],
      "Name (from Treatment Site Totals 2) 2": [],
      "PUR (from All Flight Legs)": faker.helpers.arrayElements<number>(
        [
          faker.number.int({
            min: 1,
            max: 10000,
          }),
          faker.number.int({
            min: 1,
            max: 10000,
          }),
          faker.number.int({
            min: 1,
            max: 10000,
          }),
        ],
        faker.number.int({
          min: 1,
          max: 3,
        }),
      ),
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
      "# of Accompanying Passengers": faker.number.int({
        min: 1,
        max: 3,
      }),
      Age: faker.number.int({
        min: 1,
        max: 80,
      }),
      Birthday: birthday,
      "Day Before Birthday": getPreviousDay(birthday),
      "BL - Site 1 (from All Flight Legs)": faker.helpers.arrayElements(
        [faker.company.name(), faker.company.name(), faker.company.name()],
        faker.number.int({
          min: 1,
          max: 3,
        }),
      ),
      Created: faker.date.recent().toISOString(),
      "Latest Trip": faker.date.recent().toISOString(),
      "TS City, State (from Treatment Site Totals 2)": [],
      ...manualData.fields,
    },
    ...manualData,
  };
};
