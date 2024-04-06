import { QuestionType, questions } from "./FormQuestionsList";
import styles from "./styles/CurrentQuestion.module.css";
import SectionComponent from "../../components/OnboardingFormComponents/SectionComponent/SectionComponent";
import MultipleChoiceSelector from "../../components/OnboardingFormComponents/MultipleChoiceSelector/MultipleChoiceSelector";
import MultipleSelect from "../../components/OnboardingFormComponents/MultipleSelect/MultipleSelect";
import NumberInput from "../../components/OnboardingFormComponents/NumberInput/NumberInput";
import TextInput from "../../components/OnboardingFormComponents/TextInput/TextInput";
import NextPreviousButton, {
  ButtonType,
} from "../../components/OnboardingFormComponents/NextPreviousButton/NextPreviousButton";
import DateInput from "../../components/OnboardingFormComponents/DateInput/DateInput";
import FileInput from "../../components/OnboardingFormComponents/FileInput/FileInput";
import DropdownQuestion from "../../components/OnboardingFormComponents/DropdownQuestion/DropdownQuestion";

interface CurrentQuestionProps {
  number: number;
  promptText: string;
  type: QuestionType;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  options?: string[];
  helperText?: string;
  // Section specific props
  sectionTitle?: string;
  introText?: string;
  bodyText?: string;
}

const CurrentQuestion = ({
  number,
  promptText,
  type,
  setCurrentQuestion,
  options = [],
  helperText = "",
  sectionTitle = "",
  introText = "",
}: CurrentQuestionProps) => {
  if (type !== QuestionType.Section) {
    promptText = number + ". " + promptText;
  }
  return (
    <div className={styles.currentQuestionContainer}>
      <div className={styles.columnContainer}>
        {type === QuestionType.Section && (
          <SectionComponent
            sectionTitle={sectionTitle}
            introText={introText}
            promptText={promptText}
          />
        )}
        {type === QuestionType.YesNoQuestion && (
          <MultipleChoiceSelector
            options={["Yes", "No"]}
            promptText={promptText}
            helperText={helperText}
          />
        )}
        {type === QuestionType.MultipleChoiceQuestion && (
          <MultipleChoiceSelector
            options={options}
            promptText={promptText}
            helperText={helperText}
          />
        )}
        {type === QuestionType.MultiSelectQuestion && (
          <MultipleSelect
            options={options}
            promptText={promptText}
            helperText={helperText}
          />
        )}
        {type === QuestionType.DateQuestion && (
          <DateInput promptText={promptText} helperText={helperText} />
        )}
        {type === QuestionType.TextResponseQuestion && (
          <TextInput promptText={promptText} helperText={helperText} />
        )}
        {type === QuestionType.NumberInput && (
          <NumberInput promptText={promptText} helperText={helperText} />
        )}
        {type === QuestionType.FileInput && (
          <FileInput promptText={promptText} helperText={helperText} />
        )}
        {type === QuestionType.DropdownQuestion && (
          <DropdownQuestion promptText={promptText} options={options} />
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <NextPreviousButton
          type={ButtonType.Previous}
          currentQuestionIdx={number}
          setCurrentQuestion={setCurrentQuestion}
          disabled={type === QuestionType.Section}
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
