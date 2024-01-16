import styles from "./PassengerCard.module.css";
import { formatDate, getAge } from "../../../../util/date.util";
import PassengerDetailsModal from "../PassengerDetailsModal/PassengerDetailsModal";
import Tag from "../../../../components/Tag/Tag";
import {
  TagColor,
  TagVariant,
} from "../../../../components/Tag/Tag.definitions";
import Button from "../../../../components/Button/Button";
import {
  ButtonColor,
  ButtonVariant,
} from "../../../../components/Button/Button.definitions";
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
const PassengerCard = ({ passenger }: PassengerProps) => {
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

      <div className={styles.viewAllInfo}>
        <Button
          text="View All Information"
          onClick={() => setIsModalOpen(true)}
          variant={ButtonVariant.Regular}
          color={ButtonColor.Red}
          extraStyles={{ width: "100%" }}
        />
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

export default PassengerCard;
