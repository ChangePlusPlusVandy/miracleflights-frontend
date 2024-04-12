import styles from "./DashboardPage.module.css";
import Rotunda from "./components/Rotunda/Rotunda";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { getDashboardData } from "../../api/queries";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { DashboardData } from "./DashboardPage.definitions";

const DashboardPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const { getToken } = useAuth();

  const images = [
    "src/pages/DashboardPage/components/DJI_0632.jpeg",
    "src/pages/DashboardPage/components/DJI_20230609100419_0001_V.jpeg",
    "src/pages/DashboardPage/components/Campus_aerial_fall.jpg",
    "src/pages/DashboardPage/components/Image 4-5-22 at 1.45 PM.jpg",
  ];

  const { data: dashboardData, isLoading: dashboardLoading } =
    useQuery<DashboardData>({
      queryKey: ["dashboard"],
      queryFn: async () => getDashboardData(await getToken()),
      enabled: true,
    });

  useEffect(() => {
    setCurrentTab(Tabs.DASHBOARD);
  }, []);

  if (dashboardLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardTitle}>
          Welcome back to Miracle Flights
        </div>
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
        <div className={styles.dashboardTitle}>Miracle Flights Pictures</div>
        <Rotunda images={images} />
      </div>
    </>
  );
};

export default DashboardPage;
