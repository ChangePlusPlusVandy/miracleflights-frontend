import SideBar from "../Sidebar";
import { fireEvent, render } from "@testing-library/react";

// mock the router provider
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("SideBarComponent", () => {
  it("renders correctly", () => {
    const component = render(<SideBar />);
    expect(component).toBeTruthy();
  });

  it("renders the tabs correctly", () => {
    // render the component
    const component = render(<SideBar />);

    // check if the tabs are there
    expect(component.getByText("DASHBOARD")).toBeTruthy();
    expect(component.getByText("REQUEST A FLIGHT")).toBeTruthy();
    expect(component.getByText("TRIPS")).toBeTruthy();
    expect(component.getByText("PERSONAL INFO")).toBeTruthy();
    expect(component.getByText("PATIENT AND PASSENGERS")).toBeTruthy();

    // get the open button and click it
    const openButton = component.getByTestId("open-button");
    fireEvent.click(openButton);

    // check if that worked (the text shouldn't be there anymore)
    expect(component.queryByText("DASHBOARD")).toBeFalsy();
    expect(component.queryByText("REQUEST A FLIGHT")).toBeFalsy();
    expect(component.queryByText("TRIPS")).toBeFalsy();
    expect(component.queryByText("PERSONAL INFO")).toBeFalsy();
    expect(component.queryByText("PATIENT AND PASSENGERS")).toBeFalsy();
  });

  it("correctly switches tabs", () => {
    // render the component
    const component = render(<SideBar />);

    // get the dashboard tab and click it
    const dashboardTab = component.getByText("DASHBOARD");
    fireEvent.click(dashboardTab);

    // check if the dashboard tab is selected
    expect(dashboardTab.className).toContain("SideBarTitleSelected");

    // get the request tab and click it
    const requestTab = component.getByText("REQUEST A FLIGHT");
    fireEvent.click(requestTab);

    // check if the request tab is selected
    expect(requestTab.className).toContain("SideBarTitleSelected");

    // get the my flights tab and click it
    const myFlightsTab = component.getByText("TRIPS");
    fireEvent.click(myFlightsTab);

    // check if the my flights tab is selected
    expect(myFlightsTab.className).toContain("SideBarTitleSelected");

    // get the personal info tab and click it
    const personalInfoTab = component.getByText("PERSONAL INFO");

    fireEvent.click(personalInfoTab);

    // check if the personal info tab is selected
    expect(personalInfoTab.className).toContain("SideBarTitleSelected");

    // get the passengers tab and click it
    const passengersTab = component.getByText("PATIENT AND PASSENGERS");
    fireEvent.click(passengersTab);

    // check if the passengers tab is selected
    expect(passengersTab.className).toContain("SideBarTitleSelected");
  });
});
