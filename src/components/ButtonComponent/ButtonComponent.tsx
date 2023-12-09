import styles from "./ButtonComponent.module.css";
import {
  ButtonVariants,
  type ButtonProps,
} from "./ButtonComponent.definitions";
import { MoonLoader } from "react-spinners";

const Button = ({
  variant,
  color,
  onClick,
  text,
  loading,
  disabled,
}: ButtonProps) => {
  const buttonClassName = `${styles.button} ${styles[variant]} ${styles[color]}`;
  const loaderSize =
    variant === ButtonVariants.Compact
      ? 15
      : variant === ButtonVariants.Regular
      ? 20
      : 25;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {text}
      {loading && (
        <div className={styles.spinner}>
          <MoonLoader size={loaderSize} color="#FFFFFF" />
        </div>
      )}
    </button>
  );
};

export default Button;
