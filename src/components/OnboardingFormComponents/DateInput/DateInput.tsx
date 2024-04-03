import styles from "../OnboardingFormInputStyles.module.css";

interface DateInputProps {
  promptText: string;
  backgroundColor?: string;
  helperText?: string;
}

const DateInput = ({
  promptText,
  backgroundColor = "#fff",
  helperText = "",
}: DateInputProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.labelText}>{promptText}</label>
      </div>
      <div className={styles.numberSelectContainer}>
        <input type="date" className={styles.dateInput} required />
        {helperText && <span className={styles.helperText}>{helperText}</span>}
      </div>
    </div>
  );
};

export default DateInput;
