import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import MainRouter from './router/mainRouter';

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
            background: {
                default: 'rgb(222 ,245, 229 , 18%)',
                box: 'rgba(255,255,255,0.90)',
            },
        },
    });

    return (
        <RecoilRoot>
            <ThemeProvider theme={myTheme}>
                <CssBaseline />
                <MainRouter />
            </ThemeProvider>
        </RecoilRoot>
    );
}

export default App;
