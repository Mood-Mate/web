import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Profile from "./pages/profile";

function App() {
    const myTheme = createTheme({
        palette: {
            primary: {
                main: '#8EC3B0',
            },
            secondary: {
                main: '#9ED5C5',
            },
            tertiary: {
                main: '#BCEAD5',
            },
            divider: '#9ED5C5',
            background : {
                default: '#DEF5E5',
            }

        }
    });
    return (

            <ThemeProvider theme={myTheme} >
                <Profile />
            </ThemeProvider>


    );
}

export default App;
