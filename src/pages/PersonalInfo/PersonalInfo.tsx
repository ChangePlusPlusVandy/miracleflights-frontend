import styles from "./PersonalInfo.module.css";
import { createTestPassengerData } from "../../util/test-data.util";
import { useState } from "react";
import type { PassengerData } from "../../interfaces/passenger.interface";

const PersonalInfo = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["General", "Medical", "Financial", "Flight History"];
  const data: PassengerData = createTestPassengerData();

  const generalInfo = {
    "Full Name": data.fields["Full Name"],
    Street: data.fields.Street,
    Country: data.fields.Country,
    "Email Address": data.fields.Email,
    "Type of Passenger": data.fields.Type,
    "Military Service Status": data.fields["Military Service"],
    "Military Member Status": data.fields["Military Member"],
    "Date Created": data.createdTime.split("T")[0],
    "How did you hear about us?": data.fields["How did you hear about us"],
  };

  const medical = {
    "Date of Birth": data.fields["Date of Birth"].split("T")[0],
    Gender: data.fields.Gender,
    Ethnicity: data.fields.Ethnicity,
    Diagnosis: data.fields.Diagnosis,
  };

  const financial = {
    "Household Income": data.fields["Household Income"],
    "Household Size": data.fields["Household Size"],
  };

  const flightInfo = {
    "All Flights": data.fields["All Flight Legs"],
    "Number of Flight Legs": data.fields["# of Flight Legs"],
    "Number of Booked Flight Requests":
      data.fields["# of Booked Flight Requests (Patient)"],
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        {tabs.map((value, index) => (
          <button
            key={value}
            type="button"
            className={index === tabIndex ? styles.tabSelected : styles.tab}
            onClick={() => {
              setTabIndex(index);
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div className={styles.tabPanels}>
        {tabIndex === 0 && (
          <div key={0}>
            {Object.entries(generalInfo).map(([field, val], index: number) => (
              <div key={index} className={styles.InfoBox}>
                {field}: {val}
              </div>
            ))}
          </div>
        )}
        {tabIndex === 1 && (
          <div key={1}>
            {Object.entries(medical).map(([field, val], index: number) => (
              <div key={index} className={styles.InfoBox}>
                {field}: {val}
              </div>
            ))}
          </div>
        )}
        {tabIndex === 2 && (
          <div key={2}>
            {Object.entries(financial).map(([field, val], index: number) => (
              <div key={index} className={styles.InfoBox}>
                {field}: {val}
              </div>
            ))}
          </div>
        )}
        {tabIndex === 3 && (
          <div key={3}>
            {Object.entries(flightInfo).map(([field, val], index: number) => (
              <div key={index} className={styles.InfoBox}>
                {field}: {val}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
