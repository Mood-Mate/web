import Typography from '@mui/material/Typography';
import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { profileDiaryState } from '../../atom/dairy';
import diaryService from '../../services/diary_api';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../atom/auth';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
export default function Diary(props) {
    const [open, setOpen] = useState(false);
    const setDiary = useSetRecoilState(profileDiaryState);
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    const handleEdit = () => {
        console.log('edit');
        navigate('/editor', {
            state: {
                diaryId: props.data.diaryId,
                title: props.data.title,
                contents: props.data.contents,
                diaryPicture: props.data.diaryPicture,
                secret: props.data.secret,
            },
        });
    };
    const handleDelete = () => {
        console.log('delete');
        setOpen(true);
    };
    const handleDisagreeDelete = () => {
        setOpen(false);
    };

    const onImgError = (e) => {
        console.error(e.target.src);
        e.target.outerHTML = '<div style="color:darkgrey">[ 이미지 로딩 실패 ㅠㅠ ]</div>';
    };

    const handleAgreeDelete = () => {
        setOpen(false);
        console.log('삭제 api 실행');
        diaryService.deleteDiary(props.data.diaryId).then((res) => {
            if (res) {
                setDiary((prev) => {
                    return prev.filter((diary) => diary.diaryId !== props.data.diaryId);
                });
            } else {
                alert('일기를 삭제하는데 실패했습니다.');
            }
        });
    };
    return (
        <Box sx={{ mb: 1 }}>
            {user.id === props.data.memberId ? (
                <>
                    <IconButton sx={{ float: 'right' }} size="small" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton sx={{ float: 'right' }} size="small" onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <DeleteAlert
                        open={open}
                        handleDisagreeDelete={handleDisagreeDelete}
                        handleAgreeDelete={handleAgreeDelete}
                    />
                </>
            ) : null}

            <Typography variant="h5" sx={{ paddingY: 1 }}>
                {user.id === props.data.memberId &&
                    (props.data.secret ? (
                        <LockIcon sx={{ fontSize: 20, color: 'grey', marginRight: 1 }} />
                    ) : (
                        <LockOpenIcon sx={{ fontSize: 20, color: 'grey', marginRight: 1 }} />
                    ))}

                {props.data.title}
            </Typography>
            {props.data.diaryPicture && (
                <img
                    height="auto"
                    width="auto"
                    style={{ maxHeight: '200px', maxWidth: '100%' }}
                    alt="사진"
                    src={process.env.REACT_APP_API_URL + props.data.diaryPicture}
                    loading="lazy"
                    onError={onImgError}
                />
            )}
            <Typography sx={{ whiteSpace: 'pre-line' }}>{props.data.contents}</Typography>
        </Box>
    );
}

function DeleteAlert({ open, handleDisagreeDelete, handleAgreeDelete }) {
    return (
        <Dialog
            open={open}
            onClose={handleDisagreeDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{'정말 삭제하겠습니까?'}</DialogTitle>
            <DialogActions>
                <Button onClick={handleDisagreeDelete}>취소</Button>
                <Button onClick={handleAgreeDelete} autoFocus>
                    삭제
                </Button>
            </DialogActions>
        </Dialog>
    );
}
