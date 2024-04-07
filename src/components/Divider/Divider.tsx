import styles from "./Divider.module.css";
import { DividerSpacing, type DividerProps } from "./Divider.definitions";

const Divider = ({ spacing = DividerSpacing.NONE }: DividerProps) => {
  return <div className={styles.divider} id={styles[`spacing${spacing}`]} />;
};

export default Divider;
