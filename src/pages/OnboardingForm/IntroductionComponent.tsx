import styles from "./styles/IntroductionComponent.module.css";
import miracleFlightsLogo from "../../assets/MiracleFlightsLogo.png";

// interface IntroductionComponentProps {}

const IntroductionComponent = () => {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.formTitle}>
        Child Medical Flight Request Application
      </h1>
      <div className={styles.logoContainer}>
        <img src={miracleFlightsLogo} alt="logo" />
      </div>
      <h3 className={styles.introText}>
        Welcome to the Miracle Flights Medical Flight Request Application Form.
      </h3>
      <p className={styles.bodyText}>
        Information collected will be used by our staff to review your request,
        and if approved, coordinate travel on your behalf. All data provided
        will be kept in strict confidence and only used for this purpose. Before
        completing our application, please answer the questions below to see if
        you qualify for our program services.
      </p>
    </div>
  );
};

export default IntroductionComponent;
