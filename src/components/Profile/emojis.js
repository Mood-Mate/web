import { Box, Divider, IconButton, SvgIcon } from '@mui/material';
import { ReactComponent as AngryIcon } from 'assets/emoji_Icon/angry.svg';
import { ReactComponent as CryIcon } from 'assets/emoji_Icon/cry.svg';
import { ReactComponent as LoveIcon } from 'assets/emoji_Icon/love.svg';
import { ReactComponent as StupidIcon } from 'assets/emoji_Icon/stupid.svg';

//
export default function Emojis() {
    const handleEmojiClick = (e) => {
        console.log(e.currentTarget.id);
    };
    return (
        <Box sx={{ py: 1 }}>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <IconButton id="love" onClick={handleEmojiClick}>
                    <LoveIcon style={{ height: 25, width: 25 }} />
                </IconButton>
                <IconButton id="sad" onClick={handleEmojiClick}>
                    <CryIcon style={{ height: 25, width: 25 }} />
                </IconButton>
                <IconButton id="angry" onClick={handleEmojiClick}>
                    <AngryIcon style={{ height: 25, width: 25 }} />
                </IconButton>
                <IconButton id="stupid" onClick={handleEmojiClick}>
                    <StupidIcon style={{ height: 25, width: 25 }} />
                </IconButton>
            </Box>
            <Divider />
        </Box>
    );
}
