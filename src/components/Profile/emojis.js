import { Box, Divider, IconButton } from '@mui/material';

import diaryService from '../../services/diary_api';
import { useEffect, useState } from 'react';
import { AngryIcon, CryIcon, LoveIcon, StupidIcon } from '../Common/emoji_svg';

//
export default function Emojis(props) {
    let [emojis, setEmojis] = useState({
        LOVE: props.emoji === 'LOVE',
        SAD: props.emoji === 'SAD',
        ANGRY: props.emoji === 'ANGRY',
        STUPID: props.emoji === 'STUPID',
    });

    useEffect(() => {
        console.log('emojis', emojis);
    }, [emojis]);
    const handleEmojiClick = async (e) => {
        const emojiType = e.currentTarget.id;
        console.log(e.currentTarget.id);
        const result = await diaryService.sendEmoji(props.memberId, props.diaryId, emojiType);
        console.log(emojiType);
        if (result) {
            setEmojis((prev) => {
                let preEmojis = { ...prev };
                for (let key in preEmojis) {
                    if (key === emojiType) {
                        preEmojis[key] = !preEmojis[key];
                    } else {
                        preEmojis[key] = false;
                    }
                }
                console.log(preEmojis);
                return preEmojis;
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
