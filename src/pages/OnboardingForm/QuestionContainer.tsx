import styles from "./styles/QuestionContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

interface QuestionContainerProps {
  number: number;
  promptText: string;
  backgroundColor?: string;
  answer?: string;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionContainer = ({
  number,
  promptText,
  backgroundColor = "#fff",
  answer = "",
  setCurrentQuestion,
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
      onClick={() => setCurrentQuestion(number)}
    >
      <div className={styles.questionHeaderContainer}>
        {answer ? (
          <div className={styles.symbolContainer}>
            <FontAwesomeIcon
              icon={faCheck}
              size="lg"
              style={{ color: "#478f00" }}
            />
          </div>
        ) : (
          <div className={styles.symbolContainer}>
            <FontAwesomeIcon
              icon={faXmark}
              size="lg"
              style={{ color: "#cf0707" }}
            />
          </div>
        )}
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
