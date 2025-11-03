import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import HomePage from "./pages/HomePage";
import RandomNumber from "./components/RandomNumber";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" zIndex={1000} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Random Number Generator */}
            <Route path="/random-number" element={<RandomNumber />} />
            {/* Placeholder routes for future features */}
            <Route
              path="/random-games"
              element={<div>Random Games - Coming Soon</div>}
            />
            <Route
              path="/spin-wheel"
              element={<div>Spin Wheel - Coming Soon</div>}
            />
            <Route
              path="/list-picker"
              element={<div>List Picker - Coming Soon</div>}
            />
            <Route
              path="/password-generator"
              element={<div>Password Generator - Coming Soon</div>}
            />
            <Route
              path="/color-generator"
              element={<div>Color Generator - Coming Soon</div>}
            />
            <Route
              path="/team-generator"
              element={<div>Team Generator - Coming Soon</div>}
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </LanguageProvider>
  );
}
