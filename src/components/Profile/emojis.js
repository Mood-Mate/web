import { Box, Divider, IconButton } from '@mui/material';

import diaryService from '../../services/diary_api';
import { useState } from 'react';
import { AngryIcon, CryIcon, LoveIcon, StupidIcon } from '../Common/emoji_svg';

//
export default function Emojis(props) {
    let [emojis, setEmojis] = useState({
        LOVE: false,
        SAD: false,
        ANGRY: false,
        STUPID: false,
    });
    const handleEmojiClick = async (e) => {
        const emojiType = e.currentTarget.id;
        console.log(e.currentTarget.id);
        const result = await diaryService.sendEmoji(props.memberId, props.diaryId, emojiType);
        console.log(emojiType);
        if (result) {
            setEmojis({
                ...emojis,
                [emojiType]: !emojis[emojiType],
            });
        }
    };
    return (
        <Box sx={{ py: 1 }}>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <IconButton id="LOVE" onClick={handleEmojiClick}>
                    {LoveIcon(emojis.LOVE)}
                </IconButton>
                <IconButton id="SAD" onClick={handleEmojiClick}>
                    {CryIcon(emojis.SAD)}
                </IconButton>
                <IconButton id="ANGRY" onClick={handleEmojiClick}>
                    {AngryIcon(emojis.ANGRY)}
                </IconButton>
                <IconButton id="STUPID" onClick={handleEmojiClick}>
                    {StupidIcon(emojis.STUPID)}
                </IconButton>
            </Box>
            <Divider />
        </Box>
    );
}
