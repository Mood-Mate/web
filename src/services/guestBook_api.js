import client from './http_client';

class GuestBook {
    getGuestBook = async (id) => {
        try {
            const response = await client.get(`guestBook/${id}`);
            console.log('getGuestBook', response.data);
            return Array.isArray(response.data) ? response.data : null;
        } catch (error) {
            console.log('getGuestBook', error);
            return null;
        }
    };

    postGuestBook = async (hostId, content) => {
        ///api/guestBook/{hostMemberId}
        try {
            const response = await client.post(`guestBook/${hostId}`, content);
            console.log('postGuestBook', response.data);
            return response.data;
        } catch (error) {
            console.log('postGuestBook', error);
            return null;
        }
    };

    deleteGuestBook = async (guestBookId) => {
        try {
            const response = await client.delete(`guestBook/${guestBookId}`);
            console.log('deleteGuestBook', response.data);
            return true;
        } catch (error) {
            console.log('deleteGuestBook', error);
            return false;
        }
    };
}

const guestBookService = new GuestBook();
export default guestBookService;
