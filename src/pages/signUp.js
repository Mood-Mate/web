import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import authService from '../services/auth_api';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: '',
        nickname: '',
        gender: 'man',
        birth: dayjs(),
    });
    const [helperText, setHelperText] = useState({
        email: '',
        password: '',
        name: '',
        nickname: '',
    });

    useEffect(() => {
        console.log(helperText);
    }, [helperText]);
    const { email, password, name, nickname, gender, birth } = inputs; // 비구조화 할당
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#?])[a-zA-Z\d!@#?]{6,20}$/;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    const handleBirthChange = (date) => {
        setInputs({
            ...inputs,
            birth: date,
        });
    };
    const handleGenderClick = (e) => {
        setInputs({
            ...inputs,
            gender: e.target.id,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkSubmit()) {
            authService.createUser(inputs).then((res) => {
                if (res) {
                    navigate('/login');
                }
            });
        }
    };

    const checkSubmit = () => {
        if (
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            name &&
            nickname &&
            gender &&
            birth
        ) {
            return true;
        } else {
            setHelperText({
                email: emailRegex.test(email) ? '' : '이메일 형식이 아닙니다.',
                password: passwordRegex.test(password) ? '' : '비밀번호 형식이 아닙니다.',
                name: name ? '' : '이름을 입력해주세요.',
                nickname: nickname ? '' : '닉네임을 입력해주세요.',
            });
            return false;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    회원가입
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="이름"
                                autoFocus
                                onChange={handleChange}
                                value={name}
                                error={Boolean(helperText.name)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="이메일"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                value={email}
                                error={Boolean(helperText.email)}
                                helperText={
                                    Boolean(helperText.email) && '이메일 형식이 올바르지 않습니다.'
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="nickname"
                                label="닉네임"
                                name="nickname"
                                autoComplete="nickname"
                                onChange={handleChange}
                                value={nickname}
                                error={Boolean(helperText.nickname)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={handleChange}
                                value={password}
                                error={Boolean(helperText.password)}
                                helperText={
                                    '비밀번호는 6자에서 20자 사이여야하며 영문, 숫자, 특수문자를 모두 포함해야합니다.'
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                variant="outlined"
                                id="man"
                                sx={{
                                    flexGrow: 1,
                                    marginRight: 1,
                                    background: gender === 'man' ? 'grey' : null,
                                    color: gender === 'man' ? 'white' : 'black',
                                    ':hover': {
                                        background: 'grey',
                                    },
                                }}
                                onClick={handleGenderClick}>
                                남
                            </Button>
                            <Button
                                variant="outlined"
                                id="woman"
                                sx={{
                                    flexGrow: 1,
                                    marginLeft: 1,
                                    background: gender === 'woman' ? 'grey' : null,
                                    color: gender === 'woman' ? 'white' : 'black',
                                    ':hover': {
                                        background: 'grey',
                                    },
                                }}
                                onClick={handleGenderClick}>
                                여
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    id="birth"
                                    inputFormat="YYYY/MM/DD"
                                    label="생년월일"
                                    value={birth}
                                    onChange={handleBirthChange}
                                    renderInput={(params) => (
                                        <TextField
                                            sx={{
                                                flexGrow: 1,
                                            }}
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        회원가입
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}
