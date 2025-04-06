import styles from "./UploadPassengerPageModal.module.css";
import UploadPassengerCard from "../UploadPassengerCard/UploadPassengerCard.tsx";
import type { UploadPassengerPageModalProps } from "./UploadPassengerPageModal.definitions";

const UploadPassengerPageModal = ({
  isOpen,
  passengersData,
  onPassengerFileSubmit,
  onBack,
}: UploadPassengerPageModalProps) => {
  if (!isOpen) return null;

  // const handleSubmit = () => {
  //   onUploadSuccess();
  // };

  const handleFileFromPassenger = (file: File, passengerId: string) => {
    onPassengerFileSubmit(file, passengerId);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className={styles.documentsMainDiv}>
      <button className={styles.backButton} onClick={handleBack}>
        ← Back
      </button>
      <h1 className={styles.uploadTitle}>Upload Passenger Birth Certificate</h1>
      <p className={styles.uploadData}>
        Please select the passenger under 18 for whom you are uploading a birth
        certificate.
      </p>
      <div className={styles.uploadMainDiv}>
        {passengersData
          .filter((passenger) => passenger.Age < 18)
          .map((passenger, index) => (
            <div className={styles.passengerCard} key={index}>
              <UploadPassengerCard
                passenger={passenger}
                onSendFile={handleFileFromPassenger}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadPassengerPageModal;
