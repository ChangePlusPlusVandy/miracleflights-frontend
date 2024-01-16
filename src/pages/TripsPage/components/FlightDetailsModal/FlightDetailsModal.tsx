import styles from "./FlightDetailsModal.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FlightDetailsModalProps } from "./FlightDetailsModal.definitions";

const FlightDetailsModal = ({ onClose, flight }: FlightDetailsModalProps) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.exitIcon}
          onClick={onClose}
          id="closeIcon"
        />
        <div className={styles.modalContent}>
          {[
            flight.fields["Departure Date/Time"].substring(0, 9),
            flight.fields["Departure Airport"],
            flight.fields["Arrival Airport"],
            flight.fields.Airline,
            flight.fields["Leg Type"],
          ]}
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal;
