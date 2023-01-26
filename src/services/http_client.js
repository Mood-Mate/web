import axios from 'axios';
import secure from '../secure/secure';
import cookie from 'react-cookies';

let baseURL = secure.baseUrl;

const httpClient = axios.create({
    baseURL,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

httpClient.interceptors.request.use(
    (config) => {
        const token = cookie.load('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        }
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
