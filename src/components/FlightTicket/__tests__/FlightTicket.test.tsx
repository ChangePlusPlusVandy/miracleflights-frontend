import { formatDate } from "../../../util/date.util";
import { formatAirlineString } from "../../../util/flight.util";
import { createTestFlightLegData } from "../../../util/test-data.util";
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
      formatDate(mockProps.flight.fields["Departure Date/Time"]),
    );
    expect(date).toBeTruthy();

    //check that the departing airport is the same
    const departingAirport = component.getByText(
      mockProps.flight.fields["Departure Airport"],
    );
    expect(departingAirport).toBeTruthy();

    const arrivingAirport = component.getByText(
      mockProps.flight.fields["Arrival Airport"],
    );
    expect(arrivingAirport).toBeTruthy();

    const airline = component.getByText(
      formatAirlineString(
        mockProps.flight.fields.Airline.toLocaleUpperCase(),
      ).trim(),
    );
    expect(airline).toBeTruthy();

    const legType = component.getByText(
      mockProps.flight.fields["Leg Type"].toLocaleUpperCase(),
    );
    expect(legType).toBeTruthy();
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
      formatDate(mockProps.flight.fields["Departure Date/Time"]),
    );
    expect(date).toBeTruthy();

    //check that the departing airport is the same
    const departingAirport = component.getByText(
      mockProps.flight.fields["Departure Airport"],
    );
    expect(departingAirport).toBeTruthy();

    const arrivingAirport = component.getByText(
      mockProps.flight.fields["Arrival Airport"],
    );
    expect(arrivingAirport).toBeTruthy();

    const airline = component.getByText(
      formatAirlineString(
        mockProps.flight.fields.Airline.toLocaleUpperCase(),
      ).trim(),
    );
    expect(airline).toBeTruthy();

    const legType = component.getByText(
      mockProps.flight.fields["Leg Type"].toLocaleUpperCase(),
    );
    expect(legType).toBeTruthy();
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
      formatDate(mockProps.flight.fields["Departure Date/Time"]),
    );
    expect(date).toBeTruthy();

    //check that the departing airport is the same
    const departingAirport = component.getByText(
      mockProps.flight.fields["Departure Airport"],
    );
    expect(departingAirport).toBeTruthy();

    const arrivingAirport = component.getByText(
      mockProps.flight.fields["Arrival Airport"],
    );
    expect(arrivingAirport).toBeTruthy();

    const airline = component.getByText(
      formatAirlineString(
        mockProps.flight.fields.Airline.toLocaleUpperCase(),
      ).trim(),
    );
    expect(airline).toBeTruthy();

    const legType = component.getByText(
      mockProps.flight.fields["Leg Type"].toLocaleUpperCase(),
    );
    expect(legType).toBeTruthy();
  });

  /**************************Fourth TEST*******************************/
  test("Test example component with no border and red color", () => {
    const mockProps = {
      flight: createTestFlightLegData(),
      colorVariant: FlightTicketColorVariant.RED,
      isLastElement: true,
    };
    const component = render(<FlightTicket {...mockProps} />);

    // Check that the component renders
    expect(component).toBeTruthy();

    //check that date is the same
    const date = component.getByText(
      formatDate(mockProps.flight.fields["Departure Date/Time"]),
    );
    expect(date).toBeTruthy();

    //check that the departing airport is the same
    const departingAirport = component.getByText(
      mockProps.flight.fields["Departure Airport"],
    );
    expect(departingAirport).toBeTruthy();

    const arrivingAirport = component.getByText(
      mockProps.flight.fields["Arrival Airport"],
    );
    expect(arrivingAirport).toBeTruthy();

    const airline = component.getByText(
      formatAirlineString(
        mockProps.flight.fields.Airline.toLocaleUpperCase(),
      ).trim(),
    );
    expect(airline).toBeTruthy();

    const legType = component.getByText(
      mockProps.flight.fields["Leg Type"].toLocaleUpperCase(),
    );
    expect(legType).toBeTruthy();
  });
});
