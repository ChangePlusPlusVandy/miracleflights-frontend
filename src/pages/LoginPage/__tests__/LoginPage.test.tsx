import LoginPage from "../LoginPage";
import { render } from "@testing-library/react";

// mock the router provider
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

/**************************EXAMPLE PAGE TESTING SUITE*******************************/
describe("ExamplePage Tests", () => {
  /**************************SNAPSHOT TEST*******************************/
  test("Renders the ExamplePage snapshot correctly", () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
