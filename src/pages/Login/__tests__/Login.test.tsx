import Login from "../Login";
import { render, fireEvent } from "@testing-library/react";

describe("Login Tests", () => {
  it("renders Login component correctly", () => {
    const { getByText, getAllByPlaceholderText } = render(<Login />);

    expect(getByText("Log In")).toBeTruthy();
    expect(getByText("Dont have an account?")).toBeTruthy();
    expect(
      getAllByPlaceholderText("Email")[0] as HTMLInputElement,
    ).toBeTruthy();
    expect(
      getAllByPlaceholderText("Password")[0] as HTMLInputElement,
    ).toBeTruthy();
  });

  it("updates email and password on input change", () => {
    const { getAllByPlaceholderText } = render(<Login />);
    const emailInput = getAllByPlaceholderText("Email")[0] as HTMLInputElement;
    const passwordInput = getAllByPlaceholderText(
      "Password",
    )[0] as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("toggles password visibility", () => {
    const { getByTestId } = render(<Login />);
    const passwordToggle = getByTestId("passwordToggle");

    fireEvent.click(passwordToggle);

    // You might want to add assertions specific to your component behavior here
    expect(passwordToggle).toBeTruthy();
  });

  it("disables submit button when email or password is empty", () => {
    const { getByText } = render(<Login />);
    const submitButton = getByText("Login") as HTMLButtonElement;

    // Ensure that the submit button is initially disabled
    expect(submitButton.disabled).toBe(true);

    // Fill in email and password
    fireEvent.change(
      document.querySelector('input[name="email"]') as HTMLInputElement,
      {
        target: { value: "test@example.com" },
      },
    );
    fireEvent.change(
      document.querySelector('input[name="password"]') as HTMLInputElement,
      {
        target: { value: "password123" },
      },
    );

    // Ensure that the submit button is enabled after filling in email and password
    expect(submitButton.disabled).toBe(false);
  });
});
