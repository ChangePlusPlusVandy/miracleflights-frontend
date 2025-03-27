import styles from "./PassengersPage.module.css";
import PatientCard from "./components/PatientCard/PatientCard";
import PassengerCard from "./components/PassengerCard/PassengerCard";
// import CompanionCard from "./components/CompanionCard/CompanionCard";
import AddPassengerModal from "./components/AddPassengerModal/AddPassengerModal";
import { getAccompanyingPassengers, getPassengers } from "../../api/queries";
import { useUserContext } from "../../context/User.context";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { PassengerData } from "../../interfaces/passenger.interface";

const PassengersPage = () => {
  const { getToken } = useAuth();
  const { currentUser } = useUserContext();
  const { setCurrentTab } = useNavigationContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ping the getUserByID endpoint to get the user's data
  const { data: patientData, isLoading: patientLoading } =
    useQuery<PassengerData>({
      queryKey: ["passenger"],
      queryFn: async () =>
        getPassengers(
          currentUser?.["AirTable Record ID"] || "",
          await getToken(),
        ),
      enabled: true,
    });

  const { data: companionsData, isLoading: companionsLoading } = useQuery<
    PassengerData[]
  >({
    queryKey: ["accompanyingPassengers"],
    queryFn: async () =>
      getAccompanyingPassengers(
        currentUser?.["AirTable Record ID"] || "",
        await getToken(),
      ),
    enabled: true,
  });

  useEffect(() => {
    setCurrentTab(Tabs.PASSENGERS);
  }, []);

  if (patientLoading || companionsLoading || !companionsData || !patientData) {
    return <div>Loading...</div>;
  }

  console.log(patientData);
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Patient and Companions</h2>
      <p className={styles.description}>
        Here, you can access all related patient data and companion information.
      </p>

      <div className={styles.section}>
        <h3 className={styles.sectionHeader}>Patient Information</h3>
        <div className={styles.patientCard}>
          <PatientCard patient={patientData} />
        </div>
      </div>

      <div className={styles.companionHeader}>
        <h3 className={styles.sectionHeader}>Companion Information</h3>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          Add Companion
        </button>
      </div>
      <p className={styles.companionDescription}>
        {patientData["First Name"]}'s companions
      </p>

      <div className={styles.passengersContainer}>
        {companionsData.map((passenger, index) => (
          <div className={styles.passengerCard} key={index}>
            <PassengerCard passenger={passenger} />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <AddPassengerModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default PassengersPage;
