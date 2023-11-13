import Passenger from "../../components/Passenger/Passenger";

const Passengers = () => {
  // Passengers tab
  console.log("Passengers");

  return (
    <Passenger
      firstName="Jake"
      lastName="Lurie"
      email="jake.lurie@vanderbilt.edu"
      relationship="child"
      userType="patient"
      dateOfBirth="12/06/2001"
    />
  );
};

export default Passengers;
