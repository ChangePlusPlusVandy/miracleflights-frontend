import styles from "./styles/OnboardingForm.module.css";

const OnboardingForm = () => {
  return (
    <div>
      <iframe
        id="JotFormIFrame-232016153645146"
        title="Child Flight Request Application [Rob July 2023 Edit]"
        allow="geolocation; microphone; camera; fullscreen"
        src="https://form.jotform.com/232016153645146"
        className={styles.jotform}
      />
      <script src="https://form.jotform.com/s/umd/latest/for-form-embed-handler.js" />
      <script>
        window.jotformEmbedHandler(&quot;iframe[id=&quot;JotFormIFrame-232016153645146]&apos;&quot;,
        &quot;https://form.jotform.com/&quot;)
      </script>
    </div>
  );
};

export default OnboardingForm;

// import styles from "./styles/OnboardingForm.module.css";
// import { questions } from "./FormQuestionsList";
// import QuestionContainer from "./QuestionContainer";
// import CurrentQuestion from "./CurrentQuestion";
// import React from "react";

// const OnboardingForm = () => {
//   // Passengers tab
//   // have a state that manages the current question on the screen
//   const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
//   return (
//     <div className={styles.pageContainer}>
//       <div className={styles.formContainer}>
//         <div className={styles.scrollableContainer}>
//           {questions.map((q, idx) => {
//             return (
//               <QuestionContainer
//                 number={idx}
//                 promptText={q.promptText}
//                 type={q.type}
//                 key={idx}
//                 backgroundColor={idx % 2 === 0 ? "#fafbfc" : "#f0f0f0"}
//                 setCurrentQuestion={setCurrentQuestion}
//                 currentQuestion={currentQuestion}
//                 sectionTitle={q.sectionTitle}
//               />
//             );
//           })}
//         </div>
//         <hr className={styles.formDivider} />
//         <CurrentQuestion
//           number={currentQuestion}
//           promptText={questions[currentQuestion]?.promptText}
//           type={questions[currentQuestion]?.type}
//           setCurrentQuestion={setCurrentQuestion}
//           options={questions[currentQuestion].options}
//           helperText={questions[currentQuestion]?.helperText}
//           sectionTitle={questions[currentQuestion]?.sectionTitle}
//           introText={questions[currentQuestion]?.introText}
//         />
//       </div>
//     </div>
//   );
// };
