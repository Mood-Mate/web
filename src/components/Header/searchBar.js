import { alpha, styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';

const nameData = ['전민지다', '박명수다', '유재석이다'];

export default function SearchBar() {
    const [searchValue, setSearchValue] = React.useState('');
    const handleValue = (e) => {
        setSearchValue(e.target.value);
        //setComment(e.target.value);
    };
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            // submitComment(e);
            console.log('submit');
            setSearchValue('');
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
            {nameData.length > 0 && searchValue !== '' && (
                <DropDownBox>
                    {nameData.map((data) => (
                        <DropDownItem
                            key={data}
                            onClick={() => {
                                console.log('클릭이되엇군?');
                            }}>
                            {data}
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
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingTop: '0.5em',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
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

// const DropDownBox = styled.ul`
//   display: block;
//   margin: 0 auto;
//   padding: 8px 0;
//   background-color: white;
//   border: 1px solid rgba(0, 0, 0, 0.3);
//   border-top: none;
//   border-radius: 0 0 16px 16px;
//   box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
//   list-style-type: none;
//   z-index: 3;

// const DropDownItem = styled.li`
//   padding: 0 16px;
//
//   &.selected {
//     background-color: lightgray;
//   }
// `
