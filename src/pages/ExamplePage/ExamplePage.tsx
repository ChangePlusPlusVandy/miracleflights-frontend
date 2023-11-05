import styles from "./ExamplePage.module.css";
import ExampleComponent from "../../components/ExampleComponent/ExampleComponent";

const ExamplePage = () => {
  return (
    <div className={styles.exampleContainer}>
      <h1 className={styles.exampleTitle}>Example Page</h1>
      <ExampleComponent incrementAmount={2} />
    </div>
  );
};

export default ExamplePage;
