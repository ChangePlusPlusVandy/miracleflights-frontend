import styles from "./TripsPage.module.css";
import FlightTicket from "./components/FlightTicket/FlightTicket";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useNavigationContext } from "../../context/Navigation.context";
import { useUserContext } from "../../context/User.context.tsx";
import { getAllFlightsForUser } from "../../api/queries.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import type { FlightRequestData } from "../../interfaces/flight-request-interface.ts";
import type { FlightLegData } from "../../interfaces/flight-leg.interface";

const TripsPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentUser } = useUserContext();
  const { getToken } = useAuth();

  useEffect(() => {
    setCurrentTab(Tabs.TRIPS);
  }, []);

  /**
   * Processes the flights by filtering, sorting, and grouping them by request.
   *
   * @param flights the flights to be processed
   * @returns an object containing the upcoming and past flights, grouped by request
   */

  const { data, isLoading } = useQuery({
    queryKey: ["getFlightForUser", currentUser?.["AirTable Record ID"]],
    queryFn: async () =>
      getAllFlightsForUser(
        currentUser?.["AirTable Record ID"] || "",
        await getToken(),
      ),
  });

  console.log("Received data:", data);

  if (isLoading || !data) return <h1>Loading....</h1>;

  if (!data) {
    console.log("No data");
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.title}>Upcoming Trips</div>
      <div className={styles.flightsGroup}>
        {data.map((flightArray: FlightRequestData, index: number) => {
          // Correctly accessing 'Flight Legs' using bracket notation
          const flightLegs = flightArray["Flight Legs"];
          if (!flightLegs || flightLegs.length === 0) {
            return (
              <div key={index} className={styles.noFlightLegs}>
                No flight details available for this trip.
              </div>
            );
          }

          return (
            <div key={index}>
              <div className={styles.timeFrame}>Time Frame</div>
              <div className={styles.tripContainer}>
                {flightLegs.map((flight: FlightLegData) => {
                  return <FlightTicket key={flight.id} flight={flight} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripsPage;
