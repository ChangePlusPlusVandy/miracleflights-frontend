import axios from "axios";
import type {
  PopulateFolderResponse,
  AccompanyingPassenger,
  AccompanyingPassengerFolderResponse,
  CreateUploadSessionResponse,
  CreateUploadSessionBodyRequest,
  DeleteUploadSessionResponse,
  DeleteUploadSessionRequest,
} from "../interfaces/folder-response-interface";
import type { FlightRequestData } from "../interfaces/flight-request-interface";
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
    City: string;
    State: string;
    Zip: string;
    Country: string;
    Email: string;
    DateOfBirth: string;
    MilitaryService: string;
    Gender: string;
    CellPhone: string;
    Diagnoses: string;
    FirstName: string;
    LastName: string;
  },
  airtableRecordId: string,
  token?: string | null,
): Promise<PassengerData> => {
  const airtableFields: { [key: string]: string | number | unknown } = {
    Street: patient.Street,
    City: patient.City,
    State: patient.State,
    Zip: patient.Zip,
    Country: patient.Country,
    Email: patient.Email,
    Gender: patient.Gender,
    "Date of Birth": patient.DateOfBirth, // Correct Airtable field name
    "Military Service": patient.MilitaryService,
    "Cell Phone": patient.CellPhone,
    Diagnoses: patient.Diagnoses.split(","),
    "First Name": patient.FirstName,
    "Last Name": patient.LastName,
  };

  const data = {
    records: [
      {
        id: airtableRecordId,
        fields: airtableFields,
      },
    ],
  };

  console.log("Data to be sent:", data); // Debugging line

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

export const deletePassenger = async (
  airtableRecordId: string,
  token?: string | null,
): Promise<void> => {
  // Typically DELETE returns void or status

  // Explicitly check for token before proceeding
  if (!token) {
    throw new Error("Authentication token not provided.");
  }

  try {
    // Make the DELETE request - no request body is typically needed
    await axios.delete(
      `${process.env.VITE_HOST}/passenger/${airtableRecordId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000, // Use a consistent timeout
      },
    );

    // If the request succeeds (doesn't throw), the deletion was successful.
    return;
  } catch (error) {
    // --- Consistent Error Handling (adapted for DELETE context) ---
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with an error status code (4xx, 5xx)
        const status = error.response.status;
        const message =
          error.response.data?.message ||
          "An unknown server error occurred during deletion.";
        switch (status) {
          case 400: // Less common for DELETE by ID, but possible
            throw new Error(
              `Invalid request: ${message}. Please check the passenger ID.`,
            );
          case 401:
            throw new Error(
              `Authentication failed: ${message}. Please log in again.`,
            );
          case 403:
            throw new Error(
              `Permission denied: ${message}. You cannot delete this passenger.`,
            );
          case 404:
            throw new Error(`Passenger record ${airtableRecordId} not found.`);
          case 429:
            throw new Error(
              `Too many requests: ${message}. Please try again later.`,
            );
          case 500:
          default: // Catch 5xx errors and any other unexpected status codes
            throw new Error(
              `Server error (${status}): ${message}. Please try again later.`,
            );
        }
      } else if (error.request) {
        // Request was made, but no response received
        if (error.code === "ECONNABORTED") {
          throw new Error(
            "The delete request timed out. Please check your connection and try again.",
          );
        }
        throw new Error(
          "Network error during deletion. Please check your connection.",
        );
      }
    }
    // Handle non-Axios errors or other unexpected issues
    throw new Error(
      `Unexpected error during deletion: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const updatePassenger = async (
  passenger: {
    Street: string;
    Relationship?: string;
    City: string;
    State: string;
    Zip: string;
    Country: string;
    Email: string;
    DateOfBirth: string;
    MilitaryService: string;
    Gender: string;
    CellPhone: string;
    Notes?: string;
    FirstName: string;
    LastName: string;
  },
  airtableRecordId: string,
  token?: string | null,
): Promise<PassengerData> => {
  const airtableFields: { [key: string]: string | number | unknown } = {
    Street: passenger.Street,
    Relationship: passenger.Relationship,
    City: passenger.City,
    State: passenger.State,
    Zip: passenger.Zip,
    Country: passenger.Country,
    Email: passenger.Email,
    Gender: passenger.Gender,
    "Date of Birth": passenger.DateOfBirth, // Correct Airtable field name
    "Military Service": passenger.MilitaryService,
    "Cell Phone": passenger.CellPhone,
    "First Name": passenger.FirstName,
    "Last Name": passenger.LastName,
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

export const getDocumentsData = (
  patient_name: string,
  airtableID: string,
  token?: string | null,
): Promise<DocumentsData> =>
  axios
    .get(
      `${process.env.VITE_HOST}/documents?patientName=${patient_name}&airtableID=${airtableID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
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

export const createUploadSession = (
  uploadBody: CreateUploadSessionBodyRequest, // body will also have patient_name and airtableID
  token?: string | null,
): Promise<CreateUploadSessionResponse> =>
  axios
    .post(`${process.env.VITE_HOST}/upload-session`, uploadBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const deleteUploadSession = (
  deleteBody: DeleteUploadSessionRequest,
  token?: string | null,
): Promise<DeleteUploadSessionResponse> =>
  axios
    .post(`${process.env.VITE_HOST}/delete-session`, deleteBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
