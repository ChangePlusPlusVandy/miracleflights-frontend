import styles from "./SideBar.module.css";
import { Tabs, type Tab } from "./SideBar.definitions";
import { useNavigationContext } from "../../context/Navigation.context";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserButton, useUser } from "@clerk/clerk-react";
import logo from "../../public/0GAGNk.tif.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
  const { user } = useUser();
  const navigate = useNavigate();
  const { setCurrentTab } = useNavigationContext();

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
          {isExpanded ? (
            <button
              className={styles.requestTripButton}
              onClick={() => navigate("/request")}
            >
              Request a Trip
            </button>
          ) : null}
          {/* I'm not sure if we want to keep this or not */}
          {/* <div className={styles.profileContainer}>
            <UserButton />
            {isExpanded && (
              <div className={styles.profileInfoContainer}>
                <p>{`${user?.firstName} ${user?.lastName}`}</p>
                <p>{`${user?.primaryEmailAddress?.emailAddress}`}</p>
              </div>
            )}
          </div>
          <div className={styles.builtByContainer}>
            <img src={heartLogo} className={styles.heartLogo} alt="Logo" />
            {isExpanded && (
              <p>
                <span id={styles.smallerText}>&nbsp;&nbsp;Built by&nbsp;</span>
                <a
                  id={styles.smallerText}
                  href="https://www.changeplusplus.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ChangePlusPlus
                </a>
              </p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
