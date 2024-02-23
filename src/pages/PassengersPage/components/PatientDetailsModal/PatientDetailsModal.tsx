import styles from "./PatientDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import type { PatientDetailsModalProps } from "./PatientDetailsModal.definitions";

const PatientDetailsModal = ({
  patient,
  onClose,
}: PatientDetailsModalProps) => {
  return (
    <>
      <Modal
        body={
          <>
            <div className={`${styles.patientRow} ${styles.marginBottom}`}>
              <div>
                <span className={styles.patientLabel}>Gender</span>{" "}
                <span className={styles.patientText}>{patient["Gender"]}</span>
              </div>
              <div>
                <span className={styles.patientLabel}>DOB</span>{" "}
                <span className={styles.patientText}>
                  {patient["Date of Birth"].split("T")[0]}{" "}
                </span>
              </div>
            </div>
            {/* make another patient group for address where each line of the address is separated */}
            <div className={styles.patientGroup}>
              <span className={styles.patientLabel}>Address</span>{" "}
              <span className={styles.patientText}>{patient["Street"]}</span>
              <span className={styles.patientText}>{patient["Country"]}</span>
            </div>
            <div className={styles.patientGroup}>
              <span className={styles.patientLabel}>Military</span>{" "}
              <span className={styles.patientText}>
                {patient["Military Service"]}
              </span>
            </div>
            <div className={styles.patientRow}>
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}># of Flight Legs</span>{" "}
                <span className={styles.patientText}>
                  {patient["# of Flight Legs"]}
                </span>
              </div>
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>
                  # of Booked Flight Requests
                </span>{" "}
                <span className={styles.patientText}>
                  {patient["# of Booked Flight Requests"]}
                </span>
              </div>
            </div>
            <div className={styles.patientGroup}>
              <span className={styles.patientLabel}>Notes</span>
              <span className={styles.patientText}>Notes go here</span>
            </div>
            {/* <span className={styles.patientLabel}>Joined Goes Here</span>{" "} */}
          </>
        }
        header={patient["Full Name"]}
        action={onClose}
      />
    </>
  );
};

export default PatientDetailsModal;
