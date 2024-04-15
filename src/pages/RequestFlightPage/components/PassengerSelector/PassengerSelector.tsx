import styles from "./PassengerSelector.module.css";
import { getAccompanyingPassengers } from "../../../../api/queries";
import { useUserContext } from "../../../../context/User.context";
import Button from "../../../../components/Button/Button";
import Divider from "../../../../components/Divider/Divider";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import type { PassengerSelectorProps } from "./PassengerSelector.definitions";
import type { PassengerData } from "../../../../interfaces/passenger.interface";

const PassengerSelector = ({
  setStep,
  handleClickPassenger,
  selectedPassengers,
  selectError,
}: PassengerSelectorProps) => {
  const { getToken } = useAuth();
  const { currentUser } = useUserContext();

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

  if (accompanyingPassengerLoading || !accompanyingPassengerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <span
        onClick={() => setStep(1)}
        className={styles.goBack}
      >{`< Go back`}</span>
      <div className={styles.titleAndError}>
        <h4>
          {`Select Passengers `}
          <span className={styles.minText}>{`(min 1)`}</span>
        </h4>
        <p>{selectError && "(You can only select up to 2 passengers)"}</p>
      </div>
      <Divider />
      <div className={styles.passengerContainer}>
        {accompanyingPassengerData?.map((passenger) => (
          <div
            key={passenger.id}
            className={styles.passengerCard}
            onClick={() => handleClickPassenger(passenger)}
          >
            <div>
              <h4>
                {passenger["First Name"]} {passenger["Last Name"]}
              </h4>
              <p>Date of birth: {passenger["Date of Birth"]}</p>
            </div>
            <div>
              {selectedPassengers.find(
                (selectedPassenger) =>
                  selectedPassenger["AirTable Record ID"] ===
                  passenger["AirTable Record ID"],
              ) ? (
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  className={styles.iconChecked}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSquare}
                  className={styles.iconUnchecked}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.continueContainer}>
        <Button
          text="Continue >"
          onClick={() => setStep(3)}
          disabled={
            !(selectedPassengers.length > 0 && selectedPassengers.length < 3)
          }
        />
      </div>
    </div>
  );
};

export default PassengerSelector;
