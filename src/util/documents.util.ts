/**
 * Utils for file formatting for documents.
 */

export const fileNameFormat = (
  documentKey: string,
  patient_name: string,
  airtableID: string,
  extension: string// default extension is pdf if none is provided
) => {
  // Ensure the extension is in lowercase (in case it's provided in uppercase)
  const ext = extension.toLowerCase();

  let suffix = "";
  switch (documentKey) {
    case "birthCertificate":
      suffix = `_birth_certificate.${ext}`;
      break;
    case "incomeCertification":
      suffix = `_financial_certificate.${ext}`;
      break;
    case "passengerCertification":
      suffix = `_passenger_certificate.${ext}`;
      break;
    default:
      suffix = `_document.${ext}`;
  }

  return `${patient_name}_${airtableID}${suffix}`;
};

export const passengerFileNameFormat = (
  passengerName: string,
  passengerAirtableID: string,
  extension: string// default extension is pdf if none is provided
) => {
  // Ensure the extension is in lowercase (in case it's provided in uppercase)
  const ext = extension.toLowerCase();
  const formattedPassengerName = passengerName.trim().split(/\s+/).join('_');
  let suffix = "";
  suffix = `_birth_certificate.${ext}`;
  return `${formattedPassengerName}_${passengerAirtableID}${suffix}`
};


export const getDocumentDescription = (documentKey: string): string => {
    switch (documentKey) {
      case "birthCertificate":
        return "Patient Birth Certificate";
      case "incomeCertification":
        return "Household Income and/or Government Assistance Certification";
      case "passengerCertification":
        return "Passenger Birth Certificate";
      default:
        return "Document";
    }
};