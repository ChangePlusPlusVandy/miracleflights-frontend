import axios from "axios";
import type { FlightRequestData } from "../interfaces/flight-request-interface";
import type { DashboardData } from "../pages/DashboardPage/DashboardPage.definitions";
import type { PassengerData } from "../interfaces/passenger.interface";

export const getPassengers = async (
  id: string,
  token?: string | null,
): Promise<PassengerData> =>
  axios
    .get(`${process.env.VITE_HOST}/passenger/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const getAccompanyingPassengers = async (
  id: string,
  token?: string | null,
): Promise<PassengerData[]> =>
  axios
    .get(`${process.env.VITE_HOST}/passenger/accompanying?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const createUser = (
  user: {
    birthdate: string;
    firstName: string;
    lastName: string;
  },
  token?: string | null,
): Promise<PassengerData> =>
  axios
    .post(`${process.env.VITE_HOST}/user`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const createPassenger = (
  passenger: {
    fields: {
      "First Name": string;
      "Last Name": string;
      Relationship:
        | "Mother"
        | "Father"
        | "Step-mother"
        | "Step-father"
        | "Legal Guardian"
        | "Spouse"
        | "Family Member"
        | "Other Caregiver";
      "Date of Birth": Date | string;
      Diagnoses?: (string | undefined)[];
      Gender: "Male" | "Female" | "Other";
      Street: string;
      City: string;
      State: string;
      Zip: string;
      Country: string;
      "Cell Phone": string;
      Email: string;
      Waiver: boolean;
    };
  },
  userId: string,
  token?: string | null,
): Promise<PassengerData> =>
  axios
    .post(`${process.env.VITE_HOST}/passenger/${userId}`, passenger, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const linkUser = (
  airtableRecordId: string,
  token?: string | null,
): Promise<PassengerData> =>
  axios
    .post(
      `${process.env.VITE_HOST}/user/link`,
      { airtableRecordId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data);

export const getUserByAirtableRecordId = (
  airtableRecordId: string,
  token?: string | null,
): Promise<PassengerData> =>
  axios
    .get(`${process.env.VITE_HOST}/passenger/${airtableRecordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const updatePassenger = (
  passenger: {
    Street: string;
    Country: string;
    Email: string;
  },
  airtableRecordId: string,
  token?: string | null,
): Promise<PassengerData> =>
  axios
    .put(`${process.env.VITE_HOST}/passenger/${airtableRecordId}`, passenger, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

/**
 * Fetch all flight requests for a specific user from the server.
 *
 * @param {string} userId The unique identifier for the user whose flight requests are to be retrieved.
 * @returns {Promise<Object[]>} A promise that resolves to an array of flight requests.
 */

export const getAllFlightsForUser = (
  userId: string,
  token?: string | null,
): Promise<FlightRequestData[]> =>
  axios
    .get(`${process.env.VITE_HOST}/requests?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

/**
 * Retrieves the dashboard data from the server.
 * @param token - Optional token for authentication.
 * @returns A Promise that resolves to the DashboardData object.
 */
export const getDashboardData = (
  token?: string | null,
): Promise<DashboardData> =>
  axios
    .get(`${process.env.VITE_HOST}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
