import styles from "./App.module.css";
import SideBar from "./SideBar/Sidebar";
import Navbar from "./NavBar/Navbar";
import { getUserByAirtableRecordId } from "../api/queries";
import { useUserContext } from "../context/User.context";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PassengerData } from "../interfaces/passenger.interface";

const App = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { currentUser, setCurrentUser } = useUserContext();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const { data: userData } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () =>
      getUserByAirtableRecordId(
        currentUser?.["AirTable Record ID"] !== undefined
          ? currentUser?.["AirTable Record ID"]
          : (user?.publicMetadata?.airtableRecordId as string),
        await getToken(),
      ),
  });

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData as PassengerData);
    }
  }, [userData]);

  useEffect(() => {
    if (!user?.publicMetadata.airtableRecordId) {
      navigate("/onboard");
    }
  }, [currentUser]);

  return (
    <div className={styles.appContainer}>
      <Navbar
        onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />
      <div className={styles.mainWrapper}>
        <div className={styles.sideBarContainer}>
          <SideBar isExpanded={isSidebarExpanded} />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.contentContainer}>
            {!currentUser ? <div>Loading...</div> : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
