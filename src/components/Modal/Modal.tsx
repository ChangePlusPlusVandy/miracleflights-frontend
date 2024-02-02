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
        <div onClick={props.action} className={styles.ModalClose}>
          <Icon glyph="times" />
        </div>
        {props.header != null && (
          <div className={styles.ModalHeader}>{props.header}</div>
        )}
        <div className={styles.ModalContent}> {props.body} </div>
      </div>
    </>
  );
};

export default Modal;
