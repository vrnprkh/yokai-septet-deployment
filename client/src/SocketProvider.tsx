import React, { ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = React.createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = io("ws://localhost:3000", {
    transports: ["websocket", "polling"],
  });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
