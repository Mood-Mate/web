import AppBar from '../components/header';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileBox from '../components/Profile/profileBox';
import Calender from '../components/Profile/calender';
import Post from '../components/Profile/post';
import { useRecoilValue } from 'recoil';
import { diaryState } from 'atom/dairy';
import GuestBook from 'components/Profile/guestBook';
import { useParams } from 'react-router-dom';

export default function Profile(props) {
    const isMobile = useMediaQuery('(max-width: 700px)');

    const diaryData = useRecoilValue(diaryState);
    const { userId } = useParams();

    const boxStyle = {
        borderRadius: 2,
        border: 2,
        borderColor: 'primary.main',
        padding: 2,
        margin: 2,
        backgroundColor: 'background.box',
    };
    return (
        <div className="profile">
            <AppBar />
            <Box
                sx={{
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: 1,
                }}>
                <Box sx={{ width: isMobile ? '100%' : 350, minWidth: 350 }}>
                    <Box sx={{ ...boxStyle }}>
                        <ProfileBox userId={userId} />
                        <Calender userId={userId} />
                    </Box>
                    <GuestBook style={boxStyle} userId={userId} />
                </Box>

                <Box sx={{ maxWidth: 760, minWidth: 350, width: '100%' }}>
                    {diaryData.length > 0 ? (
                        diaryData.map((data) => (
                            <Post
                                key={data['diaryId']}
                                data={data}
                                style={boxStyle}
                                isFollowing={false}
                            />
                        ))
                    ) : (
                        <Typography
                            variant="h5"
                            align={'center'}
                            sx={{ paddingY: '30vh', whiteSpace: 'pre-line' }}
                            gutterBottom>
                            {'등록된 글이 없습니다.\n글을 등록해보세요.'}
                        </Typography>
                    )}
                </Box>
            </Box>
        </div>
    );
}
