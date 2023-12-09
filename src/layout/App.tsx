import styles from "./App.module.css";
import { createTestPassengerData } from "../util/test-data.util";
import SideBar from "../components/SideBarComponent/SidebarComponent";
import { Outlet } from "react-router-dom";

const App = () => {
  // App wrapper for tabs
  console.log(createTestPassengerData());

  return (
    <div className={styles.appContainer}>
      <div className={styles.sideBarContainer}>
        <SideBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
