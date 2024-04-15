import styles from "./PlusButton.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PlusButton = ({ setOpen }: { setOpen: (_open: boolean) => void }) => {
  return (
    <div className={styles.container} onClick={() => setOpen(true)}>
      <FontAwesomeIcon icon={faPlus} className={styles.icon} />
    </div>
  );
};

export default PlusButton;
