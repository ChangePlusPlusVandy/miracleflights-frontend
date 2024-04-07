import { Tabs } from "../SideBar.definitions";
import SideBar from "../Sidebar";
import { fireEvent, render } from "@testing-library/react";

// mock the router provider
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// mock the context
jest.mock("../../../context/Navigation.context", () => ({
  ...jest.requireActual("../../../context/Navigation.context"),
  useNavigationContext: () => ({
    currentTab: Tabs.DASHBOARD,
    setCurrentTab: jest.fn(),
  }),
}));

// mock useUser
jest.mock("@clerk/clerk-react", () => ({
  ...jest.requireActual("@clerk/clerk-react"),
  useUser: () => ({
    user: {
      firstName: "John",
      lastName: "Doe",
      email: "test@test.com",
    },
  }),
  UserButton: () => <div>UserButton</div>,
}));

describe("SideBarComponent", () => {
  it("renders correctly", () => {
    const component = render(<SideBar />);
    expect(component).toBeTruthy();
  });

  it("renders the tabs correctly", async () => {
    // render the component
    const component = render(<SideBar />);

    // check if the tabs are there
    expect(component.getByText("DASHBOARD")).toBeTruthy();
    expect(component.getByText("Request a Flight")).toBeTruthy();
    expect(component.getByText("TRIPS")).toBeTruthy();
    expect(component.getByText("DOCUMENTS")).toBeTruthy();
    expect(component.getByText("PATIENT & COMPANIONS")).toBeTruthy();

    // get the open button and click it
    const openButton = component.getAllByTestId("open-button")[0];
    fireEvent.click(openButton);

    // check if that worked (the text shouldn't be there anymore)
    expect(component.queryByText("DASHBOARD")).not.toBeTruthy();
    expect(component.queryByText("Request a Flight")).not.toBeTruthy();
    expect(component.queryByText("TRIPS")).not.toBeTruthy();
    expect(component.queryByText("DOCUMENTS")).not.toBeTruthy();
    expect(component.queryByText("PATIENT & COMPANIONS")).not.toBeTruthy();
  });

  it("correctly switches tabs", () => {
    // render the component
    const component = render(<SideBar />);

    // get the dashboard tab and click it
    const dashboardTab = component.getByText("DASHBOARD");
    fireEvent.click(dashboardTab);

    // check if the dashboard tab is selected
    expect(dashboardTab.className).toContain("SideBarTitleSelected");

    // get the my flights tab and click it
    const myFlightsTab = component.getByText("TRIPS");

    // check if the my flights tab is selected
    expect(myFlightsTab.className).toContain("SideBarTitleUnselected");
  });
});
