import { alpha, styled } from '@mui/material/styles';
import { Avatar, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import authService from '../../services/auth_api';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SearchBar() {
    const [recommendList, setRecommendList] = useState([]);
    const [selected, setSelected] = useState(0);
    const [onFocus, setOnFocus] = useState(false);
    const navigate = useNavigate();
    // const { ref, isFocused, setIsFocused } = useFocus(false);
    const ref = useRef(null);
    useEffect(() => {
        if (recommendList.length === 0) return;
        setSelected(0);
    }, [recommendList]);

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
                    .then(
                        (result) =>
                            result &&
                            setRecommendList((list) =>
                                list.toString() !== result.toString() ? result : list,
                            ),
                    );
                setSelected(0);
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
            if (recommendList.length === 0) return;
            navigate(`/${recommendList[selected].memberId}`);
        } else if (e.key === 'ArrowDown') {
            if (selected === recommendList.length - 1) {
                setSelected(0);
            } else {
                setSelected(selected + 1);
            }
        } else if (e.key === 'ArrowUp') {
            if (selected === 0) {
                setSelected(recommendList.length - 1);
            } else {
                setSelected(selected - 1);
            }
        }
    };
    return (
        <Search sx={{ flexGrow: 1, margin: 'auto', maxWidth: 400 }}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleValue}
                onKeyDown={onKeyPress}
                onFocus={() => {
                    console.log('focus');
                    setOnFocus(true);
                }}
                onBlur={(e) => {
                    console.log('blur', e.relatedTarget);
                    if (ref.current != null && ref.current.contains(e.relatedTarget)) {
                        console.log('contains');
                        e.target.focus();
                        return;
                    }
                    setOnFocus(false);
                }}
            />
            {recommendList.length !== 0 && onFocus && (
                <DropDownBox ref={ref}>
                    {recommendList.map((data, index) => (
                        <DropDownItem
                            key={data.memberId}
                            selected={index === selected}
                            tabIndex={0}
                            onClick={(e) => {
                                navigate(`/${data.memberId}`);
                            }}>
                            {data.profileImage ? (
                                <Avatar
                                    sx={{ width: 20, height: 20 }}
                                    src={process.env.REACT_APP_API_URL + data.picture}
                                />
                            ) : (
                                <AccountCircleIcon sx={{ width: 20, height: 20, color: 'white' }} />
                            )}
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', ml: 1 }}>
                                {data.nickname}
                            </Typography>
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
    // zIndex: 3,
    position: 'absolute',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
}));

const DropDownItem = styled('div', {
    shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
    padding: '0.5em 0em',
    backgroundColor: alpha(theme.palette.common.white, selected ? 0.5 : 0.15),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
}));
