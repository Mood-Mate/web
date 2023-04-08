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
    follow = async (rootUserId, userId) => {
        try {
            const response = await client.patch('follow', {
                followerMemberId: parseInt(rootUserId),
                followingMemberId: parseInt(userId),
            });
            console.log('follow', response);
            return response;
        } catch (error) {
            console.log('follow', error);
            return null;
        }
    };
}

const followService = new Follow();
export default followService;
