export interface PopulateFolderResponse {
  tripsStatus: number;
  accompanyingStatus: number;
  documentsStatus: number;
}

export interface AccompanyingPassenger {
  fullName: string;
  dob: string;
  relationship: string;
}

export interface AccompanyingPassengerFolderResponse {
  results: {
    passengerName: string;
    status: number;
    message: string;
    dob: string;
    relationship: string;
    age: number;
    under18: boolean;
  }[];
}

export interface CreateUploadSessionBodyRequest {
  patient_name: string;
  airtableID: string;
  item: {
    name: string;
    description: string;
    "@microsoft.graph.conflictBehavior": "replace";
  };
}

export interface CreateUploadSessionResponse {
  uploadUrl: string;
  expirationDateTime: string;
}

export interface DeleteUploadSessionRequest {
  uploadUrl: string;
}

// should be an empty object if successfully deleted
export interface DeleteUploadSessionResponse {}



