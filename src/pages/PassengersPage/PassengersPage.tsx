import PassengerCard from "./components/PassengerCard/PassengerCard";
import { createTestPassengerData } from "../../util/test-data.util";

const PassengersPage = () => {
  // Passengers tab
  console.log("Passengers");

  return <PassengerCard passenger={createTestPassengerData()} />;
};

export default PassengersPage;
