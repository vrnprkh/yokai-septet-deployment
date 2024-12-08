import React, { ReactNode } from "react";

const SocketContext = React.createContext<SocketIOClient.Socket | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = io("ws://localhost:3000", {
    transports: ["websocket", "polling"],
  });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
