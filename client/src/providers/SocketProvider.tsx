import React, { ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = React.createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = io("wss://seal-app-ys7lx.ondigitalocean.app", {
    transports: ["websocket", "polling"],
  });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const useSocketContext = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export { SocketProvider, useSocketContext };
