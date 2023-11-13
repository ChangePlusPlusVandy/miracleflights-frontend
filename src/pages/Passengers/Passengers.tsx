import Passenger from "../../components/Passenger/Passenger";

const Passengers = () => {
  // Passengers tab
  console.log("Passengers");

  return (
    <Passenger
      firstName="Debra"
      lastName="Lurie"
      email="debralurie@gmail.com"
      relationship="Mother"
      userType="Parent"
      dateOfBirth="01/01/1970"
    />
  );
};

export default Passengers;
