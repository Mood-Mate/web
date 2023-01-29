import { Box } from '@mui/material';
import Diary from './diary';
import Emojis from './emojis';
import Comments from './comments';

export default function Post(props) {
    return (
        <Box sx={props.style}>
            <Diary data={props.data} />
            <Emojis />
            <Comments />

            {/*<Comments data={props.data} />*/}
        </Box>
    );
}
