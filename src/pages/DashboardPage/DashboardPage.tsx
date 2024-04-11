import styles from "./DashboardPage.module.css";
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

  const { data: dashboardData, isLoading: dashboardLoading } =
    useQuery<DashboardData>({
      queryKey: ["dashboard"],
      queryFn: async () => getDashboardData(await getToken()),
      enabled: true,
    });

  console.log(dashboardData);
  console.log(dashboardLoading);

  useEffect(() => {
    setCurrentTab(Tabs.DASHBOARD);
  }, []);

  return (
    <>
      <div className={styles.welcomeMessage}>
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
          <div className={styles.flightsEver}>FLIGHTS EVER</div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
