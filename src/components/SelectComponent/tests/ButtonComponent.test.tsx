import Select from "../SelectComponent";
import { render } from "@testing-library/react";

describe("SelectComponent Tests", () => {
  test("Test Select component to render", () => {
    const options = ["Option 1", "Option 2", "Option 3"];

    // Mock register function
    const mockRegister = jest.fn();

    render(
      <Select
        name="testSelect"
        register={mockRegister}
        label="Select Label"
        placeholder="Select Placeholder"
        options={options}
      />,
    );
  });
});
