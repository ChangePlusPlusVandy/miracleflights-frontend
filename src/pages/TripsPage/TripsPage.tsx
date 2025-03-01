import styles from "./TripsPage.module.css";
import FlightTicket from "./components/FlightTicket/FlightTicket";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useNavigationContext } from "../../context/Navigation.context";
import { useUserContext } from "../../context/User.context.tsx";
import { getAllFlightsForUser } from "../../api/queries.ts";
import { formatDate } from "../../util/date.util";
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
  const siteVerifyLink =
    "https://miracleflights.org/treatment-site-verification/";

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
  ) as FlightRequestData[];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.tripsMainTitle}>Trips</div>
      <div className={styles.tripsMainSubtitle}>
        Here, you can easily keep track all of your upcoming flights, manage
        your bookings, as well as acess completed trips
      </div>
      <Divider spacing={DividerSpacing.LARGE} />
      <div className={styles.title}>Upcoming Trips</div>
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

            //copy treatmentsite verification form to clipboard so that user can share with site
            const copySiteVerifyLink = async (
              e: React.MouseEvent<HTMLButtonElement>,
            ) => {
              e.stopPropagation();
              try {
                await navigator.clipboard.writeText(siteVerifyLink);
                alert(
                  "The link to the vertificaiton form was copied to clipboard!",
                );
              } catch (err) {
                console.error("Failed to copy text: ", err);
              }
            };

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
                    &nbsp;&nbsp;
                    <span className={styles.flightContainerText}>
                      Trip requested from:{" "}
                    </span>
                    <span className={styles.departureText}>
                      {formatDate(earliestDeparture)}
                    </span>{" "}
                    <span className={styles.flightContainerText}>to </span>
                    <span className={styles.arrivalText}>
                      {formatDate(latestArrival)}
                    </span>
                  </h4>
                  <div className={styles.statusContainer}>
                    <h5 className={styles.statusText}>Status: </h5>
                    {flightRequest["Treatment Site Verification"] ===
                    "Submitted" ? (
                      <Tag
                        color={getTagColor(flightRequest.Status as string)}
                        text={getTagText(flightRequest.Status as string)}
                        variant={TagVariant.LARGE}
                      />
                    ) : (
                      <Tag
                        color={TagColor.RED}
                        text="Action Required"
                        variant={TagVariant.LARGE}
                      />
                    )}
                  </div>
                </div>
                {openFlights.includes(flightRequest.id) && (
                  <div className={styles.tripContainer}>
                    <Divider spacing={DividerSpacing.SMALL} />
                    {flightRequest["Treatment Site Verification"] ===
                    "Submitted" ? (
                      flightRequest.Status === "Booked" ? (
                        sortedFlightLegs.length > 0 ? (
                          sortedFlightLegs.map(
                            (flight: FlightLegData, index) => (
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
                            ),
                          )
                        ) : (
                          <div className={styles.noDataContainer}>
                            <h5 className={styles.noDataContainerText}>
                              No flight legs yet for this trip
                            </h5>
                          </div>
                        )
                      ) : (
                        <div className={styles.noDataContainer}>
                          <h5 className={styles.noDataContainerText}>
                            Your trip has been requested. You will be notified
                            when your flight legs are booked.
                          </h5>
                        </div>
                      )
                    ) : (
                      <div className={styles.noDataContainer}>
                        <h5 className={styles.noDataContainerText}>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            Action Required:
                          </span>{" "}
                          You must fill out the{" "}
                          <span style={{ fontWeight: "bold" }}>
                            Treatment Site Verification Form
                          </span>{" "}
                          in order for your request to be fully processed.
                        </h5>
                        <div className={styles.copyLinkDiv}>
                          <h5 className={styles.noDataContainerText}>
                            To access the form, please click on the &apos;
                            <span style={{ textDecoration: "underline" }}>
                              Copy Link
                            </span>
                            &apos; button to access the external link containing the
                            form and also to send it to a relevant doctor later
                            on.
                          </h5>
                          <button
                            className={styles.copyLinkButton}
                            onClick={copySiteVerifyLink}
                          >
                            Copy Link
                          </button>
                        </div>
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
