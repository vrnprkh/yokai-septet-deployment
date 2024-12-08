import React, { ReactNode, useContext, useState } from "react";
import { User } from "./Room";

interface UserContextType {
  users: Array<User>;
  setUsers: React.Dispatch<React.SetStateAction<Array<User>>>;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

export { useUserContext, UserProvider };
