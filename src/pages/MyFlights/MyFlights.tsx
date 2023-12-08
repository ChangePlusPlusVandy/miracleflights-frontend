import styles from "./MyFlights.module.css";
import FlightTicket from "../../components/FlightTicket/FlightTicket";
import { FlightTicketColorVariant } from "../../components/FlightTicket/FlightTicket.definitions";
import { createTestFlightLegData } from "../../util/test-data.util";
import type { FlightLegData } from "../../interfaces/flight-leg.interface";

const MyFlights = () => {
  // MyFlights tab

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

  /*
   go look for the first element of flights."Request AirTable Record IDs"
   if this element hasnt been seen yet, make a new array containing just that one element
   if the element has been seen, add it to the array of that element
    [ 
    [flight1, flight2, flight3],
    [flight4, flight5, flight6],
    [flight7, flight8, flight9],
  ]
   */

  // go through the array and look at each value's first element of Request AirTable Record IDs
  // if that value has a key, add it to the array corresponding to that key
  // if that value does not have a key, make a new array containing that value and make the key the first element of Request AirTable Record IDs

  const groupedUpcomingFlights: Record<string, FlightLegData[]> =
    upcomingFlights.reduce(
      (acc: Record<string, FlightLegData[]>, flight: FlightLegData) => {
        const firstElementRequestAirTableRecordID =
          flight.fields["Request AirTable Record ID"][0];
        if (acc[firstElementRequestAirTableRecordID]) {
          acc[firstElementRequestAirTableRecordID].push(flight);
        } else {
          acc[firstElementRequestAirTableRecordID] = [flight];
        }
        return acc;
      },
      {},
    );

  console.log(groupedUpcomingFlights);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.current}>Current {}</div>
      <div className={styles.upcomingFlights}>
        {Object.values(groupedUpcomingFlights).map(
          (flightArray: FlightLegData[], index: number) => (
            <div className={styles.tripContainer} key={index}>
              {flightArray.map((flight: FlightLegData) => (
                <FlightTicket
                  key={flight.id}
                  flight={flight}
                  colorVariant={FlightTicketColorVariant.BLUE}
                  isLastElement={false}
                />
              ))}
            </div>
          ),
        )}
        ;
      </div>
      <div className={styles.historical}>Historical {}</div>
      {
        <div className={styles.pastFlights}>
          {pastFlights.map((flight: FlightLegData, index: number) => (
            <FlightTicket
              flight={flight}
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
