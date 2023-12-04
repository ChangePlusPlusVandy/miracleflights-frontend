import FlightTicket from "../../components/FlightTicket/FlightTicket";
import { FlightTicketColorVariant } from "../../components/FlightTicket/FlightTicket.definitions";
import { createTestFlightLegData } from "../../util/test-data.util";

const MyFlights = () => {
  // MyFlights tab

  return (
    <div>
      <FlightTicket
        flight={createTestFlightLegData()}
        colorVariant={FlightTicketColorVariant.BLUE}
        isLastElement={false}
      />
      <FlightTicket
        flight={createTestFlightLegData()}
        colorVariant={FlightTicketColorVariant.RED}
        isLastElement={true}
      />
    </div>
  );
};

export default MyFlights;
