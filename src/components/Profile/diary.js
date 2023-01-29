import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function Diary(props) {
    return (
        <Box sx={{ mb: 1 }}>
            <Typography variant="h5" sx={{ paddingY: 1 }}>
                {props.data.title}
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{props.data.content}</Typography>
        </Box>
    );
}
