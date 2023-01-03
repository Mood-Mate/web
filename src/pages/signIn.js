import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Divider} from "@mui/material";
import Logos from "../components/SignIn/logos";
import SignInForm from "../components/SignIn/sigeInForm";
import SocialLoginButton from "../components/SignIn/socialLoginButton";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignIn() {

    return (
        <Container component="main" maxWidth="xs" >
            <Box sx={{marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <Logos />
                <SignInForm />
            </Box>
            <Divider sx = {{my:2}}/>
            <SocialLoginButton />
            <Copyright sx={{ mt: 4, mb: 4 }} />
        </Container>
    );
}