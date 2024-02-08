import styles from "./FlightDetailsModal.module.css";
import { faCircleXmark, faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FlightDetailsModalProps } from "./FlightDetailsModal.definitions";

const FlightDetailsModal = ({ onClose, flight }: FlightDetailsModalProps) => {
  function joinWithCommasAndAnd(words: string | string[]): string {
    // Handle the case where 'words' is a single string
    if (typeof words === "string") {
      return words;
    }

    // Now 'words' is guaranteed to be an array of strings
    switch (words.length) {
      case 0:
        return "";
      case 1:
        return words[0];
      case 2:
        return words.join(" and ");
      default: {
        const lastWord = words.pop();
        return `${words.join(", ")}, and ${lastWord}`;
      }
    }
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={styles.exitIcon}
          onClick={onClose}
          id="closeIcon"
        />
        <div className={styles.modalContent}>
          <div className={styles.header}>Flight Information</div>
          <div className={styles.flightInfo}>
            <div className={styles.from}>
              <FontAwesomeIcon
                icon={faPlaneUp}
                className={styles.airplaneIcon1}
              />
              <div className={styles.fromMargin}>From:</div>{" "}
              {flight.fields["BL - Departure Airport"]} -{" "}
              {flight.fields["Departure Airport"]}
            </div>
            <div className={styles.to}>
              <FontAwesomeIcon
                icon={faPlaneUp}
                className={styles.airplaneIcon2}
              />
              <div className={styles.toMargin}>To:</div>{" "}
              {flight.fields["BL - Arrival Airport"]} -{" "}
              {flight.fields["Arrival Airport"]}
            </div>
            <div className={styles.flightTime}>
              Departure Time: {flight.fields["Departure Date/Time"]}
            </div>
            <div className={styles.flightNum}>
              Passengers:{" "}
              {joinWithCommasAndAnd(flight.fields["Passenger Names"])}
            </div>
          </div>
          <div className={styles.footer}>
            <a href="https://eelslap.com/" className={styles.footer}>
              Check Flight Status
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal;
