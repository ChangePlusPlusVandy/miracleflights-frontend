import styles from "./FlightTicket.module.css";
// import Tag from "../../../../components/Tag/Tag";
// import { TagColor } from "../../../../components/Tag/Tag.definitions";
import FlightDetailsModal from "../FlightDetailsModal/FlightDetailsModal";
import { formatDate } from "../../../../util/date.util";
import { useState } from "react";
// import { formatAirlineString } from "../../../../util/flight.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import type { FlightTicketProps } from "./FlightTicket.definitions";

const FlightTicket = ({ flight }: FlightTicketProps) => {
  // const [departureImageUrl, setDepartureImageUrl] = useState<string>('');
  // const [arrivalImageUrl, setArrivalImageUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const cityImages: Array<string> = [
    `url("https://t3.ftcdn.net/jpg/04/00/28/14/360_F_400281443_i56g5NEq4opesN2LLPC5qn2Mvr2j440d.jpg")`,
    `url("https://media.istockphoto.com/id/464852512/photo/seattle-skyline-at-night-with-mt-rainier-in-the-distance.jpg?s=612x612&w=0&k=20&c=yBBr2gTWY7OSh-ogIUeNIJKJmaiSJOgxQvZHrFyEPGc=")`,
    `url("https://t3.ftcdn.net/jpg/00/35/35/40/360_F_35354022_kVyRIi42r1EReIdrVQ7iXANMZ3zeDNio.jpg")`,
    `url("https://image.cnbcfm.com/api/v1/image/107139583-1666620871667-gettyimages-1359908964-dji_0973hdrpanoedit_1639963084.jpeg?v=1666799178&w=630&h=354&ffmt=webp&vtcrop=y")`,
    `url("https://www.shutterstock.com/image-photo/nashville-skyline-moon-260nw-1041309010.jpg")`,
  ];
  console.log(flight);

  let currentDepartureImage = -1;
  const getCityImage = (): number => {
    const num = Math.floor(Math.random() * cityImages.length);
    if (num === currentDepartureImage) {
      return getCityImage();
    }
    return num;
  };

  currentDepartureImage = getCityImage();
  const currentArrivalImage = getCityImage();

  return (
    <div className={styles.flightTicket}>
      <div className={styles.ticketBase} onClick={openModal}>
        <div className={styles.dateRow}>
          <div className={styles.date}>
            {formatDate(flight["Departure Date/Time"])}
          </div>
        </div>

        <div className={styles.flightInfoRow}>
          <div
            className={styles.departureInfo}
            style={{ backgroundImage: cityImages.at(currentDepartureImage) }}
          >
            <div className={styles.backgroundOverlay}> </div>
            <div className={styles.cityAndAirport}>
              {`${flight["Departure Airport"]}`}
            </div>

            <div className={styles.flightNumAndTime}>
              {formatDate(flight["Departure Date/Time"])}
            </div>
          </div>
          <div className={styles.separator}>
            <FontAwesomeIcon icon={faPlane} className={styles.plane} />
          </div>

          <div
            className={styles.arrivalInfo}
            style={{ backgroundImage: cityImages.at(currentArrivalImage) }}
          >
            <div className={styles.backgroundOverlay}> </div>
            <div className={styles.cityAndAirport}>
              {`${flight["Arrival Airport"]}`}
            </div>

            <div className={styles.flightNumAndTime}>
              {formatDate(flight["Arrival Date/Time"])}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <FlightDetailsModal onClose={closeModal} flight={flight} />
      )}
    </div>
  );
};

export default FlightTicket;
