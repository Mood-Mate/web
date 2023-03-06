import axios from 'axios';
import cookie from 'react-cookies';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api/',
    //timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

httpClient.interceptors.request.use(
    (config) => {
        const token = cookie.load('access_token');
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Do something, call refreshToken() request for example;
                // return a request
                //return axios_instance(config);
                //refresh토큰으로 토큰 재요청 후 그것도 안되면 로그아웃.
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    },
);

export default httpClient;
