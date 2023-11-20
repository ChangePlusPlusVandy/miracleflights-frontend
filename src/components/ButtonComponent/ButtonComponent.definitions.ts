// src/components/Button/Button.definitions.ts
import type { ButtonColors } from '../../constants/constants';

export interface ButtonProps {
    variant: 'Compact' | 'Regular' | 'Large';
    color: ButtonColors;
    onClick: () => void;
    text: string;
    loading: boolean;
}
