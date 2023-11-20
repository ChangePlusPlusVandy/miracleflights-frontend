import ButtonComponent from "../ButtonComponent";
import { ButtonColors } from "../../../constants/constants";
import { ButtonVariant } from "../../../constants/constants";
import { render } from "@testing-library/react";
const handleButtonClick = () => {
  console.log('Button clicked!');
};

describe("ButtonComponent Tests", () => {
    /**************************FIRST TEST*******************************/
    test("Test Button component to render", () => {
  

        const component = render(<ButtonComponent
            variant={ButtonVariant.Regular}
            color={ButtonColors.Blue}
            onClick={handleButtonClick}
            text="Test Button"
            loading={true}
          />);
      // Check that the component renders
      expect(component).toBeTruthy();
  });
});
