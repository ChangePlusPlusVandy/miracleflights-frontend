import ExampleComponent from "../ExampleComponent";
import { render, fireEvent } from "@testing-library/react";

/**************************EXAMPLE COMPONENT TESTING SUITE*******************************/
describe("ExampleComponent Tests", () => {
  /**************************FIRST TEST*******************************/
  test("Test example component with no props (default value for increment)", () => {
    const component = render(<ExampleComponent />);

    // Check that the component renders
    expect(component).toBeTruthy();

    // Check that component has the correct subtitle
    const subtitle = component.getByText(
      "Hit the button to increment the number by 1",
    );
    expect(subtitle).toBeTruthy();

    // Check that component has the correct value display
    const valueDisplay = component.getByText("Current number: 0");
    expect(valueDisplay).toBeTruthy();

    // Get the increment and reset buttons
    const incrementButton = component.getByText("Increment");
    const resetButton = component.getByText("Reset");

    // Check that the increment button increments the number
    fireEvent.click(incrementButton);
    expect(component.getByText("Current number: 1")).toBeTruthy();

    // Check that the reset button resets the number
    fireEvent.click(resetButton);
    expect(component.getByText("Current number: 0")).toBeTruthy();
  });

  /**************************SECOND TEST*******************************/
  test("Test example component with props", () => {
    const component = render(<ExampleComponent incrementAmount={2} />);

    // Check that the component renders
    expect(component).toBeTruthy();

    // Check that component has the correct subtitle
    const subtitle = component.getByText(
      "Hit the button to increment the number by 2",
    );
    expect(subtitle).toBeTruthy();

    // Check that component has the correct value display
    const valueDisplay = component.getByText("Current number: 0");
    expect(valueDisplay).toBeTruthy();

    // Get the increment and reset buttons
    const incrementButton = component.getByText("Increment");
    const resetButton = component.getByText("Reset");

    // Check that the increment button increments the number
    fireEvent.click(incrementButton);
    expect(component.getByText("Current number: 2")).toBeTruthy();

    // Check that the reset button resets the number
    fireEvent.click(resetButton);
    expect(component.getByText("Current number: 0")).toBeTruthy();
  });
});
