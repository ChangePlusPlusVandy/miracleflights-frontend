import { Tabs } from "../layout/SideBar/SideBar.definitions";
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

// Navigation context types
interface NavigationContextType {
  currentTab: Tabs;
  setCurrentTab: (_: Tabs) => void;
}

// Create the context for the navigation
const NavigationContext = createContext<NavigationContextType>({
  currentTab: Tabs.DASHBOARD,
  setCurrentTab: () => {},
});

// Create the wrapper for the navigation context
export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.DASHBOARD);

  return (
    <NavigationContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Hook to access the navigation context
export const useNavigationContext = () => {
  if (!useContext(NavigationContext)) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider",
    );
  }

  return useContext(NavigationContext);
};
