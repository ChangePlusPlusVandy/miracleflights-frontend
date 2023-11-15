import styles from "./FlightTicket.module.css";
import { LegType } from "./FlightTicket.definitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faPlaneArrival,
  faPlaneDeparture,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import type { FlightTicketProps } from "./FlightTicket.definitions";

const FlightTicket = ({
  date,
  departingAirport,
  arrivingAirport,
  airline,
  legType,
}: FlightTicketProps) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.row1}>
        <div className={styles.date}>{date}</div>
      </div>

      <div className={styles.row2}>
        <div className={styles.departingAirport}>{departingAirport}</div>
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          className={styles.arrowIcon}
        />
        <div className={styles.arrivingAirport}>{arrivingAirport}</div>
      </div>

      <div className={styles.row3}>
        <div className={styles.legTypeWithImage}>
          <div className={styles.legType}>{legType.toLocaleUpperCase()}</div>
          {legTypeImage(legType)}
        </div>
        <div className={styles.airline}>{airline.toLocaleUpperCase()}</div>
      </div>

      <div className={styles.row4}>
        <div>click to see more details</div>
      </div>
    </div>
  );
};

const legTypeImage = (legType: LegType) => {
  if (legType === LegType.DEPARTURE) {
    return <FontAwesomeIcon icon={faPlaneDeparture} />;
  } else if (legType === LegType.CONNECTING) {
    return <FontAwesomeIcon icon={faPlane} />;
  } else if (legType === LegType.RETURN) {
    return <FontAwesomeIcon icon={faPlaneArrival} />;
  }
};

export default FlightTicket;
