import styles from "../OnboardingFormInputStyles.module.css";

interface FileInputProps {
  promptText: string;
  backgroundColor?: string;
  helperText?: string;
}

const FileInput = ({
  promptText,
  backgroundColor = "#fff",
  helperText = "",
}: FileInputProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.questionText}>{promptText}</label>
      </div>
      <div className={styles.numberSelectContainer}>
        <input type="file" className={styles.fileInput} required />
        {helperText && <span className={styles.helperText}>{helperText}</span>}
      </div>
    </div>
  );
};

export default FileInput;
