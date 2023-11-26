import Passenger from "../Passenger";
import { render } from "@testing-library/react";

describe("Passenger", () => {
  it("should render correctly", () => {
    const component = render(
      <Passenger
        firstName="John"
        lastName="Doe"
        email="test@test.com"
        relationship="Father"
        userType="Adult"
        dateOfBirth="01/01/1990"
      />,
    );
    expect(component).toBeTruthy();

    expect(component.getByText("Passenger")).toBeTruthy();
    expect(component.getByText("John Doe")).toBeTruthy();
    expect(component.getByText("DOB:")).toBeTruthy();
    expect(component.getByText("33")).toBeTruthy();
    expect(component.getByText("Relationship:")).toBeTruthy();
    expect(component.getByText("Father")).toBeTruthy();
    expect(component.getByText("View All Information")).toBeTruthy();
  });
});
