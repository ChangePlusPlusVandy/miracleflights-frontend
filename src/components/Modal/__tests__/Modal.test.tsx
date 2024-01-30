import Modal from "../Modal";
import { render } from "@testing-library/react";

describe("Modal Component Tests", () => {
  test("Modal renders properly with header and body", () => {
    const mockAction = jest.fn();
    const { container } = render(
      <Modal
        header="Test Modal"
        body={<p>Test body content</p>}
        action={mockAction}
      />,
    );

    expect(container.querySelector(".Modal")).toBeTruthy();
    expect(container.querySelector(".ModalHeader")).toBeTruthy();
    expect(container.querySelector(".ModalContent")).toBeTruthy();
  });

  test("Modal renders properly without header and body", () => {
    const mockAction = jest.fn();
    const { container } = render(<Modal action={mockAction} />);

    expect(container.querySelector(".Modal")).toBeTruthy();
  });
});
