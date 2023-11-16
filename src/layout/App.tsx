import styles from "./App.module.css";
import { createTestPassengerData } from "../util/test-data.util";

const App = () => {
  // App wrapper for tabs
  console.log(createTestPassengerData());

  return <div className={styles.appContainer}>Hello, world!</div>;
};

export default App;
