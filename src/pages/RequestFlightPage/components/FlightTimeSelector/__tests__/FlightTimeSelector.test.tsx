import FlightTimeSelector from "../FlightTimeSelector";
import { render, fireEvent } from "@testing-library/react";
import type { FlightInfoType } from "../FlightTimeSelector.definitions";

describe("FlightTimeSelector Tests", () => {
  it("renders FlightTimeSelector component correctly", () => {
    const component = render(
      <FlightTimeSelector
        setStep={() => {}}
        setFlightInfo={() => {}}
        defaultFlightInfo={{} as FlightInfoType}
      />,
    );

    expect(component.getByText("Request a Flight")).toBeTruthy();
    expect(
      component.getByText(
        "Choose two of the nearest airports to you and your destination.",
      ),
    ).toBeTruthy();
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
    const component = render(
      <FlightTimeSelector
        setStep={() => {}}
        setFlightInfo={() => {}}
        defaultFlightInfo={{} as FlightInfoType}
      />,
    );
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

  it("disables submit button when required fields are empty", () => {
    const component = render(
      <FlightTimeSelector
        setStep={() => {}}
        setFlightInfo={() => {}}
        defaultFlightInfo={{} as FlightInfoType}
      />,
    );
    const submitButton = component.getByText("Submit") as HTMLButtonElement;

    fireEvent.click(submitButton);

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
  });
});
