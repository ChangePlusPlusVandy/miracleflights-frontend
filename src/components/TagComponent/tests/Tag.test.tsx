import Tag from "../Tag";
import { render } from "@testing-library/react";
import styles from "../Tag.modules.css";

/**************************TAG COMPONENT TESTING SUITE*******************************/
describe("Tag Component Tests", () => {
  /**************************FIRST TEST*******************************/
  test("renders a default Tag component (normal size and gray color)", () => {
    const { getByText } = render(<Tag variant="normal" color="gray" text="Default Tag" />);

    // Check that the Tag component renders
    const tagElement = getByText("Default Tag");
    expect(tagElement).toBeTruthy();

    // Check that the Tag component has the correct size and color classes applied
    expect(tagElement).toHaveClass(styles.tag);
    expect(tagElement).toHaveClass(styles.normal);
    expect(tagElement).toHaveClass(styles.gray);
  });

  /**************************SECOND TEST*******************************/
  test("renders a Tag component with custom size and color", () => {
    const { getByText } = render(<Tag variant="large" color="green" text="Custom Tag" />);

    // Check that the Tag component renders
    const tagElement = getByText("Custom Tag");
    expect(tagElement).toBeTruthy();

    // Check that the Tag component has the correct size and color classes applied
    expect(tagElement).toHaveClass(styles.tag);
    expect(tagElement).toHaveClass(styles.large);
    expect(tagElement).toHaveClass(styles.green);
  });

  /**************************THIRD TEST*******************************/
  test("renders a Tag component with small size and red color", () => {
    const { getByText } = render(<Tag variant="small" color="red" text="Alert Tag" />);

    // Check that the Tag component renders
    const tagElement = getByText("Alert Tag");
    expect(tagElement).toBeTruthy();

    // Check that the Tag component has the correct size and color classes applied
    expect(tagElement).toHaveClass(styles.tag);
    expect(tagElement).toHaveClass(styles.small);
    expect(tagElement).toHaveClass(styles.red);
  });
});
