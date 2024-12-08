import React, { ReactNode, useState } from "react";

interface MainContextType {
  name: string;
  room: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}

const MainContext = React.createContext<MainContextType | undefined>(undefined);

const MainProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <MainContext.Provider value={{ name, room, setName, setRoom }}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
