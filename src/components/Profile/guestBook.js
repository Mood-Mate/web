import { Box, IconButton, InputBase, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function GuestBook(props) {
    const boxStyle = props.style;
    return (
        <Box sx={{ ...boxStyle }}>
            <Typography variant="h6">️✏️ 방명록</Typography>
            <Box sx={{ ...boxStyle, border: 'dashed', marginY: 1, marginX: 0, p: 1 }}>
                <Typography variant="subtitle1">만두 | 2023.02.10</Typography>
                <Typography variant="subtitle2">나왔다감..</Typography>
            </Box>
            <Box sx={{ ...boxStyle, border: 'dashed', marginY: 1, marginX: 0, p: 1 }}>
                <Typography variant="subtitle1">만두 | 2023.02.10</Typography>
                <Typography variant="subtitle2">나왔다감..</Typography>
            </Box>
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
                    // onChange={handleComment}
                    // onKeyDown={onKeyPress}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    //onClick={submitComment}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
