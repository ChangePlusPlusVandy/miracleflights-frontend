import styles from "./UploadPassengerCard.module.css";
import { formatDate, getAge } from "../../../util/date.util";
import type { UploadPassengerCardProps } from "./UploadPassengerCard.definitions";
import { useRef, useState } from "react";

const UploadPassengerCard = ({
  passenger,
  onSendFile,
}: UploadPassengerCardProps) => {
  const name = passenger["Full Name"];
  const relationship = passenger["Relationship"];
  const passengerId = passenger["id"];
  // const birth = passenger["Date of Birth"].split("T")[0];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSendFile = () => {
    if (selectedFile) {
      onSendFile(selectedFile, passengerId);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.line} /> */}
        <div className={styles.name}>{name}</div>
        <div className={styles.relationship}>{relationship}</div>
        <div className={styles.birthContainer}>
          <span className={styles.title}>
            DOB: {formatDate(passenger["Date of Birth"])}
          </span>
          <span className={styles.title}>
            {" (Age: "}
            {getAge(passenger["Date of Birth"])}
            {")"}
          </span>
        </div>

        <div className={styles.uploadSection}>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf, image/png, image/jpeg"
            onChange={handleFileChange}
            hidden
          />
          <button
            type="button"
            className={styles.fileButton}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? "Change File" : "Select File"}
          </button>

          {selectedFile && (
            <>
              <p className={styles.fileName}>
                <strong>Selected:</strong> {selectedFile.name}
              </p>
              <button
                type="button"
                className={styles.cardButton}
                onClick={handleSendFile}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadPassengerCard;
