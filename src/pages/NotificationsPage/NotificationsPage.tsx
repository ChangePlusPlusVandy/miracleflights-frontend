import styles from "./NotificationsPage.module.css";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import React, { useEffect } from "react";

const NotificationsPage = () => {
  const { setCurrentTab } = useNavigationContext();

  useEffect(() => {
    setCurrentTab(Tabs.NOTIFICATIONS);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.toggleSection}>
          <span>Enable real-time notifications</span>
          <div className={styles.toggleSwitch}>
            <input type="checkbox" id="realTimeToggle" />
            <label htmlFor="realTimeToggle" />
          </div>
        </div>

        <h1 className={styles.header}>Notifications</h1>

        <p className={styles.subHeader}>
          Stay updated with your latest notifications.
        </p>
      </div>

      <div className={styles.notificationsContent} />
    </div>
  );
};

export default NotificationsPage;
