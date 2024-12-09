import { createRoot } from "react-dom/client";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainProvider } from "./providers/MainProvider.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";
import { SocketProvider } from "./providers/SocketProvider.tsx";
import Home from "./pages/Home/Home.tsx";
import Room from "./pages/Room/Room.tsx";
import Game from "./pages/Game/Game.tsx";
import { GameProvider } from "./providers/GameProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <MainProvider>
    <UserProvider>
      <GameProvider>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="room" element={<Room />} />
              <Route path="game" element={<Game />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </GameProvider>
    </UserProvider>
  </MainProvider>
);
