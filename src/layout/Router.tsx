import App from "./App";
import OnboardingPage from "./OnboardingPage/OnboardingPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import TripsPage from "../pages/TripsPage/TripsPage";
import RequestFlightPage from "../pages/RequestFlightPage/RequestFlightPage";
import PassengersPage from "../pages/PassengersPage/PassengersPage";
import NotificationsPage from "../pages/NotificationsPage/NotificationsPage";
import Login from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import { UserProvider } from "../context/User.context";
import { NavigationProvider } from "../context/Navigation.context";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

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
        path: "/passengers",
        element: <PassengersPage />,
      },
      {
        path: "/notifications",
        element: <NotificationsPage />,
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
  {
    path: "*",
    element: <Navigate to="/sign-in" />,
  },
]);

const Router = () => (
  <>
    <SignedIn>
      <NavigationProvider>
        <UserProvider>
          <RouterProvider router={protectedRouter} />
        </UserProvider>
      </NavigationProvider>
    </SignedIn>
    <SignedOut>
      <RouterProvider router={unprotectedRouter} />
    </SignedOut>
  </>
);

export default Router;
