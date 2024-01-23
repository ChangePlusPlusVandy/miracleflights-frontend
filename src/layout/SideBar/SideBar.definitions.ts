/* eslint-disable autofix/no-unused-vars */
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Tab {
  title: Tabs;
  link: string;
  icon: IconDefinition;
}

export enum Tabs {
  DASHBOARD = "Dashboard",
  PASSENGERS = "Patient & Companions",
  DOCUMENTS = "Documents",
  TRIPS = "Trips",
  PERSONAL_INFO = "Personal Info",
  REQUEST = "Request a Flight",
  SUPPORT = "Support",
  SETTINGS = "Profile Settings",
}
