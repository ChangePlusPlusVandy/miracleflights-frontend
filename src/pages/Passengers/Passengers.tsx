import Passenger from "../../components/Passenger/Passenger";
import { createTestPassengerData } from "../../util/test-data.util";

const Passengers = () => {
  // Passengers tab
  console.log("Passengers");

  return <Passenger passenger={createTestPassengerData()} />;
};

export default Passengers;
