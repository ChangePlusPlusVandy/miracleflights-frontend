import styles from "./MyFlights.module.css";
import FlightTicket from "../../components/FlightTicket/FlightTicket";
import {
  FlightTicketColorVariant,
  LegType,
} from "../../components/FlightTicket/FlightTicket.definitions";
import { createTestFlightLegData } from "../../util/test-data.util";
import type { FlightLegData } from "../../interfaces/flight-leg.interface";

const MyFlights = () => {
  // MyFlights tab
  console.log("MyFlights");

  const array = [] as FlightLegData[];
  for (let i = 0; i < 20; ++i) {
    array[i] = createTestFlightLegData();
  }

  const upcomingFlights = array.filter((flight: FlightLegData) => {
    return (
      new Date(flight.fields["Departure Date/Time"]).getTime() -
        new Date().getTime() >
      0
    );
  });

  const pastFlights = array.filter((flight: FlightLegData) => {
    return (
      new Date(flight.fields["Departure Date/Time"]).getTime() -
        new Date().getTime() <
      0
    );
  });

  upcomingFlights.sort((flight1: FlightLegData, flight2: FlightLegData) => {
    return (
      new Date(flight1.fields["Departure Date/Time"]).getTime() -
      new Date(flight2.fields["Departure Date/Time"]).getTime()
    );
  });

  pastFlights.sort((flight1: FlightLegData, flight2: FlightLegData) => {
    return (
      new Date(flight1.fields["Departure Date/Time"]).getTime() -
      new Date(flight2.fields["Departure Date/Time"]).getTime()
    );
  });

  console.log(upcomingFlights);
  console.log(pastFlights);

  //take it, filter it, sort it, map

  return (
    <div className={styles.pageContainer}>
      <div className={styles.current}>Current {}</div>
      <div className={styles.upcomingFlights}>
        {upcomingFlights.map((flight: FlightLegData, index: number) => (
          <FlightTicket
            legType={LegType.CONNECTING}
            date={
              new Date(flight.fields["Departure Date/Time"])
                .getMonth()
                .toString() +
              "/" +
              new Date(flight.fields["Departure Date/Time"])
                .getDay()
                .toString() +
              "/" +
              new Date(flight.fields["Departure Date/Time"])
                .getFullYear()
                .toString()
            }
            departingAirport="BNA "
            arrivingAirport="JFK"
            airline={flight.fields.Airline}
            colorVariant={FlightTicketColorVariant.BLUE}
            isLastElement={false}
            key={index}
          />
        ))}
      </div>
      <div className={styles.historical}>Historical {}</div>
      {
        <div className={styles.pastFlights}>
          {pastFlights.map((flight: FlightLegData, index: number) => (
            <FlightTicket
              legType={LegType.CONNECTING}
              date={
                new Date(flight.fields["Departure Date/Time"])
                  .getMonth()
                  .toString() +
                "/" +
                new Date(flight.fields["Departure Date/Time"])
                  .getDay()
                  .toString() +
                "/" +
                new Date(flight.fields["Departure Date/Time"])
                  .getFullYear()
                  .toString()
              }
              departingAirport="BNA "
              arrivingAirport="JFK"
              airline={flight.fields.Airline}
              colorVariant={FlightTicketColorVariant.BLUE}
              isLastElement={false}
              key={index}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default MyFlights;
