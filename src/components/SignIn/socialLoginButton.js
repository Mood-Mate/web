import Button from "@mui/material/Button";
import KaKaoLogo from "../../assets/socialLogin_Icon/kakaoTalkIcon.png";
import GoogleLogo from "../../assets/socialLogin_Icon/googleIcon.png";
import NaverLogo from "../../assets/socialLogin_Icon/naverLogo.png";
import Box from "@mui/material/Box";
import * as React from "react";

export default function SocialLoginButton() {
    const socialLoginButtonStyle = {minHeight:40,minWidth:40 ,padding:0,margin:0};

    return (
        <Box sx={{display:"flex" ,justifyContent:"space-evenly"}}>
            <Button sx={{...socialLoginButtonStyle,backgroundColor:"#ffe812" }} variant="contained" >
                <img src={KaKaoLogo} height={20 } alt="카카오톡 로그인"/>
            </Button>
            <Button sx={{...socialLoginButtonStyle,backgroundColor:"#ffffff" }} variant="contained" >
                <img src={GoogleLogo} height={25} width={25} alt="구글 로그인"/>
            </Button>
            <Button sx={{...socialLoginButtonStyle,backgroundColor:"#2DB400" }} variant="contained" >
                <img src={NaverLogo} height={20} width={20} alt="네이버 로그인"/>
            </Button>
        </Box>
    );
}