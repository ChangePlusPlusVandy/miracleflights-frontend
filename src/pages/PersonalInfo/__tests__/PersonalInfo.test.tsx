import PersonalInfo from "../PersonalInfo";
import { render, fireEvent } from "@testing-library/react";

/**************************TABS TESTING SUITE*******************************/
describe("Tabs Tests", () => {
  /**************************FIRST TEST*******************************/
  test("Test tabs", () => {
    const tab = render(<PersonalInfo />);

    // Check that the tabs render
    expect(tab).toBeTruthy();

    // Get the 1st and 2nd tab buttons
    const tab1 = tab.getByText("One");
    const tab2 = tab.getByText("Two");
    const tab3 = tab.getByText("Three");
    const tab4 = tab.getByText("Four");
    const tab5 = tab.getByText("Five");

    // Check that the 1st tab displays correct info
    fireEvent.click(tab1);
    expect(tab.getByText("hello i am 1")).toBeTruthy();

    // Check that the 2nd tab displays the correct info
    fireEvent.click(tab2);
    expect(tab.getByText("hello i am 2")).toBeTruthy();

    // Check that the 1st tab displays correct info
    fireEvent.click(tab3);
    expect(tab.getByText("hello i am 3")).toBeTruthy();

    // Check that the 2nd tab displays the correct info
    fireEvent.click(tab4);
    expect(tab.getByText("hello i am 4")).toBeTruthy();
    // Check that the 1st tab displays correct info
    fireEvent.click(tab5);
    expect(tab.getByText("hello i am 5")).toBeTruthy();
  });

  test("Test snapshots", () => {
    const { container } = render(<PersonalInfo />);
    expect(container).toMatchSnapshot();
  });
});
