import FlightTicket from "../../components/FlightTicket/FlightTicket";
import {
  FlightTicketColorVariant,
  LegType,
} from "../../components/FlightTicket/FlightTicket.definitions";

const MyFlights = () => {
  // MyFlights tab
  console.log("MyFlights");

  return (
    <div>
      <FlightTicket
        legType={LegType.DEPARTURE}
        date="11/14/2023"
        departingAirport="BNA"
        arrivingAirport="JFK"
        airline="Southwest"
        colorVariant={FlightTicketColorVariant.BLUE}
        isLastElement={false}
      />
      <FlightTicket
        legType={LegType.RETURN}
        date="11/15/2023"
        departingAirport="JFK"
        arrivingAirport="BNA"
        airline="Spirit"
        colorVariant={FlightTicketColorVariant.RED}
        isLastElement={true}
      />
    </div>
  );
};

export default MyFlights;
