import styles from "./Passenger.module.css";
import { formatDate, getAge } from "../../util/date.util";
import PassengerDetailsModal from "../../modals/PassengerDetailsModal/PassengerDetailsModal";
import Tag from "../TagComponent/Tag";
import { TagColor, TagVariant } from "../TagComponent/Tag.definitions";
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
const Passenger = ({ passenger }: PassengerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.passengerCard}>
      <Tag
        text="PASSENGER"
        color={TagColor.GREEN}
        variant={TagVariant.NORMAL}
      />
      <div className={styles.name}>
        {passenger.fields["First Name"]} {passenger.fields["Last Name"]}
      </div>
      <div className={styles.dob}>
        <span className={styles.boldText}>DOB: </span>
        {formatDate(passenger.fields["Date of Birth"])} {"("}
        <span className={styles.boldText}>
          {getAge(passenger.fields["Date of Birth"])}
        </span>
        {")"}
      </div>
      <div>
        <button
          className={styles.viewAllInfo}
          onClick={() => setIsModalOpen(true)}
        >
          View All Information
        </button>
      </div>
      {isModalOpen && (
        <PassengerDetailsModal
          onClose={handleCloseModal}
          passenger={passenger}
        />
      )}
    </div>
  );
};

export default Passenger;
