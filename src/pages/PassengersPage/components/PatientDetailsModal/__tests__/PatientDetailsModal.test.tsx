import { createTestPassengerData } from "../../../../../util/test-data.util";
import PatientDetailsModal from "../PatientDetailsModal";
import { render, fireEvent } from "@testing-library/react";

describe("PatientDetailsModal", () => {
  const mockOnClose = jest.fn();
  const mockPatient = createTestPassengerData();

  it("renders patient details correctly", () => {
    const { getByText } = render(
      <PatientDetailsModal patient={mockPatient} onClose={mockOnClose} />,
    );

    expect(getByText("Gender")).toBeTruthy();
    expect(getByText(mockPatient.fields.Gender)).toBeTruthy();
    expect(getByText("DOB")).toBeTruthy();
    expect(
      getByText(mockPatient.fields["Date of Birth"].split("T")[0]),
    ).toBeTruthy();
    // Add similar checks for other fields
  });

  it("calls onClose when the modal action is triggered", () => {
    const component = render(
      <PatientDetailsModal patient={mockPatient} onClose={mockOnClose} />,
    );

    fireEvent.click(component.getByTestId("modal-close")); // Assuming the action triggers on a button click

    expect(mockOnClose).toHaveBeenCalled();
  });
});
