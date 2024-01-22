import styles from "./PassengerDetailsModal.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { PassengerDetailsModalProps } from "./PassengerDetailsModal.definitions";

const PassengerDetailsModal = ({
  passenger,
  onClose,
}: PassengerDetailsModalProps) => {
  return (
    <div className={styles["modal-bg"]}>
      <div className={styles["modal-container"]}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={onClose}
          className={styles["btn"]}
        />
        <div className={styles["passenger-details"]}>
          <p>
            <span>First Name:</span> {passenger.fields["First Name"]}
          </p>
          <p>
            <span>Last Name:</span> {passenger.fields["Last Name"]}
          </p>
          <p>
            <span>Email:</span> {passenger.fields["Email"]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetailsModal;
