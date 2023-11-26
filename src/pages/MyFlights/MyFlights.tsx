import FlightTicket from "../../components/FlightTicket/FlightTicket";
import {
  FlightTicketColorVariant,
  LegType,
} from "../../components/FlightTicket/FlightTicket.definitions";
import FlightDetailsModal from "../../modals/FlightDetailsModal/FlightDetailsModal";

const MyFlights = () => {
  // MyFlights tab
  console.log("MyFlights");

  return (
    <div>
      <FlightTicket
        legType={LegType.CONNECTING}
        date="11/14/2023"
        departingAirport="BNA "
        arrivingAirport="JFK"
        airline="Southwest"
        colorVariant={FlightTicketColorVariant.BLUE}
        isLastElement={false}
      />

      <FlightDetailsModal
        legType={LegType.CONNECTING}
        date="11/14/2023"
        departingAirport="BNA "
        arrivingAirport="JFK"
        airline="Southwest"
      />
    </div>
  );
};

export default MyFlights;
