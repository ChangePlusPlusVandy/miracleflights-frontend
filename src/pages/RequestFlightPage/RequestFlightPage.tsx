import FlightTimeSelector from "./components/FlightTimeSelector/FlightTimeSelector/FlightTimeSelector";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useEffect } from "react";

const RequestFlightPage = () => {
  const { setCurrentTab } = useNavigationContext();

  useEffect(() => {
    setCurrentTab(Tabs.REQUEST);
  }, []);

  return (
    <div>
      <FlightTimeSelector />
    </div>
  );
};

export default RequestFlightPage;
