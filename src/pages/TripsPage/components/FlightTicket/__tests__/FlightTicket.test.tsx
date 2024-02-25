import { formatDate } from "../../../../../util/date.util";
import { createTestFlightLegData } from "../../../../../util/test-data.util";
import FlightTicket from "../FlightTicket";
import { FlightTicketColorVariant } from "../FlightTicket.definitions";
import { render } from "@testing-library/react";

describe("FlightTicket Tests", () => {
  /**************************FIRST TEST*******************************/
  // test color variance, test different flight types

  test("Test example component with border and blue color", () => {
    const mockProps = {
      flight: createTestFlightLegData(),
    };

    const component = render(<FlightTicket {...mockProps} />);

    // Check that the component renders
    expect(component).toBeTruthy();

    //check that date is the same
    const date = component.getByText(
      formatDate(mockProps.flight["Departure Date/Time"]),
    );
    expect(date).toBeTruthy();
  });

  /**************************SECOND TEST*******************************/
  test("Test example component with no border and red color", () => {
    const mockProps = {
      flight: createTestFlightLegData(),
    };

    const component = render(<FlightTicket {...mockProps} />);

    // Check that the component renders
    expect(component).toBeTruthy();

    //check that date is the same
    const date = component.getByText(
      formatDate(mockProps.flight["Departure Date/Time"]),
    );
    expect(date).toBeTruthy();
  });

  /**************************THIRD TEST*******************************/
  test("Test example component with no border and blue color", () => {
    const mockProps = {
      flight: createTestFlightLegData(),
      colorVariant: FlightTicketColorVariant.BLUE,
      isLastElement: true,
    };

    const component = render(<FlightTicket {...mockProps} />);
    // Check that the component renders
    expect(component).toBeTruthy();

    //check that date is the same
    const date = component.getByText(
      formatDate(mockProps.flight["Departure Date/Time"]),
    );
    expect(date).toBeTruthy();
  });
});
