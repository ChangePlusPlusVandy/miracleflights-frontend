import styles from "./OnboardingForm.module.css";

interface MultipleChoiceSelectorProps {
  promptText: string;
  options: string[];
  backgroundColor?: string;
}

const MultipleChoiceSelector = ({
  promptText,
  options,
  backgroundColor = "#fff",
}: MultipleChoiceSelectorProps) => {
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <label className={styles.labelText}>{promptText}</label>
      <div className={styles.radioContainer}>
        {options.map(function (answer, idx) {
          return (
            <label key={idx} className={styles.labelText}>
              <input type="radio" value={answer} required />
              {answer}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceSelector;
