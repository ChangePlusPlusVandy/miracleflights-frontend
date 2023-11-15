import FlightTicket from "../../components/FlightTicket/FlightTicket";
import { LegType } from "../../components/FlightTicket/FlightTicket.definitions";

const MyFlights = () => {
  // MyFlights tab
  console.log("MyFlights");

  return (
    <FlightTicket
      legType={LegType.DEPARTURE}
      date="11/14/2023"
      departingAirport="BNA"
      arrivingAirport="JFK"
      airline="Southwest"
    />
  );
};

export default MyFlights;
