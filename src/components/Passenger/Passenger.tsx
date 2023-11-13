import styles from "./Passenger.module.css";
import { useState } from "react";
import type { PassengerProps } from "./Passenger.definitions";

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
  const [number, setNumber] = useState<number>(0);

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.exampleSubtitle}>Patient {}</div>
      <div className={styles.dob}>DOB: {Passengers.dateOfBirth}</div>
      <div className={styles.relationship}>DOB: {Passengers.relationship}</div>
      <div>
        <button onClick={() => setNumber(number)} className={styles.seeDetails}>
          See Details
        </button>
      </div>
    </div>
  );
};

export default Passenger;
