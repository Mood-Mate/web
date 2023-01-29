import { Box, Divider, IconButton } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export default function Emojis() {
    return (
        <Box sx={{ py: 1 }}>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <IconButton>
                    <SentimentSatisfiedAltIcon />
                </IconButton>
                <IconButton>
                    <SentimentSatisfiedAltIcon />
                </IconButton>
                <IconButton>
                    <SentimentSatisfiedAltIcon />
                </IconButton>
            </Box>
            <Divider />
        </Box>
    );
}
