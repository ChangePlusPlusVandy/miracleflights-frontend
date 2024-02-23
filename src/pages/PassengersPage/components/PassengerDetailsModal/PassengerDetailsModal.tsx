import styles from "./PassengerDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import type { PassengerDetailsModalProps } from "./PassengerDetailsModal.definitions";

const PassengerDetailsModal = ({
  passenger,
  onClose,
}: PassengerDetailsModalProps) => {
  return (
    <>
      <Modal
        body={
          <>
            <div className={`${styles.passengerRow} ${styles.marginBottom}`}>
              <div>
                <span className={styles.passengerLabel}>Gender</span>{" "}
                <span className={styles.passengerText}>
                  {passenger["Gender"]}
                </span>
              </div>
              <div>
                <span className={styles.passengerLabel}>DOB</span>{" "}
                <span className={styles.passengerText}>
                  {passenger["Date of Birth"].split("T")[0]}{" "}
                </span>
              </div>
            </div>
            {/* make another passenger group for address where each line of the address is separated */}
            <div className={styles.passengerGroup}>
              <span className={styles.passengerLabel}>Address</span>{" "}
              <span className={styles.passengerText}>
                {passenger["Street"]}
              </span>
              <span className={styles.passengerText}>
                {passenger["Country"]}
              </span>
            </div>
            <div className={styles.passengerGroup}>
              <span className={styles.passengerLabel}>Military</span>{" "}
              <span className={styles.passengerText}>
                {passenger["Military Service"]}
              </span>
            </div>
            <div className={styles.passengerRow}>
              <div className={styles.passengerGroup}>
                <span className={styles.passengerLabel}># of Flight Legs</span>{" "}
                <span className={styles.passengerText}>
                  {passenger["# of Flight Legs"]}
                </span>
              </div>
              <div className={styles.passengerGroup}>
                <span className={styles.passengerLabel}>
                  # of Booked Flight Requests
                </span>{" "}
                <span className={styles.passengerText}>
                  {passenger["# of Booked Flight Requests"]}
                </span>
              </div>
            </div>
            <div className={styles.passengerGroup}>
              <span className={styles.passengerLabel}>Notes</span>
              <span className={styles.passengerText}>Notes go here</span>
            </div>
          </>
        }
        header={passenger["Full Name"]}
        action={onClose}
      />
    </>
  );
};

export default PassengerDetailsModal;
