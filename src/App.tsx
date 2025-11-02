import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Placeholder routes for future features */}
          <Route
            path="/random-number"
            element={<div>Random Number - Coming Soon</div>}
          />
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
  );
}
