import styles from "./QuestionContainer.module.css";

interface QuestionContainerProps {
  number: number;
  promptText: string;
  backgroundColor?: string;
  answer?: string;
}

const QuestionContainer = ({
  number,
  promptText,
  backgroundColor = "#fff",
  answer = "",
}: QuestionContainerProps) => {
  let answerComp;
  if (answer) {
    answerComp = <div style={{ color: "red" }}>Uncompleted.</div>;
  } else {
    answerComp = <div>{answer}</div>;
  }
  return (
    <div
      className={styles.questionContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.questionHeaderContainer}>
        {/* {answer ? (
          <div className={styles.symbolContainer}>
            <img src={checkMarkSymbol} alt="logo" className={styles.symbol} />
          </div>
        ) : (
          <div className={styles.symbolContainer}>
            <img src={redXSymbol} alt="logo" sizes="small" />
          </div>
        )} */}
        <div className={styles.titleText}>
          {number === 0 ? "Introduction" : `Question ${number}`}
        </div>
      </div>
      <div className={styles.questionPromptContainer}>{promptText}</div>
      <div className={styles.answerContainer}>{answerComp}</div>
    </div>
  );
};

export default QuestionContainer;
