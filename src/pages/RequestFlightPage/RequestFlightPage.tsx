import FlightTimeSelector from "./components/FlightTimeSelector/FlightTimeSelector";
import PassengerSelector from "./components/PassengerSelector/PassengerSelector";
import ReviewAndSubmit from "./components/ReviewAndSubmit/ReviewAndSubmit";
import TreatmentInfo from "./components/TreatmentInfo/TreatmentInfo";
import styles from "./RequestFlightPage.module.css";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useUserContext } from "../../context/User.context";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import type { PassengerData } from "../../interfaces/passenger.interface";
import type { FlightInfoType } from "./components/FlightTimeSelector/FlightTimeSelector.definitions";
import type { TreatmentInfoType } from "../../interfaces/flight-request-submission";

const RequestFlightPage = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { setCurrentTab } = useNavigationContext();
  const [step, setStep] = useState(1);
  const [flightInfo, setFlightInfo] = useState<FlightInfoType | null>();
  const [selectedPassengers, setSelectedPassengers] = useState<PassengerData[]>(
    [],
  );
  const [selectError, setSelectError] = useState("");
  const [busy, setBusy] = useState(false);
  const { currentUser } = useUserContext();

  const schema = yup.object().shape({
    FullNameOfTreatmentSite: yup
      .string()
      .required("Please enter a treatment site"),
    FullNameOfPrimaryTreatmentSiteDoctor: yup
      .string()
      .required("Please enter a primary treatment site doctor"),
    ScheduledMedicalAppointmentDate: yup
      .string()
      .required("Please enter a scheduled medical appointment date"),
  });

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<TreatmentInfoType>({
    defaultValues: {
      FullNameOfTreatmentSite: "",
      FullNameOfPrimaryTreatmentSiteDoctor: "",
      ScheduledMedicalAppointmentDate: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const FullNameOfTreatmentSiteWatch = watch("FullNameOfTreatmentSite");
  const FullNameOfPrimaryTreatmentSiteDoctorWatch = watch(
    "FullNameOfPrimaryTreatmentSiteDoctor",
  );
  const ScheduledMedicalAppointmentDateWatch = watch(
    "ScheduledMedicalAppointmentDate",
  );

  useEffect(() => {
    setCurrentTab(Tabs.REQUEST);
  }, []);

  const handleClickPassenger = async (selectedPassenger: PassengerData) => {
    setSelectError("");
    const passengerIndex = selectedPassengers.findIndex(
      (passenger) =>
        passenger["AirTable Record ID"] ===
        selectedPassenger["AirTable Record ID"],
    );
    if (passengerIndex === -1) {
      if (selectedPassengers.length >= 2) {
        setSelectError("You can only select up to 2 passengers.");
        return;
      }

      setBusy(true);
      const token = await getToken();
      const res = await axios.get(
        `${process.env.VITE_HOST}/get-accompanying-document`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            patientName: `${currentUser?.["First Name"]}_${currentUser?.["Last Name"]}`,
            passengerFullName: `${selectedPassenger["First Name"]}_${selectedPassenger["Last Name"]}`,
            passengerDob: selectedPassenger["Date of Birth"],
            airtableID: currentUser?.["AirTable Record ID"],
          },
        },
      );
      setBusy(false);
      let dt = new Date();
      dt.setFullYear(dt.getFullYear() - 18);
      if (
        res.data.value.length === 0 &&
        new Date(selectedPassenger["Date of Birth"]) > dt
      ) {
        setSelectError(
          "This passenger is under 18 years old and does not have a valid birth certificate.",
        );
        return;
      }
      setSelectedPassengers([...selectedPassengers, selectedPassenger]);
    } else {
      setSelectedPassengers(
        selectedPassengers.filter(
          (passenger) =>
            passenger["AirTable Record ID"] !==
            selectedPassenger["AirTable Record ID"],
        ),
      );
    }
  };

  const onSubmit = () => {
    if (!currentUser) return;

    console.log({
      patient: currentUser,
      passenger1: selectedPassengers[0] || undefined,
      passenger2: selectedPassengers[1] || undefined,
      flightRequestData: {
        travelType: flightInfo?.oneWay,
        ScheduledMedicalAppointmentDate: ScheduledMedicalAppointmentDateWatch,
        DepartureDate: flightInfo?.departDate,
        AirportOfOrigin: flightInfo?.departureAirportPrimary,
        AlternateAirportOfOrigin: flightInfo?.departureAirportAlternate,
        DestinationAirport: flightInfo?.arrivalAirportPrimary,
        AlternateDestinationAirport: flightInfo?.arrivalAirportAlternate,
        ReturnDate: flightInfo?.arrivalDate,
        FullNameOfTreatmentSite: FullNameOfTreatmentSiteWatch,
        FullNameOfPrimaryTreatmentSiteDoctor:
          FullNameOfPrimaryTreatmentSiteDoctorWatch,
      },
    });

    const data = {
      patient: currentUser,
      passengerTwo: selectedPassengers[0] || undefined,
      passengerThree: selectedPassengers[1] || undefined,
      flightRequestData: {
        travelType: flightInfo?.oneWay,
        ScheduledMedicalAppointmentDate: ScheduledMedicalAppointmentDateWatch,
        DepartureDate: flightInfo?.departDate,
        AirportOfOrigin: flightInfo?.departureAirportPrimary,
        AlternateAirportOfOrigin: flightInfo?.departureAirportAlternate,
        DestinationAirport: flightInfo?.arrivalAirportPrimary,
        AlternateDestinationAirport: flightInfo?.arrivalAirportAlternate,
        ReturnDate: flightInfo?.arrivalDate,
        FullNameOfTreatmentSite: FullNameOfTreatmentSiteWatch,
        FullNameOfPrimaryTreatmentSiteDoctor:
          FullNameOfPrimaryTreatmentSiteDoctorWatch,
      },
    };

    axios
      .post(`${process.env.VITE_HOST}/submit-flight-request`, data)
      .then((res) => res.data)
      .then((data) => {
        console.log("Flight request submitted successfully:", data);
        // Perform any further actions upon successful submission
      })
      .catch((error) => {
        console.error("Error submitting flight request:", error);
        // Handle errors appropriately
      });
  };

  return (
    <div>
      {step === 1 && (
        <FlightTimeSelector
          setStep={setStep}
          setFlightInfo={setFlightInfo}
          defaultFlightInfo={flightInfo}
        />
      )}
      {step === 2 && (
        <PassengerSelector
          setStep={setStep}
          handleClickPassenger={handleClickPassenger}
          selectedPassengers={selectedPassengers}
          selectError={selectError}
          busy={busy}
        />
      )}
      {step === 3 && (
        <TreatmentInfo
          setStep={setStep}
          register={register}
          errors={errors}
          watch={watch}
        />
      )}
      {step === 4 && (
        <ReviewAndSubmit
          passengers={selectedPassengers}
          flightInfo={flightInfo}
          setStep={setStep}
          treatmentInfo={{
            FullNameOfTreatmentSite: FullNameOfTreatmentSiteWatch,
            FullNameOfPrimaryTreatmentSiteDoctor:
              FullNameOfPrimaryTreatmentSiteDoctorWatch,
            ScheduledMedicalAppointmentDate:
              ScheduledMedicalAppointmentDateWatch,
          }}
          onSubmit={onSubmit}
        />
      )}
      {step === 5 && (
        <div className={styles.successPage}>
          <div className={styles.successTitle}>
            <h1>Successfully submitted flight request</h1>
            <h3 className={styles.sub}>
              Your flight request has been sent to our team. Check back in a few
              hours for updates on your request!
            </h3>
          </div>
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={styles.circleCheck}
            style={{ color: "#00cc00" }}
          />
          <Button
            text="Return to dashboard"
            onClick={() => navigate("/dashboard")}
            extraStyles={{ width: "200px", marginTop: "5rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default RequestFlightPage;
