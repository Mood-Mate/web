import { Avatar, Box, IconButton, InputBase, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import diaryService from '../../services/diary_api';
import { useSetRecoilState } from 'recoil';
import { diaryState } from '../../atom/dairy';

export default function Comments(props) {
    const [comment, setComment] = useState('');
    const setDiary = useSetRecoilState(diaryState);

    const submitComment = (e) => {
        e.preventDefault();
        console.log('댓글: ' + comment);
        if (comment !== '') {
            diaryService.postComment(props.data.diaryId, comment).then((res) => {
                if (res) {
                    alert('댓글이 저장되었습니다.');
                    setComment('');
                    setDiary((prev) => {
                        const tmp = [...prev];
                        return tmp.map((diary) => {
                            if (diary.diaryId === props.data.diaryId) {
                                console.log('댓글 추가');
                                return { ...diary, comments: res.data };
                            }
                        });
                    });
                } else {
                    alert('댓글 저장에 실패했습니다.');
                }
            });
        }
    };
    const handleComment = (e) => {
        setComment(e.target.value);
    };
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitComment(e);
        }
    };

    return (
        <>
            {props.data.comments && props.data.comments.length > 0 && (
                <Stack spacing={1}>
                    {props.data.comments.map((comment) => (
                        <Box
                            key={comment.diaryCommentId}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                            }}>
                            <Avatar sx={{ width: 40, height: 40, mr: 1 }} />
                            <Box
                                sx={{
                                    backgroundColor: 'quaternary.main',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                    {comment.nickname}
                                </Typography>
                                <Typography variant="body1">{comment.contents}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            )}
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'quaternary.main',
                    borderRadius: 2,
                    marginTop: 1,
                }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="댓글을 입력해주세요..."
                    inputProps={{ 'aria-label': '댓글 입력' }}
                    onChange={handleComment}
                    onKeyDown={onKeyPress}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={submitComment}>
                    <SendIcon />
                </IconButton>
            </Box>
        </>
    );
}
