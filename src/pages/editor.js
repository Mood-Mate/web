import { Box, Button, Container, InputBase } from '@mui/material';
import { useEffect, useState } from 'react';
import diaryService from '../services/diary_api';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../atom/auth';

export default function Editor() {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [isNew, setIsNew] = useState(true);
    const user = useRecoilValue(userState);
    useEffect(() => {
        console.log('editor');

        console.log(location.state);
        if (location.state && location.state.diaryId) {
            setIsNew(false);
            setTitle(location.state.title ?? '');
            setContents(location.state.contents ?? '');
        }
    }, [location.state]);

    const boxStyle = {
        borderRadius: 2,
        border: 2,
        borderColor: 'primary.main',
        padding: 2,
        margin: 2,
        backgroundColor: 'background.box',
    };
    const handleSummit = (e) => {
        e.preventDefault();
        console.log(title);
        console.log(contents);
        if (title !== '' && contents !== '') {
            console.log(isNew);
            if (isNew) {
                diaryService.postDiary(title, contents).then((res) => {
                    if (res) {
                        alert('일기가 저장되었습니다.');
                        navigate('/' + user.id);
                    } else {
                        alert('일기 저장에 실패했습니다.');
                    }
                });
            } else {
                diaryService.editDiary(location.state.diaryId, title, contents).then((res) => {
                    if (res) {
                        alert('일기가 수정되었습니다.');
                        navigate('/' + user.id);
                    } else {
                        alert('일기 수정에 실패했습니다.');
                    }
                });
            }
        }
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentsChange = (e) => {
        setContents(e.target.value);
    };
    return (
        <Container maxWidth="md">
            <Box sx={{ paddingX: 3, marginTop: 4 }}>
                <p>오늘의 일기</p>
            </Box>

            <form onSubmit={handleSummit}>
                <Box sx={boxStyle}>
                    <InputBase
                        aria-label="minimum height"
                        minRows={1}
                        multiline={true}
                        placeholder="제목을 입력하세요"
                        style={{ width: '100%' }}
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Box>
                <Box sx={boxStyle}>
                    <InputBase
                        aria-label="minimum height"
                        minRows={20}
                        multiline={true}
                        placeholder="내용을 입력하세요"
                        style={{ width: '100%' }}
                        value={contents}
                        onChange={handleContentsChange}
                    />
                </Box>
                <Box
                    sx={{
                        paddingX: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                    <Button type="submit" variant="contained">
                        작성
                    </Button>
                </Box>
            </form>
        </Container>
    );
}
