import FlightTimeSelector from "../FlightTimeSelector";
import { render, fireEvent } from "@testing-library/react";

describe("FlightTimeSelector Tests", () => {
  it("renders FlightTimeSelector component correctly", () => {
    const component = render(<FlightTimeSelector />);

    expect(component.getByText("Flight Selector")).toBeTruthy();
    expect(component.getByText("Select your flight")).toBeTruthy();
    expect(
      component.getAllByPlaceholderText(
        "Primary Selection",
      )[0] as HTMLInputElement,
    ).toBeTruthy();
    expect(
      component.getAllByPlaceholderText(
        "Alternate Selection",
      )[0] as HTMLInputElement,
    ).toBeTruthy();
  });

  it("updates departure airports on input change", () => {
    const component = render(<FlightTimeSelector />);
    const primaryInput = component.getAllByPlaceholderText(
      "Primary Selection",
    )[0] as HTMLInputElement;
    const alternateInput = component.getAllByPlaceholderText(
      "Alternate Selection",
    )[0] as HTMLInputElement;

    fireEvent.change(primaryInput, { target: { value: "JFK" } });
    fireEvent.change(alternateInput, { target: { value: "LGA" } });

    expect(primaryInput.value).toBe("JFK");
    expect(alternateInput.value).toBe("LGA");
  });

  it("toggles oneWay checkbox", () => {
    const component = render(<FlightTimeSelector />);
    const oneWayCheckbox = component.getAllByTestId(
      "oneWay",
    )[0] as HTMLInputElement;

    fireEvent.click(oneWayCheckbox);

    expect(oneWayCheckbox.checked).toBe(true);
  });

  it("disables submit button when required fields are empty", () => {
    const component = render(<FlightTimeSelector />);
    const submitButton = component.getByText("Submit") as HTMLButtonElement;

    fireEvent.click(submitButton);

    // Ensure that the submit button is initially disabled
    expect(submitButton.disabled).toBe(true);

    // Fill in some fields
    fireEvent.change(
      component.getAllByPlaceholderText(
        "Primary Selection",
      )[0] as HTMLInputElement,
      { target: { value: "JFK" } },
    );
    fireEvent.change(
      component.getAllByPlaceholderText(
        "Alternate Selection",
      )[0] as HTMLInputElement,
      { target: { value: "LGA" } },
    );
    fireEvent.change(
      component.getAllByPlaceholderText(
        "Primary Selection",
      )[1] as HTMLInputElement,
      { target: { value: "ORD" } },
    );
    fireEvent.change(
      component.getAllByPlaceholderText(
        "Alternate Selection",
      )[1] as HTMLInputElement,
      { target: { value: "DFW" } },
    );

    // Ensure that the submit button is enabled after filling in required fields
    expect(submitButton.disabled).toBe(false);
  });
});
