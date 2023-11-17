import FlightTicket from "../FlightTicket";
import { LegType, FlightTicketColorVariant } from "../FlightTicket.definitions";
import { render } from "@testing-library/react";

describe("FlightTicket Tests", () => {
  /**************************FIRST TEST*******************************/
  // test color variance, test different flight types

  test("Test example component with connecting flight and red color", () => {
    const component = render(
      <FlightTicket
        date={"11/23/2023"}
        departingAirport={"LAX"}
        arrivingAirport={"BNA"}
        airline={"SOUTHWEST"}
        legType={LegType.CONNECTING}
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
  test("Test example component with connecting flight and red color", () => {
    const component = render(
      <FlightTicket
        date={"11/23/2023"}
        departingAirport={"LAX"}
        arrivingAirport={"BNA"}
        airline={"SOUTHWEST"}
        legType={LegType.DEPARTURE}
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
  test("Test example component with connecting flight and red color", () => {
    const component = render(
      <FlightTicket
        date={"11/23/2023"}
        departingAirport={"LAX"}
        arrivingAirport={"BNA"}
        airline={"SOUTHWEST"}
        legType={LegType.RETURN}
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
  test("Test example component with connecting flight and red color", () => {
    const component = render(
      <FlightTicket
        date={"11/23/2023"}
        departingAirport={"LAX"}
        arrivingAirport={"BNA"}
        airline={"SOUTHWEST"}
        legType={LegType.RETURN}
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
