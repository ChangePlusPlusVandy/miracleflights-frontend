import React, { useRef } from "react";
import styles from "./DocumentsPage.module.css";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import {
  getPassengers,
  getAccompanyingPassengers,
  createPatientFolder,
  populateAccompanyingPassengersFolder,
} from "../../api/queries";
import { useNavigationContext } from "../../context/Navigation.context";
import { useUserContext } from "../../context/User.context";
import { formatDate } from "../../util/date.util";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

import type { PassengerData } from "../../interfaces/passenger.interface";
import type {
  AccompanyingPassengerFolderResponse,
  PopulateFolderResponse,
} from "../../interfaces/folder-response-interface";

import UploadPassengerPageModal from "./UploadPassengerPageModal/UploadPassengerPageModal.tsx";
import SuccessPageModal from "./SuccessPageModal/SuccessPageModal.tsx";

const DocumentsPage = () => {
  const { getToken } = useAuth();
  const { currentUser } = useUserContext();
  const { setCurrentTab } = useNavigationContext();
  const { user } = useUser();

  const birthCertificationInputRef = useRef<HTMLInputElement | null>(null);
  const incomeCertificationInputRef = useRef<HTMLInputElement | null>(null);
  const passengerCertificationInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * retrieves important information pertaining to patient
   */
  const { data: passengerData, isLoading: passengerLoading } =
    useQuery<PassengerData>({
      queryKey: ["passenger"],
      queryFn: async () =>
        getPassengers(
          currentUser?.["AirTable Record ID"] || "",
          await getToken(),
        ),
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
      queryKey: [
        "populate-folder",
        passengerData?.["First Name"],
        passengerData?.["Last Name"],
      ],
      queryFn: async () => {
        if (!passengerData) throw new Error("Missing passenger data");

        const patient_name = `${passengerData["First Name"]}_${passengerData["Last Name"]}`;
        const token = await getToken();

        return createPatientFolder({ patient_name }, token);
      },
      enabled: !!passengerData,
    });

  const {
    data: accompanyingFolderStatus,
    isLoading: accompanyingFolderStatusLoading,
  } = useQuery<AccompanyingPassengerFolderResponse>({
    queryKey: [
      "populate-accompanying-folder",
      passengerData?.["First Name"],
      passengerData?.["Last Name"],
      accompanyingPassengerData?.map((p) => p["Full Name"]).join(","),
    ],
    queryFn: async () => {
      if (!passengerData || !accompanyingPassengerData)
        throw new Error("Missing passenger data");

      const patient_name = `${passengerData["First Name"]}_${passengerData["Last Name"]}`;
      const accompanying_passengers = accompanyingPassengerData.map(
        (passenger) => ({
          fullName: passenger["Full Name"],
          dob: formatDate(passenger["Date of Birth"]),
          relationship: passenger["Relationship"],
        }),
      );
      const token = await getToken();

      return populateAccompanyingPassengersFolder(
        { patient_name, accompanying_passengers },
        token,
      );
    },
    enabled:
      !!passengerData &&
      !!folderStatus &&
      (accompanyingPassengerData?.length ?? 0) > 0,
  });

  // const { data, isLoading } = useQuery<DocumentsData>({
  //   queryKey: ["documents"],
  //   queryFn: async () => getDocumentsData(await getToken()),
  //   enabled: true,
  // });

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

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const file = event.target.files?.[0] || null;
    setSelectedFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleUpload = async (event: React.FormEvent, key: string) => {
    event.preventDefault();

    const file = selectedFiles[key];
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", key);
    handleUploadSuccess();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/documents`,
        formData,
      );
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handlePassengerUpload = async (file: File, key: string) => {
    handleUploadSuccess();
    //this will be passenger upload stuff
  };

  const { data: companionsData, isLoading: companionsLoading } = useQuery<
    PassengerData[]
  >({
    queryKey: ["accompanyingPassengers"],
    queryFn: async () =>
      getAccompanyingPassengers(
        currentUser?.["AirTable Record ID"] || "",
        await getToken(),
      ),
    enabled: true,
  });

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
    passengerLoading ||
    accompanyingPassengerLoading ||
    accompanyingFolderStatusLoading ||
    folderStatusLoading ||
    companionsLoading ||
    !accompanyingPassengerData ||
    !passengerData ||
    !folderStatus ||
    !accompanyingFolderStatus ||
    !companionsData
  ) {
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
          passengersData={companionsData}
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
