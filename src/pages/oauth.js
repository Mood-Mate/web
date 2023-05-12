import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import oauthService from '../services/oauth_api';
import axios from 'axios';
import cookie from 'react-cookies';
import authService from '../services/auth_api';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atom/auth';

export default function OauthPage() {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get('access_token');
    const { provider } = useParams();
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    console.log(accessToken)

    cookie.remove('access_token');

    const expires = new Date();
    expires.setDate(expires.getDate() + 7); //7일동안 쿠키 유지
    cookie.save('access_token', accessToken, {
        path: '/',
        expires,
    });

    axios.post(process.env.REACT_APP_API_URL + '/api/member/auth', null , {headers : {Authorization : `Bearer ${accessToken}`}})
        .then(response => {
            console.log(response);

            if (response?.data) {
                        setUser({
                            isLogin: true,
                            provider,
                            id: response.data['memberId'],
                            name: response.data['name'],
                            nickname: response.data['nickname'],
                            introduce: response.data['introduce'],
                            picture: response.data['picture'],
                            email: response.data['email'],
                            dateOfBirth: response.data['dateOfBirth'],
                            gender: response.data['gender'],
                        });
                        console.log('로그인 완료');
                        navigate('/');
                }
        })
        .catch(err => {
            console.log(err);
        })



    // useEffect(async () => {
    //
    //     console.log(authToken)
    //
    //     authService.getUser(authToken)
    //     .then((response) => {
    //         console.log(response);
    //     })
    //
        // if (authToken) {
        //     const expires = new Date();
        //     expires.setDate(expires.getDate() + 7); //7일동안 쿠키 유지
        //     authService.getUser(authToken).then((response) => {
        //         if (response) {
        //             handleResponse(provider, response);/**/
        //         }
        //     });
        // }
    // }, [provider]);

    // const handleResponse = (vendor, response) => {
    //     if (response?.data) {
    //         setUser({
    //             isLogin: true,
    //             vendor,
    //             id: response.data['memberId'],
    //             name: response.data['name'],
    //             nickname: response.data['nickname'],
    //             introduce: response.data['introduce'],
    //             picture: response.data['picture'],
    //             email: response.data['email'],
    //             dateOfBirth: response.data['dateOfBirth'],
    //             gender: response.data['gender'],
    //         });
    //         console.log('로그인 완료');
    //         navigate('/');
    //     } else {
    //         alert('로그인 실패');
    //     }
    // };



    return (
        <div>
            <h1>소셜 로그인 로딩 중</h1>
        </div>
    );
}
