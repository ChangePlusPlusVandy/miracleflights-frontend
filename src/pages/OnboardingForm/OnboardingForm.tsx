import styles from "./OnboardingForm.module.css";
import MultipleChoiceSelector from "./MultipleChoiceSelector";
import miracleFlightsLogo from "../../assets/MiracleFlightsLogo.png";

const OnboardingForm = () => {
  // Passengers tab
  console.log("OnboardingFrom");

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.headerContainer}>
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
        </div>
        <hr className={styles.formDivider} />
        <div className={styles.questionsContainer}>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
