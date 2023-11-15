import { useState, useEffect } from 'react';
import styles from './PersonalInfo.module.css'
import inter from './'

const PersonalInfo = () => {
  // Personal info tab
  console.log("PersonalInfo");
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["One", "Two", "Three", "Four", "Five"];

  return (
    <div className={styles.tabs}>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inter"></link>
      <div className={styles.tabList}>
        {tabs.map((value, index) => (
          <button type="button" className={index===tabIndex-1? styles.tabSelected: styles.tab} onClick={() => {
            setTabIndex(index + 1)
          }}>{value}</button>
        ))}
      </div>

      {tabIndex === 1 && <div className={styles.tabPanel}>ONE</div>}
      {tabIndex === 2 && <div className={styles.tabPanel}>TWO</div>}
      {tabIndex === 3 && <div className={styles.tabPanel}>THREE</div>}
      {tabIndex === 4 && <div className={styles.tabPanel}>FOUR</div>}
      {tabIndex === 5 && <div className={styles.tabPanel}>FIVE</div>}
    </div>

  );
};

export default PersonalInfo;
