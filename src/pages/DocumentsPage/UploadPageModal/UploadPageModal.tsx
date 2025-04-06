import styles from "./UploadPageModal.module.css";
import type { UploadPageModalProps } from "./UploadPageModal.definitions";

const UploadPageModal = ({
  isOpen,
  documentType,
  onUploadSuccess
}: UploadPageModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    onUploadSuccess();
  };

  return (
    <div className={styles.documentsMainDiv}>
      <h1 className={styles.uploadTitle}>Upload {documentType}</h1>
      <p className={styles.uploadData}>
        Please upload the relevant document for verification purposes.
      </p>
      <div className={styles.uploadMainDiv}>
        <div className={styles.uploadChoiceContainer}>
          <div className={styles.optionTitleDiv}>
            <div className={styles.uploadIcon}>
              <img src="src/pages/DocumentsPage/components/uploadIcon.png" />
            </div>
            <p className={styles.optionTitle}>Choose an option</p>
          </div>
          <div className={styles.uploadChoices}>
            <div className={styles.uploadChoice} onClick={handleSubmit}>
              <p className={styles.choiceTitle}>Upload files</p>
              <p className={styles.choiceText}>
                Your files will be added as attachments (.pdf)
              </p>
            </div>
            <div className={styles.uploadChoice}>
              <p className={styles.choiceTitle}>Upload images and videos</p>
              <p className={styles.choiceText}>
                Uploads will be compressed for quick view
              </p>
            </div>
          </div>
        </div>
        <div className={styles.uploadMainImage}>
          <img src="src/pages/DocumentsPage/components/uploadMain.png" />
        </div>
      </div>
    </div>
  );
};

export default UploadPageModal;
