import styles from "./Passenger.module.css";
import type { PassengerProps } from "./Passenger.definitions";

function getAge(dateOfBirth: string) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

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
      <div className={styles.title}>Passenger {}</div>
      <div className={styles.name}>
        {Passengers.firstName} {Passengers.lastName}
      </div>
      <div className={styles.dob}>
        <span className={styles.boldText}>DOB: </span>
        {Passengers.dateOfBirth} {"("}
        <span className={styles.boldText}>
          {getAge(Passengers.dateOfBirth)}
        </span>
        {")"}
      </div>
      <div className={styles.relationship}>
        <span className={styles.boldText}>Relationship: </span>
        {Passengers.relationship}
      </div>
      <div>
        <button className={styles.viewAllInfo}>View All Information</button>
      </div>
    </div>
  );
};

export default Passenger;
