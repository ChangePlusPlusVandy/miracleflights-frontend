import styles from "./App.module.css";
import SideBar from "./SideBar/Sidebar";
import { getUserByAirtableRecordId } from "../api/queries";
import { useUserContext } from "../context/User.context";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PassengerData } from "../interfaces/passenger.interface";

const App = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { getToken } = useAuth();
  const { currentUser, setCurrentUser } = useUserContext();

  const isNotificationsPage = location.pathname === "/notifications";

  const { data: userData, error } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () =>
      getUserByAirtableRecordId(
        currentUser?.["AirTable Record ID"] !== undefined
          ? currentUser?.["AirTable Record ID"]
          : (user?.publicMetadata?.airtableRecordId as string),
        await getToken(),
      ),
  });

  // if there is an airtable record id, but no user data, get the user
  useEffect(() => {
    if (error && !currentUser) {
      navigate("/onboard");
    }
  }, [user, userData]);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData as PassengerData);
    }
  }, [userData]);

  return (
    <div
      className={`${styles.appContainer} ${
        isNotificationsPage ? styles.notificationsPage : ""
      }`}
    >
      <div className={styles.sideBarContainer}>
        <SideBar />
      </div>
      <div
        className={styles.contentContainer}
        style={{
          background: isNotificationsPage
            ? "linear-gradient(to bottom, #d3ddf0, #f1f5fb)"
            : "#ffffff",
          padding: isNotificationsPage ? "0" : "4rem 6rem",
        }}
      >
        {!currentUser ? <div>Loading...</div> : <Outlet />}
      </div>
    </div>
  );
};

export default App;
