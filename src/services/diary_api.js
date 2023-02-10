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
    postDiary = async (title, contents) => {
        try {
            await client.post('diary', {
                title,
                contents,
            });
            console.log('postDiary', '성공');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    editDiary = async (diaryId, title, contents) => {
        try {
            await client.put('diary/edit', {
                diaryId,
                title,
                contents,
            });
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
