import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import styles from "./DocumentsPage.module.css";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getDocumentsData,
  getAccompanyingPassengers,
  createPatientFolder,
  populateAccompanyingPassengersFolder,
  createUploadSession,
  deleteUploadSession
} from "../../api/queries";
import { useNavigationContext } from "../../context/Navigation.context";
import { useUserContext } from "../../context/User.context";
import { formatDate } from "../../util/date.util";
import { fileNameFormat, getDocumentDescription, passengerFileNameFormat } from "../../util/documents.util.ts";
import type { DocumentsData } from "./Documents.definitions.ts";
import type { PassengerData } from "../../interfaces/passenger.interface";
import type {
  AccompanyingPassengerFolderResponse,
  PopulateFolderResponse,
  CreateUploadSessionResponse,
  CreateUploadSessionBodyRequest,
  DeleteUploadSessionResponse,
  DeleteUploadSessionRequest
} from "../../interfaces/folder-response-interface";

import UploadPassengerPageModal from "./UploadPassengerPageModal/UploadPassengerPageModal.tsx";
import SuccessPageModal from "./SuccessPageModal/SuccessPageModal.tsx";

const DocumentsPage = () => {
  const { getToken } = useAuth();
  const { currentUser } = useUserContext();
  const { setCurrentTab } = useNavigationContext();

  // mutation for upload session querying and obtaining response of document upload
  const uploadMutation = useMutation<CreateUploadSessionResponse, Error, CreateUploadSessionBodyRequest>({
    mutationFn: async (uploadBody: CreateUploadSessionBodyRequest) => {
      const token = await getToken();
      return createUploadSession(uploadBody, token);
    },
  });

  const deleteUploadMutation = useMutation<DeleteUploadSessionResponse, Error, DeleteUploadSessionRequest>({
    mutationFn: async (deleteBody: DeleteUploadSessionRequest) => {
      const token = await getToken();
      return deleteUploadSession(deleteBody, token);
    },
  });

  const birthCertificationInputRef = useRef<HTMLInputElement | null>(null);
  const incomeCertificationInputRef = useRef<HTMLInputElement | null>(null);


  /**
   * retrieves information pertaining to the state of patients documents
   * 
   * @returns the files (based on DocumentsData structure) and existence of documents
   */
  const { data: documentsData, isLoading: documentsLoading } =
    useQuery<DocumentsData>({
      queryKey: ["documents"],
      queryFn: async () => {
        if (!currentUser) throw new Error("Missing patient data");

        const patient_name = `${currentUser["First Name"]}_${currentUser["Last Name"]}`;
        const airtableID = currentUser?.["AirTable Record ID"];
        const token = await getToken();

        return getDocumentsData(patient_name, airtableID, token);
      },
      enabled: true,
    });

  /**
   * retrieves important information pertaining to patient's accompanying passengers
   */
  const {
    data: accompanyingPassengerData,
    isLoading: accompanyingPassengerLoading,
  } = useQuery<PassengerData[]>({
    queryKey: ["accompanyingPassengers"],
    queryFn: async () =>
      getAccompanyingPassengers(
        currentUser?.["AirTable Record ID"] || "",
        await getToken(),
      ),
    enabled: true,
  });

  /**
   *
   */
  const { data: folderStatus, isLoading: folderStatusLoading } =
    useQuery<PopulateFolderResponse>({
      queryKey: ["populate-patient-folder"],
      queryFn: async () => {
        if (!currentUser) throw new Error("Missing patient data");

        const patient_name = `${currentUser["First Name"]}_${currentUser["Last Name"]}`;
        const airtableID = currentUser?.["AirTable Record ID"];
        const token = await getToken();

        return createPatientFolder({ patient_name, airtableID }, token);
      },
      enabled: !!documentsData 
      && !!currentUser?.["AirTable Record ID"]
    });

  const {
    data: accompanyingFolderStatus,
    isLoading: accompanyingFolderStatusLoading,
  } = useQuery<AccompanyingPassengerFolderResponse[]>({
    queryKey: ["populate-accompanying-folder"],
    queryFn: async () => {
      if (!currentUser || !accompanyingPassengerData)
        throw new Error("Missing patient/accompanying passenger data");

      const patient_name = `${currentUser["First Name"]}_${currentUser["Last Name"]}`;
      const airtableID = currentUser?.["AirTable Record ID"];
      const accompanying_passengers = accompanyingPassengerData.map(
        (passenger) => ({
          fullName: passenger["Full Name"],
          dob: formatDate(passenger["Date of Birth"]),
          relationship: passenger["Relationship"],
        }),
      );
      const token = await getToken();

      return populateAccompanyingPassengersFolder(
        { patient_name, airtableID, accompanying_passengers },
        token,
      );
    },
    enabled:
      !!documentsData &&
      !!folderStatus && 
      !!currentUser?.["AirTable Record ID"]
  });

  
  const [selectedFiles, setSelectedFiles] = useState<
    Record<string, File | null>
  >({
    birthCertificate: null,
    incomeCertification: null,
    passengerCertification: null,
  });

  useEffect(() => {
    setCurrentTab(Tabs.DOCUMENTS);
  }, []);

  /**
 * Uploads a file in chunks to the provided uploadUrl.
 * Uses a fragment size that is a multiple of 320 KiB (327,680 bytes).
 *
 * @param uploadUrl - The URL to which the file chunks will be uploaded.
 * @param file - The file to upload.
 * @param chunkSize - The size of each chunk in bytes (default: 7.5 MiB).
 * @returns The final response data from the upload session.
 */
const uploadDocument = async (uploadUrl: string, file: File, chunkSize = 5 * 1024 * 1024) => {
  const totalSize = file.size;
  let start = 0;

  // continue uploading while there are bytes left
  while (start < totalSize) {
    const end = Math.min(start + chunkSize - 1, totalSize - 1);
    const chunk = file.slice(start, end + 1);

    try {
      const response = await axios.put(uploadUrl, chunk, {
        headers: {
          'Content-Type': file.type,
          'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        },
      });
    
      if (response.status === 202) {
        const { nextExpectedRanges } = response.data;
        if (nextExpectedRanges && nextExpectedRanges.length > 0) {
          console.log(`Server expects next range: ${nextExpectedRanges[0]}`);
          // Update start to the next expected byte (e.g., "7864320-" means start = 7864320)
          start = parseInt(nextExpectedRanges[0].split('-')[0], 10);
        } else {
          return response.status;
        }
      } else {
        return response.status;
      }
    } catch (error) {
      console.error("Error in OneDrive connection:", error);
      throw error;
    }
  }
};

  /**
   * handles upload for patient documents
   * 
   * @param event 
   * @param key 
   * @returns 
   */
  const handleUpload = async (event: React.FormEvent, key: string) => {
    event.preventDefault();
  
    const file = selectedFiles[key];
    if (!file) {
      console.error("No file selected for", key);
      return;
    }
    const nameParts = file.name.split(".");
    const extension = nameParts.pop()!.toLowerCase();
    const patientName = `${currentUser?.["First Name"]}_${currentUser?.["Last Name"]}`;
    const airtableID = currentUser?.["AirTable Record ID"] as string;
  
    const fileName = fileNameFormat(key, patientName, airtableID, extension) as string;
    const description = getDocumentDescription(key) as string;
    const createBody = {
      patient_name: patientName,
      airtableID: airtableID,
      item: {
        name: fileName,
        description: description,
        "@microsoft.graph.conflictBehavior": "replace",
      },
    } as CreateUploadSessionBodyRequest;
  
    uploadMutation.mutate(createBody, {
      onSuccess: async (data) => {
        try {
          const url = data.uploadUrl as string;
          const deleteBody = { uploadUrl: url } as DeleteUploadSessionRequest;
  
          const result = await uploadDocument(url, file);
          if (result) {
            deleteUploadMutation.mutate(deleteBody, {
              onSuccess: () => {
                handleUploadSuccess();
              },
              onError: (deleteError: any) => {
                if (deleteError.response && deleteError.response.status === 404) {
                  handleUploadSuccess();
                } else {
                  console.error("Error deleting upload session:", deleteError);
                }
              },
            });
            
          }
        } catch (error) {
          console.error("Error during file upload:", error);
        }
      },
      onError: (error) => {
        console.error("Error uploading:", error);
      },
    });
  };
  
  /**
   * handles uploads for accompanying passengers
   * 
   * key is the unique airtable record ID for accompanying passengers that are under 18 for the patient
   * cross validate that airtable record ID with all available accompanying passengers
   * 
   * @param file 
   * @param key the unique airtable record ID 
   */
  const handlePassengerUpload = async (file: File, key: string) => {
    // obtain the file information
    const nameParts = file.name.split(".");
    const extension = nameParts.pop()!.toLowerCase();
    const patientName = `${currentUser?.["First Name"]}_${currentUser?.["Last Name"]}`;
    const airtableID = currentUser?.["AirTable Record ID"] as string;

    const matchingPassenger: PassengerData | undefined = accompanyingPassengerData?.find(
      (passenger: PassengerData) => passenger["AirTable Record ID"] === key
    );

    const passengerName = matchingPassenger?.["Full Name"] as string;
    const fileName = passengerFileNameFormat(passengerName, key, extension);
    const createBody = {
      patient_name: patientName,
      airtableID: airtableID,
      passenger_name: passengerName,
      item: {
        name: fileName,
        "@microsoft.graph.conflictBehavior": "replace",
      },
    } as CreateUploadSessionBodyRequest;
    uploadMutation.mutate(createBody, {
      onSuccess: async (data) => {
        try {
          const url = data.uploadUrl as string;
          const deleteBody = { uploadUrl: url } as DeleteUploadSessionRequest;
  
          const result = await uploadDocument(url, file);
          if (result) {
            deleteUploadMutation.mutate(deleteBody, {
              onSuccess: () => {
                handleUploadSuccess();
              },
              onError: (deleteError: any) => {
                if (deleteError.response && deleteError.response.status === 404) {
                  handleUploadSuccess();
                } else {
                  console.error("Error deleting upload session:", deleteError);
                }
              },
            });
            
          }
        } catch (error) {
          console.error("Error during file upload:", error);
        }
      },
      onError: (error) => {
        console.error("Error uploading:", error);
      },
    });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const file = event.target.files?.[0] || null;
    setSelectedFiles((prev) => ({ ...prev, [key]: file }));
  };

  // const { data: companionsData, isLoading: companionsLoading } = useQuery<
  //   PassengerData[]
  // >({
  //   queryKey: ["accompanyingPassengers"],
  //   queryFn: async () =>
  //     getAccompanyingPassengers(
  //       currentUser?.["AirTable Record ID"] || "",
  //       await getToken(),
  //     ),
  //   enabled: true,
  // });

  const hasSelectedFile = Object.values(selectedFiles).some(
    (file) => file !== null,
  );

  const isBirthCertDisabled =
    hasSelectedFile && !selectedFiles.birthCertificate;
  const isIncomeCertDisabled =
    hasSelectedFile && !selectedFiles.incomeCertification;
  const isPassengerCertificationDisabled =
    hasSelectedFile && !selectedFiles.passengerCertification;

  const [uploadPassengerModalOpen, setUploadPassengerModalOpen] =
    useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const openUploadPassengerModal = () => {
    setUploadPassengerModalOpen(true);
    setSuccessModalOpen(false);
  };

  const closeAllModal = () => {
    setUploadPassengerModalOpen(false);
    setSuccessModalOpen(false);

    setSelectedFiles({
      birthCertificate: null,
      incomeCertification: null,
      passengerCertification: null,
    });
  };

  const handleUploadSuccess = () => {
    setUploadPassengerModalOpen(false);
    setSuccessModalOpen(true);
  };

  if (
    documentsLoading ||
    accompanyingPassengerLoading ||
    accompanyingFolderStatusLoading ||
    folderStatusLoading ||
    !documentsData ||
    !accompanyingPassengerData ||
    !folderStatus ||
    !accompanyingFolderStatus 
  ) 
  {
    return <div>Loading...</div>;
  }

  {
    return (
      <div className={styles.mainDiv}>
        <div
          className={styles.documentsMainDiv}
          style={{
            display:
              uploadPassengerModalOpen || successModalOpen ? "none" : "block",
          }}
        >
          <div className={styles.documentsData}>
            <h1 className={styles.documentsTitle}>Documents</h1>
            <p>
              Welcome to your document portal! Here, you are able to upload your
              required documents (or any supplemental documents you deem are
              relevant to your case), and also access or manage any past
              documents you have uploaded.
            </p>
          </div>
          <div className={styles.uploadMainDiv}>
            <div className={styles.uploadChoiceContainer}>
              <div className={styles.uploadChoices}>
                <div
                  className={`${styles.uploadChoice} ${isBirthCertDisabled ? styles.disabled : ""}`}
                  onClick={() =>
                    !isBirthCertDisabled &&
                    birthCertificationInputRef.current?.click()
                  }
                >
                  <h3 className={styles.choiceTitle}>Birth Certificate</h3>
                  {selectedFiles.birthCertificate ? (
                    <p className={styles.choiceFileName}>
                      <strong>Selected:</strong>{" "}
                      {selectedFiles.birthCertificate.name}
                    </p>
                  ) : (
                    <p className={styles.choiceText}>
                      Select the button to add a file
                    </p>
                  )}
                  <form
                    onSubmit={(e) => handleUpload(e, "birthCertificate")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      ref={birthCertificationInputRef}
                      type="file"
                      accept="application/pdf, image/png, image/jpeg"
                      onChange={(e) => handleFileChange(e, "birthCertificate")}
                      hidden
                    />
                    {selectedFiles.birthCertificate && (
                      <button className={styles.cardButton} type="submit">
                        Upload
                      </button>
                    )}
                  </form>
                </div>
                <div
                  className={`${styles.uploadChoice} ${isIncomeCertDisabled ? styles.disabled : ""}`}
                  onClick={() =>
                    !isIncomeCertDisabled &&
                    incomeCertificationInputRef.current?.click()
                  }
                >
                  <h3 className={styles.choiceTitle}>
                    Household Income and/or Government Assistance Certification
                  </h3>
                  {selectedFiles.incomeCertification ? (
                    <p className={styles.choiceFileName}>
                      <strong>Selected:</strong>{" "}
                      {selectedFiles.incomeCertification.name}
                    </p>
                  ) : (
                    <p className={styles.choiceText}>
                      Select the button to add a file
                    </p>
                  )}

                  <form
                    onSubmit={(e) => handleUpload(e, "incomeCertification")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      ref={incomeCertificationInputRef}
                      type="file"
                      accept="application/pdf, image/png, image/jpeg"
                      onChange={(e) =>
                        handleFileChange(e, "incomeCertification")
                      }
                      hidden
                    />
                    {selectedFiles.incomeCertification && (
                      <button className={styles.cardButton} type="submit">
                        Upload
                      </button>
                    )}
                  </form>
                </div>
                <div
                  className={`${styles.uploadChoice} ${isPassengerCertificationDisabled ? styles.disabled : ""}`}
                  onClick={() =>
                    !isPassengerCertificationDisabled &&
                    openUploadPassengerModal()
                  }
                >
                  <h3 className={styles.choiceTitle}>
                    Passenger Birth Certificate(s)
                  </h3>
                  <p className={styles.choiceText}>
                    Required for each traveler under the age of 18
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.uploadMainImage}>
              <img src="src/pages/DocumentsPage/components/uploadMain.png" />
            </div>
          </div>
        </div>
        <UploadPassengerPageModal
          isOpen={uploadPassengerModalOpen}
          passengersData={accompanyingPassengerData}
          onPassengerFileSubmit={(file, key) =>
            handlePassengerUpload(file, key)
          }
          onBack={closeAllModal}
        ></UploadPassengerPageModal>
        <SuccessPageModal
          isOpen={successModalOpen}
          onUploadMore={closeAllModal}
        ></SuccessPageModal>
      </div>
    );
  }

  // Once all data is loaded, you can choose to render additional UI.
  // For now, we return null.
  return null;
};

export default DocumentsPage;
