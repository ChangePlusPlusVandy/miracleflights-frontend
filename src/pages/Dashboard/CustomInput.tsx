import styles from "./CustomInput.module.css";
import type { ReusableInputProps } from "./CustomInput.definitions";

const CustomInput = ({
  name,
  register,
  error,
  label,
  type,
  placeholder,
}: ReusableInputProps) => {
  return (
    <div className={styles["form-field"]}>
      <div className={styles["label-and-error"]}>
        <p className={styles["label"]}>{label}</p>
        {error && <p className={styles["error-text"]}>{"(" + error + ")"}</p>}
      </div>
      <input placeholder={placeholder} type={type} {...register(name)} />
    </div>
  );
};

export default CustomInput;
