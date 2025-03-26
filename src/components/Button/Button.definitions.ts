/* eslint-disable autofix/no-unused-vars */
export interface ButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  extraStyles?: React.CSSProperties;
  textStyles?: React.CSSProperties;
}

export enum ButtonVariant {
  Compact = "Compact",
  Regular = "Regular",
  Large = "Large",
  Login = "Login",
  Signup = "Signup",
  Continue = "Continue",
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
