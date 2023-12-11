/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./FlightTimeSelector.module.css";
import "react-calendar/dist/Calendar.css";
import Icon from "../CustomIcon/Icon.tsx";
import DatePicker from "react-calendar";
import { useState } from "react";
import type { DateValue, FormTypes } from "./FlightTimeSelector.definitions.ts";

const FlightTimeSelector = () => {
  const [departDate, setDepartDate] = useState<DateValue>(new Date());
  const [arrivalDate, setArrivalDate] = useState<DateValue>(new Date());
  const [oneWay, setOneWay] = useState<boolean>(false);
  const [departureAirportPrimary, setDepartureAirportPrimary] =
    useState<string>("");
  const [departureAirportAlternate, setDepartureAirportAlternate] =
    useState<string>("");
  const [arrivalAirportPrimary, setArrivalAirportPrimary] =
    useState<string>("");
  const [arrivalAirportAlternate, setArrivalAirportAlternate] =
    useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form: FormTypes = {
      departDate,
      arrivalDate,
      oneWay,
      departureAirportPrimary,
      departureAirportAlternate,
      arrivalAirportPrimary,
      arrivalAirportAlternate,
    };

    console.log(form);
  };

  const submitDisabled = () => {
    // Check if any of the required fields are empty
    return (
      !departureAirportPrimary ||
      !departureAirportAlternate ||
      !arrivalAirportPrimary ||
      !arrivalAirportAlternate ||
      !departDate ||
      (!oneWay && !arrivalDate)
    );
  };

  return (
    <div>
      <div className={styles.flightSelectorBlock}>
        <div className={styles.flightSelectorBlockHeader}>Flight Selector</div>
        <div className={styles.flightSelectorBlockSubtitle}>
          Select your flight
        </div>
        <form className={styles.flightSelectorBlockContent}>
          <div className={styles.flightSelectorInputContainerUpper}>
            <div className={styles.airportChunk}>
              <div className={styles.flightSelectorInputLabel}>
                Departure Airport
              </div>
              <div className={styles.flightSelectorInputContainer}>
                <input
                  type="text"
                  placeholder="Primary Selection"
                  className={styles.flightSelectorInput}
                  value={departureAirportPrimary}
                  onChange={(e) => setDepartureAirportPrimary(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Alternate Selection"
                  className={styles.flightSelectorInput}
                  value={departureAirportAlternate}
                  onChange={(e) => setDepartureAirportAlternate(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.airplaneIcon}>
              <Icon glyph="plane" />
            </div>

            <div className={styles.airportChunk}>
              <div className={styles.flightSelectorInputLabel}>
                Arrival Airport
              </div>
              <div className={styles.flightSelectorInputContainer}>
                <input
                  type="text"
                  placeholder="Primary Selection"
                  className={styles.flightSelectorInput}
                  value={arrivalAirportPrimary}
                  onChange={(e) => setArrivalAirportPrimary(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Alternate Selection"
                  className={styles.flightSelectorInput}
                  value={arrivalAirportAlternate}
                  onChange={(e) => setArrivalAirportAlternate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.checkBoxContainer}>
            <label className={styles.flightSelectorInputLabel}>One way:</label>
            <input
              type="checkbox"
              id="oneWay"
              name="oneWay"
              checked={oneWay}
              data-testid="oneWay"
              onChange={() => setOneWay(!oneWay)}
            />{" "}
          </div>

          <div className={styles.flightSelectorInputContainerLower}>
            <DatePicker
              onChange={(date: any) => {
                setDepartDate(date);
              }}
              value={departDate}
            />

            {!oneWay && (
              <DatePicker
                onChange={(date: any) => {
                  setArrivalDate(date);
                }}
                value={arrivalDate}
                minDate={departDate as Date}
              />
            )}
          </div>
          <button
            className={styles.flightSelectorSubmitButton}
            onClick={handleSubmit}
            disabled={submitDisabled()}
          >
            Submit
          </button>
          <div className={styles.submitErrorMessage}>
            {submitDisabled() && "Please fill out all required fields"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightTimeSelector;
