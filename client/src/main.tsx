import { createRoot } from "react-dom/client";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainProvider } from "./MainProvider.tsx";
import { UserProvider } from "./UserProvider.tsx";
import { SocketProvider } from "./SocketProvider.tsx";
import Home from "./components/home.tsx";
import Game from "./components/Game.tsx";
import Room from "./Room.tsx";

createRoot(document.getElementById("root")!).render(
  <MainProvider>
    <UserProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="room" element={<Room />} />
            <Route path="game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </UserProvider>
  </MainProvider>
);
