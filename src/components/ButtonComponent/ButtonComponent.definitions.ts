/* eslint-disable autofix/no-unused-vars */
export interface ButtonProps {
  variant: "Compact" | "Regular" | "Large";
  color: ButtonColors;
  onClick: () => void;
  text: string;
  loading: boolean;
  disabled: boolean;
}

export enum ButtonVariants {
  Compact = "Compact",
  Regular = "Regular",
  Large = "Large",
}

export enum ButtonColors {
  Blue = "Blue",
  Yellow = "Yellow",
  Green = "Green",
  Grey = "Grey",
  Red = "Red",
  Black = "Black",
}
