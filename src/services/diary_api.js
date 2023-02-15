import client from './http_client';

class Diary {
    getDiaryByDate = async (memberId, date) => {
        try {
            const response = await client.get('diary/someone', {
                params: {
                    memberId: parseInt(memberId),
                    regDt: date,
                },
            });
            console.log('getDiary', response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    getDiaryEvent = async (memberId, date) => {
        try {
            const response = await client.get('diary/someone/date', {
                params: {
                    memberId: parseInt(memberId),
                    regDt: date,
                },
            });
            console.log('getDiaryEvent', response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    postDiary = async (title, contents, picture) => {
        try {
            const formData = new FormData();
            const diaryCreateRequest = {
                title,
                contents,
            };
            const blob = new Blob([JSON.stringify(diaryCreateRequest)], {
                type: 'application/json',
            });

            formData.append('diaryCreateRequest', blob);
            if (picture) {
                formData.append('picture', picture);
            }
            console.log('postDiary', formData);
            await client.post('diary', formData);
            console.log('postDiary', '성공');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    editDiary = async (diaryId, title, contents, picture) => {
        try {
            const formData = new FormData();
            const diaryUpdateRequest = {
                diaryId,
                title,
                contents,
            };
            const blob = new Blob([JSON.stringify(diaryUpdateRequest)], {
                type: 'application/json',
            });
            formData.append('diaryUpdateRequest', blob);
            if (picture) {
                formData.append('picture', picture);
            }
            await client.put('diary/edit', formData);
            console.log('editDiary', '성공');
            return true;
        } catch (error) {
            console.log(error);
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
            console.log(response);
            console.log('postComment', '성공');
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    editComment = async (commentId, contents) => {
        try {
            await client.put('comment/edit', {
                commentId,
                contents,
            });
            console.log('editComment', '성공');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    deleteComment = async (commentId) => {
        try {
            console.log('deleteComment');
            await client.delete('comment/delete', {
                data: {
                    commentId,
                },
            });
            console.log('deleteComment', '성공');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}
const diaryService = new Diary();
export default diaryService;
