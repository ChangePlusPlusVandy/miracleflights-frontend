import styles from "./PatientCard.module.css";
import { formatDate, getAge } from "../../../../util/date.util";
// import Icon from "../../../../components/CustomIcon/Icon";
import PatientDetailsModal from "../PatientDetailsModal/PatientDetailsModal";
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
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && (
        <PatientDetailsModal
          patient={patient}
          onClose={() => setModal(false)}
        />
      )}
      <div className={styles.patientCard} onClick={() => setModal(true)}>
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
        {/* <div className={styles.editIcon} onClick={}>
          <Icon glyph="pen" />
        </div> */}
      </div>
    </>
  );
};

export default Patient;
