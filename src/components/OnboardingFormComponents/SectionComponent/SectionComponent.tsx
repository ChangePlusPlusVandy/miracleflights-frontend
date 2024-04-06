import styles from "./SectionComponent.module.css";
import miracleFlightsLogo from "../../../../src/assets/MiracleFlightsLogo.png";

interface SectionComponentProps {
  sectionTitle: string;
  introText: string;
  promptText?: string;
}

const SectionComponent = ({
  sectionTitle,
  introText,
  promptText,
}: SectionComponentProps) => {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.formTitle}>{sectionTitle}</h1>
      <div className={styles.logoContainer}>
        <img src={miracleFlightsLogo} alt="logo" />
      </div>
      <h3 className={styles.introText}>{introText}</h3>
      <p className={styles.bodyText}>{promptText}</p>
    </div>
  );
};

export default SectionComponent;
