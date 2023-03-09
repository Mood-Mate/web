import { Box } from '@mui/material';
import Diary from './diary';
import Emojis from './emojis';
import Comments from './comments';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import UserImage from '../Common/userImage';

export default function Post(props) {
    const [showAllComments, setShowAllComments] = useState(false);
    const handleAllComments = () => {
        setShowAllComments((value) => !value);
    };
    return (
        <Box sx={props.style}>
            {props.isFollowing && (
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <UserImage
                        userId={props.data.memberId}
                        width={34}
                        profileImage={props.data.picture}
                    />
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', ml: 1 }}>
                        {props.data.nickname}
                    </Typography>
                </Box>
            )}
            <Diary data={props.data} />
            <Emojis />
            {props.isFollowing ? (
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
