import client from './http_client';
import cookie from 'react-cookies';

class Auth {
    login = async (email, password) => {
        try {
            const response = await client.post('member/login', {
                email: email,
                password: password,
            });
            console.log(response);
            return await this.getUser(response.data['accessToken']);
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    getUser = async (token) => {
        try {
            if (token) {
                const expires = new Date();
                expires.setDate(expires.getDate() + 1); // 1일동안 쿠키 유지
                cookie.save('access_token', token, {
                    path: '/',
                    expires,
                });
            }
            const response = await client.post('member/auth');
            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    getUserInfoById = async (id) => {
        ///api/member/{memberId}/profile
        try {
            const response = await client.get(`member/${id}/profile`);
            console.log(response);
            return {
                id: response.data['memberId'],
                name: response.data['name'],
                introduction: response.data['introduce'],
                profileImage: response.data['picture'],
                nickname: response.data['nickname'],
                followerCount: response.data['followerCount'],
                followeeCount: response.data['followeeCount'],
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}

const authService = new Auth();
export default authService;
