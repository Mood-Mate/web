import { Box, IconButton, InputBase, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import diaryService from '../../services/diary_api';
import { useSetRecoilState } from 'recoil';
import { profileDiaryState } from '../../atom/dairy';
import UserImage from '../Common/userImage';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Comments(props) {
    const [comment, setComment] = useState('');
    const setDiary = useSetRecoilState(profileDiaryState);
    const submitComment = () => {
        console.log('댓글: ' + comment);
        if (comment !== '') {
            diaryService.postComment(props.data.diaryId, comment).then((res) => {
                if (res) {
                    alert('댓글이 저장되었습니다.');
                    //디바운싱 할것 두번 누르면 두번전송됨.
                    setComment('');
                    setDiary((prev) => {
                        const tmp = [...prev];
                        return tmp.map((diary) => {
                            if (diary.diaryId === props.data.diaryId) {
                                console.log('댓글 추가');
                                return { ...diary, comments: res.data };
                            }
                            return diary;
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
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
            submitComment();
        }
    };
    const handleDelete = (e, id) => {
        e.preventDefault();
        diaryService.deleteComment(id).then((res) => {
            if (res) {
                setDiary((prev) => {
                    const tmp = [...prev];
                    return tmp.map((diary) => {
                        if (diary.diaryId === props.data.diaryId) {
                            let filteredComments = diary.comments.filter(
                                (comment) => comment.diaryCommentId !== id,
                            );
                            return { ...diary, comments: filteredComments };
                        }
                        return diary;
                    });
                });
            } else {
                alert('댓글 삭제에 실패했습니다.');
            }
        });
    };

    return (
        <>
            {props.data.comments && props.data.comments.length > 0 && (
                <Stack spacing={1}>
                    {props.data.comments.map((comment) => (
                        <Box
                            key={comment['diaryCommentId']}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                            }}>
                            <UserImage
                                width={34}
                                userId={comment.memberId}
                                profileImage={comment.picture}
                            />
                            <Box
                                sx={{
                                    backgroundColor: 'quaternary.main',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    ml: 1,
                                }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: 'text.primary',
                                            fontWeight: 600,
                                            paddingRight: 1,
                                        }}>
                                        {comment.nickname}
                                    </Typography>
                                    <Typography sx={{ color: 'text.primary', fontSize: 12 }}>
                                        {' | ' + comment.regDt.replace('T', ' ')}
                                    </Typography>
                                    <IconButton
                                        sx={{
                                            float: 'right',
                                            color: '#959595',
                                            paddingY: 0,
                                            paddingRight: 0,
                                        }}
                                        onClick={(e) => handleDelete(e, comment['diaryCommentId'])}>
                                        <DeleteIcon sx={{ width: 20 }} />
                                    </IconButton>
                                </Box>

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
                    onKeyPress={onKeyDown}
                    value={comment}
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
