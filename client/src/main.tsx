import { createRoot } from "react-dom/client";

import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home.tsx";
import Room from "./Room.tsx";
import { MainProvider } from "./MainProvider.tsx";


createRoot(document.getElementById("root")!).render(
  <MainProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="room" element={<Room/>} />
      </Routes>
    </BrowserRouter>
  </MainProvider>
);
