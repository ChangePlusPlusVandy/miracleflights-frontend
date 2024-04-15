import FlightTimeSelector from "./components/FlightTimeSelector/FlightTimeSelector";
import PassengerSelector from "./components/PassengerSelector/PassengerSelector";
import ReviewAndSubmit from "./components/ReviewAndSubmit/ReviewAndSubmit";
import TreatmentInfo from "./components/TreatmentInfo/TreatmentInfo";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useUserContext } from "../../context/User.context";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import type { PassengerData } from "../../interfaces/passenger.interface";
import type { FlightInfoType } from "./components/FlightTimeSelector/FlightTimeSelector.definitions";
import type { TreatmentInfoType } from "../../interfaces/flight-request-submission";

const RequestFlightPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const [step, setStep] = useState(1);
  const [flightInfo, setFlightInfo] = useState<FlightInfoType | null>();
  const [selectedPassengers, setSelectedPassengers] = useState<PassengerData[]>(
    [],
  );
  const [selectError, setSelectError] = useState(false);
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

  const handleClickPassenger = (selectedPassenger: PassengerData) => {
    setSelectError(false);
    const passengerIndex = selectedPassengers.findIndex(
      (passenger) =>
        passenger["AirTable Record ID"] ===
        selectedPassenger["AirTable Record ID"],
    );
    if (passengerIndex === -1) {
      if (selectedPassengers.length >= 2) {
        setSelectError(true);
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
        ReturnDate: flightInfo?.departDate,
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
        ReturnDate: flightInfo?.departDate,
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
        <div>
          <h2>Successfully submitted flight request</h2>
          <p>
            {JSON.stringify({
              patient: currentUser,
              passenger1: selectedPassengers[0] || undefined,
              passenger2: selectedPassengers[1] || undefined,
              flightRequestData: {
                travelType: flightInfo?.oneWay,
                ScheduledMedicalAppointmentDate:
                  ScheduledMedicalAppointmentDateWatch,
                DepartureDate: flightInfo?.departDate,
                AirportOfOrigin: flightInfo?.departureAirportPrimary,
                AlternateAirportOfOrigin: flightInfo?.departureAirportAlternate,
                DestinationAirport: flightInfo?.arrivalAirportPrimary,
                AlternateDestinationAirport:
                  flightInfo?.arrivalAirportAlternate,
                ReturnDate: flightInfo?.departDate,
                FullNameOfTreatmentSite: FullNameOfTreatmentSiteWatch,
                FullNameOfPrimaryTreatmentSiteDoctor:
                  FullNameOfPrimaryTreatmentSiteDoctorWatch,
              },
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestFlightPage;
