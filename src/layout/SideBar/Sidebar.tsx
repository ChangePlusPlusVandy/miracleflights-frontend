import styles from "./SideBar.module.css";
import { Tabs, type Tab } from "./SideBar.definitions";
import { useNavigationContext } from "../../context/Navigation.context";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserButton, useUser, useAuth } from "@clerk/clerk-react";
import logo from "../../public/0GAGNk.tif.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getDocumentsData } from "../../api/queries";
import { DocumentsData } from "./SideBar.definitions";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../context/User.context";
import { useState } from "react";

import {
  faHome,
  faPeopleGroup,
  faPlane,
  faBell,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isExpanded: boolean;
  onToggleSidebar: () => void;
}

const renderTab = (
  tab: Tab,
  handleClick: (_: Tab) => void,
  index: number,
  isExpanded: boolean,
) => {
  const { currentTab } = useNavigationContext();

  return (
    <button
      className={`${currentTab === tab.title ? styles.TabSelected : styles.TabUnselected} 
                 ${isExpanded ? styles.TabOpen : styles.TabClosed}`}
      onClick={() => handleClick(tab)}
      key={index}
      data-testid={"open-button"}
    >
      <FontAwesomeIcon icon={tab.icon} className={styles.SidebarIcon} />
      {isExpanded && (
        <div
          className={
            currentTab === tab.title
              ? styles.SideBarTitleSelected
              : styles.SideBarTitleUnselected
          }
        >
          {tab.title.toLocaleUpperCase()}
        </div>
      )}
    </button>
  );
};

const SideBar = ({ isExpanded, onToggleSidebar }: SidebarProps) => {
  const [docError, setDocError] = useState<string | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();
  const { setCurrentTab } = useNavigationContext();
  const { currentUser } = useUserContext();
  const { getToken } = useAuth();

  const onFlightRequestClick = async () => {
    if (!refetchDocuments) return;

    const { data: updatedDocuments } = await refetchDocuments();

    if (!updatedDocuments) return;

    const { birthCertExists, financialCertExists } = updatedDocuments;

    if (birthCertExists && financialCertExists) {
      setDocError(null); // Clear any previous error
      navigate("/request");
    } else {
      const missing: string[] = [];
      if (!birthCertExists) missing.push("Birth Certificate");
      if (!financialCertExists) missing.push("Financial Document");

      setDocError(
        `Please upload the following required document(s) before you can request a trip: ${missing.join(", ")}.`,
      );
    }
  };

  const UpperTabs = [
    { title: Tabs.HOME, link: "dashboard", icon: faHome },
    { title: Tabs.PASSENGERS, link: "passengers", icon: faPeopleGroup },
    { title: Tabs.DOCUMENTS, link: "documents", icon: faFileAlt },
    { title: Tabs.TRIPS, link: "trips", icon: faPlane },
    //{ title: Tabs.NOTIFICATIONS, link: "notifications", icon: faBell },
  ];

  const handleClick = (tab: Tab) => {
    setCurrentTab(tab.title);
    navigate(tab.link);
  };

  const {
    data: documentsData,
    isLoading: documentsLoading,
    refetch: refetchDocuments,
  } = useQuery<DocumentsData>({
    queryKey: ["documents"],
    queryFn: async () => {
      if (!currentUser) throw new Error("Missing patient data");

      const patient_name = `${currentUser["First Name"]}_${currentUser["Last Name"]}`;
      const airtableID = currentUser?.["AirTable Record ID"];
      const token = await getToken();

      return getDocumentsData(patient_name, airtableID, token);
    },
    enabled: !!currentUser,
  });

  return (
    <div className={isExpanded ? styles.SideBarOpen : styles.SideBarClosed}>
      <div className={styles.toggleLogoContainer}>
        <button
          onClick={onToggleSidebar}
          className={styles.sideBarToggleMenu}
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <img
          src={logo}
          alt="Miracle Flights"
          className={` ${!isExpanded ? styles.logoHidden : ""}`}
        />
      </div>

      <div className={styles.profileInfoContainer}>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "45px",
                height: "45px",
              },
            },
          }}
        />
        {isExpanded && user && (
          <div>
            <p
              className={styles.nameText}
            >{`${user.firstName} ${user.lastName}`}</p>
            <p className={styles.emailText}>
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        )}
      </div>

      <div className={styles.SideBarLinks}>
        <div className={styles.UpperSideBarLinks}>
          {UpperTabs.map((tab, index) =>
            renderTab(tab, handleClick, index, isExpanded),
          )}
        </div>
        <div className={styles.LowerSideBarLinks}>
          {isExpanded && (
            <>
              {docError && <div className={styles.errorText}>{docError}</div>}
              <button
                className={styles.requestTripButton}
                onClick={onFlightRequestClick}
              >
                Request a Trip
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
