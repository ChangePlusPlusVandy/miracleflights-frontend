/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./FlightTimeSelector.module.css";
import "../../../../styles/Calendar.css";
import Icon from "../../../../components/CustomIcon/Icon.tsx";
import Button from "../../../../components/Button/Button.tsx";
import DatePicker from "react-calendar";
import { useState } from "react";
import type {
  DateValue,
  FlightTimeSelectorProps,
} from "./FlightTimeSelector.definitions.ts";
// import { set } from "react-hook-form";

const FlightTimeSelector = ({
  setStep,
  setFlightInfo,
  defaultFlightInfo,
}: FlightTimeSelectorProps) => {
  const [departDate, setDepartDate] = useState<DateValue>(
    defaultFlightInfo?.departDate || new Date(),
  );
  const [arrivalDate, setArrivalDate] = useState<DateValue>(
    defaultFlightInfo?.arrivalDate || new Date(),
  );
  const [oneWay, setOneWay] = useState<boolean>(
    defaultFlightInfo?.oneWay || false,
  );
  const [departureAirportPrimary, setDepartureAirportPrimary] =
    useState<string>(defaultFlightInfo?.departureAirportPrimary || "");
  const [departureAirportAlternate, setDepartureAirportAlternate] =
    useState<string>(defaultFlightInfo?.departureAirportAlternate || "");
  const [arrivalAirportPrimary, setArrivalAirportPrimary] = useState<string>(
    defaultFlightInfo?.arrivalAirportPrimary || "",
  );
  const [arrivalAirportAlternate, setArrivalAirportAlternate] =
    useState<string>(defaultFlightInfo?.arrivalAirportAlternate || "");

  const [errorMessages, setErrorMessages] = useState({
    departure: "",
    arrival: "",
  });

  const handleSubmit = () => {
    setFlightInfo({
      departDate,
      arrivalDate,
      oneWay,
      departureAirportPrimary,
      departureAirportAlternate,
      arrivalAirportPrimary,
      arrivalAirportAlternate,
    });
    setStep(2);
  };

  const submitDisabled = () => {
    // Check if any of the required fields are empty
    return (
      !departureAirportPrimary ||
      !departureAirportAlternate ||
      !arrivalAirportPrimary ||
      !arrivalAirportAlternate ||
      !departDate ||
      (arrivalDate && departDate > arrivalDate) ||
      departureAirportPrimary == departureAirportAlternate ||
      arrivalAirportPrimary == arrivalAirportAlternate ||
      (!oneWay && !arrivalDate)
    );
  };

  return (
    <div>
      <div className={styles.flightSelectorContainer}>
        <div className={styles.flightSelectorBlockHeader}>Request a Flight</div>
        <div className={styles.flightSelectorBlockSubtitle}>
          Choose two of the nearest airports to you and your destination.
        </div>
        <form className={styles.flightSelectorBlockContent}>
          <div className={styles.checkBoxContainer}>
            <div className={styles.toggleContainer}>
              <div
                className={`${styles.toggleItem} ${
                  !oneWay ? styles.selected : ""
                }`}
                onClick={() => setOneWay(!oneWay)}
                data-testid="oneWay"
              >
                Round Trip
              </div>
              <div
                className={`${styles.toggleItem} ${
                  oneWay ? styles.selected : ""
                }`}
                onClick={() => setOneWay(!oneWay)}
                data-testid="roundTrip"
              >
                One Way
              </div>
            </div>
          </div>
          <div className={styles.flightSelectorInputContainerUpper}>
            <div className={styles.airportChunk}>
              <div className={styles.flightSelectorInputLabelBlue}>
                Departure
              </div>
              <div className={styles.flightSelectorInputContainer}>
                <input
                  type="text"
                  placeholder="Primary Selection"
                  className={styles.flightSelectorInputBlue}
                  value={departureAirportPrimary}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDepartureAirportPrimary(e.target.value);
                    if (value !== departureAirportAlternate) {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        departure: "",
                      }));
                    } else {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        departure:
                          "Primary and Alternate selections cannot be the same.",
                      }));
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="Alternate Selection"
                  className={styles.flightSelectorInputBlueBorder}
                  value={departureAirportAlternate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDepartureAirportAlternate(e.target.value);
                    if (value !== departureAirportPrimary) {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        departure: "",
                      }));
                    } else {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        departure:
                          "Primary and Alternate selections cannot be the same.",
                      }));
                    }
                  }}
                />
                {errorMessages.departure && (
                  <p className={styles.flightSelectorErrorMessage}>
                    {errorMessages.departure}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.horizontalLineWithIcon}>
              <div className={styles.airplaneIcon}>
                <Icon glyph="plane" />
              </div>
            </div>

            <div className={styles.airportChunk}>
              <div className={styles.flightSelectorInputLabelRed}>Arrival</div>
              <div className={styles.flightSelectorInputContainer}>
                <input
                  type="text"
                  placeholder="Primary Selection"
                  className={styles.flightSelectorInputRed}
                  value={arrivalAirportPrimary}
                  onChange={(e) => {
                    const value = e.target.value;
                    setArrivalAirportPrimary(e.target.value);
                    if (value !== arrivalAirportAlternate) {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        arrival: "",
                      }));
                    } else {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        arrival:
                          "Primary and Alternate selections cannot be the same.",
                      }));
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="Alternate Selection"
                  className={styles.flightSelectorInputRedBorder}
                  value={arrivalAirportAlternate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setArrivalAirportAlternate(e.target.value);
                    if (value !== arrivalAirportPrimary) {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        arrival: "",
                      }));
                    } else {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        arrival:
                          "Primary and Alternate selections cannot be the same.",
                      }));
                    }
                  }}
                />
                {errorMessages.arrival && (
                  <p className={styles.flightSelectorErrorMessage}>
                    {errorMessages.arrival}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.flightSelectorInputContainerLower}>
            <div className="departure-calendar">
              <DatePicker
                onChange={(date: any) => {
                  setDepartDate(date);
                }}
                value={departDate}
                className={styles.datePicker}
              />
            </div>

            {!oneWay && (
              <div className="arrival-calendar">
                <DatePicker
                  onChange={(date: any) => {
                    setArrivalDate(date);
                  }}
                  value={arrivalDate}
                  minDate={departDate as Date}
                  className={styles.datePicker}
                />
              </div>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={submitDisabled()}
            text={"Submit "}
          />
          <div className={styles.submitErrorMessage}>
            {submitDisabled() && "Please fill out all required fields"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightTimeSelector;
