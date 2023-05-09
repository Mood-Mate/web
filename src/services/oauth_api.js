import client from './http_client';

class Oauth {
    kakaoLogin = async (token) => {
        try {
            const response = await client.post('/oauth2/authorization/kakao', {
                provider: 'KAKAO',
                accessToken: token,
            });
        } catch (error) {
            console.log('kakaoLogin', error);
        }
    };
    googleLogin = async (token) => {
        try {
            const response = await client.post('/oauth2/authorization/google', {
                provider: 'GOOGLE',
                accessToken: token,
            });
        } catch (error) {
            console.log('googleLogin', error);
        }
    };
}
const oauthService = new Oauth();
export default oauthService;
