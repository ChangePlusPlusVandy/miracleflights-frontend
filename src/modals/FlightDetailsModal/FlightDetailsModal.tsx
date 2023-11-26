import styles from "./FlightDetailsModal.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FlightDetailsModalProps } from "./FlightDetailsModal.definitions";

const FlightDetailsModal = ({
  isOpen,
  onClose,
  date,
  departingAirport,
  arrivingAirport,
  airline,
  legType,
}: FlightDetailsModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.exitIcon}
          onClick={onClose}
        />
        <div className={styles.modalContent}>
          {[date, departingAirport, arrivingAirport, airline, legType]}
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal;
