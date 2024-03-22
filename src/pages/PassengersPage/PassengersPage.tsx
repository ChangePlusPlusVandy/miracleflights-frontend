import styles from "./PassengersPage.module.css";
import PatientCard from "./components/PatientCard/PatientCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { PassengerData } from "../../interfaces/passenger.interface";

const PassengersPage = () => {
  // const data: PassengerData = createTestPassengerData();

  // ping the getUserByID endpoint to get the user's data
  const { data, isLoading } = useQuery<PassengerData>({
    queryKey: ["passenger"],
    queryFn: async (): Promise<PassengerData> =>
      axios
        .get(`${process.env.VITE_HOST}/passenger/rec9C9rLarSiAb9ZQ`)
        .then((res) => res.data),
    enabled: true,
  });

  console.log(data);

  if (isLoading || !data) {
    return <div>TEST...</div>;
  }

  // const generalInfo = {
  //   "Full Name": data["Full Name"],
  //   "First Name": data["First Name"],
  //   Street: data.Street,
  //   Country: data.Country,
  //   "Email Address": data.Email,
  //   "Type of Passenger": data.Type,
  //   "Military Service Status": data["Military Service"],
  //   "Military Member Status": data["Military Member"],
  //   "How did you hear about us?": data["How did you hear about us"],
  //   Passengers: data["Passenger Names (from All Flight Legs)"],
  // };

  // const medicalInfo = {
  //   "Date of Birth": data["Date of Birth"].split("T")[0],
  //   Gender: data.Gender,
  //   Ethnicity: data.Ethnicity,
  //   Diagnosis: data.Diagnosis,
  // };

  // const financialInfo = {
  //   "Household Income": data["Household Income"],
  //   "Household Size": data["Household Size"],
  // };

  // const flightInfo = {
  //   "All Flights": data["All Flight Legs"],
  //   "Number of Flight Legs": data["# of Flight Legs"],
  //   "Number of Booked Flight Requests": data["# of Booked Flight Requests"],
  // };

  // const allInfo = {
  //   ...generalInfo,
  //   ...medicalInfo,
  //   ...financialInfo,
  //   ...flightInfo,
  // };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.patientSection}>
          <h2 className={styles.header}>Patients and Companions</h2>
          <h3 className={styles.subheader}>Patient Information</h3>
          <div className={styles.patientInfo}>
            <PatientCard patient={data} />
          </div>
        </div>
        <div className={styles.passengerSection}>
          <h3 className={styles.subheader}>Companion Information</h3>
          <h5 className={styles.description}>
            Companions of {data["First Name"]}
          </h5>
          {/* <div className={styles.passengersContainer}>
            {generalInfo.Passengers.map((index) => (
              <div className={styles.passengerCard} key={index}>
                <PassengerCard passenger={createTestPassengerData()} />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PassengersPage;
