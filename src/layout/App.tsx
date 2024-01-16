import styles from "./App.module.css";
import SideBar from "./SideBar/Sidebar";
import { createTestPassengerData } from "../util/test-data.util";
import { Outlet } from "react-router-dom";

const App = () => {
  // App wrapper for tabs
  console.log(createTestPassengerData());

  return (
    <div className={styles.appContainer}>
      <div className={styles.sideBarContainer}>
        <SideBar />
      </div>
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
