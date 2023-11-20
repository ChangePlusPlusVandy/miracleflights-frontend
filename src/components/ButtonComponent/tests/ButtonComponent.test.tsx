import ButtonComponent from "../ButtonComponent";
import { ButtonColors } from "../../../constants/constants";
import { ButtonVariant } from "../../../constants/constants";
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import { render } from "@testing-library/react";
const handleButtonClick = () => {
  console.log('Button clicked!');
};

describe("ButtonComponent Tests", () => {
    /**************************FIRST TEST*******************************/
    test("Test Button component to render", () => {
  

<<<<<<< Updated upstream
        const component = render(<ButtonComponent
            variant={ButtonVariant.Regular}
            color={ButtonColors.Blue}
            onClick={handleButtonClick}
            text="Test Button"
            loading={true}
          />);
      // Check that the component renders
      expect(component).toBeTruthy();
=======
  test("Test Button component to render", () => {
    const component = render(
      <ButtonComponent
        variant={ButtonVariant.Regular}
        color={ButtonColors.Blue}
        onClick={onClick}
        text="Test Button"
        loading={true}
      />,
    );
    // Check that the component renders
    expect(component).toBeTruthy();

    // Check that the component renders the text
    expect(component.getByText("Test Button")).toBeTruthy();
>>>>>>> Stashed changes
  });
});
