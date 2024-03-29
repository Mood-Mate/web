import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import authService from '../../services/auth_api';
import UserImage from '../Common/userImage';
import { useNavigate } from 'react-router-dom';
import followService from '../../services/follow_api';
import FollowDialog from './followDialog';

function FollowData(type, data) {
    this.type = type;
    this.data = data;
}
export default function HomeProfile(props) {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(null);
    const navigate = useNavigate();

    const handleClickOpen = (type) => {
        if (type === 'follower') {
            followService.getFollower(props.userId).then((res) => {
                if (res) {
                    setOpen(new FollowData(type, res.data));
                } else {
                    alert('팔로워 정보를 불러오는데 실패했습니다.');
                }
            });
        }
        if (type === 'following') {
            followService.getFollowing(props.userId).then((res) => {
                if (res) {
                    setOpen(new FollowData(type, res.data));
                } else {
                    alert('팔로잉 정보를 불러오는데 실패했습니다.');
                }
            });
        }
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        if (props.userId) {
            authService.getUserInfoById(props.userId).then((res) => {
                if (res) {
                    setUser(res);
                } else {
                    alert('유저 정보를 불러오는데 실패했습니다.');
                }
            });
        }
    }, [props.userId]);
    return (
        user && (
            <Box
                sx={{
                    maxWidth: 700,
                    alignItems: 'center',
                    margin: 'auto',
                    marginTop: 2,
                    paddingY: 8,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        textAlign: 'center',
                        paddingLeft: 4,
                        justifyContent: 'center',
                    }}>
                    <Box sx={{ flexGrow: '1' }}>
                        <UserImage userId={props.userId} width={100} profileImage={user.picture} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: '5',
                            alignItems: 'start',
                            paddingLeft: 5,
                            paddingTop: 1,
                            maxWidth: 500,
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                paddingY: 1,
                                width: '100%',
                                justifyContent: 'space-between',
                            }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {user.nickname}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ marginRight: 4 }}
                                onClick={() => {
                                    navigate(
                                        '/setting',
                                        //     {
                                        //     state: {
                                        //         tab: 'profile',
                                        //     },
                                        // }
                                    );
                                }}>
                                프로필 편집
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <Typography
                                variant="subtitle1"
                                onClick={() => handleClickOpen('follower')}
                                sx={{ marginRight: 3, cursor: 'pointer' }}>
                                {'팔로워 ' + user.followerCount + '명'}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                onClick={() => handleClickOpen('following')}
                                sx={{ cursor: 'pointer' }}>
                                {'팔로잉 ' + user.followingCount + '명'}
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ paddingY: 1 }}>
                            {user.introduce}
                        </Typography>
                    </Box>
                </Box>
                <FollowDialog open={open} handleClose={handleClose} />
            </Box>
        )
    );
}
