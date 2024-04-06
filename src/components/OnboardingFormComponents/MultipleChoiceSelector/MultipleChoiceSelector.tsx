import styles from "../OnboardingFormInputStyles.module.css";

interface MultipleChoiceSelectorProps {
  promptText: string;
  options: string[];
  backgroundColor?: string;
  multiple?: boolean;
  helperText?: string;
}

const MultipleChoiceSelector = ({
  promptText,
  options,
  backgroundColor = "#fff",
  helperText = "",
}: MultipleChoiceSelectorProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.questionText}>{promptText}</label>
      </div>
      <div className={styles.radioContainer}>
        {options.map(function (answer, idx) {
          return (
            <label key={idx} className={styles.labelText}>
              <input type="radio" name="choice" value={answer} required />
              {answer}
            </label>
          );
        })}
        {helperText && <span className={styles.helperText}>{helperText}</span>}
      </div>
    </div>
  );
};

export default MultipleChoiceSelector;
