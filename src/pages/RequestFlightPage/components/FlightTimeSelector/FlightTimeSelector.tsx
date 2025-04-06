/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./FlightTimeSelector.module.css";
import "../../../../styles/Calendar.css";
import AirportSuggestions from "./AirportSuggestions.tsx";
import Icon from "../../../../components/CustomIcon/Icon.tsx";
import Button from "../../../../components/Button/Button.tsx";
import { ButtonVariant } from "../../../../components/Button/Button.definitions";
import DatePicker from "react-calendar";
import { useState } from "react";
import type {
  DateValue,
  FlightTimeSelectorProps,
} from "./FlightTimeSelector.definitions.ts";

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
    return (
      !departureAirportPrimary ||
      !departureAirportAlternate ||
      !arrivalAirportPrimary ||
      !arrivalAirportAlternate ||
      !departDate ||
      (arrivalDate && departDate > arrivalDate) ||
      departureAirportPrimary === departureAirportAlternate ||
      arrivalAirportPrimary === arrivalAirportAlternate ||
      (!oneWay && !arrivalDate)
    );
  };

  return (
    <div>
      <div className={styles.flightSelectorContainer}>
        <div className={styles.flightSelectorBlockHeader}>Request a Trip</div>
        <div className={styles.flightSelectorBlockSubtitle}>
          Select your top two airport preferences, trip dates, and accompanying
          companions.
        </div>
        <hr className={styles.subtitleDivider} />
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
                Roundtrip
              </div>
              <div
                className={`${styles.toggleItem} ${
                  oneWay ? styles.selected : ""
                }`}
                onClick={() => setOneWay(!oneWay)}
                data-testid="roundTrip"
              >
                One-way
              </div>
            </div>
          </div>
          <div className={styles.requestsHeader}>Airport Requests</div>
          <div className={styles.flightSelectorInputContainerUpper}>
            <div className={styles.airportChunk}>
              <div className={styles.labelContainer}>
                <div className={styles.flightSelectorInputLabelBlue}>
                  Departure
                </div>
              </div>
              <div className={styles.flightSelectorInputContainer}>
                <AirportSuggestions
                  placeholder="Primary Selection"
                  value={departureAirportPrimary}
                  setValue={(value) => {
                    setDepartureAirportPrimary(value);
                  }}
                />
                <AirportSuggestions
                  placeholder="Alternate Selection"
                  value={departureAirportAlternate}
                  setValue={(value) => {
                    setDepartureAirportAlternate(value);
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
              <div className={styles.labelContainer}>
                <div className={styles.flightSelectorInputLabelRed}>
                  Arrival
                </div>
              </div>
              <div className={styles.flightSelectorInputContainer}>
                <AirportSuggestions
                  placeholder="Primary Selection"
                  value={arrivalAirportPrimary}
                  setValue={(value) => {
                    setArrivalAirportPrimary(value);
                  }}
                />
                <AirportSuggestions
                  placeholder="Alternate Selection"
                  value={arrivalAirportAlternate}
                  setValue={(value) => {
                    setArrivalAirportAlternate(value);
                    if (value !== arrivalAirportPrimary) {
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
                {errorMessages.arrival && (
                  <p className={styles.flightSelectorErrorMessage}>
                    {errorMessages.arrival}
                  </p>
                )}
              </div>
            </div>
          </div>
          <hr className={styles.subtitleDivider} />
          <div className={styles.dateRequestsHeader}>Date Requests</div>
          <div className={styles.flightSelectorInputContainerLower}>
            <div className="departure-calendar">
              <DatePicker
                onChange={(date: any) => {
                  setDepartDate(date);
                }}
                value={departDate}
                className={styles.datePicker}
                formatMonthYear={(locale, date) =>
                  date.toLocaleString(locale, {
                    month: "short",
                    year: "numeric",
                  })
                }
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
                  formatMonthYear={(locale, date) =>
                    date.toLocaleString(locale, {
                      month: "short",
                      year: "numeric",
                    })
                  }
                />
              </div>
            )}
          </div>
          <Button
            variant={ButtonVariant.Continue}
            onClick={handleSubmit}
            disabled={submitDisabled()}
            text={"Submit"}
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
