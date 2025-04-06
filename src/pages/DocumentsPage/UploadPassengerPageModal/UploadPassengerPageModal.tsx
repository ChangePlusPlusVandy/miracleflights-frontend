import styles from "./UploadPassengerPageModal.module.css";
import UploadPassengerCard from "../UploadPassengerCard/UploadPassengerCard.tsx";
import type { UploadPassengerPageModalProps } from "./UploadPassengerPageModal.definitions";

const UploadPassengerPageModal = ({
  isOpen,
  documentType,
  passengersData,
}: UploadPassengerPageModalProps) => {
  if (!isOpen) return null;

  // const handleSubmit = () => {
  //   onUploadSuccess();
  // };

  return (
    <div className={styles.documentsMainDiv}>
      <h1 className={styles.uploadTitle}>
        Upload Passenger Birth Certificate{documentType}
      </h1>
      <p className={styles.uploadData}>
        Please select the passenger under 18 for whom you are uploading a birth
        certificate.
      </p>
      <div className={styles.uploadMainDiv}>
        {passengersData
          .filter((passenger) => passenger.Age < 18) // 👈 Only keep those under 18
          .map((passenger, index) => (
            <div className={styles.passengerCard} key={index}>
              <UploadPassengerCard passenger={passenger} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadPassengerPageModal;
