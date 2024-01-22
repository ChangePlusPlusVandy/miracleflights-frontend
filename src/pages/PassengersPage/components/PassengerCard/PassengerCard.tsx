import styles from "./PassengerCard.module.css";
import { formatDate, getAge } from "../../../../util/date.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
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
  return (
    <div className={styles.passengerCard}>
      <div className={styles.editIcon}>
        <FontAwesomeIcon icon={faPen} />
      </div>
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
    </div>
  );
};

export default Passenger;
