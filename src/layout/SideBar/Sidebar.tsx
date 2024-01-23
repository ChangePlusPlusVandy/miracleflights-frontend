import styles from "./SideBar.module.css";
import { Tabs, type Tab } from "./SideBar.definitions";
import Button from "../../components/Button/Button";
import {
  ButtonColor,
  ButtonVariant,
} from "../../components/Button/Button.definitions";
import heartLogo from "../../public/Vector.png";
import logo from "../../public/0GAGNk.tif.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPeopleGroup,
  faPerson,
  faPlane,
  faFile,
  faBars,
  faCircleQuestion,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

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
      data-testid={"open-button"}
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

  const UpperTabs = [
    {
      title: Tabs.DASHBOARD,
      link: "dashboard",
      icon: faHome,
    },
    {
      title: Tabs.PASSENGERS,
      link: "passengers",
      icon: faPeopleGroup,
    },
    {
      title: Tabs.DOCUMENTS,
      link: "documents",
      icon: faFile,
    },
    {
      title: Tabs.TRIPS,
      link: "trips",
      icon: faPlane,
    },
    {
      title: Tabs.PERSONAL_INFO,
      link: "personal-info",
      icon: faPerson,
    },
  ];
  const LowerTabs = [
    {
      title: Tabs.SUPPORT,
      link: "support",
      icon: faCircleQuestion,
    },
    {
      title: Tabs.SETTINGS,
      link: "settings",
      icon: faGear,
    },
  ];

  const handleClick = (tab: Tab) => {
    setCurrentTab(tab);
    navigate(tab.link);
  };

  return (
    <div className={isOpen ? styles.SideBarOpen : styles.SideBarClosed}>
      <div className={styles.sideBarToggleMenuContainer}>
        <button
          className={styles.sideBarToggleMenu}
          onClick={() => setIsOpen(!isOpen)}
          data-testid="open-button"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className={styles.Logo}>
        <img
          className={isOpen ? styles.logoImageOpen : styles.logoImageClosed}
          src={logo}
          alt="Logo"
        />
      </div>
      {isOpen && (
        <div className={styles.RequestFlight}>
          <Button
            text={"Request a Flight"}
            color={ButtonColor.White}
            textStyles={{
              fontSize: "16px",
              color: "#7196D0",
            }}
            variant={ButtonVariant.Compact}
            extraStyles={{
              boxShadow: "0px 0.25rem  0.25rem rgba(0, 0.125rem, 0, 0.1)",
              borderRadius: "0.25rem",
            }}
            onClick={() => navigate("request")}
          />
        </div>
      )}
      <div className={styles.SideBarLinks}>
        <div className={styles.UpperSideBarLinks}>
          {UpperTabs.map((tab, index) =>
            renderTab(
              tab,
              currentTab.title === tab.title,
              handleClick,
              index,
              isOpen,
            ),
          )}
        </div>
        <div className={styles.LowerSideBarLinks}>
          {LowerTabs.map((tab, index) =>
            renderTab(
              tab,
              currentTab.title === tab.title,
              handleClick,
              index,
              isOpen,
            ),
          )}
          <div className={styles.builtByContainer}>
            <img src={heartLogo} className={styles.heartLogo} alt="Logo" />
            {isOpen && (
              <p>
                <span id={styles.smallerText}>&nbsp;&nbsp;Built by&nbsp;</span>
                <a
                  id={styles.smallerText}
                  href="https://www.changeplusplus.org/"
                >
                  ChangePlusPlus
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
