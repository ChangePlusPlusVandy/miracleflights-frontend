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

const DocumentsPage = () => {
  const { getToken } = useAuth();
  const { currentUser } = useUserContext();
  const { setCurrentTab } = useNavigationContext();
  const { user } = useUser();

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
    siteVerification: null,
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

  if (
    passengerLoading ||
    accompanyingPassengerLoading ||
    accompanyingFolderStatusLoading ||
    folderStatusLoading ||
    !accompanyingPassengerData ||
    !passengerData ||
    !folderStatus ||
    !accompanyingFolderStatus
  ) {
    return <div>Loading...</div>;
  }

  const under18Passengers = accompanyingFolderStatus.results.filter(
    (passenger) => passenger.under18,
  );

  {
    return (
      <div>
        <h1 className={styles.flightNumber}>{user?.firstName}</h1>
        <hr />
        <div className={styles.documentData}>
          <h1>Documents</h1>
          <p>
            Welcome to your document portal! Here, you are able to upload your
            required documents (or any supplemental documents you deem are
            relevant to your case), and also access or manage any past documents
            you have uploaded.
          </p>
        </div>

        <h2>Waiting on you</h2>
        <div>
          Patient is {passengerData["First Name"]} {passengerData["Last Name"]}
        </div>
        <div>
          {under18Passengers.map((passenger, index) => (
            <div key={index}>
              <p>{passenger.message}</p>
              <p>{passenger.relationship}</p>
              <p>{passenger.age}</p>
              <p>{passenger.dob}</p>
            </div>
          ))}
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>Birth Certificate</h3>
            <form onSubmit={(e) => handleUpload(e, "birthCertificate")}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, "birthCertificate")}
              />
              <button type="submit">Upload</button>
            </form>
          </div>
          <div className={styles.card}>
            <h3>Household Income and/or Government Assistance Certification</h3>
            <form onSubmit={(e) => handleUpload(e, "incomeCertification")}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, "incomeCertification")}
              />
              <button type="submit">Upload</button>
            </form>
          </div>
          <div className={styles.card}>
            <h3>Passenger Birth Certificate(s)</h3>
            <form onSubmit={(e) => handleUpload(e, "siteVerification")}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, "siteVerification")}
              />
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Once all data is loaded, you can choose to render additional UI.
  // For now, we return null.
  return null;
};

export default DocumentsPage;
