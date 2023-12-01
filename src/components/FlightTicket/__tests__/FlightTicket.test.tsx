import { createTestFlightLegData } from "../../../util/test-data.util";
import FlightTicket from "../FlightTicket";
import { FlightTicketColorVariant } from "../FlightTicket.definitions";
import { render } from "@testing-library/react";

describe("FlightTicket Tests", () => {
  /**************************FIRST TEST*******************************/
  // test color variance, test different flight types

  test("Test example component with border and blue color", () => {
    const component = render(
      <FlightTicket
        flight={createTestFlightLegData()}
        colorVariant={FlightTicketColorVariant.BLUE}
        isLastElement={false}
      />,
    );

    // Check that the component renders
    expect(component).toBeTruthy();

    //check that date is the same
    const date = component.getByText("11/23/2023");
    expect(date).toBeTruthy();

    //check that the departing airport is the same
    const departingAirport = component.getByText("LAX");
    expect(departingAirport).toBeTruthy();

    const arrivingAirport = component.getByText("BNA");
    expect(arrivingAirport).toBeTruthy();

    const airline = component.getByText("SOUTHWEST");
    expect(airline).toBeTruthy();

    const legType = component.getByText("CONNECTING");
    expect(legType).toBeTruthy();
  });

  /**************************SECOND TEST*******************************/
  test("Test example component with no border and red color", () => {
    const component = render(
      <FlightTicket
        flight={createTestFlightLegData()}
        colorVariant={FlightTicketColorVariant.RED}
        isLastElement={true}
      />,
    );

    // Check that the component renders
    expect(component).toBeTruthy();

    //check that date is the same
    const date = component.getByText("11/23/2023");
    expect(date).toBeTruthy();

    //check that the departing airport is the same
    const departingAirport = component.getByText("LAX");
    expect(departingAirport).toBeTruthy();

    const arrivingAirport = component.getByText("BNA");
    expect(arrivingAirport).toBeTruthy();

    const airline = component.getByText("SOUTHWEST");
    expect(airline).toBeTruthy();

    const legType = component.getByText("DEPARTURE");
    expect(legType).toBeTruthy();
  });

  /**************************THIRD TEST*******************************/
  test("Test example component with no border and blue color", () => {
    const component = render(
      <FlightTicket
        flight={createTestFlightLegData()}
        colorVariant={FlightTicketColorVariant.BLUE}
        isLastElement={true}
      />,
    );

    // Check that the component renders
    expect(component).toBeTruthy();

    //check that date is the same
    const date = component.getByText("11/23/2023");
    expect(date).toBeTruthy();

    //check that the departing airport is the same
    const departingAirport = component.getByText("LAX");
    expect(departingAirport).toBeTruthy();

    const arrivingAirport = component.getByText("BNA");
    expect(arrivingAirport).toBeTruthy();

    const airline = component.getByText("SOUTHWEST");
    expect(airline).toBeTruthy();

    const legType = component.getByText("RETURN");
    expect(legType).toBeTruthy();
  });

  /**************************Fourth TEST*******************************/
  test("Test example component with no border and red color", () => {
    const component = render(
      <FlightTicket
        flight={createTestFlightLegData()}
        colorVariant={FlightTicketColorVariant.RED}
        isLastElement={true}
      />,
    );

    // Check that the component renders
    expect(component).toBeTruthy();

    //check that date is the same
    const date = component.getByText("11/23/2023");
    expect(date).toBeTruthy();

    //check that the departing airport is the same
    const departingAirport = component.getByText("LAX");
    expect(departingAirport).toBeTruthy();

    const arrivingAirport = component.getByText("BNA");
    expect(arrivingAirport).toBeTruthy();

    const airline = component.getByText("SOUTHWEST");
    expect(airline).toBeTruthy();

    const legType = component.getByText("RETURN");
    expect(legType).toBeTruthy();
  });
});
