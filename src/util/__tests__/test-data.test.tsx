import {
  createTestPassengerData,
  createTestFlightLegData,
} from "../test-data.util";

describe("Test Data", () => {
  it("should properly create test passenger", () => {
    const passengerData = createTestPassengerData();
    expect(passengerData).toBeTruthy();

    // check for all the values
    expect(passengerData["First Name"]).toBeTruthy();
    expect(passengerData["Last Name"]).toBeTruthy();
    expect(passengerData["Date of Birth"]).toBeTruthy();
    expect(passengerData["Gender"]).toBeTruthy();
    expect(passengerData["Street"]).toBeTruthy();
    expect(passengerData["Country"]).toBeTruthy();
    expect(passengerData["Email"]).toBeTruthy();
    expect(passengerData["Household Income"]).toBeTruthy();
    expect(passengerData["Household Size"]).toBeTruthy();
    expect(passengerData["Ethnicity"]).toBeTruthy();
    expect(passengerData["Military Service"]).toBeTruthy();
    expect(passengerData["Military Member"]).toBeTruthy();
    expect(passengerData["How did you hear about us"]).toBeTruthy();
    expect(passengerData["All Flight Legs"]).toBeTruthy();
    expect(passengerData["Diagnosis"]).toBeTruthy();
    expect(passengerData["AirTable Record ID"]).toBeTruthy();
    expect(passengerData["# of Flight Legs"]).toBeTruthy();
    expect(passengerData["# of Booked Flight Requests"]).toBeTruthy();
    expect(passengerData["Birth Month"]).toBeTruthy();
    expect(passengerData["Full Name"]).toBeTruthy();
    expect(
      passengerData["Passenger Names (from All Flight Legs)"],
    ).toBeTruthy();
    expect(passengerData["Age"]).toBeTruthy();
    expect(passengerData["Latest Trip"]).toBeTruthy();

    const flightData = createTestFlightLegData();
    expect(flightData).toBeTruthy();
  });

  it("should properly create test flight leg", () => {
    const flightData = createTestFlightLegData();
    expect(flightData).toBeTruthy();

    // check for all the values
    expect(flightData["Status"]).toBeTruthy();
    expect(flightData["Airline"]).toBeTruthy();
    expect(flightData["Departure Date/Time"]).toBeTruthy();
    expect(flightData["Arrival Date/Time"]).toBeTruthy();
    expect(flightData["Nautical Miles"]).toBeTruthy();
    expect(flightData["Passengers"]).toBeTruthy();
    expect(flightData["Departure Airport"]).toBeTruthy();
    expect(flightData["Arrival Airport"]).toBeTruthy();
    expect(flightData["Leg ID"]).toBeTruthy();
    expect(flightData["Total Miles"]).toBeTruthy();
    expect(flightData["Passenger Names"]).toBeTruthy();
    expect(flightData["Total Cost"]).toBeTruthy();
    expect(flightData["AirTable Record ID"]).toBeTruthy();
    expect(flightData["Passenger AirTable Record IDs"]).toBeTruthy();
    expect(flightData["Log Airline Credit"]).toBeTruthy();
    expect(flightData["Patient Name"]).toBeTruthy();
    expect(flightData["Patient Latest Trip"]).toBeTruthy();
    expect(flightData["Is Latest Trip"]).toBeTruthy();
  });
});
