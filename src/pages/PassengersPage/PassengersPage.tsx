import styles from "./PassengersPage.module.css";
import PatientCard from "./components/PatientCard/PatientCard";
import PassengerCard from "./components/PassengerCard/PassengerCard";
import PlusButton from "./components/PlusButton/PlusButton";
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

  useEffect(() => {
    setCurrentTab(Tabs.PASSENGERS);
  }, []);

  if (
    passengerLoading ||
    accompanyingPassengerLoading ||
    !accompanyingPassengerData ||
    !passengerData
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isModalOpen && (
        <AddPassengerModal onClose={() => setIsModalOpen(false)} />
      )}
      <div className={styles.container}>
        <div className={styles.patientSection}>
          <h2 className={styles.header}>Patients and Companions</h2>
          <h3 className={styles.subheader}>Patient Information</h3>
          <div className={styles.patientInfo}>
            <PatientCard patient={passengerData} />
          </div>
        </div>
        <div className={styles.passengerSection}>
          <div className={styles.passengerSectionHeader}>
            <h3 className={styles.subheader}>
              Companion Information
              <div className={styles.plusButton}>
                <PlusButton setOpen={setIsModalOpen} />
              </div>{" "}
            </h3>
          </div>
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
