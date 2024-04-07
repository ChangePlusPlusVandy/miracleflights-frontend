/* eslint-disable autofix/no-unused-vars */
export interface SignUpInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export enum SignUpInputName {
  EMAIL = "email",
  PASSWORD = "password",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  CONFIRM_PASSWORD = "confirmPassword",
}

export interface SignUpCodeInput {
  code: string;
}

export enum SignUpCodeName {
  CODE = "code",
}
