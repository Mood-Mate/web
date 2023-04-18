import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import oauthService from '../services/oauth_api';

export default function OauthPage() {
    const { provider } = useParams();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        let authToken = searchParams.get('code');
        console.log('authToken', authToken);
        switch (provider) {
            case 'google':
                break;
            case 'kakao':
                oauthService
                    .kakaoLogin(authToken)
                    .then((res) => {
                        console.log('kakao', res);
                    })
                    .catch((err) => {
                        console.log('kakaoError', err);
                    });
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
