import { createRoot } from "react-dom/client";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainProvider } from "./providers/MainProvider.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";
import { SocketProvider } from "./providers/SocketProvider.tsx";
import Home from "./pages/Home/Home.tsx";
import Room from "./pages/Room/Room.tsx";

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
