import { Avatar, Box, IconButton, InputBase, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

export default function Comments(props) {
    const comments = [
        {
            id: 1,
            username: '앙버터',
            content: '감명 깊게 봤습니다,,,',
        },
        {
            id: 2,
            username: '만두',
            content: '대단해유!!~',
        },
    ];
    return (
        <>
            <Stack spacing={1}>
                {comments.map((comment) => (
                    //props.data.comments.map((comment) => (
                    <Box
                        key={comment.id}
                        sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
                        <Avatar sx={{ width: 40, height: 40, mr: 1 }} />
                        <Box
                            sx={{
                                backgroundColor: 'quaternary.main',
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                            }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                {comment.username}
                            </Typography>
                            <Typography variant="body1">{comment.content}</Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
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
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SendIcon />
                </IconButton>
            </Box>
        </>
    );
}
