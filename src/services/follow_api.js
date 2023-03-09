import client from './http_client';

class Follow {
    getFollowing = async (id) => {
        try {
            const response = await client.get('follow/following', {
                params: {
                    memberId: parseInt(id),
                },
            });
            console.log('getFollowing', response);
            return response;
        } catch (error) {
            console.log('getFollowing', error);
            return null;
        }
    };
    getFollower = async (id) => {
        try {
            const response = await client.get('follow/follower', {
                params: {
                    memberId: parseInt(id),
                },
            });
            console.log('getFollower', response);
            return response;
        } catch (error) {
            console.log('getFollower', error);
            return null;
        }
    };
    follow = async (memberId) => {
        try {
            const response = await client.post('follow', {
                memberId: parseInt(memberId),
            });
            console.log('follow', response);
            return response;
        } catch (error) {
            console.log('follow', error);
            return null;
        }
    };
    unfollow = async (memberId) => {
        try {
            const response = await client.delete('follow', {
                data: {
                    memberId: parseInt(memberId),
                },
            });
            console.log('unfollow', response);
            return response;
        } catch (error) {
            console.log('unfollow', error);
            return null;
        }
    };
}
