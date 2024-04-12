export type FormData = {
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
  Waiver: "Yes" | "No";
};

export type AddPassengerModalProps = {
  onClose: () => void;
};
