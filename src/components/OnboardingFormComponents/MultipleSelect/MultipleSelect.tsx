import styles from "../OnboardingFormInputStyles.module.css";

interface MultipleSelectProps {
  promptText: string;
  options: string[];
  backgroundColor?: string;
}

const MultipleSelect = ({
  promptText,
  options,
  backgroundColor = "#fff",
}: MultipleSelectProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.labelText}>{promptText}</label>
      </div>
      <br />
      <div className={styles.multiSelectContainer}>
        {options.map(function (answer, idx) {
          return (
            <label key={idx} className={styles.labelText}>
              <input type="checkbox" value={answer} required multiple />
              {answer}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleSelect;
