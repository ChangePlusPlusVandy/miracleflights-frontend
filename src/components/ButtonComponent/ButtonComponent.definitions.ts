// src/components/Button/Button.definitions.ts
import type { ButtonColors } from '../../constants/constants';
import type { ButtonVariant } from '../../constants/constants';

export interface ButtonProps {
    variant: ButtonVariant;
    color: ButtonColors;
    onClick: () => void;
    text: string;
    loading: boolean;
    disabled?: boolean;
  }
