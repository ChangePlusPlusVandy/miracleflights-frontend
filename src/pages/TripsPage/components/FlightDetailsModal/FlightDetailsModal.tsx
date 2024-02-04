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
            flight["Departure Date/Time"].substring(0, 9),
            flight["Departure Airport"],
            flight["Arrival Airport"],
            flight.Airline,
            flight["Leg Type"],
          ]}
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal;
