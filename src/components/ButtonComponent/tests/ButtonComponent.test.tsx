import ButtonComponent from "../ButtonComponent";
import { ButtonColors } from "../../../constants/constants";
import { render } from "@testing-library/react";
import React from "react";
const handleButtonClick = () => {
    console.log('Button clicked!');
  };

describe("ButtonComponent Tests", () => {
    /**************************FIRST TEST*******************************/
    test("Test Button component to render", () => {
        const component = render(<ButtonComponent
            variant="Regular"
            color={ButtonColors.Blue}
            onClick={handleButtonClick}
            text="Test Button"
            loading={true}
          />);
      // Check that the component renders
      expect(component).toBeTruthy();
  });
});