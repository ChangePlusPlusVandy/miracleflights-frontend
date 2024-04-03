import styles from "../OnboardingFormInputStyles.module.css";

interface TextInputProps {
  promptText: string;
  backgroundColor?: string;
  helperText?: string;
}

const TextInput = ({
  promptText,
  backgroundColor = "#fff",
  helperText = "",
}: TextInputProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.labelText}>{promptText}</label>
      </div>
      <div className={styles.numberSelectContainer}>
        <input
          type="text"
          className={styles.numberInput}
          required
          placeholder="Enter your answer"
        />
        {helperText && <span className={styles.helperText}>{helperText}</span>}
      </div>
    </div>
  );
};

export default TextInput;
