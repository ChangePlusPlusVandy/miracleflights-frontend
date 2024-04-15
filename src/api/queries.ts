import axios from "axios";
import type { PassengerData } from "../interfaces/passenger.interface";
import { FlightRequestData } from "../interfaces/flight-request-interface";

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
