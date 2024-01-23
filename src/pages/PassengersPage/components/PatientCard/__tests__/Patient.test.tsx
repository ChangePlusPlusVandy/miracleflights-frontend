import { getAge } from "../../../../../util/date.util";
import { createTestPassengerData } from "../../../../../util/test-data.util";
import PatientCard from "../PatientCard";
import { render } from "@testing-library/react";

describe("Patient", () => {
  it("should render correctly", () => {
    const mockProps = {
      patient: createTestPassengerData(),
    };

    const component = render(<PatientCard {...mockProps} />);
    expect(component).toBeTruthy();

    expect(
      component.getByText(
        mockProps.patient.fields["First Name"] +
          " " +
          mockProps.patient.fields["Last Name"],
      ),
    ).toBeTruthy();
    expect(
      component.getByText(
        "(" +
          getAge(mockProps.patient.fields["Date of Birth"]).toString() +
          ")",
      ),
    ).toBeTruthy();
    expect(component.getByText("Medical Condition:")).toBeTruthy();
  });
});
