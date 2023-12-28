import Button from "../ButtonComponent";
import { ButtonColor, ButtonVariant } from "../ButtonComponent.definitions";
import { render } from "@testing-library/react";
const onClick = jest.fn();

describe("ButtonComponent Tests", () => {
  /**************************FIRST TEST*******************************/
  test("Test Button component to render", () => {
    const component = render(
      <Button
        variant={ButtonVariant.Regular}
        color={ButtonColor.Blue}
        onClick={onClick}
        text="Test Button"
        loading={true}
        disabled={false}
      />,
    );
    // Check that the component renders
    expect(component).toBeTruthy();
    const subText = component.getByText("Test Button");
    expect(subText).toBeTruthy();
  });
});
