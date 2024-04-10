import LoginPage from "../LoginPage";
import { render } from "@testing-library/react";

// mock the router provider
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// mock clerk
//  const { signIn, setActive, isLoaded } = useSignIn();
jest.mock("@clerk/clerk-react", () => ({
  useSignIn: jest.fn(() => ({
    signIn: jest.fn(),
    setActive: jest.fn(),
    isLoaded: true,
  })),
}));

/**************************LOGIN PAGE TESTING SUITE*******************************/
describe("Login Page Tests", () => {
  /**************************SNAPSHOT TEST*******************************/
  test("Renders the Login Page snapshot correctly", () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
