import React, { ReactNode, useContext, useState } from "react";

interface MainContextType {
  name: string;
  roomId: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
}

const MainContext = React.createContext<MainContextType | undefined>(undefined);

const MainProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <MainContext.Provider value={{ name, roomId, setName, setRoomId }}>
      {children}
    </MainContext.Provider>
  );
};

const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }

  return context;
};

export { MainProvider, useMainContext };
