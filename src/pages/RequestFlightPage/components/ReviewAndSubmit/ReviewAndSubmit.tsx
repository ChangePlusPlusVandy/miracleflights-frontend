import styles from "./ReviewAndSubmit.module.css";
import Divider from "../../../../components/Divider/Divider";
import { useUserContext } from "../../../../context/User.context";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import { DividerSpacing } from "../../../../components/Divider/Divider.definitions";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { ReviewAndSubmitProps } from "./ReviewAndSubmit.definitions";

const ReviewAndSubmit = ({
  passengers,
  flightInfo,
  setStep,
  treatmentInfo,
  onSubmit,
}: ReviewAndSubmitProps) => {
  const { currentUser } = useUserContext();
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if (!flightInfo) {
      setStep(1);
    }
  }, [flightInfo]);

  return (
    <>
      {openConfirm && (
        <Modal
          body={
            <div className={styles.confirmationModal}>
              <h3>Submit Request.</h3>
              <p className={styles.areYouSure}>
                Are you sure want to submit this request?
              </p>
              <p className={styles.cannotUndo}>This cannot be undone.</p>
              <Divider spacing={DividerSpacing.SMALL} />
              <div className={styles.actionContainer}>
                <Button
                  text="Go Back"
                  onClick={() => setOpenConfirm(false)}
                  color={ButtonColor.Red}
                />
                <Button
                  text="Yes"
                  onClick={() => {
                    onSubmit();
                    setOpenConfirm(false);
                    setStep(5);
                  }}
                />
              </div>
            </div>
          }
          action={() => setOpenConfirm(false)}
        />
      )}
      <div className={styles.reviewContainer}>
        <span
          onClick={() => setStep(3)}
          className={styles.goBack}
        >{`< Go back`}</span>
        <h4>Review your request</h4>
        <Divider />
        <div className={styles.passengerContainer}>
          <h4>Patient</h4>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>First Name: </span>
            {currentUser?.["First Name"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Last Name: </span>
            {currentUser?.["Last Name"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Date of Birth: </span>
            {currentUser?.["Date of Birth"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Gender: </span>
            {currentUser?.["Gender"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Street: </span>
            {currentUser?.["Street"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Country: </span>
            {currentUser?.["Country"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Email: </span>
            {currentUser?.["Email"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Household Income: </span>
            {currentUser?.["Household Income"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Household Size: </span>
            {currentUser?.["Household Size"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Ethnicity: </span>
            {currentUser?.["Ethnicity"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Military Service: </span>
            {currentUser?.["Military Service"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>Military Member: </span>
            {currentUser?.["Military Member"]}
          </div>
          <div className={styles.passengerValue}>
            <span className={styles.passengerKey}>
              How did you hear about us:{" "}
            </span>
            {currentUser?.["How did you hear about us"]}
          </div>
        </div>

        {passengers?.[0] && (
          <>
            <Divider />
            <div className={styles.passengerContainer}>
              <h4>Passenger 1</h4>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>First Name: </span>
                {passengers[0]["First Name"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Last Name: </span>
                {passengers[0]["Last Name"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Date of Birth: </span>
                {passengers[0]["Date of Birth"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Gender: </span>
                {passengers[0]["Gender"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Street: </span>
                {passengers[0]["Street"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Country: </span>
                {passengers[0]["Country"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Email: </span>
                {passengers[0]["Email"]}
              </div>
            </div>
          </>
        )}

        {passengers?.[1] && (
          <>
            <Divider />
            <div className={styles.passengerContainer}>
              <h4>Passenger 2</h4>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>First Name: </span>
                {passengers[1]["First Name"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Last Name: </span>
                {passengers[1]["Last Name"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Date of Birth: </span>
                {passengers[1]["Date of Birth"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Gender: </span>
                {passengers[1]["Gender"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Street: </span>
                {passengers[1]["Street"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Country: </span>
                {passengers[1]["Country"]}
              </div>
              <div className={styles.passengerValue}>
                <span className={styles.passengerKey}>Email: </span>
                {passengers[1]["Email"]}
              </div>
            </div>
          </>
        )}
        <Divider />
        <div className={styles.flightInfoContainer}>
          <h4>Flight Info</h4>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>Travel Type: </span>
            {flightInfo?.oneWay}
          </div>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>Departure Date: </span>
            {dayjs(flightInfo?.departDate as Date).format("YYYY-MM-DD")}
          </div>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>Airport of Origin: </span>
            {flightInfo?.arrivalAirportPrimary}
          </div>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>
              Alternate Airport of Origin:{" "}
            </span>
            {flightInfo?.arrivalAirportAlternate}
          </div>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>Destination Airport: </span>
            {flightInfo?.arrivalAirportPrimary}
          </div>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>
              Alternate Destination Airport:{" "}
            </span>
            {flightInfo?.arrivalAirportAlternate}
          </div>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>Return Date: </span>
            {dayjs(flightInfo?.departDate as Date).format("YYYY-MM-DD")}
          </div>
        </div>
        <Divider />
        <div className={styles.flightInfoContainer}>
          <h4>Treatment Info</h4>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>
              Scheduled Medical Appointment Date:{" "}
            </span>
            {treatmentInfo?.ScheduledMedicalAppointmentDate}
          </div>

          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>
              Full Name of Treatment Site:{" "}
            </span>
            {treatmentInfo?.FullNameOfTreatmentSite}
          </div>
          <div className={styles.flightInfoValue}>
            <span className={styles.flightInfoKey}>
              Full Name of Primary Treatment Site Doctor:{" "}
            </span>
            {treatmentInfo?.FullNameOfPrimaryTreatmentSiteDoctor}
          </div>
        </div>
        <Divider />
        <div className={styles.submitContainer}>
          <Button text="Submit Request" onClick={() => setOpenConfirm(true)} />
        </div>
      </div>
    </>
  );
};

export default ReviewAndSubmit;
