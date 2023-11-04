import App from "./App";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyFlights from "../pages/MyFlights/MyFlights";
import PersonalInfo from "../pages/PersonalInfo/PersonalInfo";
import RequestFlight from "../pages/RequestFlight/RequestFlight";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/request",
    element: <RequestFlight />,
  },
  {
    path: "/my-flights",
    element: <MyFlights />,
  },
  {
    path: "/personal-info",
    element: <PersonalInfo />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
