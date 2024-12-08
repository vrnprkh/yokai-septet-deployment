import React, { ReactNode, useState } from "react";

interface UserContextType {
  users: Array<string>;
  setUsers: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
