import styles from "./PatientDetailsModal.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { PatientDetailsModalProps } from "./PatientDetailsModal.definitions";

const PatientDetailsModal = ({
  patient,
  onClose,
}: PatientDetailsModalProps) => {
  return (
    <div className={styles["modal-bg"]}>
      <div className={styles["modal-container"]}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={onClose}
          className={styles["btn"]}
        />
        <div className={styles["patient-details"]}>
          <p>
            <span>First Name:</span> {patient.fields["First Name"]}
          </p>
          <p>
            <span>Last Name:</span> {patient.fields["Last Name"]}
          </p>
          <p>
            <span>Email:</span> {patient.fields["Email"]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
