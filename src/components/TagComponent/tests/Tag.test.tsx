import Tag from "../Tag";
import { TagColor, TagVariant } from "../Tag.definitions";
import styles from "../Tag.module.css";
import { render } from "@testing-library/react";

/**************************TAG COMPONENT TESTING SUITE*******************************/
describe("Tag Component Tests", () => {
  /**************************FIRST TEST*******************************/
  test("renders a default Tag component (normal size and gray color)", () => {
    const mockProps = {
      variant: TagVariant.NORMAL,
      color: TagColor.GREY,
      text: "Default Tag",
    };

    const component = render(<Tag {...mockProps} />);

    // Check that the Tag component renders
    expect(component.getByText("Default Tag")).toBeTruthy();

    // Check that the Tag component has the correct size and color classes applied
    expect(component.getByText("Default Tag").getAttribute("class")).toBe(
      `${styles.tag} ${styles.normal} ${styles.gray}`,
    );
  });

  /**************************SECOND TEST*******************************/
  test("renders a Tag component with custom size and color", () => {
    const mockProps = {
      variant: TagVariant.LARGE,
      color: TagColor.GREEN,
      text: "Custom Tag",
    };

    const component = render(<Tag {...mockProps} />);

    // Check that the Tag component has the correct size and color classes applied
    expect(component.getByText("Custom Tag").getAttribute("class")).toBe(
      `${styles.tag} ${styles.large} ${styles.green}`,
    );
  });

  /**************************THIRD TEST*******************************/
  test("renders a Tag component with small size and red color", () => {
    const mockProps = {
      variant: TagVariant.SMALL,
      color: TagColor.RED,
      text: "Alert Tag",
    };

    const component = render(<Tag {...mockProps} />);

    // Check that the Tag component has the correct size and color classes applied
    expect(component.getByText("Alert Tag").getAttribute("class")).toBe(
      `${styles.tag} ${styles.small} ${styles.red}`,
    );
  });
});
