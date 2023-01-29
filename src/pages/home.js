import AppBar from '../components/header';
import Guestbook from '../components/Home/guestbook';
import Topbutton from '../components/Home/topbutton';
import Diary from '../components/Home/diary';
import TopProfile from '../components/Home/topProfile';
import TopGuestbook from '../components/Home/topGuestbook';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

export default function Home() {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const boxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        border: 2,
        borderColor: 'primary.main',
        backgroundColor: 'background.default',
        width: '80%',
        margin: 5,
        padding: 2,
    };
    return (
        <>
            <AppBar />
            <Box sx={{ margin: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Topbutton></Topbutton>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                <Box sx={{ ...boxStyle }}>
                    <TopProfile />
                    <Diary></Diary>
                </Box>
                <Box sx={{ ...boxStyle }}>
                    <TopGuestbook />
                    <Guestbook></Guestbook>
                </Box>
            </Box>
        </>
    );
}
