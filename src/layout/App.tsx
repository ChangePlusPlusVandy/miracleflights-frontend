import styles from "./App.module.css";
import SideBar from "./SideBar/Sidebar";
import { Outlet } from "react-router-dom";

const App = () => {
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
