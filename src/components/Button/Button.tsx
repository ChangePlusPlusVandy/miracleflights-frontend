import styles from "./Button.module.css";
import {
  ButtonVariant,
  type ButtonProps,
  ButtonColor,
} from "./Button.definitions";
import { MoonLoader } from "react-spinners";

const Button = ({
  variant = ButtonVariant.Regular,
  color = ButtonColor.Blue,
  onClick,
  text,
  type = "button",
  loading = false,
  disabled = false,
  extraStyles = {},
  textStyles = {},
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
      type={type}
    >
      <h4 style={{ ...textStyles }}>{text}</h4>
      {loading && (
        <div className={styles.spinner}>
          <MoonLoader size={loaderSize} color="#FFFFFF" />
        </div>
      )}
    </button>
  );
};

export default Button;
