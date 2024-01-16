import { createTestFlightLegData } from "../../../../../util/test-data.util";
import FlightDetailsModal from "../FlightDetailsModal";
import { fireEvent, render } from "@testing-library/react";

describe("FlightModal Tests", () => {
  /**************************FIRST TEST*******************************/
  // test that the flight modal renders and closes

  test("Test that modal renders and the close button works", () => {
    const onClose = jest.fn;
    const component = render(
      <FlightDetailsModal
        flight={createTestFlightLegData()}
        onClose={onClose}
      />,
    );

    // Check that the component renders
    expect(component).toBeTruthy();

    //check that close icon clicks

    const buttonToClose = component.container.querySelector("closeIcon");
    if (buttonToClose != null) {
      fireEvent.click(buttonToClose);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });
});
