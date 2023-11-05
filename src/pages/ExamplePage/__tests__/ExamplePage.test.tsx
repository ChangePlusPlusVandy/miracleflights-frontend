import ExamplePage from "../ExamplePage";
import { render } from "@testing-library/react";

/**************************EXAMPLE PAGE TESTING SUITE*******************************/
describe("ExamplePage Tests", () => {
  /**************************SNAPSHOT TEST*******************************/
  test("Renders the ExamplePage snapshot correctly", () => {
    const { container } = render(<ExamplePage />);
    expect(container).toMatchSnapshot();
  });
});
