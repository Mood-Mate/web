import AppBar from '../components/header';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Post from '../components/Profile/post';
import { useRecoilValue } from 'recoil';
import GuestBook from '../components/Profile/guestBook';
import { useEffect, useState } from 'react';
import diaryService from '../services/diary_api';
import { userState } from '../atom/auth';
import HomeProfile from '../components/Home/homeProfile';

export default function Home() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const [diaryData, setDiaryData] = useState({ data: [], next: null });
    const user = useRecoilValue(userState);

    useEffect(() => {
        diaryService.getFolloweeDiary(diaryData.next).then((res) => {
            if (res?.data) {
                setDiaryData((diary) => {
                    const newData = [...diary.data, ...res.data.data];
                    const filteredData = newData.reduce(function (acc, current) {
                        if (acc.findIndex(({ diaryId }) => diaryId === current.diaryId) === -1) {
                            acc.push(current);
                        }
                        return acc;
                    }, []);
                    return {
                        data: filteredData,
                        next: res.data.next,
                    };
                });
            } else {
                alert('일기를 불러오는데 실패했습니다.');
            }
        });
    }, []);

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
                    {diaryData.data.length > 0 ? (
                        diaryData.data.map((data) => (
                            <Post
                                key={data['diaryId']}
                                data={data}
                                style={boxStyle}
                                isFollowee={true}
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
