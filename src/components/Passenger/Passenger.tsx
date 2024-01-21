import styles from "./Passenger.module.css";
import { getAge } from "../../util/date.util";
import type { PassengerProps } from "./Passenger.definitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

/**
 * Passenger component - a simple component that holds passenger details
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} relationship
 * @property {string} userType
 * @property {string} dateOfBirth
 */
const Passenger = (Passengers: PassengerProps) => {
  return (
    <div className={styles.passengerCard}>
      <div className={styles.editIcon}>
        <FontAwesomeIcon icon={faPen} />
      </div>
      <div className={styles.imgAndInfo}>
        <div className={styles.imgContainer}></div>
        <div className={styles.info}>
          <div className={styles.name}>
            {Passengers.firstName} {Passengers.lastName}
          </div>
          <div className={styles.dob}>
            <span>DOB: </span>
            <span>{Passengers.dateOfBirth}</span>
            <span className={styles.boldText}>
              {" ("}
              {getAge(Passengers.dateOfBirth)}
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
