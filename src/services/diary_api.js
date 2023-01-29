import client from './http_client';

class Diary {
    getDiary = async (memberId, date) => {
        try {
            console.log('getDiary');
            const response = await client.get('diary/someone', {
                params: {
                    memberId: parseInt(memberId),
                    regDt: date,
                },
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    postDiary = async (title, contents) => {
        try {
            console.log('postDiary');
            await client.post('diary', {
                title,
                contents,
            });
            console.log('성공');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    editDiary = async (diaryId, title, contents) => {
        try {
            console.log('editDiary');
            await client.put('diary/edit', {
                diaryId,
                title,
                contents,
            });
            console.log('성공');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    deleteDiary = async (id) => {
        try {
            console.log('deleteDiary');
            await client.delete('diary/delete', {
                data: {
                    diaryId: id,
                },
            });
            console.log('성공');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}
const diaryService = new Diary();
export default diaryService;
