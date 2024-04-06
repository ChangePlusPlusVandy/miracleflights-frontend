import { useUserContext } from "../../context/User.context";

const DashboardPage = () => {
  const { currentUser } = useUserContext();
  return (
    <>
      <h3>Current user</h3>
      <p>{JSON.stringify(currentUser)}</p>
    </>
  );
};

export default DashboardPage;
