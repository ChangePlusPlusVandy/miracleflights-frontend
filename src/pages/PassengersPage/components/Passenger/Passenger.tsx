import styles from "./Passenger.module.css";
import { formatDate, getAge } from "../../../../util/date.util";
import PassengerDetailsModal from "../PassengerDetailsModal/PassengerDetailsModal";
import Tag from "../../../../components/TagComponent/Tag";
import {
  TagColor,
  TagVariant,
} from "../../../../components/TagComponent/Tag.definitions";
import Button from "../../../../components/ButtonComponent/ButtonComponent";
import {
  ButtonColor,
  ButtonVariant,
} from "../../../../components/ButtonComponent/ButtonComponent.definitions";
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

      <div className={styles.viewAllInfo}>
        <Button
          text="View All Information"
          onClick={() => setIsModalOpen(true)}
          loading={false}
          disabled={false}
          variant={ButtonVariant.Compact}
          color={ButtonColor.Red}
          extraStyles={{ fontWeight: 300, fontSize: 16 }}
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

export default Passenger;
