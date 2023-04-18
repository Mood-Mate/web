import client from './http_client';

class Oauth {
    kakaoLogin = async (token) => {
        try {
            const response = await client.post('oauth', {
                provider: 'KAKAO',
                accessToken: token,
            });
        } catch (error) {
            console.log('kakaoLogin', error);
        }
    };
}
const oauthService = new Oauth();
export default oauthService;
