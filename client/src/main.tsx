import { createRoot } from "react-dom/client";

import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Room from "./Room.tsx";
import { MainProvider } from "./MainProvider.tsx";
import { UserProvider } from "./UserProvider.tsx";
import { SocketProvider } from "./SocketProvider.tsx";
import Home from "./components/home.tsx";

createRoot(document.getElementById("root")!).render(
  <MainProvider>
    <UserProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="room" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </UserProvider>
  </MainProvider>
);
