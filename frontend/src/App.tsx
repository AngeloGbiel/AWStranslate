import { CSSreset } from "./Components/CSSreset";
import Home from "./Components/Home";
import { createTheme, ThemeProvider } from "@mui/material";

const primary = {
  main: '#4F88F3',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
};

const theme = createTheme({
  palette:{
    primary,
  }
})

const App = () =>{
  return(
    <ThemeProvider theme={theme}>
      <CSSreset/>
      <Home/>
    </ThemeProvider>
  )
}
export default App;