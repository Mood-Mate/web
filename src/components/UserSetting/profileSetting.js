import { Avatar, Box, Button, Divider } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
export default function ProfileSetting() {
    return (
        <Box sx={{ ...contentBoxStyle, ...boxStyle }}>
            <Box sx={{ height: 100, width: 100, position: 'relative' }}>
                <Avatar sx={{ height: '100%', width: '100%' }} />
                <EditButton>
                    <EditIcon />
                </EditButton>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ marginY: 1, fontWeight: 'bold' }} variant="h6" gutterBottom>
                    소개글
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-line' }}>
                    {'dkfdajifdjfdhfifjdaskjfkdajfdjfkdjaf\n kjdkfjdkjf\nksda\njkfdjask'}
                </Typography>
                {/*<Typography sx={{ paddingY: 3 }}>{user.introduce}</Typography>*/}
            </Box>
            <Button>수정</Button>
        </Box>
    );
}
const contentBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
};
const boxStyle = {
    borderRadius: 2,
    border: 2,
    borderColor: 'primary.main',
    backgroundColor: 'background.box',
    padding: 4,
};

const EditButton = styled('button')(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
    border: 'none',
    borderRadius: '10%',
    position: 'absolute',
    cursor: 'pointer',
    top: '50%',
    left: '50%',
    zIndex: 10,
    transform: 'translate(-50%, -50%)',
    width: 30,
    height: 30,
    padding: 0,
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.9),
    },
}));
