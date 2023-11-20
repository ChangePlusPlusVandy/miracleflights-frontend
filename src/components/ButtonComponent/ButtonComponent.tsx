import styles from './ButtonComponent.module.css';
import { MoonLoader } from 'react-spinners';
import type { ButtonProps } from './ButtonComponent.definitions';

const Button = ({ variant, color, onClick, text, loading, disabled }: ButtonProps) => {
  const buttonClassName = `${styles.button} ${styles[variant]} ${styles[color]} ${loading ? styles.loading : ''} ${disabled ? styles.disabled : ''}`;

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled || loading}>
      <span className={styles.buttonText}>{text}</span>
      {loading && (
        <div className={styles.spinnerContainer}>
          <MoonLoader size={30} color="#FFFFFF"/>
        </div>
      )}
    </button>
  );
};

export default Button;