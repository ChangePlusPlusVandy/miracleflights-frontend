import styles from "./DashboardPage.module.css";
import Rotunda from "./components/Rotunda/Rotunda";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { getDashboardData } from "../../api/queries";
import Divider from "../../components/Divider/Divider";
import { DividerSpacing } from "../../components/Divider/Divider.definitions";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import type { DashboardData } from "./DashboardPage.definitions";

const DashboardPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const images = [
    "src/pages/DashboardPage/components/MF_1.jpeg",
    "src/pages/DashboardPage/components/MF_2.jpeg",
    "src/pages/DashboardPage/components/MF_3.jpeg",
    "src/pages/DashboardPage/components/MF_4.jpeg",
    "src/pages/DashboardPage/components/MF_5.jpeg",
    "src/pages/DashboardPage/components/MF_7.png",
    "src/pages/DashboardPage/components/MF_8.webp",
  ];

  const { data: dashboardData, isLoading: dashboardLoading } =
    useQuery<DashboardData>({
      queryKey: ["dashboard"],
      queryFn: async () => getDashboardData(await getToken()),
      enabled: true,
    });

  useEffect(() => {
    setCurrentTab(Tabs.HOME);
  }, []);

  if (dashboardLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardTitle}>
          Welcome back, {user?.firstName}!
        </div>
        <Divider spacing={DividerSpacing.LARGE} />
        <div className={styles.CardsContainer}>
          <div className={styles.cardStyle}>
            <div className={styles.flightNumber}>
              {dashboardData?.["Flights Today"]}
            </div>
            <div className={styles.flightsToday}>FLIGHTS TODAY</div>
          </div>
          <div className={styles.cardStyle}>
            <div className={styles.flightNumber}>
              {(Number(dashboardData?.["Flights This Week"]) || 0) +
                (Number(dashboardData?.["Flights Today"]) || 0)}
            </div>
            <div className={styles.flightsWeek}>FLIGHTS THIS WEEK </div>
          </div>
          <div className={styles.cardStyle}>
            <div className={styles.flightNumber}>
              {dashboardData?.["All Total Flights"]}
            </div>
            <div className={styles.flightsEver}>FLIGHTS TOTAL</div>
          </div>
        </div>
        <Divider spacing={DividerSpacing.LARGE} />
        <h4>Take a look into Miracle Flights: </h4>
        <Rotunda images={images} />
        <Divider spacing={DividerSpacing.LARGE} />
        <div className={styles.CardsContainer}>
          <div
            className={styles.quickLinkContainer}
            onClick={() => navigate("/request")}
          >
            <div className={styles.quickLinkText}>REQUEST FLIGHT</div>
            <FontAwesomeIcon
              className={styles.quickLinkText}
              icon={faArrowUpRightFromSquare}
            />
          </div>
          <div
            className={styles.quickLinkContainer}
            onClick={() => navigate("/passengers")}
          >
            <div className={styles.quickLinkText}>PASSENGERS</div>
            <FontAwesomeIcon
              className={styles.quickLinkText}
              icon={faArrowUpRightFromSquare}
            />
          </div>
          <div
            className={styles.quickLinkContainer}
            onClick={() => navigate("/trips")}
          >
            <div className={styles.quickLinkText}>YOUR TRIPS</div>
            <FontAwesomeIcon
              className={styles.quickLinkText}
              icon={faArrowUpRightFromSquare}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
