/* eslint-disable autofix/no-unused-vars */
import styles from "./SideBarComponent.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faHome,
  faPeopleGroup,
  faPerson,
  faPlane,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface Tab {
  title: Tabs;
  link: string;
  icon: IconDefinition;
}

enum Tabs {
  DASHBOARD = "Dashboard",
  REQUEST = "Request a Flight",
  MYFLIGHTS = "My Flights",
  PERSONALINFO = "Personal Info",
  PASSENGERS = "Passengers",
}

const renderTab = (
  tab: Tab,
  isSelected: boolean,
  handleClick: (_: Tab) => void,
  index: number,
  isOpen: boolean,
) => {
  return (
    <button
      className={
        isSelected
          ? `${styles.TabSelected} ${
              isOpen ? styles.TabOpen : styles.TabClosed
            }`
          : `${styles.TabUnselected} ${
              isOpen ? styles.TabOpen : styles.TabClosed
            }`
      }
      onClick={() => handleClick(tab)}
      key={index}
    >
      <FontAwesomeIcon icon={tab.icon} className={styles.SidebarIcon} />
      {isOpen && (
        <div
          className={
            isSelected
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

const SideBar = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<Tab>({
    title: Tabs.DASHBOARD,
    link: "dashboard",
    icon: faHome,
  });
  const [isOpen, setIsOpen] = useState(true);

  const allTabs = [
    {
      title: Tabs.DASHBOARD,
      link: "dashboard",
      icon: faHome,
    },
    {
      title: Tabs.REQUEST,
      link: "request",
      icon: faTicket,
    },
    {
      title: Tabs.MYFLIGHTS,
      link: "my-flights",
      icon: faPlane,
    },
    {
      title: Tabs.PERSONALINFO,
      link: "personal-info",
      icon: faPerson,
    },
    {
      title: Tabs.PASSENGERS,
      link: "passengers",
      icon: faPeopleGroup,
    },
  ];

  const handleClick = (tab: Tab) => {
    setCurrentTab(tab);
    navigate(tab.link);
  };

  return (
    <div className={isOpen ? styles.SideBarOpen : styles.SideBarClosed}>
      <div className={styles.SideBarLinks}>
        {allTabs.map((tab, index) =>
          renderTab(
            tab,
            currentTab.title === tab.title,
            handleClick,
            index,
            isOpen,
          ),
        )}
      </div>
      <div
        className={
          isOpen
            ? styles.sideBarToggleArrowContainerOpen
            : styles.sideBarToggleArrowContainerClosed
        }
      >
        <button
          className={styles.sideBarToggleArrow}
          onClick={() => setIsOpen(!isOpen)}
          data-testid="open-button"
        >
          <FontAwesomeIcon icon={isOpen ? faArrowLeft : faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
