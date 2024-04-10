import { useUserContext } from "../../context/User.context";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { useEffect } from "react";

const DashboardPage = () => {
  const { currentUser } = useUserContext();
  const { setCurrentTab } = useNavigationContext();

  useEffect(() => {
    setCurrentTab(Tabs.DASHBOARD);
  }, []);

  return (
    <>
      <h3>Current user</h3>
      <p>{JSON.stringify(currentUser)}</p>
    </>
  );
};

export default DashboardPage;
