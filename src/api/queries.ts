import axios from "axios";
import type { PassengerData } from "../interfaces/passenger.interface";

export const getPassengers = (): Promise<PassengerData> =>
  axios
    .get(`${process.env.VITE_HOST}/passenger/rec9C9rLarSiAb9ZQ`)
    .then((res) => res.data);
