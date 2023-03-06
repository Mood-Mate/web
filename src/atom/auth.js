import { atom } from 'recoil';

const initialUser = {
    isLogin: false,
    vendor: null,
    id: null,
    nickName: null,
    introduction: null,
    profileImage: null,
    email: null,
};

export const userState = atom({
    key: 'userState',
    default: initialUser,
});
