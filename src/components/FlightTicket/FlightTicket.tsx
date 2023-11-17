import styles from "./FlightTicket.module.css";
import { ColorType, LegType } from "./FlightTicket.definitions";
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
  colorVariant,
  isLastElement,
}: FlightTicketProps) => {
  return (
    <div className={styles.ticketBase}>
      <div
        className={
          colorVariant == ColorType.RED && isLastElement == false
            ? styles.row1Red
            : colorVariant == ColorType.RED && isLastElement == true
            ? styles.row1RedNoBorder
            : colorVariant == ColorType.BLUE && isLastElement == false
            ? styles.row1Blue
            : colorVariant == ColorType.BLUE && isLastElement == true
            ? styles.row1BlueNoBorder
            : styles.row1BlueNoBorder
        }
      >
        <div className={styles.date}>{date}</div>
      </div>
      <div
        className={
          isLastElement == false ? styles.ticketBorder : styles.ticketNoBorder
        }
      >
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
      </div>
      <div
        className={isLastElement == false ? styles.row4 : styles.row4NoBorder}
      >
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
