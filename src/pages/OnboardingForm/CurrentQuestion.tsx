import { QuestionType, questions } from "./FormQuestionsList";
import styles from "./styles/CurrentQuestion.module.css";
import IntroductionComponent from "../../components/OnboardingFormComponents/IntroductionComponent/IntroductionComponent";
import MultipleChoiceSelector from "../../components/OnboardingFormComponents/MultipleChoiceSelector/MultipleChoiceSelector";
import MultipleSelect from "../../components/OnboardingFormComponents/MultipleSelect/MultipleSelect";
import NumberInput from "../../components/OnboardingFormComponents/NumberInput/NumberInput";
import NextPreviousButton, {
  ButtonType,
} from "../../components/OnboardingFormComponents/NextPreviousButton/NextPreviousButton";

interface CurrentQuestionProps {
  number: number;
  promptText: string;
  type: QuestionType;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  options?: string[];
}

const CurrentQuestion = ({
  number,
  promptText,
  type,
  setCurrentQuestion,
  options = [],
}: CurrentQuestionProps) => {
  if(number !== 0){
    promptText = number + ". " + promptText
  }
  return (
    <div className={styles.currentQuestionContainer}>
      <div className={styles.columnContainer}>
        {type === QuestionType.IntroToForm && <IntroductionComponent />}
        {type === QuestionType.YesNoQuestion && (
          <MultipleChoiceSelector
            options={["Yes", "No"]}
            promptText={promptText}
          />
        )}
        {type === QuestionType.MultiSelectQuestion && (
          <MultipleSelect options={options} promptText={promptText} />
        )}
        {type === QuestionType.NumberInput && (
          <NumberInput promptText={promptText} />
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <NextPreviousButton
          type={ButtonType.Previous}
          currentQuestionIdx={number}
          setCurrentQuestion={setCurrentQuestion}
          disabled={type === QuestionType.IntroToForm}
        />
        <NextPreviousButton
          type={ButtonType.Next}
          currentQuestionIdx={number}
          setCurrentQuestion={setCurrentQuestion}
          disabled={number === questions.length - 1}
        />
      </div>
    </div>
  );
};

export default CurrentQuestion;
