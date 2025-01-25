import styles from "./DocumentsPage.module.css";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { getDocumentsData } from "../../api/queries";
import { useNavigationContext } from "../../context/Navigation.context";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { DocumentsData } from "./Documents.definitions";

const DocumentsPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const { getToken } = useAuth();
  const { user } = useUser();

  const { data, isLoading } = useQuery<DocumentsData>({
    queryKey: ["documents"],
    queryFn: async () => getDocumentsData(await getToken()),
    enabled: true,
  });

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
    formData.append("file", file, file.name); // File field
    formData.append("documentType", key); // Document type field

    try {
      const response = await axios.post(
        "https://hooks.zapier.com/hooks/catch/9939309/2s0zzn7/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("File uploaded successfully to Zapier:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error uploading file to Zapier:",
          error.response?.data || error.message,
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  if (isLoading || !data)
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

  return null;
};

export default DocumentsPage;
