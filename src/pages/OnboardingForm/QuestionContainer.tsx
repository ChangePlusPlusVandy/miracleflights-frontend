import styles from "./styles/QuestionContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface QuestionContainerProps {
  number: number;
  promptText: string;
  type: string;
  backgroundColor?: string;
  answer?: string;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  currentQuestion: number;
  sectionTitle?: string;
}

const QuestionContainer = ({
  number,
  promptText,
  type,
  backgroundColor = "#fff",
  answer = "",
  setCurrentQuestion,
  currentQuestion,
  sectionTitle = "",
}: QuestionContainerProps) => {
  let answerComp;
  if (answer) {
    answerComp = <div style={{ color: "red" }}>Uncompleted.</div>;
  } else {
    answerComp = <div>{answer}</div>;
  }
  let symbol;
  if (
    (answer && number !== currentQuestion) ||
    (number !== currentQuestion && number === 0)
  ) {
    symbol = (
      <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: "#478f00" }} />
    );
  } else if (number === currentQuestion) {
    // currently answering this question
    symbol = <FontAwesomeIcon icon={faArrowRight} />;
  } else {
    // no answer has been selected & not current question
    symbol = (
      <FontAwesomeIcon icon={faXmark} size="lg" style={{ color: "#cf0707" }} />
    );
  }

  return (
    <div
      className={styles.questionContainer}
      style={{ backgroundColor: backgroundColor }}
      onClick={() => setCurrentQuestion(number)}
    >
      <div className={styles.questionHeaderContainer}>
        <div className={styles.symbolContainer}>{symbol}</div>
        <div className={styles.titleText}>
          {type === "section" ? sectionTitle : `Question ${number}`}
        </div>
      </div>
      <div className={styles.questionPromptContainer}>{promptText}</div>
      <div className={styles.answerContainer}>{answerComp}</div>
    </div>
  );
};

export default QuestionContainer;
