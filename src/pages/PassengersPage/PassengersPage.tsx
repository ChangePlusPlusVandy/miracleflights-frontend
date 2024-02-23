import styles from "./PassengersPage.module.css";
import PatientCard from "./components/PatientCard/PatientCard";
import PassengerCard from "./components/PassengerCard/PassengerCard";
import { createTestPassengerData } from "../../util/test-data.util";
import { useMemo } from "react";
import type { PassengerData } from "../../interfaces/passenger.interface";

const PassengersPage = () => {
  const data: PassengerData = createTestPassengerData();

  // Memoize the flight info so that it doesn't have to be recalculated every time the component re-renders
  const allInfo = useMemo(() => {
    const generalInfo = {
      "Full Name": data.fields["Full Name"],
      "First Name": data.fields["First Name"],
      Street: data.fields.Street,
      Country: data.fields.Country,
      "Email Address": data.fields.Email,
      "Type of Passenger": data.fields.Type,
      "Military Service Status": data.fields["Military Service"],
      "Military Member Status": data.fields["Military Member"],
      "Date Created": data.createdTime.split("T")[0],
      "How did you hear about us?": data.fields["How did you hear about us"],
      Passengers: data.fields["Passenger Names (from All Flight Legs)"],
    };

    const medicalInfo = {
      "Date of Birth": data.fields["Date of Birth"].split("T")[0],
      Gender: data.fields.Gender,
      Ethnicity: data.fields.Ethnicity,
      Diagnosis: data.fields.Diagnosis,
    };

    const financialInfo = {
      "Household Income": data.fields["Household Income"],
      "Household Size": data.fields["Household Size"],
    };

    const flightInfo = {
      "All Flights": data.fields["All Flight Legs"],
      "Number of Flight Legs": data.fields["# of Flight Legs"],
      "Number of Booked Flight Requests":
        data.fields["# of Booked Flight Requests (Patient)"],
    };

    return {
      generalInfo,
      medicalInfo,
      financialInfo,
      flightInfo,
    };
  }, [data]);

  const { generalInfo } = allInfo;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.patientSection}>
          <h2 className={styles.header}>Patients and Companions</h2>
          <h3 className={styles.subheader}>Patient Information</h3>
          <div className={styles.patientInfo}>
            <PatientCard patient={createTestPassengerData()} />
          </div>
        </div>
        <div className={styles.passengerSection}>
          <h3 className={styles.subheader}>Companion Information</h3>
          <h5 className={styles.description}>
            Companions of {generalInfo["First Name"]}
          </h5>
          <div className={styles.passengersContainer}>
            {generalInfo.Passengers.map((passenger, index) => (
              <div className={styles.passengerCard} key={index}>
                <PassengerCard
                  name={passenger}
                  relationship="Brother"
                  notes="He has no legs"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PassengersPage;
