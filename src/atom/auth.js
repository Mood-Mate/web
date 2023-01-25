import { atom } from 'recoil';

const initialUser = {
    isLogin: false,
    vendor: null,
    id: null,
};

export const userState = atom({
    key: 'userState',
    default: initialUser,
});
