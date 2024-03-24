import styles from "./PassengersPage.module.css";
import PatientCard from "./components/PatientCard/PatientCard";
import PassengerCard from "./components/PassengerCard/PassengerCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { PassengerData } from "../../interfaces/passenger.interface";

const ID = "rec9C9rLarSiAb9ZQ";

const PassengersPage = () => {
  // const data: PassengerData = createTestPassengerData();

  // ping the getUserByID endpoint to get the user's data
  const { data: passengerData, isLoading: passengerLoading } =
    useQuery<PassengerData>({
      queryKey: ["passenger"],
      queryFn: async () =>
        axios
          .get(`${process.env.VITE_HOST}/passenger/${ID}`)
          .then((res) => res.data),
      enabled: true,
    });

  const {
    data: accompanyingPassengerData,
    isLoading: accompanyingPassengerLoading,
  } = useQuery<PassengerData[]>({
    queryKey: ["accompanyingPassengers"],
    queryFn: async () =>
      axios
        .get(`${process.env.VITE_HOST}/passenger/accompanying?id=${ID}`)
        .then((res) => res.data),
    enabled: true,
  });

  if (
    passengerLoading ||
    accompanyingPassengerLoading ||
    !accompanyingPassengerData ||
    !passengerData
  ) {
    return <div>TEST...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.patientSection}>
          <h2 className={styles.header}>Patients and Companions</h2>
          <h3 className={styles.subheader}>Patient Information</h3>
          <div className={styles.patientInfo}>
            <PatientCard patient={passengerData} />
          </div>
        </div>
        <div className={styles.passengerSection}>
          <h3 className={styles.subheader}>Companion Information</h3>
          <h5 className={styles.description}>
            Companions of {passengerData["First Name"]}
          </h5>
          <div className={styles.passengersContainer}>
            {accompanyingPassengerData.map((passenger, index) => (
              <div className={styles.passengerCard} key={index}>
                <PassengerCard passenger={passenger} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PassengersPage;
