import Button from '@mui/material/Button';
import KaKaoLogo from '../../assets/socialLogin_Icon/kakaoTalkIcon.png';
import NaverLogo from '../../assets/socialLogin_Icon/naverLogo.png';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
    process.env.REACT_APP_KAKAO_API_KEY
}&redirect_uri=${
    process.env.REACT_APP_URL + process.env.REACT_APP_OAUTH_REDIRECT_URL + 'kakao'
}&response_type=code`;

export default function SocialLoginButton() {
    const socialLoginButtonStyle = { minHeight: 40, minWidth: 40, padding: 0, margin: 0 };
    const navigate = useNavigate();
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_API_KEY,
            callback: function (response) {
                console.log('google', response);
                if (response.credential) {
                    navigate(
                        process.env.REACT_APP_OAUTH_REDIRECT_URL +
                            'google' +
                            '?code=' +
                            response.credential,
                    );
                }
            },
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            type: 'icon',
            size: 'large',
        });
    }, []);
    const googleBtnRef = useRef(null);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
                sx={{ ...socialLoginButtonStyle, backgroundColor: '#ffe812' }}
                variant="contained"
                href={kakaoLoginUrl}>
                <img src={KaKaoLogo} height={20} alt="카카오톡 로그인" />
            </Button>
            <div ref={googleBtnRef} />
            <Button
                sx={{ ...socialLoginButtonStyle, backgroundColor: '#2DB400' }}
                variant="contained">
                <img src={NaverLogo} height={20} width={20} alt="네이버 로그인" />
            </Button>
        </Box>
    );
}
