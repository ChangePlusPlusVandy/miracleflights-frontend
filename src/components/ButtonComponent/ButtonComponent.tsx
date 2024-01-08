import styles from "./ButtonComponent.module.css";
import {
  ButtonVariant,
  type ButtonProps,
  ButtonColor,
} from "./ButtonComponent.definitions";
import { MoonLoader } from "react-spinners";

const Button = ({
  variant = ButtonVariant.Regular,
  color = ButtonColor.Blue,
  onClick,
  text,
  loading = false,
  disabled = false,
  extraStyles = {},
}: ButtonProps) => {
  const buttonClassName = `${styles.button} ${styles[variant]} ${styles[color]}`;
  const loaderSize =
    variant === ButtonVariant.Compact
      ? 15
      : variant === ButtonVariant.Regular
      ? 20
      : 25;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...extraStyles }}
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
