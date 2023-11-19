import FlightTicket from "../../components/FlightTicket/FlightTicket";
import {
  FlightTicketColorVariant,
  LegType,
} from "../../components/FlightTicket/FlightTicket.definitions";

const MyFlights = () => {
  // MyFlights tab
  console.log("MyFlights");

  return (
    <FlightTicket
      legType={LegType.CONNECTING}
      date="11/14/2023"
      departingAirport="BNA "
      arrivingAirport="JFK"
      airline="Southwest"
      colorVariant={FlightTicketColorVariant.BLUE}
      isLastElement={false}
    />
  );
};

export default MyFlights;
