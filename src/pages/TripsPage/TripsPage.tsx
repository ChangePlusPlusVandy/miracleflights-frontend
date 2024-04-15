import styles from "./TripsPage.module.css";
import FlightTicket from "./components/FlightTicket/FlightTicket";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useNavigationContext } from "../../context/Navigation.context";
import { useUserContext } from "../../context/User.context.tsx";
import { getAllFlightsForUser } from "../../api/queries.ts";
import Tag from "../../components/Tag/Tag.tsx";
import { TagColor, TagVariant } from "../../components/Tag/Tag.definitions.ts";
import Divider from "../../components/Divider/Divider.tsx";
import { DividerSpacing } from "../../components/Divider/Divider.definitions.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { FlightRequestData } from "../../interfaces/flight-request-interface.ts";
import type { FlightLegData } from "../../interfaces/flight-leg.interface";

const STATUS_OPTIONS_MAP = {
  "Not Started": {
    color: TagColor.ORANGE,
    text: "Requested",
  },
  "In Progress": {
    color: TagColor.BLUE,
    text: "In Progress",
  },
  Booked: {
    color: TagColor.GREEN,
    text: "Booked",
  },
  Canceled: {
    color: TagColor.RED,
    text: "Cancelled",
  },
  "Did Not Fly": {
    color: TagColor.RED,
    text: "Did Not Fly",
  },
  DENIED: {
    color: TagColor.RED,
    text: "Denied",
  },
};

const TripsPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentUser } = useUserContext();
  const { getToken } = useAuth();
  const [openFlights, setOpenFlights] = useState<string[]>([]);

  useEffect(() => {
    setCurrentTab(Tabs.TRIPS);
  }, []);

  const { data, isLoading } = useQuery<FlightRequestData[]>({
    queryKey: ["getFlightForUser", currentUser?.["AirTable Record ID"]],
    queryFn: async () =>
      getAllFlightsForUser(
        currentUser?.["AirTable Record ID"] || "",
        await getToken(),
      ),
  });

  const getTagColor = (status: string): TagColor => {
    return (
      STATUS_OPTIONS_MAP[status as keyof typeof STATUS_OPTIONS_MAP]?.color ||
      TagColor.GREY
    );
  };

  const getTagText = (status: string): string => {
    return (
      STATUS_OPTIONS_MAP[status as keyof typeof STATUS_OPTIONS_MAP]?.text ||
      status
    );
  };

  const addOpenFlight = (flightId: string) => {
    setOpenFlights([...openFlights, flightId]);
  };

  const removeOpenFlight = (flightId: string) => {
    setOpenFlights(openFlights.filter((id) => id !== flightId));
  };

  if (isLoading || !data) return <p>Loading....</p>;

  const sortedFlightRequests = data.sort(
    (a: FlightRequestData, b: FlightRequestData) => {
      const aDate = new Date(a.createdTime);
      const bDate = new Date(b.createdTime);
      return aDate.getTime() + bDate.getTime();
    },
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.title}>Upcoming Trips</div>
      <Divider spacing={DividerSpacing.MEDIUM} />
      <div className={styles.flightsGroup}>
        {sortedFlightRequests?.map(
          (flightRequest: FlightRequestData, index: number) => {
            const flightLegs = flightRequest["Flight Legs"];

            const earliestDeparture = flightLegs.reduce(
              (earliest, current) => {
                const currentDeparture = new Date(
                  current["Departure Date/Time"],
                );
                return currentDeparture < earliest
                  ? currentDeparture
                  : earliest;
              },
              flightLegs?.[0]?.["Departure Date/Time"]
                ? new Date(flightLegs?.[0]?.["Departure Date/Time"])
                : new Date(flightRequest["Departure Date"] || ""),
            );

            const latestArrival = flightLegs.reduce(
              (latest, current) => {
                const currentArrival = new Date(current["Arrival Date/Time"]);
                return currentArrival > latest ? currentArrival : latest;
              },
              flightLegs?.[0]?.["Arrival Date/Time"]
                ? new Date(flightLegs?.[0]?.["Arrival Date/Time"])
                : new Date(flightRequest["Return Date"] || ""),
            );

            const sortedFlightLegs = flightLegs.sort(
              (a: FlightLegData, b: FlightLegData) => {
                const aDate = new Date(a["Departure Date/Time"]);
                const bDate = new Date(b["Departure Date/Time"]);
                return aDate.getTime() - bDate.getTime();
              },
            ) as FlightLegData[];

            return (
              <div
                key={index}
                className={styles.requestContainer}
                onClick={() => {
                  openFlights.includes(flightRequest.id)
                    ? removeOpenFlight(flightRequest.id)
                    : addOpenFlight(flightRequest.id);
                }}
              >
                <div className={styles.timeFrame}>
                  <h4>
                    {openFlights.includes(flightRequest.id) ? (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={styles.chevron}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={styles.chevron}
                      />
                    )}
                    &nbsp;&nbsp;Requested trip from:{" "}
                    <span className={styles.departureText}>
                      {earliestDeparture.toLocaleDateString()}
                    </span>{" "}
                    to{" "}
                    <span className={styles.arrivalText}>
                      {latestArrival.toLocaleDateString()}
                    </span>
                  </h4>
                  <div className={styles.statusContainer}>
                    <h5 className={styles.statusText}>Status: </h5>
                    <Tag
                      color={getTagColor(flightRequest.Status as string)}
                      text={getTagText(flightRequest.Status as string)}
                      variant={TagVariant.LARGE}
                    />
                  </div>
                </div>
                {openFlights.includes(flightRequest.id) && (
                  <div className={styles.tripContainer}>
                    {sortedFlightLegs.length > 0 ? (
                      sortedFlightLegs.map((flight: FlightLegData, index) => (
                        <>
                          <Divider spacing={DividerSpacing.SMALL} />
                          <FlightTicket
                            key={flight.id}
                            flight={flight}
                            index={index + 1}
                            isDeparture={
                              flight["Leg Type"] === "Departure" ||
                              (flight["Leg Type"] === "Connecting" &&
                                sortedFlightLegs[index - 1]["Leg Type"] ===
                                  "Departure")
                            }
                          />
                        </>
                      ))
                    ) : (
                      <div className={styles.noDataContainer}>
                        <Divider spacing={DividerSpacing.SMALL} />
                        <h5>No flights legs yet this trip</h5>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default TripsPage;
