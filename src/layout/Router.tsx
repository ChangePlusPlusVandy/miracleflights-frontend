import App from "./App";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import TripsPage from "../pages/TripsPage/TripsPage";
import RequestFlightPage from "../pages/RequestFlightPage/RequestFlightPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ExamplePage from "../pages/ExamplePage/ExamplePage";
import PassengersPage from "../pages/PassengersPage/PassengersPage";
import Login from "../pages/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/request",
        element: <RequestFlightPage />,
      },
      {
        path: "/trips",
        element: <TripsPage />,
      },
      {
        path: "/example",
        element: <ExamplePage />,
      },
      {
        path: "/passengers",
        element: <PassengersPage />,
      },
      {
        path: "/documents",
        element: <div>Documents</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
