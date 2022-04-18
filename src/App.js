import Login from "./pages/Login";
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./providers/theme";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
