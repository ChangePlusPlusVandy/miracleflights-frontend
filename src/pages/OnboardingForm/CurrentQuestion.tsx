import { QuestionType } from "./FormQuestionsList";
import IntroductionComponent from "./IntroductionComponent";
import MultipleChoiceSelector from "./MultipleChoiceSelector";
import MultipleSelect from "./MultipleSelect";
import NumberInput from "./NumberInput";

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
  options = [],
}: CurrentQuestionProps) => {
  console.log({ number, promptText, type, options });
  return (
    <div>
      {number !== 0 && number}
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
      {/** Would perform some logic that depending on the type of question, imports/uses that type of component */}
    </div>
  );
};

export default CurrentQuestion;
