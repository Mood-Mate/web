import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Profile from 'pages/profile';
import Mainpage from 'pages/main';
import SignIn from "pages/signIn";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";

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
            quaternary: {
                main: '#DEF5E5',
            },
            divider: '#9ED5C5',


        }
    });
    return (

            <ThemeProvider theme={myTheme} >
                <CssBaseline />
                <SignIn />
                {/*<Profile />*/}
            </ThemeProvider>


    );
}

export default App;
