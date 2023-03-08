import { Box, Button, Divider } from '@mui/material';

export default function AccountSetting() {
    return (
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
        </Box>
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
