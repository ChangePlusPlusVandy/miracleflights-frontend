import styles from "./PassengersPage.module.css";
import PatientCard from "./components/PatientCard/PatientCard";
import PassengerCard from "./components/PassengerCard/PassengerCard";
import { getAccompanyingPassengers, getPassengers } from "../../api/queries";
import { useUserContext } from "../../context/User.context";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { PassengerData } from "../../interfaces/passenger.interface";

const PassengersPage = () => {
  const { getToken } = useAuth();
  const { currentUser } = useUserContext();

  // ping the getUserByID endpoint to get the user's data
  const { data: passengerData, isLoading: passengerLoading } =
    useQuery<PassengerData>({
      queryKey: ["passenger"],
      queryFn: async () =>
        getPassengers(
          currentUser?.["AirTable Record ID"] || "",
          await getToken(),
        ),
      enabled: true,
    });

  const {
    data: accompanyingPassengerData,
    isLoading: accompanyingPassengerLoading,
  } = useQuery<PassengerData[]>({
    queryKey: ["accompanyingPassengers"],
    queryFn: async () =>
      getAccompanyingPassengers(
        currentUser?.["AirTable Record ID"] || "",
        await getToken(),
      ),
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
