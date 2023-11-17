import styles from "./PersonalInfo.module.css";
import { useState } from "react";

const PersonalInfo = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["One", "Two", "Three", "Four", "Five"];

  return (
    <div className={styles.tabs}>

      <div className={styles.tabList}>
        {tabs.map((value, index) => (
          <button
            key={value}
            type="button"
            className={index === tabIndex ? styles.tabSelected : styles.tab}
            onClick={() => {
              setTabIndex(index);
            }}
          >
            {value}
          </button>
        ))}
      </div>

      {tabIndex === 0 && <div className={styles.tabPanel}>ONE</div>}
      {tabIndex === 1 && <div className={styles.tabPanel}>TWO</div>}
      {tabIndex === 2 && <div className={styles.tabPanel}>THREE</div>}
      {tabIndex === 3 && <div className={styles.tabPanel}>FOUR</div>}
      {tabIndex === 4 && <div className={styles.tabPanel}>FIVE</div>}
    </div>
  );
};

export default PersonalInfo;
