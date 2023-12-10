import styles from "../OnboardingFormInputStyles.module.css";

interface MultipleChoiceSelectorProps {
  promptText: string;
  options: string[];
  backgroundColor?: string;
  multiple?: boolean;
}

const MultipleChoiceSelector = ({
  promptText,
  options,
  backgroundColor = "#fff",
  multiple = false,
}: MultipleChoiceSelectorProps) => {
  const flexDir = multiple ? "column" : "row";
  return (
    <div
      className={styles.inputContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionContainer}>
        <label className={styles.labelText}>{promptText}</label>
      </div>
      <div className={styles.radioContainer} style={{ flexDirection: flexDir }}>
        {options.map(function (answer, idx) {
          return (
            <label key={idx} className={styles.labelText}>
              <input type="radio" value={answer} required multiple={multiple} />
              {answer}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceSelector;
