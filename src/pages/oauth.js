import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import oauthService from '../services/oauth_api';
import axios from "axios";

export default function OauthPage() {
    const { provider } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const tokenRequest = async () => {
        let authToken = searchParams.get('code');

        return await axios.post('https://kauth.kakao.com/oauth/token', {
            grant_type : 'authorization_code',
            client_id : 'b7e4a310abc54328e29fd9a6a2ff066c',
            redirect_uri : 'http://localhost:3000/login/oauth2/code/kakao',
            code : authToken
        }, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {

        // let access;
        //
        // const response = axios.post('https://kauth.kakao.com/oauth/token', {
        //     grant_type : 'authorization_code',
        //     client_id : 'b7e4a310abc54328e29fd9a6a2ff066c',
        //     redirect_uri : 'http://localhost:3000/login/oauth2/code/kakao',
        //     code : authToken
        // }, {
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     }
        // }).then(result => {
        //     access = result.data.access_token;
        // }).catch(error => {
        //     console.log(error)
        // })
        //
        // console.log(access);

        switch (provider) {
            case 'google':
                break;
            case 'kakao':
                oauthService
                    .kakaoLogin()
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
