import type { ReactElement } from "react";

export interface ModalProps {
  header?: string;
  body?: ReactElement;
  large?: boolean;
  action?: () => void;
}
