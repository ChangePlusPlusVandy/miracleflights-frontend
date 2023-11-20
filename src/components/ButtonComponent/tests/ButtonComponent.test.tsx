import { ButtonColors } from "../../../constants/constants";
import ButtonComponent from "../ButtonComponent";
import { render } from "@testing-library/react";

describe("ButtonComponent Tests", () => {
  const onClick = jest.fn();

  /**************************FIRST TEST*******************************/
  test("Test Button component to render", () => {
    const component = render(
      <ButtonComponent
        variant="Regular"
        color={ButtonColors.Blue}
        onClick={onClick}
        text="Test Button"
        loading={true}
      />,
    );
    // Check that the component renders
    expect(component).toBeTruthy();
  });
});
