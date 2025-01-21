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
    currentTab: Tabs.HOME,
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
    const component = render(<SideBar isExpanded={false} />);
    expect(component).toBeTruthy();
  });

  it("renders the tabs correctly", async () => {
    // Initial render with isExpanded set to true
    const { getByText, queryByText, rerender } = render(
      <SideBar isExpanded={true} />,
    );

    // Check if the tabs are there when expanded
    expect(getByText("HOME")).toBeTruthy();
    expect(getByText("PATIENT & COMPANIONS")).toBeTruthy();
    expect(getByText("DOCUMENTS")).toBeTruthy();
    expect(getByText("TRIPS")).toBeTruthy();
    expect(getByText("NOTIFICATIONS")).toBeTruthy();

    // Re-render with isExpanded set to false
    rerender(<SideBar isExpanded={false} />);

    // Check if the tabs are not there when collapsed
    expect(queryByText("HOME")).not.toBeTruthy();
    expect(queryByText("PATIENT & COMPANIONS")).not.toBeTruthy();
    expect(queryByText("TRIPS")).not.toBeTruthy();
    expect(queryByText("DOCUMENTS")).not.toBeTruthy();
    expect(queryByText("NOTIFICATIONS")).not.toBeTruthy();
  });

  it("correctly switches tabs", () => {
    // render the component
    const component = render(<SideBar isExpanded={true} />);

    // get the open button and click it
    const openButton = component.getAllByTestId("open-button")[0];
    fireEvent.click(openButton);

    // get the dashboard tab and click it
    const dashboardTab = component.getByText("HOME");
    fireEvent.click(dashboardTab);

    // check if the dashboard tab is selected
    expect(dashboardTab.className).toContain("SideBarTitleSelected");

    // get the my flights tab and click it
    const myFlightsTab = component.getByText("TRIPS");

    // check if the my flights tab is selected
    expect(myFlightsTab.className).toContain("SideBarTitleUnselected");
  });
});
