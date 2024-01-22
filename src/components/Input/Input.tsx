import styles from "./Input.module.css";
import type { ReusableInputProps } from "./Input.definitions";

const Input = ({
  name,
  register,
  error,
  label,
  type = "text",
  placeholder,
}: ReusableInputProps) => {
  return (
    <div className={styles["form-field"]}>
      <div className={styles["label-and-error"]}>
        {label && <p className={styles["label"]}>{label}</p>}
        {error && <p className={styles["error-text"]}>{"(" + error + ")"}</p>}
      </div>
      <input placeholder={placeholder} type={type} {...register(name)} />
    </div>
  );
};

export default Input;
