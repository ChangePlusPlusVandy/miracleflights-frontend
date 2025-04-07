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
