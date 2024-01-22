import styles from "./PassengerCard.module.css";
import { formatDate, getAge } from "../../../../util/date.util";
import PassengerDetailsModal from "../PassengerDetailsModal/PassengerDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { PassengerProps } from "./PassengerCard.definitions";

/**
 * Passenger component - a simple component that holds passenger details
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} relationship
 * @property {string} userType
 * @property {string} dateOfBirth
 */
const Passenger = ({ passenger }: PassengerProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.passengerCard} onClick={() => setModalOpen(true)}>
        <div className={styles.imgAndInfo}>
          <div className={styles.imgContainer} />
          <div className={styles.info}>
            <div className={styles.name}>
              {passenger.fields["First Name"]} {passenger.fields["Last Name"]}
            </div>
            <div className={styles.dob}>
              <span>DOB: </span>
              <span>{formatDate(passenger.fields["Date of Birth"])}</span>
              <span className={styles.boldText}>
                {" ("}
                {getAge(passenger.fields["Date of Birth"])}
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
        <PassengerDetailsModal
          passenger={passenger}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default Passenger;
