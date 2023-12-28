/* eslint-disable autofix/no-unused-vars */
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Tab {
  title: Tabs;
  link: string;
  icon: IconDefinition;
}

export enum Tabs {
  DASHBOARD = "Dashboard",
  REQUEST = "Request a Flight",
  MYFLIGHTS = "My Flights",
  PERSONALINFO = "Personal Info",
  PASSENGERS = "Passengers",
}
