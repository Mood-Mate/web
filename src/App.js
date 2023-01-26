import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Profile from 'pages/profile';
import Home from 'pages/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from 'pages/signIn';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import PrivateRoute from 'pages/router';

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
        },
    });

    return (
        <RecoilRoot>
            <ThemeProvider theme={myTheme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<PrivateRoute component={<Home />} />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/*" element={<Navigate to="/" />}></Route>
                    </Routes>
                </BrowserRouter>

                {/*<SignIn />*/}
                {/*<Profile />*/}
            </ThemeProvider>
        </RecoilRoot>
    );
}

export default App;
