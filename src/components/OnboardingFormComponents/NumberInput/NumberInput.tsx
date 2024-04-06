import styles from "../OnboardingFormInputStyles.module.css";

interface NumberInputProps {
  promptText: string;
  backgroundColor?: string;
  helperText?: string;
}

const NumberInput = ({
  promptText,
  backgroundColor = "#fff",
  helperText = "",
}: NumberInputProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.questionText}>{promptText}</label>
      </div>
      <div className={styles.numberSelectContainer}>
        <input type="number" className={styles.textInput} required />
        {helperText && <span className={styles.helperText}>{helperText}</span>}
      </div>
    </div>
  );
};

export default NumberInput;