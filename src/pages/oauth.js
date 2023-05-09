import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import oauthService from '../services/oauth_api';
import axios from 'axios';

export default function OauthPage() {
    const { provider } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const authToken = searchParams.get('code');

    useEffect(() => {
        switch (provider) {
            case 'google':
                oauthService
                    .googleLogin(authToken)
                    .then((res) => {
                        console.log('google', res);
                    })
                    .catch((err) => {
                        console.log('googleError', err);
                    });
                break;
            case 'kakao':
                console.log(authToken);
                // oauthService
                //     .kakaoLogin(authToken)
                //     .then((res) => {
                //         console.log('kakao', res);
                //     })
                //     .catch((err) => {
                //         console.log('kakaoError', err);
                //     });
                break;
            case 'naver':
                //request to naver
                break;
            default:
                navigate('/login');
        }
    }, [provider]);
    return (
        <div>
            <h1>소셜 로그인 로딩 중</h1>
        </div>
    );
}
