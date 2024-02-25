import { createTestPassengerData } from "../../../../../util/test-data.util";
import PassengerCard from "../PassengerCard";
import { render } from "@testing-library/react";

describe("Passenger Card", () => {
  it("should render correctly", () => {
    const mockProps = {
      passenger: createTestPassengerData(),
    };

    const component = render(<PassengerCard {...mockProps} />);
    expect(component).toBeTruthy();

    expect(component.getByText(mockProps.passenger["Full Name"])).toBeTruthy();
    expect(
      component.getByText(mockProps.passenger["Date of Birth"].split("T")[0]),
    ).toBeTruthy();
  });
});
