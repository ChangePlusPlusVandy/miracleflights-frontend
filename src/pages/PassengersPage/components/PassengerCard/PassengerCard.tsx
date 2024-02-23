import styles from "./PassengerCard.module.css";
import type { PassengerCardProps } from "./PassengerCard.definitions";

const PassengerCard = (props: PassengerCardProps) => {
  const { name, relationship, notes } = props;

  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.relationship}>{relationship}</div>
      <div>
        <p className={styles.title}>Notes</p>
        <span className={styles.notes}>{notes}</span>
      </div>
    </div>
  );
};

export default PassengerCard;
