import axios from "axios";
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
