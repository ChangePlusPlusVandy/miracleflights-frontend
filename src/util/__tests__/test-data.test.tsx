import {
  createTestPassengerData,
  createTestFlightLegData,
} from "../test-data.util";

describe("Test Data", () => {
  it("should properly create test passenger", () => {
    const passengerData = createTestPassengerData();
    expect(passengerData).toBeTruthy();

    // check for all the values
    expect(passengerData.fields["First Name"]).toBeTruthy();
    expect(passengerData.fields["Last Name"]).toBeTruthy();
    expect(passengerData.fields["Date of Birth"]).toBeTruthy();
    expect(passengerData.fields["Gender"]).toBeTruthy();
    expect(passengerData.fields["Street"]).toBeTruthy();
    expect(passengerData.fields["Country"]).toBeTruthy();
    expect(passengerData.fields["Email"]).toBeTruthy();
    expect(passengerData.fields["Household Income"]).toBeTruthy();
    expect(passengerData.fields["Household Size"]).toBeTruthy();
    expect(passengerData.fields["Ethnicity"]).toBeTruthy();
    expect(passengerData.fields["Military Service"]).toBeTruthy();
    expect(passengerData.fields["Military Member"]).toBeTruthy();
    expect(passengerData.fields["How did you hear about us"]).toBeTruthy();
    expect(passengerData.fields["BL - Account Number"]).toBeTruthy();
    expect(passengerData.fields["All Flight Legs"]).toBeTruthy();
    expect(passengerData.fields["Diagnosis"]).toBeTruthy();
    expect(passengerData.fields["Treatment Site Totals 2"]).toBeTruthy();
    expect(passengerData.fields["Passenger ID"]).toBeTruthy();
    expect(passengerData.fields["AirTable Record ID"]).toBeTruthy();
    expect(passengerData.fields["# of Flight Legs"]).toBeTruthy();
    expect(
      passengerData.fields["# of Booked Flight Requests (Patient)"],
    ).toBeTruthy();
    expect(
      passengerData.fields["# of Booked Flight Requests (Pass 2)"],
    ).toBeTruthy();
    expect(
      passengerData.fields["# of Booked Flight Requests (Pass 3)"],
    ).toBeTruthy();
    expect(
      passengerData.fields["# of Booked Flight Requests (Accompanying)"],
    ).toBeTruthy();
    expect(passengerData.fields["# of Booked Flight Requests"]).toBeTruthy();
    expect(
      passengerData.fields["Departure Date/Time (from All Flight Legs)"],
    ).toBeTruthy();
    expect(
      passengerData.fields["Name (from Treatment Site Totals 2)"],
    ).toBeTruthy();
    expect(
      passengerData.fields["Name (from Treatment Site Totals 2) 2"],
    ).toBeTruthy();
    expect(passengerData.fields["PUR (from All Flight Legs)"]).toBeTruthy();
    expect(passengerData.fields["Birth Month"]).toBeTruthy();
    expect(passengerData.fields["Full Name"]).toBeTruthy();
    expect(
      passengerData.fields["Passenger Names (from All Flight Legs)"],
    ).toBeTruthy();
    expect(passengerData.fields["# of Accompanying Passengers"]).toBeTruthy();
    expect(passengerData.fields["Age"]).toBeTruthy();
    expect(passengerData.fields["Birthday"]).toBeTruthy();
    expect(passengerData.fields["Day Before Birthday"]).toBeTruthy();
    expect(
      passengerData.fields["BL - Site 1 (from All Flight Legs)"],
    ).toBeTruthy();
    expect(passengerData.fields["Created"]).toBeTruthy();
    expect(passengerData.fields["Latest Trip"]).toBeTruthy();
    expect(
      passengerData.fields["TS City, State (from Treatment Site Totals 2)"],
    ).toBeTruthy();

    const flightData = createTestFlightLegData();
    expect(flightData).toBeTruthy();
  });

  it("should properly create test flight leg", () => {
    const flightData = createTestFlightLegData();
    expect(flightData).toBeTruthy();

    // check for all the values
    expect(flightData.fields["Status"]).toBeTruthy();
    expect(flightData.fields["Airline"]).toBeTruthy();
    expect(flightData.fields["BL - Departure Airport"]).toBeTruthy();
    expect(flightData.fields["Departure Date/Time"]).toBeTruthy();
    expect(flightData.fields["BL - Arrival Airport"]).toBeTruthy();
    expect(flightData.fields["Arrival Date/Time"]).toBeTruthy();
    expect(flightData.fields["Nautical Miles"]).toBeTruthy();
    expect(flightData.fields["PUR"]).toBeTruthy();
    expect(flightData.fields["BL - # of PAX"]).toBeTruthy();
    expect(flightData.fields["BL - Treatment Type"]).toBeTruthy();
    expect(flightData.fields["BL - Site 1"]).toBeTruthy();
    expect(flightData.fields["Passengers"]).toBeTruthy();
    expect(flightData.fields["Departure Airport"]).toBeTruthy();
    expect(flightData.fields["Arrival Airport"]).toBeTruthy();
    expect(flightData.fields["BL - Site 1 Links"]).toBeTruthy();
    expect(flightData.fields["Leg ID"]).toBeTruthy();
    expect(flightData.fields["# of Linked PAX"]).toBeTruthy();
    expect(flightData.fields["# of PAX"]).toBeTruthy();
    expect(flightData.fields["Total Miles"]).toBeTruthy();
    expect(flightData.fields["Passenger Names"]).toBeTruthy();
    expect(flightData.fields["Total Cost"]).toBeTruthy();
    expect(flightData.fields["Cost per PAX"]).toBeTruthy();
    expect(flightData.fields["AirTable Record ID"]).toBeTruthy();
    expect(flightData.fields["Passenger AirTable Record IDs"]).toBeTruthy();
    expect(flightData.fields["Log Airline Credit"]).toBeTruthy();
    expect(flightData.fields["Creation Date"]).toBeTruthy();
    expect(flightData.fields["Patient Name"]).toBeTruthy();
    expect(flightData.fields["State (from Passengers)"]).toBeTruthy();
    expect(flightData.fields["State (from Departure Airport)"]).toBeTruthy();
    expect(flightData.fields["State (from Arrival Airport)"]).toBeTruthy();
    expect(flightData.fields["State (from Passengers) 2"]).toBeTruthy();
    expect(flightData.fields["State (from Departure Airport) 2"]).toBeTruthy();
    expect(flightData.fields["Date of Birth (from Passengers)"]).toBeTruthy();
    expect(flightData.fields["Patient Latest Trip"]).toBeTruthy();
    expect(flightData.fields["Is Latest Trip"]).toBeTruthy();
    expect(flightData.fields["Home Phone (from Passengers)"]).toBeTruthy();
    expect(flightData.fields["Street (from Passengers)"]).toBeTruthy();
    expect(flightData.fields["City"]).toBeTruthy();
    expect(flightData.fields["State (from Passengers) 3"]).toBeTruthy();
    expect(flightData.fields["Zip (from Passengers)"]).toBeTruthy();
    expect(flightData.fields["Diagnosis (from Passengers)"]).toBeTruthy();
    expect(flightData.fields["Date of Birth (from Passengers) 2"]).toBeTruthy();
    expect(
      flightData.fields[
        "TS City, State (from Treatment Site Totals 2) (from Passengers)"
      ],
    ).toBeTruthy();
    expect(flightData.fields["48 Hours After Flight"]).toBeTruthy();
  });
});
