import styles from "./SuccessPageModal.module.css";
import { useUser } from "@clerk/clerk-react";
import type { SuccessPageModalProps } from "./SuccessPageModal.definitions";

const SuccessPageModal = ({
  isOpen,
  onUploadMore,
}: SuccessPageModalProps) => {
  if (!isOpen) return null;

  const { user } = useUser();

  const handleUploadMore = () => {
    onUploadMore();
  };

  return (
    <div className={styles.successMainDiv}>
      <img
        className={styles.successIcon}
        src="src/pages/DocumentsPage/components/successIcon.png"
       />
      <p className={styles.successTitle}>
        Hey {user?.firstName}, your upload was successful!
      </p>
      <p className={styles.successText}>
        We’ll add your uploads to your document portal
      </p>
      <button className={styles.uploadMoreButton} onClick={handleUploadMore}>
        Upload More
      </button>
    </div>
  );
};

export default SuccessPageModal;
