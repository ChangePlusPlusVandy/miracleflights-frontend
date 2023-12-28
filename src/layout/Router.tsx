import App from "./App";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyFlights from "../pages/MyFlights/MyFlights";
import PersonalInfo from "../pages/PersonalInfo/PersonalInfo";
import RequestFlight from "../pages/RequestFlight/RequestFlight";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ExamplePage from "../pages/ExamplePage/ExamplePage";
import Passengers from "../pages/Passengers/Passengers";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      {
        path: "/example",
        element: <ExamplePage />,
      },
      {
        path: "/passengers",
        element: <Passengers />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
