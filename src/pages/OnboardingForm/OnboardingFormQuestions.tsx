export enum QuestionType {
  YesNoQuestion = "yesNoQuestion",
  MultipleChoiceQuestion = "multipleChoiceQuestion",
  MultiSelectQuestion = "multiSelectQuestion",
  DateQuestion = "dateQuestion",
  TextResponseQuestion = "textResponseQuestion",
  IntroToForm = "introToForm",
}

export interface Question {
  id: number;
  type: QuestionType;
  promptText: string;
  answer?: string;
}

export const questions: Question[] = [
  {
    id: 0,
    type: QuestionType.IntroToForm,
    promptText:
      "Information collected will be used by our staff to review your request, and if approved, coordinate travel on your behalf. All data provided will be kept in strict confidence and only used for this purpose. Before completing our application, please answer the questions below to see if you qualify for our program services.",
  },
  {
    id: 1,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Will the patient be 17 years old or younger at the time of the medical appointment that you need help traveling to?",
  },
  {
    id: 2,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Can the patient/applicant and all accompanying passengers safely travel on a commercial airplane?",
  },
  {
    id: 3,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Can the patient/applicant and all accompanying passengers safely travel on a commercial airplane?",
  },
  {
    id: 4,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Do you currently live in the U.S. AND do you have a confirmed medical appointment scheduled requiring domestic U.S. air travel? (We do not provide international travel in our out of the U.S.)",
  },
  {
    id: 5,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Is your requested departure flight date at least 14 days away?",
  },
  {
    id: 6,
    type: QuestionType.MultiSelectQuestion,
    promptText:
      "What type(s) of government assistance are you currently receiving? Please select all that apply. You will need to upload proof of government assistance at the end of this application. If you are not currently receiving government assistance, please check “None”.",
  },
  {
    id: 7,
    type: QuestionType.YesNoQuestion,
    promptText:
      "Do you have your IRS 1040 documents from last year to upload on this application as proof of household income and household size?",
  },
  {
    id: 8,
    type: QuestionType.TextResponseQuestion,
    promptText: "How many people are in your household?",
  },
  {
    id: 9,
    type: QuestionType.YesNoQuestion,
    promptText: "What is your approximate gross household income?",
  },
];
