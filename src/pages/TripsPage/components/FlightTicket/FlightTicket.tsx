import styles from "./FlightTicket.module.css";
import FlightDetailsModal from "../FlightDetailsModal/FlightDetailsModal";
import { formatDate } from "../../../../util/date.util";
import Tag from "../../../../components/Tag/Tag";
import { TagColor } from "../../../../components/Tag/Tag.definitions";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import type { FlightTicketProps } from "./FlightTicket.definitions";

const FlightTicket = ({ flight, index, isDeparture }: FlightTicketProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const getCityImage = (isDeparture: boolean = false): number => {
    // using the name, generate a number from 0 to 4
    const city = flight[isDeparture ? "Departure Airport" : "Arrival Airport"];
    let sum = 0;
    for (let i = 0; i < city.length; i++) {
      sum += city.charCodeAt(i);
    }

    if (isDeparture) {
      sum = (sum + 2) % 9;
    } else {
      sum = sum % 9;
    }

    return sum;
  };

  const cityImages: Array<string> = [
    `url("https://t3.ftcdn.net/jpg/04/00/28/14/360_F_400281443_i56g5NEq4opesN2LLPC5qn2Mvr2j440d.jpg")`,
    `url("https://media.istockphoto.com/id/464852512/photo/seattle-skyline-at-night-with-mt-rainier-in-the-distance.jpg?s=612x612&w=0&k=20&c=yBBr2gTWY7OSh-ogIUeNIJKJmaiSJOgxQvZHrFyEPGc=")`,
    `url("https://t3.ftcdn.net/jpg/00/35/35/40/360_F_35354022_kVyRIi42r1EReIdrVQ7iXANMZ3zeDNio.jpg")`,
    `url("https://image.cnbcfm.com/api/v1/image/107139583-1666620871667-gettyimages-1359908964-dji_0973hdrpanoedit_1639963084.jpeg?v=1666799178&w=630&h=354&ffmt=webp&vtcrop=y")`,
    `url("https://www.travelandleisure.com/thmb/DCQ5PIzBVcgmRVxG-i3psgmWiWE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-nashville-NASHVILLETMOG0723-2b95531d62b24c3fa0d4de045f35a247.jpg")`,
    `url("https://media.cnn.com/api/v1/images/stellar/prod/180601141732-01-cleveland-ohio-overall.jpg?q=w_3484,h_1960,x_0,y_0,c_fill")`,
    `url("https://interactive.wttw.com/sites/default/files/explore-chicago-from-the-air-hero_02.jpg")`,
    `url("https://www.travelandleisure.com/thmb/C2HF7mjj0peCcdBdvauc3WsSsCY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-tampa-lead-image-TAMPAFL0224-25a08c38098c4c9fad099c3f65bc06f5.jpg")`,
    `url("https://www.redfin.com/blog/wp-content/uploads/2023/03/GettyImages-1319558642.jpg")`,
  ];

  return (
    <div className={styles.flightTicket}>
      <div className={styles.ticketBase} onClick={openModal}>
        <div className={styles.dateRow}>
          <div className={styles.date}>
            {formatDate(flight["Departure Date/Time"])}
          </div>
          <h5>{`Leg #${index}`}</h5>
          <Tag
            color={isDeparture ? TagColor.BLUE : TagColor.RED}
            text={isDeparture ? "Depart" : "Return"}
          />
        </div>
        <div className={styles.flightInfoRow}>
          <div
            className={styles.departureInfo}
            style={{ backgroundImage: cityImages.at(getCityImage()) }}
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
            style={{ backgroundImage: cityImages.at(getCityImage(true)) }}
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
