import App from "./App";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import TripsPage from "../pages/TripsPage/TripsPage";
import RequestFlightPage from "../pages/RequestFlightPage/RequestFlightPage";
import ExamplePage from "../pages/ExamplePage/ExamplePage";
import PassengersPage from "../pages/PassengersPage/PassengersPage";
import Login from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import OnboardingPage from "./OnboardingPage/OnboardingPage";

const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        // redirect to dashboard
        element: <Navigate to="/dashboard" />,
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
    path: "/onboard",
    element: <OnboardingPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const unprotectedRouter = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);

const Router = () => (
  <>
    <SignedIn>
      <RouterProvider router={protectedRouter} />
    </SignedIn>
    <SignedOut>
      <RouterProvider router={unprotectedRouter} />
    </SignedOut>
  </>
);

export default Router;
