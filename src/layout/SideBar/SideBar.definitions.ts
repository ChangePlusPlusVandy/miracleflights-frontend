/* eslint-disable autofix/no-unused-vars */
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Tab {
  title: Tabs;
  link: string;
  icon: IconDefinition;
}

export enum Tabs {
  HOME = "Home",
  PASSENGERS = "Patient & Companions",
  DOCUMENTS = "Documents",
  TRIPS = "Trips",
  REQUEST = "Request a Flight",
  NOTIFICATIONS = "Notifications",
}
