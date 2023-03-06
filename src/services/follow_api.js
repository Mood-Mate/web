import client from './http_client';

class Follow {
    getFollowee = async (next) => {
        try {
            const response = await client.get(
                'follow/followee',
                next
                    ? {
                          params: {
                              next: next,
                          },
                      }
                    : null,
            );
            console.log('getFollowee', response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    getFollower = async (next) => {
        try {
            const response = await client.get(
                'follow/follower',
                next
                    ? {
                          params: {
                              next: next,
                          },
                      }
                    : null,
            );
            console.log('getFollower', response);
            return response;
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
            return null;
        }
    };
}
