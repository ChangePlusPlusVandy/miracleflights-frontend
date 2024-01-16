import Passenger from "./components/Passenger/Passenger";
import { createTestPassengerData } from "../../util/test-data.util";

const PassengersPage = () => {
  // Passengers tab
  console.log("Passengers");

  return <Passenger passenger={createTestPassengerData()} />;
};

export default PassengersPage;
