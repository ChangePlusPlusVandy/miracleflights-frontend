import styles from "./PatientCard.module.css";
import { formatDate, getAge } from "../../../../util/date.util";
import PatientDetailsModal from "../PatientDetailsModal/PatientDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { PatientProps } from "./PatientCard.definitions";

/**
 * Passenger component - a simple component that holds passenger details
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} relationship
 * @property {string} userType
 * @property {string} dateOfBirth
 */
const Patient = ({ patient }: PatientProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.patientCard} onClick={() => setModalOpen(true)}>
        <div className={styles.imgAndInfo}>
          <div className={styles.imgContainer} />
          <div className={styles.info}>
            <div className={styles.name}>
              {patient.fields["First Name"]} {patient.fields["Last Name"]}
            </div>
            <div className={styles.dob}>
              <span>DOB: </span>
              <span>{formatDate(patient.fields["Date of Birth"])}</span>
              <span className={styles.boldText}>
                {" ("}
                {getAge(patient.fields["Date of Birth"])}
                {")"}
              </span>
            </div>
            <div className={styles.medCondition}>
              <span>Medical Condition: </span>
            </div>
          </div>
        </div>
        <div className={styles.editIcon}>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </div>
      {modalOpen && (
        <PatientDetailsModal
          patient={patient}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default Patient;
