// src/components/Button/Button.tsx
import styles from './ButtonComponent.module.css';
// import React from 'react';
import type { ButtonProps } from './ButtonComponent.definitions';

const Button = ({ variant, color, onClick, text, loading }: ButtonProps) => {
    const buttonClassName = `${styles.button} ${styles[variant]} ${styles[color]}`;

    return (
        <button className={buttonClassName} onClick={onClick} disabled={loading}>
            {loading ? 'Loading...' : text}
        </button>
    );
};

export default Button;
