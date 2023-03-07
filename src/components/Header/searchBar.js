import { alpha, styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { useCallback, useState } from 'react';
import authService from '../../services/auth_api';

const nameData = ['전민지다', '박명수다', '유재석이다'];

export default function SearchBar() {
    const [recommendList, setRecommendList] = useState([]);
    const debounceFunction = (callback, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => callback(...args), delay);
        };
    };
    const getRecommendList = useCallback(
        debounceFunction((value) => {
            if (value !== '') {
                authService
                    .getUserByKeyword(value)
                    .then((result) => result && setRecommendList(result));
            } else {
                setRecommendList([]);
            }
        }, 500),
        [],
    );
    const handleValue = (e) => {
        getRecommendList(e.target.value);
    };
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            // submitComment(e);
            //recommendid가있으면 0 인덱스로 넘긴다....
            // authService
            //     .getUserByKeyword(value)
            //     .then((result) => result && setRecommendList(result))
            console.log(
                'submit',
                e.target.value,
                recommendList.length > 0 ? recommendList[0].nickname : '',
            );
        }
    };
    // {
    //     "memberId": 2,
    //     "email": "aa",
    //     "picture": null,
    //     "name": "string",
    //     "nickname": "string",
    //     "followAt": "Y"
    // },
    return (
        <Search sx={{ flexGrow: 1, margin: 'auto', maxWidth: 400 }}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleValue}
                onKeyDown={onKeyPress}></StyledInputBase>
            {nameData.length > 0 && recommendList.length !== 0 && (
                <DropDownBox>
                    {recommendList.map((data) => (
                        <DropDownItem
                            key={data.memberId}
                            onClick={() => {
                                console.log('클릭이되엇군?');
                            }}>
                            {data.nickname}
                        </DropDownItem>
                    ))}
                </DropDownBox>
            )}
        </Search>
    );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingTop: '0.5em',
        // transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('md')]: {
        //     width: '20ch',
        // },
    },
}));

const DropDownBox = styled('div')(({ theme }) => ({
    display: 'block',
    backgroundColor: theme.palette.primary.main,
    zIndex: 3,
    position: 'absolute',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
}));

const DropDownItem = styled('div')(({ theme }) => ({
    padding: '0.5em 0em',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
}));
