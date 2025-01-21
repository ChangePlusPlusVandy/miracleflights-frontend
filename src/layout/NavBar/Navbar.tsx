import styles from "./Navbar.module.css";
import logo from "../../public/0GAGNk.tif.png";
import { UserButton } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <button
          className={styles.toggleButton}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <img src={logo} alt="Miracle Flights" className={styles.logo} />
        <div className={styles.menuLinks}>
          <div className={styles.menuItem}>
            <span>Miracle Stories</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDown}
            />
          </div>
          <div className={styles.menuItem}>
            <span>About Us</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDown}
            />
          </div>
          <div className={styles.menuItem}>
            <span>Events</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDown}
            />
          </div>
          <div className={styles.menuItem}>
            <span>Get Involved</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevronDown}
            />
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.notificationContainer}>
          <FontAwesomeIcon icon={faBell} className={styles.bellIcon} />
          <div className={styles.notificationBadge}>3</div>
        </div>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
