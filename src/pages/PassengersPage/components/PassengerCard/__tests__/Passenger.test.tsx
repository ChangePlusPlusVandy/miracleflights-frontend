import { getAge } from "../../../../../util/date.util";
import { createTestPassengerData } from "../../../../../util/test-data.util";
import PassengerCard from "../PassengerCard";
import { render } from "@testing-library/react";

describe("Passenger", () => {
  it("should render correctly", () => {
    const mockProps = {
      passenger: createTestPassengerData(),
    };

    const component = render(<PassengerCard {...mockProps} />);
    expect(component).toBeTruthy();

    expect(
      component.getByText(
        mockProps.passenger.fields["First Name"] +
          " " +
          mockProps.passenger.fields["Last Name"],
      ),
    ).toBeTruthy();
    expect(
      component.getByText(
        "(" +
          getAge(mockProps.passenger.fields["Date of Birth"]).toString() +
          ")",
      ),
    ).toBeTruthy();
    expect(component.getByText("Medical Condition:")).toBeTruthy();
  });
});
