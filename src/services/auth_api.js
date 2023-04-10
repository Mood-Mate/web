import client from './http_client';
import cookie from 'react-cookies';

class Auth {
    login = async (email, password) => {
        try {
            const response = await client.post('member/login', {
                email: email,
                password: password,
            });
            console.log('login', response);
            return await this.getUser(response.data['accessToken']);
        } catch (error) {
            console.log('login', error);
            return null;
        }
    };
    getUser = async (token) => {
        try {
            if (token) {
                const expires = new Date();
                expires.setDate(expires.getDate() + 7); //7일동안 쿠키 유지
                cookie.save('access_token', token, {
                    path: '/',
                    expires,
                });
            }
            const response = await client.post('member/auth');
            console.log('getUser', response);

            return response;
        } catch (error) {
            console.log('getUser', error);
            return null;
        }
    };

    editUser = async (id, key, value) => {
        try {
            let data;
            const formData = new FormData();

            if (key === 'dateOfBirth') {
                const date = new Date(value);
                data = {
                    memberId: id,
                    year: date.getFullYear().toString(),
                    month: (date.getMonth() + 1).toString(),
                    dayOfMonth: date.getDate().toString(),
                };
            } else if (key === 'picture') {
                formData.append('picture', value);
            } else {
                data = {
                    memberId: id,
                    [key]: value,
                };
            }
            const response = await client.patch('member', key === 'picture' ? formData : data);
            console.log('editUser', response);
            return response;
        } catch (error) {
            console.log('editUser', error);
            return null;
        }
    };

    createUser = async ({ email, password, name, nickname, gender, birth }) => {
        try {
            const data = {
                email: email,
                password: password,
                name: name,
                nickname: nickname,
                gender: gender === 'man' ? 'MAN' : 'WOMAN',
                year: birth.year(),
                month: birth.month() + 1,
                dayOfMonth: birth.date(),
            };
            const response = await client.post('member', data);
            console.log('createUser', data, response);
            return true;
        } catch (error) {
            console.log('createUser', error);
            return false;
        }
    };
    getUserInfoById = async (id) => {
        ///api/member/{memberId}/profile
        try {
            const response = await client.get(`member/${id}/profile`);
            console.log('getUserInfoById', response);
            return {
                id: response.data['memberId'],
                name: response.data['name'],
                introduce: response.data['introduce'],
                picture: response.data['picture'], //profileImage
                nickname: response.data['nickname'],
                followerCount: response.data['followerCount'],
                followingCount: response.data['followingCount'],
            };
        } catch (error) {
            console.log('getUserInfoById', error);
            return null;
        }
    };

    getUserByKeyword = async (keyword) => {
        try {
            const response = await client.get(`member/search`, {
                params: {
                    keyword: keyword,
                },
            });
            console.log('getUserByKeyword', response);
            return response.data;
        } catch (error) {
            console.log('getUserByKeyword', error);
            return null;
        }
    };
}

const authService = new Auth();
export default authService;
