import styles from "./PassengerCard.module.css";
// import PassengerDetailsModal from "../PassengerDetailsModal/PassengerDetailsModal";
import { useState } from "react";
import type { PassengerCardProps } from "./PassengerCard.definitions";
import PassengerDetailsModal from "../PassengerDetailsModal/PassengerDetailsModal";
import { formatDate, getAge } from "../../../../util/date.util";

const PassengerCard = ({ passenger }: PassengerCardProps) => {
  const [modal, setModal] = useState(false);

  const name = passenger["Full Name"];
  const relationship = passenger["Relationship"];
  // const birth = passenger["Date of Birth"].split("T")[0];

  return (
    <>
      {modal && (
        <PassengerDetailsModal
          passenger={passenger}
          onClose={() => setModal(false)}
        />
      )}
      <div className={styles.container} onClick={() => setModal(true)}>
        {/* <div className={styles.line} /> */}
        <div className={styles.name}>{name}</div>
        <div className={styles.relationship}>{relationship}</div>
        <div className={styles.birthContainer}>
          <span className={styles.title}>
            DOB: {formatDate(passenger["Date of Birth"])}
          </span>
          <span>
            {" ("}
            {getAge(passenger["Date of Birth"])}
            {")"}
          </span>
          {/* <span className={styles.birth}>{birth}</span> */}
        </div>
      </div>
    </>
  );
};

export default PassengerCard;
