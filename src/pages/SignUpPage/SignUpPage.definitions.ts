/* eslint-disable autofix/no-unused-vars */
export interface SignUpInput {
  email: string;
  password: string;
  confirmPassword: string;
}

export enum SignUpInputName {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

export interface SignUpCodeInput {
  code: string;
}

export enum SignUpCodeName {
  CODE = "code",
}
