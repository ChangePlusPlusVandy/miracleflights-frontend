import PatientDetailsModal from "../PatientDetailsModal";
import { createTestPassengerData } from "../../../../../util/test-data.util";
import { render, fireEvent } from "@testing-library/react";

// mock the queryClient
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

// mock useAuth
jest.mock("@clerk/clerk-react", () => ({
  useAuth: jest.fn(() => ({
    getToken: jest.fn(),
  })),
}));

describe("PatientDetailsModal", () => {
  const mockOnClose = jest.fn();
  const mockPatient = createTestPassengerData();

  it("renders patient details correctly", () => {
    const { getByText } = render(
      <PatientDetailsModal patient={mockPatient} onClose={mockOnClose} />,
    );

    // Basic details
    expect(getByText("Gender")).toBeTruthy();
    expect(getByText(mockPatient["Gender"])).toBeTruthy();

    // Address and Email
    expect(getByText(mockPatient["Street"])).toBeTruthy();
    expect(getByText(mockPatient["Country"])).toBeTruthy();
    expect(getByText("Email")).toBeTruthy();
    expect(getByText(mockPatient["Email"])).toBeTruthy();

    // Additional details
    expect(getByText("Military")).toBeTruthy();
    expect(getByText(mockPatient["Military Service"])).toBeTruthy();
    expect(getByText("# of Flight Legs")).toBeTruthy();
  });

  it("calls onClose when the modal action is triggered", () => {
    const { getByTestId } = render(
      <PatientDetailsModal patient={mockPatient} onClose={mockOnClose} />,
    );

    fireEvent.click(getByTestId("modal-close"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  // Add any other specific tests as needed
});
