import { Avatar, Box } from '@mui/material';
import Diary from './diary';
import Emojis from './emojis';
import Comments from './comments';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function Post(props) {
    const [showAllComments, setShowAllComments] = useState(false);
    const handleAllComments = () => {
        setShowAllComments((value) => !value);
    };
    return (
        <Box sx={props.style}>
            {props.isFollowee && (
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar sx={{ width: 34, height: 34, mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {props.data.nickname}
                    </Typography>
                </Box>
            )}
            <Diary data={props.data} />
            <Emojis />
            {props.isFollowee ? (
                <>
                    <Typography
                        onClick={handleAllComments}
                        sx={{ fontSize: 12, paddingY: 1, color: 'grey', cursor: 'pointer' }}>
                        {showAllComments ? '댓글 숨기기' : '댓글 보기'}
                    </Typography>
                    {showAllComments && <Comments data={props.data} />}
                </>
            ) : (
                <Comments data={props.data} />
            )}
        </Box>
    );
}
