import { Box, IconButton, InputBase, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import guestBookService from '../../services/guestBook_api';
import { parseDate } from '../util/util';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GuestBook(props) {
    const boxStyle = props.style;
    const [guestBook, setGuestBook] = useState([]);
    const [guestBookInput, setGuestBookInput] = useState('');
    useEffect(() => {
        if (props.userId) {
            guestBookService.getGuestBook(props.userId).then((res) => {
                if (res) {
                    setGuestBook(res);
                } else {
                    alert('방명록을 불러오는데 실패했습니다.');
                }
            });
        }
    }, [props.userId]);
    const submitComment = () => {
        if (guestBookInput) {
            guestBookService.postGuestBook(props.userId, guestBookInput).then((res) => {
                if (res) {
                    setGuestBook([res, ...guestBook]);
                    setGuestBookInput('');
                } else {
                    alert('방명록을 작성하는데 실패했습니다.');
                }
            });
        }
    };

    const handleCommentInput = (e) => {
        setGuestBookInput(e.target.value);
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        guestBookService.deleteGuestBook(id).then((res) => {
            if (res) {
                setGuestBook(guestBook.filter((data) => data['guestBookId'] !== id));
            } else {
                alert('방명록 삭제에 실패했습니다.');
            }
        });
    };
    return (
        props.userId && (
            <Box sx={{ ...boxStyle }}>
                <Typography variant="h6">️✏️ 방명록</Typography>
                {guestBook.length > 0 ? (
                    <>
                        {guestBook.map((data) => (
                            <Box
                                key={data['guestBookId']}
                                sx={{
                                    ...boxStyle,
                                    border: 'dashed',
                                    marginY: 1,
                                    marginX: 0,
                                    p: 1,
                                }}>
                                <Typography variant="subtitle1">
                                    {data.nickname + ' | ' + parseDate(data.regDt)}
                                    <IconButton
                                        sx={{ float: 'right', color: '#dde2de', padding: 0 }}
                                        onClick={(e) => handleDelete(e, data['guestBookId'])}>
                                        <DeleteIcon sx={{ width: 20 }} />
                                    </IconButton>
                                </Typography>

                                <Typography variant="subtitle2">{data.contents}</Typography>
                            </Box>
                        ))}
                    </>
                ) : (
                    <Typography variant="subtitle1" sx={{ paddingY: 4, textAlign: 'center' }}>
                        방명록이 없습니다.
                    </Typography>
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
                        placeholder="방명록을 남겨주세요"
                        inputProps={{ 'aria-label': '방명록 입력' }}
                        onChange={handleCommentInput}
                        value={guestBookInput}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                e.target.blur();
                                submitComment();
                            }
                        }}
                    />
                    <IconButton
                        type="button"
                        sx={{ p: '10px' }}
                        aria-label="search"
                        onClick={submitComment}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        )
    );
}
