import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Home from '../pages/home';
import SignIn from '../pages/signIn';
import Profile from '../pages/profile';
import Editor from '../pages/editor';
import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atom/auth';
import cookie from 'react-cookies';
import authService from '../services/auth_api';
import { useEffect, useState } from 'react';

export default function MainRouter() {
    const setUser = useSetRecoilState(userState);
    const [init, setInit] = useState(false);
    async function initializeUserInfo() {
        if (cookie.load('access_token')) {
            const response = await authService.getUser();
            if (response?.data) {
                console.log('로그인 유지');
                setUser({
                    isLogin: true,
                    vendor: 'email',
                    id: response.data['memberId'],
                    nickName: response.data['nickname'],
                    introduction: response.data['introduce'],
                    profileImage: response.data['picture'],
                    email: response.data['email'],
                });
            }
        }
        setInit(true);
    }

    useEffect(() => {
        initializeUserInfo();
    }, []);

    if (init) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<PrivateRoute component={<Home />} />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/:userId" element={<PrivateRoute component={<Profile />} />} />
                    <Route path="/editor" element={<PrivateRoute component={<Editor />} />} />
                    <Route path="/*" element={<Navigate to="/" />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else {
        return <div>Loading</div>;
    }
}
