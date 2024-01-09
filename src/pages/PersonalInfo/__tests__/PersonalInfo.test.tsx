import PersonalInfo from "../PersonalInfo";
import { render, fireEvent } from "@testing-library/react";
import type { PassengerData } from "../../../interfaces/passenger.interface";

jest.mock("../../../util/test-data.util", () => ({
  createTestPassengerData: () => {
    return {
      createdTime: "2021-09-13T18:03:07.000Z",
      id: "rec2Z6ZK3WlX5qZjS",
      fields: {
        "Full Name": "John Doe",
        Street: "123 Main St",
        Country: "USA",
        Email: "test@test.com",
        Type: "Patient",
        "Military Service": "Yes",
        "Military Member": "Yes",
        "How did you hear about us": "Internet",
        "Date of Birth": "1990-01-01T00:00:00.000Z",
        Gender: "Male",
        Ethnicity: "Caucasian",
        Diagnosis: "Cancer",
        "Household Income": "0",
        "Household Size": "1",
        "All Flight Legs": "1",
        "# of Flight Legs": "1",
        "# of Booked Flight Requests (Patient)": "1",
      } as Partial<PassengerData>,
    };
  },
}));

/**************************TABS TESTING SUITE*******************************/
describe("Tabs Tests", () => {
  /**************************FIRST TEST*******************************/
  test("Test tabs", () => {
    const tab = render(<PersonalInfo />);

    // Check that the tabs render
    expect(tab).toBeTruthy();

    // Get the 1st and 2nd tab buttons
    const tab1 = tab.getByText("General");
    const tab2 = tab.getByText("Medical");
    const tab3 = tab.getByText("Financial");
    const tab4 = tab.getByText("Flight History");

    // Check that the 1st tab displays correct info
    fireEvent.click(tab1);
    expect(tab.getByText("Full Name: John Doe")).toBeTruthy();
    expect(tab.getByText("Street: 123 Main St")).toBeTruthy();
    expect(tab.getByText("Country: USA")).toBeTruthy();
    expect(tab.getByText("Email Address: test@test.com")).toBeTruthy();
    expect(tab.getByText("Type of Passenger: Patient")).toBeTruthy();
    expect(tab.getByText("Military Service Status: Yes")).toBeTruthy();
    expect(tab.getByText("Military Member Status: Yes")).toBeTruthy();
    expect(tab.getByText("Date Created: 2021-09-13")).toBeTruthy();
    expect(tab.getByText("How did you hear about us?: Internet")).toBeTruthy();

    // Check that the 2nd tab displays the correct info
    fireEvent.click(tab2);
    expect(tab.getByText("Date of Birth: 1990-01-01")).toBeTruthy();
    expect(tab.getByText("Gender: Male")).toBeTruthy();
    expect(tab.getByText("Ethnicity: Caucasian")).toBeTruthy();
    expect(tab.getByText("Diagnosis: Cancer")).toBeTruthy();

    // Check that the 3rd tab displays correct info
    fireEvent.click(tab3);
    expect(tab.getByText("Household Income: 0")).toBeTruthy();
    expect(tab.getByText("Household Size: 1")).toBeTruthy();

    // Check that the 4th tab displays the correct info
    fireEvent.click(tab4);
    expect(tab.getByText("All Flights: 1")).toBeTruthy();
    expect(tab.getByText("Number of Flight Legs: 1")).toBeTruthy();
    expect(tab.getByText("Number of Booked Flight Requests: 1")).toBeTruthy();
  });

  test("Test snapshots", () => {
    const { container } = render(<PersonalInfo />);
    expect(container).toMatchSnapshot();
  });
});
