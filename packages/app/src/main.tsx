import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar.tsx";
import "./index.css";
import DisplayMonsters from "./routes/DisplayMonsters.tsx";
import CreateMonsters from "./routes/CreateMonsters.tsx";
import MonsterShow from "./routes/MonsterShow.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#512888",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<DisplayMonsters />}></Route>
          <Route path="/new" element={<CreateMonsters />}></Route>
          <Route path="/show" element={<MonsterShow />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
