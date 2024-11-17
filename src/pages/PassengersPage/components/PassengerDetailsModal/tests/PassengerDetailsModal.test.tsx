import { createTestPassengerData } from "../../../../../util/test-data.util";
import PassengerDetailsModal from "../PassengerDetailsModal";
import { render, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock useAuth to return a mock getToken function
jest.mock("@clerk/clerk-react", () => ({
  useAuth: () => ({
    getToken: jest.fn().mockResolvedValue("mock-token"), // Mock token
  }),
}));

// Create a new QueryClient for each test
const createTestQueryClient = () => new QueryClient();

describe("PassengerDetailsModal", () => {
  const mockOnClose = jest.fn();
  const mockPatient = createTestPassengerData();

  it("renders patient details correctly", () => {
    const queryClient = createTestQueryClient();

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <PassengerDetailsModal passenger={mockPatient} onClose={mockOnClose} />
      </QueryClientProvider>,
    );

    expect(getByText("Gender")).toBeTruthy();
    expect(getByText(mockPatient.Gender)).toBeTruthy();
    expect(getByText("DOB")).toBeTruthy();
    expect(getByText(mockPatient["Date of Birth"].split("T")[0])).toBeTruthy();
    // Add similar checks for other fields
  });

  it("calls onClose when the modal action is triggered", () => {
    const queryClient = createTestQueryClient();

    const component = render(
      <QueryClientProvider client={queryClient}>
        <PassengerDetailsModal passenger={mockPatient} onClose={mockOnClose} />,
      </QueryClientProvider>,
    );

    fireEvent.click(component.getByTestId("modal-close")); // Assuming the action triggers on a button click

    expect(mockOnClose).toHaveBeenCalled();
  });
});
