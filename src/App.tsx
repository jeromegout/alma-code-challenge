import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useState } from "react";

import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const { user } = useAuth();
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: "Poppins, sans-serif" }} withGlobalStyles withNormalizeCSS>
        {user ? <HomePage /> : <LoginPage />}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
