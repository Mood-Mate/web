import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Profile from "./pages/profile";

function App() {
    const myTheme = createTheme({
        palette: {
            primary: {
                main: 'rgb(153, 114, 107)',
                darker: '#053e85',
            },
            secondary: {
                main: '#F0DBDB',
                darker: '#053e85',
            },
            tertiary: {
                main: '#F5EBE0',
                darker: '#053e85',
            },
            divider: 'rgba(153,114,107,0.38)',
            background : {
                default: 'rgba(255,246,241,0.55)',
                dark: '#053e85',
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
