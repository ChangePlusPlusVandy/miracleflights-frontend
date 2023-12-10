import styles from "./styles/OnboardingForm.module.css";
import { questions } from "./FormQuestionsList";
import QuestionContainer from "./QuestionContainer";
import CurrentQuestion from "./CurrentQuestion";
import React from "react";

const OnboardingForm = () => {
  // Passengers tab
  // have a state that manages the current question on the screen
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.scrollableContainer}>
          {questions.map((q, idx) => {
            return (
              <QuestionContainer
                number={idx}
                promptText={q.promptText}
                key={idx}
                backgroundColor={idx % 2 === 0 ? "#fafbfc" : "#f0f0f0"}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
              />
            );
          })}
        </div>
        <hr className={styles.formDivider} />
        <CurrentQuestion
          number={currentQuestion}
          promptText={questions[currentQuestion]?.promptText}
          type={questions[currentQuestion]?.type}
          setCurrentQuestion={setCurrentQuestion}
        />

        {/* <div className={styles.headerContainer}>
          <h1 className={styles.formTitle}>
            Child Medical Flight Request Application
          </h1>
          <div className={styles.logoContainer}>
            <img src={miracleFlightsLogo} alt="logo" />
          </div>
          <h3 className={styles.introText}>
            Welcome to the Miracle Flights Medical Flight Request Application
            Form.
          </h3>
          <p className={styles.bodyText}>
            Information collected will be used by our staff to review your
            request, and if approved, coordinate travel on your behalf. All data
            provided will be kept in strict confidence and only used for this
            purpose. Before completing our application, please answer the
            questions below to see if you qualify for our program services.
          </p>
        </div> */}
        {/* <hr className={styles.formDivider} /> */}
        {/* <div className={styles.questionsContainer}>
          <form>
            <MultipleChoiceSelector
              options={["Yes", "No"]}
              promptText="Will the patient be 17 years old or younger at the time of the
                medical appointment that you need help traveling to?"
              backgroundColor="#fafbfc"
            />
            <MultipleChoiceSelector
              options={["Yes", "No"]}
              promptText="Can the patient/applicant and all accompanying passengers safely travel on a commercial airplane?"
            />
            <MultipleChoiceSelector
              options={["Yes", "No"]}
              promptText="Does the patient/applicant and all accompanying passengers have the required identification and/or documentation to get through TSA and travel on a commercial airplane?"
              backgroundColor="#fafbfc"
            />
            <MultipleChoiceSelector
              options={["Yes", "No"]}
              promptText="Do you currently live in the U.S. AND do you have a confirmed medical appointment scheduled requiring domestic U.S. air travel? (We do not provide international travel in our out of the U.S.)"
            />
            <MultipleChoiceSelector
              options={["Yes", "No"]}
              promptText="Is your requested departure flight date at least 14 days away?"
              backgroundColor="#fafbfc"
            />
            <MultipleSelect
              options={[
                "SNAP (Supplemental Nutritional Assistance Program)",
                "TANF (Temporary Aid for Needy Families)",
                "Medicaid (This refers exclusively to the official Medicaid program and does not include the receipt of government subsidies through the Affordable Care Act)",
                "SSI (Supplemental Security Income): Note: Only check this box if you and/or a member of your household receive SSI and not any other type or form of benefits through the Social Security Administration.",
                "Housing Choice Voucher Program (Section 8)",
                "Headstart/Early Head Start",
                "WIC (Women, Infants, and Children)",
                "Unemployment (Note: Only check this box if unemployment is your household's ONLY form of income earned or unearned.)",
                "None",
              ]}
              promptText="What type(s) of government assistance are you currently receiving? Please select all that apply. You will need to upload proof of government assistance at the end of this application. If you are not currently receiving government assistance, please check “None”."
            />
            <MultipleChoiceSelector
              options={["Yes", "No"]}
              promptText="Do you have your IRS 1040 documents from last year to upload on this application as proof of household income and household size?"
              backgroundColor="#fafbfc"
            />
            <NumberInput promptText="How many people are in your household? Include yourself, your spouse, and any dependents. Must be verified with submitted IRS tax documentation." />
            <NumberInput
              promptText="What is your approximate gross household income? Total revenue earned by all income earners in the household. Will be verified with submitted IRS tax documentation."
              backgroundColor="#fafbfc"
            />
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default OnboardingForm;
