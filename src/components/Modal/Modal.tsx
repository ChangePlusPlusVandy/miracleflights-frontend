import styles from "./Modal.module.css";
import Icon from "../CustomIcon/Icon";
import type { ModalProps } from "./Modal.definitions";

const Modal = (props: ModalProps) => {
  return (
    <>
      <div className={styles.ModalOverlay} onClick={props.action} />
      <div
        className={`${styles.Modal} ${
          props.large ?? false ? styles.ModalLarge : ""
        }`}
      >
        <div className={styles.ModalHeader}>
          {props.header != null && (
            <div className={styles.ModalHeaderText}>{props.header}</div>
          )}
          <div onClick={props.action} className={styles.ModalHeaderClose}>
            <div className={styles.ModalCircle}>
              <Icon glyph="times" />
            </div>
          </div>
        </div>
        <div className={styles.ModalContent}> {props.body} </div>
      </div>
    </>
  );
};

export default Modal;
