/* eslint-disable autofix/no-unused-vars */
export interface ButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  onClick?: () => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  extraStyles?: React.CSSProperties;
  textStyles?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

export enum ButtonVariant {
  Compact = "Compact",
  Regular = "Regular",
  Large = "Large",
}

export enum ButtonColor {
  Blue = "Blue",
  Yellow = "Yellow",
  Green = "Green",
  Grey = "Grey",
  Red = "Red",
  Black = "Black",
  White = "White",
}
