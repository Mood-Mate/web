import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import authService from 'services/auth_api';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atom/auth';

//todo: 회원가입페이지랑 link 하고 signup router 추가하기
export default function SignInForm() {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const response = await authService.login(data.get('email'), data.get('password'));
        handleResponse('email', response);
    };

    const handleResponse = (vendor, response) => {
        if (response?.data) {
            setUser({
                isLogin: true,
                vendor,
                id: response.data['memberId'],
                name: response.data['name'],
                nickname: response.data['nickname'],
                introduce: response.data['introduce'],
                picture: response.data['picture'],
                email: response.data['email'],
                dateOfBirth: response.data['dateOfBirth'],
                gender: response.data['gender'],
            });
            console.log('로그인 완료');
            navigate('/');
        } else {
            alert('로그인 실패');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                로그인
            </Button>
            <Grid container>
                {/*<Grid item xs>*/}
                {/*    <Link to="/login/help">아이디 / 비밀번호 찾기</Link>*/}
                {/*</Grid>*/}
                <Grid item>
                    <Link to="/signup">회원가입하기</Link>
                </Grid>
            </Grid>
        </Box>
    );
}
