import { createContext, useContext, useState } from "react";
import type { PassengerData } from "../interfaces/passenger.interface";
import type { PropsWithChildren } from "react";

// User context types
interface UserContextType {
  currentUser: PassengerData | null;
  setCurrentUser: (_: PassengerData) => void;
}

// Create the context for the User
const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

// Create the wrapper for the User context
export const UserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<PassengerData | null>(null);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * A hook to use the Users context
 * @returns {UsersContextType} The Users context
 * @example
 * ```tsx
 * const { currentUser, setCurrentUsers } = useUsersContext();
 * ```
 */
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
