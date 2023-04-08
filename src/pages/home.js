import AppBar from '../components/header';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Post from '../components/Profile/post';
import { useRecoilValue } from 'recoil';
import GuestBook from '../components/Profile/guestBook';
import { useCallback, useRef, useState } from 'react';
import { userState } from '../atom/auth';
import HomeProfile from '../components/Home/homeProfile';
import useHomePosts from '../hook/useHomePosts';

export default function Home() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const [currentPage, setCurrentPage] = useState(0);
    const user = useRecoilValue(userState);
    const [diaryList, next, error, loading] = useHomePosts(currentPage);

    const observer = useRef();
    const lastPostElementRef = useCallback(
        (node) => {
            if (loading || next == null) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && next != null) {
                    setCurrentPage(next);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, next],
    );
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
            <HomeProfile userId={user.id} style={boxStyle} />

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
                    <GuestBook style={boxStyle} userId={user.id} />
                </Box>

                <Box sx={{ maxWidth: 760, minWidth: 350, width: '100%' }}>
                    {diaryList.length > 0 ? (
                        <>
                            {diaryList.map((data) => (
                                <Post
                                    key={data['diaryId']}
                                    data={data}
                                    style={boxStyle}
                                    isFollowing={true}
                                />
                            ))}
                            <Typography variant="h5" align={'center'} ref={lastPostElementRef}>
                                {loading && 'Loading...'}
                                {error != null && 'Error...'}
                            </Typography>
                        </>
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
