import { atom } from 'recoil';

const initialUser = {
    isLogin: false,
    vendor: null,
    id: null,
    name: null,
    nickName: null,
    introduction: null,
    profileImage: null,
    email: null,
    dateOfBirth: null,
    gender: null,
};

export const userState = atom({
    key: 'userState',
    default: initialUser,
});
