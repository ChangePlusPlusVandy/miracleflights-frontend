/* eslint-disable autofix/no-unused-vars */
export enum QuestionType {
  YesNoQuestion = "yesNoQuestion",
  MultipleChoiceQuestion = "multipleChoiceQuestion",
  MultiSelectQuestion = "multiSelectQuestion",
  DateQuestion = "dateQuestion",
  TextResponseQuestion = "textResponseQuestion",
  Section = "section",
  NumberInput = "numberInput",
  FileInput = "fileInput",
  DropdownQuestion = "dropdownQuestion",
}

export interface Question {
  id: number;
  type: QuestionType;
  promptText: string;
  answer?: string;
  options?: string[];
  helperText?: string;
  // Section specific fields
  sectionTitle?: string;
  introText?: string;
}

export const questions: Question[] = [
  {
    id: 0,
    type: QuestionType.Section,
    sectionTitle: "Introduction",
    introText:
      "Welcome to the Miracle Flights Medical Flight Request Application Form.",
    promptText:
      "Information collected will be used by our staff to review your request, and if approved, coordinate travel on your behalf. All data provided will be kept in strict confidence and only used for this purpose. Before completing our application, please answer the questions below to see if you qualify for our program services.",
  },
  {
    id: 1,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Will the patient be 17 years old or younger at the time of the medical appointment that you need help traveling to?",
  },
  {
    id: 2,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Can the patient/applicant and all accompanying passengers safely travel on a commercial airplane?",
  },
  {
    id: 3,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Does the patient/applicant and all accompanying passengers have the required identification and/or documentation to get through TSA and travel on a commercial airplane?",
  },
  {
    id: 4,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Do you currently live in the U.S. AND do you have a confirmed medical appointment scheduled requiring domestic U.S. air travel?",
    helperText:
      "*We do not provide international travel in our out of the U.S.",
  },
  {
    id: 5,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Is your requested departure flight date at least 14 days away?",
  },
  {
    id: 6,
    type: QuestionType.MultiSelectQuestion,
    promptText:
      "What type(s) of government assistance are you currently receiving? Please select all that apply. ",
    options: [
      "SNAP (Supplemental Nutritional Assistance Program)",
      "TANF (Temporary Aid for Needy Families)",
      "Medicaid (This refers exclusively to the official Medicaid program and does not include the receipt of government subsidies through the Affordable Care Act)",
      "SSI (Supplemental Security Income): Note: Only check this box if you and/or a member of your household receive SSI and not any other type or form of benefits through the Social Security Administration.",
      "Housing Choice Voucher Program (Section 8)",
      "Headstart/Early Head Start",
      "WIC (Women, Infants, and Children)",
      "Unemployment (Note: Only check this box if unemployment is your household's ONLY form of income earned or unearned.)",
      "None",
    ],
    helperText:
      "*You will need to upload proof of government assistance at the end of this application. If you are not currently receiving government assistance, please check “None”.",
  },
  {
    id: 7,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Do you have your IRS 1040 documents from last year to upload on this application as proof of household income and household size?",
  },
  {
    id: 8,
    type: QuestionType.NumberInput,
    promptText: "How many people are in your household?",
    helperText:
      "*Include yourself, your spouse, and any dependents. Must be verified with submitted IRS tax documentation.",
  },
  {
    id: 9,
    type: QuestionType.NumberInput,
    promptText: "What is your approximate gross household income?",
    helperText:
      "*Total revenue earned by all income earners in the household. Will be verified with submitted IRS tax documentation.",
  },

  // Flight Request Details

  {
    id: 10,
    type: QuestionType.MultipleChoiceQuestion,
    promptText:
      "Child Patient Verification - Will the patient be 17 years old or younger at the time of the medical appointment?",
    options: [
      "Yes - Miracle Flights will provide flights to a qualifying child patient (age 17 and under at the time of medical appointment) and up to two adult parents/legal guardians/family members (up to 3 total passengers).",
      "No",
    ],
  },
  {
    id: 11,
    type: QuestionType.YesNoQuestion,
    promptText:
      "If approved, will this be your first-time using Miracle Flights? ",
  },
  {
    id: 12,
    type: QuestionType.YesNoQuestion,
    promptText: "Is your requested departure date at least 14 days away?",
  },
  {
    id: 13,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "What type of travel is this?",
    options: [
      "Roundtrip Flight (Departure and Return Flight)",
      "One-Way Flight (Departure Flight Only)",
    ],
  },
  {
    id: 14,
    type: QuestionType.DateQuestion,
    promptText: "Enter your scheduled medical appointment date.",
    helperText: "*Will be verified by treatment site",
  },
  {
    id: 15,
    type: QuestionType.DateQuestion,
    promptText: "Departure Date",
    helperText: "*Within 3 days before first scheduled appointment",
  },
  {
    id: 16,
    type: QuestionType.TextResponseQuestion,
    promptText: "Airport of Origin (Flying From)",
    helperText: "*Enter 3 letter airport code (e.g. LAX, JFK, ATL)",
  },
  {
    id: 17,
    type: QuestionType.TextResponseQuestion,
    promptText: "Alternate Airport of Origin (Flying From)",
    helperText: "*Enter 3 letter airport code (e.g. LAX, JFK, ATL)",
  },
  {
    id: 18,
    type: QuestionType.TextResponseQuestion,
    promptText: "Destination Airport (Flying To)",
    helperText: "*Enter 3 letter airport code (e.g. LAX, JFK, ATL)",
  },
  {
    id: 19,
    type: QuestionType.TextResponseQuestion,
    promptText: "Alternative Destination Airport (Flying To)",
    helperText: "*Enter 3 letter airport code (e.g. LAX, JFK, ATL)",
  },
  {
    id: 20,
    type: QuestionType.DateQuestion,
    promptText: "Return Date",
    helperText: "*Within 3 days following final appointment/release date.",
  },

  // Child Patient Info
  {
    id: 21,
    type: QuestionType.Section,
    sectionTitle: "Child Patient Information",
    introText: "Welcome to the Child Patient Information section.",
    promptText:
      "Please fill out all required fields for the child patient (17 and under) seeking medical treatment. The contact information listed should be the primary contact information for the family (typically a parent or legal guardian). Please confirm all details are ACCURATE as this information will be used to book your flight itinerary.",
  },
  {
    id: 22,
    type: QuestionType.TextResponseQuestion,
    promptText: "Patient's First Name",
  },
  {
    id: 23,
    type: QuestionType.TextResponseQuestion,
    promptText: "Patient's Middle Name",
  },
  {
    id: 24,
    type: QuestionType.TextResponseQuestion,
    promptText: "Patient's Last Name",
  },
  {
    id: 25,
    type: QuestionType.DateQuestion,
    promptText: "Patient's Date of Birth",
  },
  {
    id: 26,
    type: QuestionType.NumberInput,
    promptText: "Age of patient at departing time?",
  },
  {
    id: 27,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Patient's gender",
    options: ["Male", "Female"],
  },
  {
    id: 28,
    type: QuestionType.TextResponseQuestion,
    promptText: "Street Address",
  },
  {
    id: 29,
    type: QuestionType.TextResponseQuestion,
    promptText: "City",
  },
  {
    id: 30,
    type: QuestionType.TextResponseQuestion,
    promptText: "State",
  },
  {
    id: 31,
    type: QuestionType.TextResponseQuestion,
    promptText: "Postal Code",
  },
  {
    id: 32,
    type: QuestionType.TextResponseQuestion,
    promptText: "County",
  },
  {
    id: 33,
    type: QuestionType.TextResponseQuestion,
    promptText: "Country",
  },
  {
    id: 34,
    type: QuestionType.TextResponseQuestion,
    promptText: "Home Phone (secondary)",
  },
  {
    id: 35,
    type: QuestionType.TextResponseQuestion,
    promptText: "Cell Phone (primary)",
    helperText: "*This will be the primary way of communication.",
  },
  {
    id: 36,
    type: QuestionType.TextResponseQuestion,
    promptText: "Email Address",
  },
  {
    id: 37,
    type: QuestionType.TextResponseQuestion,
    promptText: "Diagnosis",
    helperText: "*e.g. Heart defect, clubfoot, epilepsy",
  },
  {
    id: 38,
    type: QuestionType.TextResponseQuestion,
    promptText: "Type of Treatment",
    helperText: "e.g. Surgery, Casting, second opinion",
  },
  {
    id: 39,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Does the child patient presently have medical insurance coverage?",
  },
  {
    id: 40,
    type: QuestionType.TextResponseQuestion,
    promptText: "Medical Insurance Company Name",
  },
  {
    id: 41,
    type: QuestionType.TextResponseQuestion,
    promptText: "Subscriber ID #, Policy #, or Member ID #",
  },
  {
    id: 42,
    type: QuestionType.TextResponseQuestion,
    promptText: "Group #",
  },
  {
    id: 43,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "Full Name of Treatment Site (where patient will receive medical care)",
  },
  {
    id: 44,
    type: QuestionType.TextResponseQuestion,
    promptText: "Treatment City",
  },
  {
    id: 45,
    type: QuestionType.DropdownQuestion,
    promptText: "Treatment State",
    options: [
      "AK",
      "AL",
      "AR",
      "AZ",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "IA",
      "ID",
      "IL",
      "IN",
      "KS",
      "KY",
      "LA",
      "MA",
      "MD",
      "ME",
      "MI",
      "MN",
      "MO",
      "MS",
      "MT",
      "NC",
      "ND",
      "NE",
      "NH",
      "NJ",
      "NM",
      "NV",
      "NY",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VA",
      "VT",
      "WA",
      "WI",
      "WV",
      "WY",
    ],
  },
  {
    id: 46,
    type: QuestionType.TextResponseQuestion,
    promptText: "Treatment Site Phone Number",
    helperText: "*Please enter a valid phone number.",
  },
  {
    id: 47,
    type: QuestionType.TextResponseQuestion,
    promptText: "Treatment Site Fax Number",
    helperText: "*Please enter a valid fax number.",
  },
  {
    id: 48,
    type: QuestionType.TextResponseQuestion,
    promptText: "Full Name of Primary Treatment Site Doctor",
    helperText: "ex: Jamie Smith, MD",
  },
  {
    id: 49,
    type: QuestionType.YesNoQuestion,
    promptText: "Oxygen Required?",
  },
  {
    id: 50,
    type: QuestionType.YesNoQuestion,
    promptText: "Will you be flying with a service dog?",
  },
  {
    id: 51,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Wheelchair Required?",
    options: [
      "Yes, bringing own",
      "Yes, I will request one at the airport.",
      "No",
    ],
  },
  {
    id: 52,
    type: QuestionType.FileInput,
    promptText:
      "Birth Certificate or Proof of Legal Guardianship Required for Child Patient (17 and under)",
    helperText:
      "*Please upload your child's birth certificate or legal document proving guardianship.",
  },

  // Patient Information Demographics
  {
    id: 53,
    type: QuestionType.Section,
    sectionTitle: "Patient Information Demographics",
    introText: "Welcome to the Patient Information Demographics section.",
    promptText:
      "Please fill out all required fields for the patient seeking medical treatment. Please confirm all details are ACCURATE as this information will be used to book your flight itinerary.",
  },
  {
    id: 54,
    type: QuestionType.MultiSelectQuestion,
    promptText: "Patient Ethnicity (Select all that apply)",
    options: [
      "American Indian/Alaskan Native",
      "Asian",
      "Asian/Pacific Islander",
      "Black",
      "Hispanic",
      "White",
      "Other",
    ],
  },
  {
    id: 55,
    type: QuestionType.MultipleChoiceQuestion,
    promptText:
      "Highest level of education completed (by adult patient OR parent/guardian of child patient filling out this form)",
    options: [
      "Less than high school degree",
      "High school degree or equivalent (e.g. GED)",
      "Some college but no degree",
      "Associate degree (2 year)",
      "Bachelor's degree",
      "Graduate Degree or higher",
    ],
  },
  {
    id: 56,
    type: QuestionType.MultipleChoiceQuestion,
    promptText:
      "Marital Status (of adult patient OR parent/guardian of child patient filling out this form)",
    options: ["Single", "Married", "Divorced", "Widowed"],
  },
  {
    id: 57,
    type: QuestionType.MultipleChoiceQuestion,
    promptText:
      "Employment Status (of adult patient OR parent/guardian of child patient filling out this form)",
    options: [
      "Employed, working 1-39 hours per week",
      "Employed, working 40+ hours per week",
      "Unemployed, looking for work",
      "Unemployed, NOT looking for work",
      "Retired",
      "Disabled, not able to work",
    ],
  },
  {
    id: 58,
    type: QuestionType.MultipleChoiceQuestion,
    promptText:
      "Military Service (of adult patient OR parent/guardian of child patient)",
    options: ["Active", "Veteran", "Not Applicable"],
  },
  {
    id: 59,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "How did you hear about us?",
    options: [
      "Another Miracle Flights Family",
      "Internet Search",
      "Local Physician",
      "Miracle Flights Team Member",
      "Previously Used Miracle Flights",
      "Social Worker",
      "Treatment Site Physician",
      "Other",
    ],
  },

  // Child Patient Waiver of Liability
  // To be completed by parent/legal guardian of child patient (17 and under)

  {
    id: 60,
    type: QuestionType.Section,
    sectionTitle: "Child Patient Waiver of Liability",
    introText: "Welcome to the Child Patient Waiver of Liability section.",
    promptText:
      "This section is to be completed by parent/legal guardian of child patient (17 and under).",
  },
  {
    id: 61,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "Child Patient Name (as it appears on government issued identification)",
  },
  {
    id: 62,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Waive Right to Pursue Legal Action?",
    options: [
      "Furthermore, I do herewith unequivocally waive and deny, for myself and all my assigns, any and all rights to pursue any action against said Miracle Flights for any action or inaction executed by them in good faith.",
    ],
  },
  {
    id: 63,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Consent for Medical Treatment",
    options: [
      "I acknowledge and confirm that both parents and/or legal guardian's consent and approve of the medical treatment that the child patient is receiving as listed in this Flight Request Application.",
    ],
  },
  {
    id: 64,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Photo/Video Release",
    options: [
      "I AGREE and hereby authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.",
      "I DO NOT authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.",
    ],
  },
  {
    id: 65,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "Type name (in place of signature) (if minor, by parent/guardian)",
  },
  {
    id: 66,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer First Name",
  },
  {
    id: 67,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer Last Name",
  },
  {
    id: 68,
    type: QuestionType.DropdownQuestion,
    promptText: "Relationship to Patient",
    options: ["Parent/Legal Guardian (Patient is 17 or under)"],
  },
  // Passenger 2 – Airline Ticket Required Information
  {
    id: 69,
    type: QuestionType.Section,
    sectionTitle: "Passenger 2 – Airline Ticket Required Information",
    introText: "Welcome to the Passenger 2 airline ticket information section.",
    promptText:
      "Please fill out all required questions to the best of your ability.",
  },
  {
    id: 70,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 2 - First Name",
  },
  {
    id: 71,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 2 - Middle Name",
  },
  {
    id: 72,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 2 - Last Name",
  },
  {
    id: 73,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Passenger 2- Relationship to Patient",
    options: [
      "Mother",
      "Father",
      "Stepmother",
      "Stepfather",
      "Legal Guardian",
      "Spouse",
      "Family Member",
      "Other Caregiver",
    ],
  },
  {
    id: 74,
    type: QuestionType.DateQuestion,
    promptText: "Passenger 2 - Date of Birth",
  },
  {
    id: 75,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Passenger Gender",
    options: ["Male", "Female"],
  },
  {
    id: 76,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 2 - Cell Phone Number",
  },
  {
    id: 77,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 2 - Email",
  },
  {
    id: 78,
    type: QuestionType.YesNoQuestion,
    promptText: "Passenger 2 - Is address the same as the patient?",
  },
  {
    id: 79,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 2 - Street Address",
  },
  {
    id: 80,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 2 - City",
  },
  {
    id: 81,
    type: QuestionType.DropdownQuestion,
    promptText: "Passenger 2 - State",
    options: [
      "AK",
      "AL",
      "AR",
      "AZ",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "IA",
      "ID",
      "IL",
      "IN",
      "KS",
      "KY",
      "LA",
      "MA",
      "MD",
      "ME",
      "MI",
      "MN",
      "MO",
      "MS",
      "MT",
      "NC",
      "ND",
      "NE",
      "NH",
      "NJ",
      "NM",
      "NV",
      "NY",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VA",
      "VT",
      "WA",
      "WI",
      "WV",
      "WY",
    ],
  },
  {
    id: 82,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 2 - Postal Code",
  },
  {
    id: 83,
    type: QuestionType.DropdownQuestion,
    promptText: "Passenger 2 - Country",
    options: ["United States"],
  },
  {
    id: 84,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Passenger 2 Waiver of Responsibility",
    options: ["I understand and agree to the waiver of responsibility."],
  },
  // Passenger 2 - Waiver of Liability
  {
    id: 85,
    type: QuestionType.Section,
    sectionTitle: "Passenger 2 - Waiver of Liability",
    introText: "Welcome to the Passenger 2 Waiver of Liability section.",
    promptText:
      "Please fill out all of the required fields to the best of your ability.",
  },
  {
    id: 86,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "Passenger Name (as it appears on government issued identification)",
  },
  {
    id: 87,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Waive Right to Pursue Legal Action",
    options: [
      "Furthermore, I do herewith unequivocally waive and deny, for myself and all my assigns, any and all rights to pursue any action against said Miracle Flights for any action or inaction executed by them in good faith",
    ],
  },
  {
    id: 88,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Photo/Video Release",
    options: [
      "I AGREE and hereby authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.",
      "I DO NOT authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.",
      "Other",
    ],
  },
  {
    id: 89,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "Type name (in place of signature) (if minor, by parent/guardian)",
  },
  {
    id: 90,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer First Name",
  },
  {
    id: 91,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer Last Name",
  },
  {
    id: 92,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Relationship to Passenger 2",
    options: ["Self (I am 18 or over and signing for myself)"],
  },
  {
    id: 93,
    type: QuestionType.YesNoQuestion,
    promptText: "Will the patient require a third passenger?",
  },
  {
    id: 94,
    type: QuestionType.Section,
    sectionTitle: "Passenger 3 - Airline Ticket Required Information",
    introText: "Welcome to the Passenger 3 airline ticket information section.",
    promptText:
      "Please use exact names as they appear on government identification. Please confirm all details are ACCURATE as this information will be used to book your flight itinerary.",
  },
  // Passenger 3-Airline Ticket Required Information
  {
    id: 95,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - First Name",
  },
  {
    id: 96,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - Middle Name",
  },
  {
    id: 97,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - Last Name",
  },
  {
    id: 98,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Passenger 3 - Relationship to Patient",
    options: [
      "Mother",
      "Father",
      "Stepmother",
      "Stepfather",
      "Legal Guardian",
      "Spouse",
      "Family Member",
      "Other Caregiver",
    ],
  },
  {
    id: 99,
    type: QuestionType.DateQuestion,
    promptText: "Passenger 3 - Date of Birth",
  },
  {
    id: 100,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Passenger Gender",
    options: ["Male", "Female"],
  },
  {
    id: 101,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - Email",
  },
  {
    id: 102,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - Cell Phone Number",
  },
  {
    id: 103,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Is Passenger 3 returning on a different date than Patient/Passenger 1?",
  },
  {
    id: 104,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "Explain why Passenger 3 is requesting a different return date than the Patient/Passenger 1.",
  },
  {
    id: 105,
    type: QuestionType.DateQuestion,
    promptText: "Passenger 3 - Return Date",
  },
  {
    id: 106,
    type: QuestionType.YesNoQuestion,
    promptText: "Passenger 3 - Address is the same as the patient?",
  },
  {
    id: 107,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - Street Address",
  },
  {
    id: 108,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - City",
  },
  {
    id: 109,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - State",
  },
  {
    id: 110,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - Postal Code",
  },
  {
    id: 111,
    type: QuestionType.TextResponseQuestion,
    promptText: "Passenger 3 - Country",
  },
  {
    id: 112,
    type: QuestionType.DropdownQuestion,
    promptText: "Passenger 3 - Country",
    options: ["United States"],
  },
  {
    id: 113,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Passenger 3 Waiver of Responsibility",
    options: [
      "Child passenger (parent will sign now for minor)",
      "Adult passenger (person filling out this form, present and can sign now)",
    ],
  },
  {
    id: 114,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "Passenger Name (as it appears on government issued identification)",
  },
  {
    id: 115,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Waive Right to Pursue Legal Action",
    options: [
      "Furthermore, I do herewith unequivocally waive and deny, for myself and all my assigns, any and all rights to pursue any action against said Miracle Flights for any action or inaction executed by them in good faith.",
    ],
  },
  {
    id: 116,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Photo/Video Release",
    options: [
      "I AGREE and hereby authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.",
      "I DO NOT authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.",
    ],
  },
  {
    id: 117,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "Type name (in place of signature) (if minor, by parent/guardian)",
  },
  {
    id: 118,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer First Name",
  },
  {
    id: 119,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer Last Name",
  },
  {
    id: 120,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Relationship to Passenger 3",
    options: [
      "Self (I am 18 or over and signing for myself)",
      "Parent/Guardian (Passenger 3 is 17 or under)",
    ],
  },
  // Income Certification
  // Fraudulent statements or intentional misrepresentation shall be considered sufficient cause for denial of service.
  {
    id: 121,
    type: QuestionType.Section,
    sectionTitle: "Income Certification",
    introText: "Welcome to the Income Certification section.",
    promptText:
      "Fraudulent statements or intentional misrepresentation shall be considered sufficient cause for denial of service.",
  },
  {
    id: 122,
    type: QuestionType.TextResponseQuestion,
    promptText: "Number of People in Household",
    helperText:
      "*Household = Child Patient + Biological Parents/Adoptive Parents/Legal Guardians living in the home + Blood	siblings living in the home + Parent domestic partner living in the home. THIS NUMBER SHOULD MATCH YOUR UPLOADED IRS PROOF OF INCOME DOCUMENTS.",
  },
  {
    id: 123,
    type: QuestionType.TextResponseQuestion,
    promptText: "Annual Family/Household Income",
    helperText: `*Gross annual income of all income earners in the household who are primarily responsible for the child patient (usually biological parents, adoptive parents, legal guardians, and domestic partners living in the household. Do NOT use commas. THIS NUMBER SHOULD MATCH YOUR UPLOADED IRS PROOF OF INCOME DOCUMENTS`,
  },
  {
    id: 124,
    type: QuestionType.TextResponseQuestion,
    promptText: "Please describe all sources of income for the household.",
    helperText: "*EX: Name of employer(s), SSI, SSDI, child support, etc.",
  },
  {
    id: 125,
    type: QuestionType.FileInput,
    promptText:
      "Upload proof of Income - IRS 1040 and/or proof of government assistance programs",
    helperText:
      "*IMPORTANT -- First two pages of most recent Federal IRS Form 1040 required and any additional income documentation (ex. SSI and/or SSDI statements, child support income, etc.) If you are SELF-EMPLOYED or OWN YOUR BUSINESS, please upload your SCHEDULE 1 and any SCHEDULE C, E, or F docs.",
  },
  {
    id: 126,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Eligibility is determined by total family income and size.",
    options: [
      "I hereby acknowledge financial assistance for air travel will be provided to me by Miracle Flights and certify that our total gross family/household income from all sources and my family size are as indicated above.",
    ],
  },
  {
    id: 127,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Cancelling or Amending Flights",
    options: [
      "I will call Miracle Flights with any flight cancellations or changes needed to my original itinerary. I acknowledge that Miracle Flights is the only party that can cancel or amend my flights and I will not contact the airlines directly. Failure to do comply with this may put Miracle Flights and its airline relationships in jeopardy and may result in fewer flights	provided to myself and others.",
    ],
  },
  {
    id: 128,
    type: QuestionType.Section,
    sectionTitle: "Flight Request Acknowledgements",
    introText: "Welcome to the Flight Request Acknowledgements section.",
    promptText:
      "Please read carefully and acknowledge the following statements.",
  },
  {
    id: 129,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "No Call No Show Acknowledgment",
    options: [
      'I understand that the airline tickets are provided at no cost to me and/or my family by Miracle Flights. I will contact Miracle Flights as soon as possible to make them aware of any changes that may result in my family not being able to fly on the flights that were provided to us. Therefore, any change or cancellation not pre-approved by Miracle Flights may result in Miracle Flights losing the resources spent on your flights. In the case of a "no call no show" resulting in Miracle Flights losing resources, Miracle Flights may seek financial compensation for the travel costs and/or may deny the patient and their family future program services.',
    ],
  },
  {
    id: 130,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Consent for Medical Treatment",
    options: [
      "I acknowledge and confirm that both parents and/or legal guardians' consent and approve of the medical treatment that the child patient is receiving as listed in this Flight Request Application.",
    ],
  },
  {
    id: 131,
    type: QuestionType.TextResponseQuestion,
    promptText:
      "By typing my name below, I acknowledge that I have read and understand the information above.",
  },
  {
    id: 132,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer First Name",
  },
  {
    id: 133,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer Last Name",
  },
  {
    id: 134,
    type: QuestionType.TextResponseQuestion,
    promptText: "Signer Email",
  },
  {
    id: 135,
    type: QuestionType.MultipleChoiceQuestion,
    promptText: "Relationship to Patient",
    options: ["Self (I am 18 or over)", "Parent/Legal Guardian"],
  },
];