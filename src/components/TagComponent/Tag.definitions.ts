/* eslint-disable autofix/no-unused-vars */
export interface TagProps {
  variant?: TagVariant;
  color?: TagColor;
  text: string;
}

export enum TagVariant {
  SMALL = "small",
  NORMAL = "normal",
  LARGE = "large",
}

export enum TagColor {
  GREEN = "green",
  YELLOW = "yellow",
  RED = "red",
  BLUE = "blue",
  GREY = "gray",
}
