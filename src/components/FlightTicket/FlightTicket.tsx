import styles from "./FlightTicket.module.css";
import { FlightTicketColorVariant, LegType } from "./FlightTicket.definitions";
import Tag from "../TagComponent/Tag";
import { TagColor } from "../TagComponent/Tag.definitions";
import FlightDetailsModal from "../../modals/FlightDetailsModal/FlightDetailsModal";
import { formatDate } from "../../util/date.util";
import { formatAirlineString } from "../../util/flight.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faPlaneArrival,
  faPlaneDeparture,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { FlightTicketProps } from "./FlightTicket.definitions";

const FlightTicket = ({ flight }: FlightTicketProps) => {
  const renderLegTypeIcon = (legType: string) => {
    if (legType === LegType.DEPARTURE) {
      return <FontAwesomeIcon icon={faPlaneDeparture} />;
    } else if (legType === LegType.CONNECTING) {
      return <FontAwesomeIcon icon={faPlane} />;
    } else {
      return <FontAwesomeIcon icon={faPlaneArrival} />;
    }
  };

  const colorVariant = FlightTicketColorVariant.RED;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className={styles.ticketBase} onClick={openModal}>
        <div
          className={
            colorVariant == FlightTicketColorVariant.RED
              ? styles.dateRowRed
              : styles.dateRowBlue
          }
        >
          <div className={styles.date}>
            {formatDate(flight.fields["Departure Date/Time"])}
          </div>
        </div>
        <div className={styles.airportsRow}>
          <div className={styles.departingAirport}>
            {flight.fields["Departure Airport"]}
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className={styles.arrowIcon}
          />
          <div className={styles.arrivingAirport}>
            {flight.fields["Arrival Airport"]}
          </div>
        </div>
        <div className={styles.detailsRow}>
          <div className={styles.legTypeWithImage}>
            <div className={styles.legType}>
              <div className={styles.legTypeText}>
                <Tag
                  color={TagColor.GREY}
                  text={flight.fields["Leg Type"].toLocaleUpperCase()}
                />
              </div>
              <div>{renderLegTypeIcon(flight.fields["Leg Type"])}</div>
            </div>
            <div className={styles.airline}>
              {formatAirlineString(
                flight.fields["Airline"].toLocaleUpperCase(),
              )}
            </div>
          </div>
        </div>
        <div className={styles.seeMoreRow}>
          <div>click to see more details</div>
        </div>
      </div>
      {isModalOpen && (
        <FlightDetailsModal onClose={closeModal} flight={flight} />
      )}
    </div>
  );
};

export default FlightTicket;
