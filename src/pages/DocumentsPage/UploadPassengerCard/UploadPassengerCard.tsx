import styles from "./UploadPassengerCard.module.css";
import { formatDate, getAge } from "../../../util/date.util";
import type { UploadPassengerCardProps } from "./UploadPassengerCard.definitions";

const UploadPassengerCard = ({ passenger }: UploadPassengerCardProps) => {

  const name = passenger["Full Name"];
  const relationship = passenger["Relationship"];
  // const birth = passenger["Date of Birth"].split("T")[0];

  return (
    <>
      <div className={styles.container}>
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
        </div>
        <button className={styles.cardButton}>Select</button>
      </div>
    </>
  );
};

export default UploadPassengerCard;
