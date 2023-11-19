// src/components/Button/Button.tsx
import styles from './ButtonComponent.module.css';
// import React from 'react';
import { MoonLoader } from 'react-spinners';
import type { ButtonProps } from './ButtonComponent.definitions';

const Button = ({ variant, color, onClick, text, loading }: ButtonProps) => {
    const buttonClassName = `${styles.button} ${styles[variant]} ${styles[color]}`;

    return (
        <button className={buttonClassName} onClick={onClick} disabled={loading}>
            {loading ? <MoonLoader size={30} color="#FFFFFF" /> : text}
        </button>
    );
};

export default Button;
