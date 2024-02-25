import styles from "./FlightDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import Icon from "../../../../components/CustomIcon/Icon";
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
  function formatDateString(dateString: string | number | Date) {
    const date = new Date(dateString);
    const formattedDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    const formattedTime =
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0");
    return formattedDate + " " + formattedTime;
  }

  return (
    <Modal
      action={onClose}
      header="Flight Information"
      body={
        <>
          <div className={styles.row}>
            <div className={`${styles.icon} ${styles.colorRed}`}>
              <Icon glyph="plane" />
            </div>
            <div className={styles.label}>From:</div>{" "}
            {flight["Departure Airport"]}
          </div>
          <div className={styles.row}>
            <div className={`${styles.icon} ${styles.colorBlue}`}>
              <Icon glyph="plane" />
            </div>
            <div className={styles.label}>To:</div> {flight["Arrival Airport"]}
          </div>
          <div className={styles.row}>
            <div className={styles.icon} />
            <div className={styles.label}> Departure Time: </div>
            {formatDateString(flight["Departure Date/Time"])}
          </div>
          <div className={styles.row}>
            <div className={styles.icon} />
            <div className={styles.label}> Passengers:</div>
            {joinWithCommasAndAnd(flight["Passenger Names"])}
          </div>
          <div className={styles.footer}>
            <a href="https://eelslap.com/" className={styles.footer}>
              Check Flight Status
            </a>
          </div>
        </>
      }
    />
  );
};

export default FlightDetailsModal;
