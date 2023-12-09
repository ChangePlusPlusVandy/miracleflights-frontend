import styles from "./SideBarComponent.module.css";
import { PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

interface Tab {
  title: Tabs;
  link: string;
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
  handleClick: (_: Tab) => void
) => {
  return (
    <button
      className={isSelected ? styles.TabSelected : styles.TabNotSelected}
      onClick={() => handleClick(tab)}
    >
      <FontAwesomeIcon icon={faPlane as unknown as IconProp} />
      {tab.title}
    </button>
  );
};

const SideBar = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<Tab>({
    title: Tabs.DASHBOARD,
    link: "dashboard",
  });

  const allTabs = [
    {
      title: Tabs.DASHBOARD,
      link: "dashboard",
    },
    {
      title: Tabs.REQUEST,
      link: "request",
    },
    {
      title: Tabs.MYFLIGHTS,
      link: "my-flights",
    },
    {
      title: Tabs.PERSONALINFO,
      link: "personal-info",
    },
    {
      title: Tabs.PASSENGERS,
      link: "passengers",
    },
  ];

  const handleClick = (tab: Tab) => {
    setCurrentTab(tab);
    navigate(tab.link);
  };

  return (
    <div className={styles.SideBar}>
      {allTabs.map((tab) => renderTab(tab, currentTab === tab, handleClick))}
    </div>
  );
};

export default SideBar;
