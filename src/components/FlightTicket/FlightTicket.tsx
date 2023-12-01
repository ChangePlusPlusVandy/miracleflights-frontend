import styles from "./FlightTicket.module.css";
import { FlightTicketColorVariant, LegType } from "./FlightTicket.definitions";
import FlightDetailsModal from "../../modals/FlightDetailsModal/FlightDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faPlaneArrival,
  faPlaneDeparture,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
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
  const renderLegTypeIcon = (legType: LegType) => {
    if (legType === LegType.DEPARTURE) {
      return <FontAwesomeIcon icon={faPlaneDeparture} />;
    } else if (legType === LegType.CONNECTING) {
      return <FontAwesomeIcon icon={faPlane} />;
    } else {
      return <FontAwesomeIcon icon={faPlaneArrival} />;
    }
  };

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
            colorVariant == FlightTicketColorVariant.RED &&
            isLastElement == false
              ? styles.dateRowRed
              : colorVariant == FlightTicketColorVariant.RED &&
                isLastElement == true
              ? styles.dateRowRedNoBorder
              : colorVariant == FlightTicketColorVariant.BLUE &&
                isLastElement == false
              ? styles.dateRowBlue
              : colorVariant == FlightTicketColorVariant.BLUE &&
                isLastElement == true
              ? styles.dateRowBlueNoBorder
              : styles.dateRowBlueNoBorder
          }
        >
          <div className={styles.date}>{date}</div>
        </div>
        <div
          className={
            isLastElement == false ? styles.ticketBorder : styles.ticketNoBorder
          }
        >
          <div className={styles.airportsRow}>
            <div className={styles.departingAirport}>{departingAirport}</div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className={styles.arrowIcon}
            />
            <div className={styles.arrivingAirport}>{arrivingAirport}</div>
          </div>

          <div className={styles.detailsRow}>
            <div className={styles.legTypeWithImage}>
              <div className={styles.legType}>
                {legType.toLocaleUpperCase()}
              </div>
              {renderLegTypeIcon(legType)}
            </div>
            <div className={styles.airline}>{airline.toLocaleUpperCase()}</div>
          </div>
        </div>
        <div
          className={
            isLastElement == false
              ? styles.seeMoreRow
              : styles.seeMoreRowNoBorder
          }
        >
          <div>click to see more details</div>
        </div>
      </div>
      {isModalOpen && (
        <FlightDetailsModal
          onClose={closeModal}
          legType={legType}
          date={date}
          departingAirport={departingAirport}
          arrivingAirport={arrivingAirport}
          airline={airline}
        />
      )}
    </div>
  );
};

export default FlightTicket;
