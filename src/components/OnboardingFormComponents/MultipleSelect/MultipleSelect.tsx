import styles from "../OnboardingFormInputStyles.module.css";

interface MultipleSelectProps {
  promptText: string;
  options: string[];
  backgroundColor?: string;
  helperText?: string;
}

const MultipleSelect = ({
  promptText,
  options,
  backgroundColor = "#fff",
  helperText = "",
}: MultipleSelectProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.questionText}>{promptText}</label>
      </div>
      <br />
      <div className={styles.multiSelectContainer}>
        {options.map(function (answer, idx) {
          return (
            <label key={idx} className={styles.multiSelectOptionText}>
              <input type="checkbox" value={answer} required multiple />
              {answer}
            </label>
          );
        })}
      </div>
      {helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};

export default MultipleSelect;
