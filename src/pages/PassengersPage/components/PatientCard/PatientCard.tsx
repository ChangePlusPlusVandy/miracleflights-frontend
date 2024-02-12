import styles from "./PatientCard.module.css";
import { formatDate, getAge } from "../../../../util/date.util";
// import Icon from "../../../../components/CustomIcon/Icon";
import Modal from "../../../../components/Modal/Modal";
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
        <Modal
          body={
            <>
              <div className={`${styles.patientRow} ${styles.marginBottom}`}>
                <div>
                  <span className={styles.patientLabel}>Gender</span>{" "}
                  <span className={styles.patientText}>
                    {patient.fields["Gender"]}
                  </span>
                </div>
                <div>
                  <span className={styles.patientLabel}>DOB</span>{" "}
                  <span className={styles.patientText}>
                    {patient.fields["Date of Birth"].split("T")[0]}{" "}
                  </span>
                </div>
              </div>
              {/* make another patient group for address where each line of the address is separated */}
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Address</span>{" "}
                <span className={styles.patientText}>
                  {patient.fields["Street"]}
                </span>
                <span className={styles.patientText}>
                  {patient.fields["Country"]}
                </span>
              </div>
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Military</span>{" "}
                <span className={styles.patientText}>
                  {patient.fields["Military Service"]}
                </span>
              </div>
              <div className={styles.patientRow}>
                <div className={styles.patientGroup}>
                  <span className={styles.patientLabel}># of Flight Legs</span>{" "}
                  <span className={styles.patientText}>
                    {patient.fields["# of Flight Legs"]}
                  </span>
                </div>
                <div className={styles.patientGroup}>
                  <span className={styles.patientLabel}>
                    # of Booked Flight Requests
                  </span>{" "}
                  <span className={styles.patientText}>
                    {patient.fields["# of Booked Flight Requests (Patient)"]}
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
          header={patient.fields["Full Name"]}
          action={() => setModal(false)}
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
