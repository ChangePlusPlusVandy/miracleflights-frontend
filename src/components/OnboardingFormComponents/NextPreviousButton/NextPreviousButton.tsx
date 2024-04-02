import styles from "./NextPreviousButton.module.css";

export enum ButtonType {
  // eslint-disable-next-line autofix/no-unused-vars
  Next,
  // eslint-disable-next-line autofix/no-unused-vars
  Previous,
}

interface NextPreviousButtonProps {
  type: ButtonType;
  currentQuestionIdx: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
}

const NextPreviousButton = ({
  type,
  currentQuestionIdx,
  setCurrentQuestion,
  disabled,
}: NextPreviousButtonProps) => {
  let className;
  let idxShift: number; // either +1 or -1 depending on if it's an next or previous
  if (disabled) {
    className =
      type === ButtonType.Next
        ? styles.disabledNextButton
        : styles.disabledPreviousButton;
    idxShift = 0;
  } else {
    className =
      type === ButtonType.Next ? styles.nextButton : styles.previousButton;
    idxShift = type === ButtonType.Next ? 1 : -1;
  }

  return (
    <div>
      <button
        type="button"
        className={className}
        onClick={() => setCurrentQuestion(currentQuestionIdx + idxShift)}
        disabled={disabled}
      >
        {!disabled && type === ButtonType.Next && "Next"}
        {!disabled && type === ButtonType.Previous && "Previous"}
      </button>
    </div>
  );
};

export default NextPreviousButton;
