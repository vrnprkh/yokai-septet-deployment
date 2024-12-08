import React, { ReactNode, useContext, useState } from "react";

interface UserContextType {
  users: Array<string>;
  setUsers: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<string[]>([]);

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
