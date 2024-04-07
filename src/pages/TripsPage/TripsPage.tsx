import styles from "./TripsPage.module.css";
import FlightTicket from "./components/FlightTicket/FlightTicket";
import { createTestFlightLegData } from "../../util/test-data.util";
import { formatTimeFrame } from "../../util/date.util";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useNavigationContext } from "../../context/Navigation.context";
import { useEffect } from "react";
import type { FlightLegData } from "../../interfaces/flight-leg.interface";

const TripsPage = () => {
  const { setCurrentTab } = useNavigationContext();

  useEffect(() => {
    setCurrentTab(Tabs.TRIPS);
  }, []);

  /**
   * Processes the flights by filtering, sorting, and grouping them by request.
   *
   * @param flights the flights to be processed
   * @returns an object containing the upcoming and past flights, grouped by request
   */
  const processFlights = (flights: FlightLegData[]) => {
    // filter, sort, and group flights and return both the upcoming and past flights
    const groupedUpcomingFlights = flights
      .filter((flight: FlightLegData) => {
        return (
          new Date(flight["Departure Date/Time"]).getTime() -
            new Date().getTime() >
          0
        );
      })
      .sort((flight1: FlightLegData, flight2: FlightLegData) => {
        return (
          new Date(flight1["Departure Date/Time"]).getTime() -
          new Date(flight2["Departure Date/Time"]).getTime()
        );
      })
      .reduce((acc: Record<string, FlightLegData[]>, flight: FlightLegData) => {
        const firstElementRequestAirTableRecordID =
          flight["Request AirTable Record ID"][0];
        if (acc[firstElementRequestAirTableRecordID]) {
          acc[firstElementRequestAirTableRecordID].push(flight);
        } else {
          acc[firstElementRequestAirTableRecordID] = [flight];
        }
        return acc;
      }, {});

    const groupedPastFlights = flights
      .filter((flight: FlightLegData) => {
        return (
          new Date(flight["Departure Date/Time"]).getTime() -
            new Date().getTime() <
          0
        );
      })
      .sort((flight1: FlightLegData, flight2: FlightLegData) => {
        return (
          new Date(flight1["Departure Date/Time"]).getTime() -
          new Date(flight2["Departure Date/Time"]).getTime()
        );
      })
      .reduce((acc: Record<string, FlightLegData[]>, flight: FlightLegData) => {
        const firstElementRequestAirTableRecordID =
          flight["Request AirTable Record ID"][0];
        if (acc[firstElementRequestAirTableRecordID]) {
          acc[firstElementRequestAirTableRecordID].push(flight);
        } else {
          acc[firstElementRequestAirTableRecordID] = [flight];
        }
        return acc;
      }, {});

    return { groupedUpcomingFlights, groupedPastFlights };
  };

  // create the test data
  const array = [] as FlightLegData[];
  for (let i = 0; i < 20; ++i) {
    array[i] = createTestFlightLegData();
  }

  const { groupedUpcomingFlights, groupedPastFlights } = processFlights(array);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.title}>Upcoming Trips</div>
      <div className={styles.flightsGroup}>
        {Object.values(groupedUpcomingFlights).map(
          (flightArray: FlightLegData[], index: number) => (
            <div key={index}>
              <div className={styles.timeFrame}>
                {formatTimeFrame(flightArray)}
              </div>
              <div className={styles.tripContainer}>
                {flightArray.map((flight: FlightLegData) => (
                  <FlightTicket key={flight.id} flight={flight} />
                ))}
              </div>
            </div>
          ),
        )}
      </div>
      <div className={styles.divider} />
      <div className={styles.title}>Historical</div>
      {
        <div className={styles.flightsGroup}>
          {Object.values(groupedPastFlights).map(
            (flightArray: FlightLegData[], index: number) => (
              <div key={index}>
                <div className={styles.timeFrame}>
                  {formatTimeFrame(flightArray)}
                </div>
                <div className={styles.tripContainer}>
                  {flightArray.map((flight: FlightLegData) => (
                    <FlightTicket key={flight.id} flight={flight} />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      }
    </div>
  );
};

export default TripsPage;
