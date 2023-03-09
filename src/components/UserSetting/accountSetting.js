import { Avatar, Box, Button, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { alpha, styled } from '@mui/material/styles';

export default function AccountSetting() {
    return (
        <>
            <Box sx={{ marginBottom: 6 }}>
                <Box sx={{ height: 150, width: 150, position: 'relative', margin: 'auto' }}>
                    <Avatar sx={{ height: '100%', width: '100%' }} />
                    <EditButton>
                        <EditIcon />
                    </EditButton>
                </Box>
            </Box>

            <Box id="SettingContent" sx={boxStyle}>
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>이름</h3>
                    <h4 style={{ flexGrow: 1, color: 'gray', paddingLeft: 10 }}>전민지</h4>
                    <Button>수정</Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>닉네임</h3>
                    <h4 style={{ flexGrow: 1, color: 'gray', paddingLeft: 10 }}>string</h4>
                    <Button>수정</Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>이메일</h3>
                    <h4 style={{ flexGrow: 1, color: 'gray', paddingLeft: 10 }}>abcd@naver.com</h4>
                    <Button>수정</Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>생일</h3>
                    <h4 style={{ flexGrow: 1, color: 'gray', paddingLeft: 10 }}>2000년 1월 1일</h4>
                    <Button>수정</Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>성별</h3>
                    <h4 style={{ flexGrow: 1, color: 'gray', paddingLeft: 10 }}>여성</h4>
                    <Button>수정</Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>보안</h3>
                    <h4 style={{ flexGrow: 1, color: 'gray', paddingLeft: 10 }}>
                        🔒 비밀번호 수정
                    </h4>
                    <Button>수정</Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>소개</h3>
                    <Typography
                        sx={{
                            whiteSpace: 'pre-line',
                            flexGrow: 1,
                            color: 'gray',
                            paddingLeft: 1,
                            paddingY: 1,
                        }}>
                        {'dkfdajifdjfdhfifjdaskjfkdajfdjfkdjaf\n kjdkfjdkjf\nksda\njkfdjask'}
                    </Typography>
                    <Button>수정</Button>
                </Box>
            </Box>
        </>
    );
}

const boxStyle = {
    borderRadius: 2,
    border: 2,
    borderColor: 'primary.main',
    backgroundColor: 'background.box',
    paddingX: 2,
};

const contentBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
const EditButton = styled('button')(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
    border: 'none',
    borderRadius: '10%',
    position: 'absolute',
    cursor: 'pointer',
    top: '50%',
    left: '50%',
    zIndex: 10,
    transform: 'translate(-50%, -50%)',
    width: 30,
    height: 30,
    padding: 0,
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.9),
    },
}));
