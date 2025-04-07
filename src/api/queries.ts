import axios from "axios";
import type {
  PopulateFolderResponse,
  AccompanyingPassenger,
  AccompanyingPassengerFolderResponse,
} from "../interfaces/folder-response-interface";
import type { FlightRequestData } from "../interfaces/flight-request-interface";
import type { DashboardData } from "../pages/DashboardPage/DashboardPage.definitions";
import type { PassengerData } from "../interfaces/passenger.interface";
import type { DocumentsData } from "../pages/DocumentsPage/Documents.definitions";

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

export const updatePatient = async (
  patient: {
    Street: string;
    Email: string;
    DateOfBirth: string;
    MilitaryService: string;
    Gender: string;
    CellPhone: string;
  },
  airtableRecordId: string,
  token?: string | null,
): Promise<PassengerData> => {
  const airtableFields: { [key: string]: string | number | unknown } = {
    Street: patient.Street,
    Email: patient.Email,
    Gender: patient.Gender,
    "Date of Birth": patient.DateOfBirth, // Correct Airtable field name
    "Military Service": patient.MilitaryService,
    "Cell Phone": patient.CellPhone,
  };

  const data = {
    records: [
      {
        id: airtableRecordId,
        fields: airtableFields,
      },
    ],
  };

  try {
    const response = await axios.put(
      `${process.env.VITE_HOST}/passenger/${airtableRecordId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        switch (error.response.status) {
          case 400:
            throw new Error("Invalid request data. Please check your input.");
          case 401:
            throw new Error("Authentication failed. Please log in again.");
          case 403:
            throw new Error(
              "You do not have permission to perform this action.",
            );
          case 404:
            throw new Error(`Passenger record ${airtableRecordId} not found.`);
          case 429:
            throw new Error("Too many requests. Please try again later.");
          case 500:
            throw new Error("Server error. Please try again later.");
          default:
            throw new Error(
              `Server error: ${error.response.data.message || "Unknown error occurred"}`,
            );
        }
      } else if (error.request) {
        // Request was made but no response received
        if (error.code === "ECONNABORTED") {
          throw new Error("Request timed out. Please try again.");
        }
        throw new Error("Network error. Please check your connection.");
      }
    }
    throw new Error(
      `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const updatePassenger = async (
  passenger: {
    Street: string;
    Relationship?: string;
    Country: string;
    Email: string;
    DateOfBirth: string;
    MilitaryService: string;
    Gender: string;
    CellPhone: string;
    Notes?: string;
  },
  airtableRecordId: string,
  token?: string | null,
): Promise<PassengerData> => {
  const airtableFields: { [key: string]: string | number | unknown } = {
    Street: passenger.Street,
    Relationship: passenger.Relationship,
    Country: passenger.Country,
    Email: passenger.Email,
    Gender: passenger.Gender,
    "Date of Birth": passenger.DateOfBirth, // Correct Airtable field name
    "Military Service": passenger.MilitaryService,
    "Cell Phone": passenger.CellPhone,
  };

  const data = {
    records: [
      {
        id: airtableRecordId,
        fields: airtableFields,
      },
    ],
  };

  try {
    const response = await axios.put(
      `${process.env.VITE_HOST}/passenger/${airtableRecordId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        switch (error.response.status) {
          case 400:
            throw new Error("Invalid request data. Please check your input.");
          case 401:
            throw new Error("Authentication failed. Please log in again.");
          case 403:
            throw new Error(
              "You do not have permission to perform this action.",
            );
          case 404:
            throw new Error(`Passenger record ${airtableRecordId} not found.`);
          case 429:
            throw new Error("Too many requests. Please try again later.");
          case 500:
            throw new Error("Server error. Please try again later.");
          default:
            throw new Error(
              `Server error: ${error.response.data.message || "Unknown error occurred"}`,
            );
        }
      } else if (error.request) {
        // Request was made but no response received
        if (error.code === "ECONNABORTED") {
          throw new Error("Request timed out. Please try again.");
        }
        throw new Error("Network error. Please check your connection.");
      }
    }
    throw new Error(
      `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

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

export const getDocumentsData = (
  patient_name: string,
  airtableID: string,
  token?: string | null,
): Promise<DocumentsData> =>
  axios
    .get(`${process.env.VITE_HOST}/documents?patientName=${patient_name}&airtableID=${airtableID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const createPatientFolder = (
  patientInfo: {
    patient_name: string;
    airtableID: string; // airtableID can also be substituted with userID in other calls
  },
  token?: string | null,
): Promise<PopulateFolderResponse> =>
  axios
    .post(`${process.env.VITE_HOST}/test-populate`, patientInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const populateAccompanyingPassengersFolder = (
  patientInfo: {
    patient_name: string;
    airtableID: string;
    accompanying_passengers?: AccompanyingPassenger[]; // format will be fullName and dob
  },
  token?: string | null,
): Promise<AccompanyingPassengerFolderResponse[]> =>
  axios
    .post(`${process.env.VITE_HOST}/test-populate-accompanying`, patientInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const populateTripsFolder = (
  patientInfo: {
    patient_name: string;
    airtableID: string;
    trips: FlightRequestData[];
  },
  token?: string | null,
): Promise<FlightRequestData[]> =>
  axios
    .post(`${process.env.VITE_HOST}/test-populate-trips`, patientInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
