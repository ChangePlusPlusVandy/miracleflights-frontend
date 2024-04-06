import styles from "../OnboardingFormInputStyles.module.css";

interface DropdownQuestionProps {
  promptText: string;
  backgroundColor?: string;
  helperText?: string;
  options: string[];
}

const DropdownQuestion = ({
  promptText,
  backgroundColor = "#fff",
  helperText = "",
  options,
}: DropdownQuestionProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.questionText}>{promptText}</label>
      </div>
      <div className={styles.dropdownContainer}>
        <select className={styles.dropdownSelect}>
          <option value="" disabled selected hidden>
            Select an option
          </option>
          {options.map(function (answer, idx) {
            return (
              <option key={idx} value={answer}>
                {answer}
              </option>
            );
          })}
        </select>
        {helperText && <span className={styles.helperText}>{helperText}</span>}
      </div>
    </div>
  );
};

export default DropdownQuestion;
