import styles from "./ExampleComponent.module.css";
import { useState } from "react";
import type { ExampleComponentProps } from "./ExampleComponent.definitions";

/**
 * Example component - a simple component that increments a number by a specified amount
 *
 * @prop {number} incrementAmount - the amount to increment the number by, defaults to 1 if not specified
 */
const ExampleComponent = ({ incrementAmount = 1 }: ExampleComponentProps) => {
  const [number, setNumber] = useState<number>(0);

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.exampleSubtitle}>
        Hit the button to increment the number by {incrementAmount}
      </div>
      <div className={styles.exampleValueDisplay}>Current number: {number}</div>
      <div>
        <button
          onClick={() => setNumber(number + incrementAmount)}
          className={styles.exampleButtonBlue}
        >
          Increment
        </button>
        <button
          onClick={() => setNumber(0)}
          className={styles.exampleButtonRed}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ExampleComponent;
