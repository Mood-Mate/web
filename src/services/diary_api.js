import client from './http_client';

class Diary {
    getDiaryByDate = async (memberId, date) => {
        try {
            const response = await client.get('diary/someone', {
                params: {
                    someone: parseInt(memberId),
                    regDt: date,
                },
            });
            console.log('getDiary', response);
            return response;
        } catch (error) {
            console.log('getDiary', error);
            return null;
        }
    };
    getDiaryEvent = async (memberId, date) => {
        try {
            const response = await client.get('diary/someone/date', {
                params: {
                    someone: parseInt(memberId),
                    regDt: date,
                },
            });
            console.log('getDiaryEvent', response);
            return response;
        } catch (error) {
            console.log('getDiaryEvent', error);
            return null;
        }
    };
    getFollowingDiary = async (next) => {
        try {
            const response = await client.get(
                'diary/following',
                next
                    ? {
                          params: {
                              next: next,
                          },
                      }
                    : null,
            );
            console.log('getFollowingDiary', response);
            return response;
        } catch (error) {
            console.log('getFollowingDiary', error);
            return null;
        }
    };
    postDiary = async (title, contents, picture, secret) => {
        try {
            const formData = new FormData();
            const diaryCreateRequest = {
                title,
                contents,
                secret,
            };
            const blob = new Blob([JSON.stringify(diaryCreateRequest)], {
                type: 'application/json',
            });

            formData.append('diaryCreateRequest', blob);
            if (picture) {
                console.log('이미지 존재!', picture);
                formData.append('picture', picture);
            }
            console.log('postDiary', formData);
            await client.post('diary', formData);
            return true;
        } catch (error) {
            console.log('postDiary', error);
            return false;
        }
    };
    editDiary = async (diaryId, title, contents, picture, secret) => {
        try {
            const formData = new FormData();
            const diaryUpdateRequest = {
                diaryId,
                title,
                contents,
                secret,
            };
            const blob = new Blob([JSON.stringify(diaryUpdateRequest)], {
                type: 'application/json',
            });
            formData.append('diaryUpdateRequest', blob);
            if (picture) {
                console.log('이미지 존재!', picture);
                formData.append('picture', picture);
            }
            await client.patch('diary/edit', formData);
            console.log('editDiary', '성공');
            return true;
        } catch (error) {
            console.log('editDiary', error);
            return false;
        }
    };
    deleteDiary = async (id) => {
        try {
            await client.delete(`diary/delete/${id}`);
            console.log('deleteDiary', '성공');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    postComment = async (diaryId, contents) => {
        try {
            const response = await client.post(`diary/reply/${diaryId}`, contents);
            console.log('postComment', response);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    deleteComment = async (commentId) => {
        try {
            console.log('deleteComment');
            await client.delete(`diary/reply/${commentId}`);
            console.log('deleteComment', '성공');
            return true;
        } catch (error) {
            console.log('deleteComment', error);
            return false;
        }
    };
    //emoji/sympathy
    // {
    //     "memberId": 0,
    //     "diaryId": 0,
    //     "emojiType": "LOVE"
    // }
    sendEmoji = async (memberId, diaryId, emojiType) => {
        try {
            const response = await client.patch('emoji/sympathy', {
                memberId,
                diaryId,
                emojiType,
            });
            console.log('sendEmoji', response);
            return true;
        } catch (error) {
            console.log('sendEmoji', error);
            return false;
        }
    };
}
const diaryService = new Diary();
export default diaryService;
