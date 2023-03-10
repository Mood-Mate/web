import { Avatar, Box, Button, Dialog, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import authService from '../../services/auth_api';
import UserImage from '../Common/userImage';
import { useNavigate } from 'react-router-dom';
import followService from '../../services/follow_api';

function FollowData(type, data) {
    this.type = type;
    this.data = data;
}
export default function HomeProfile(props) {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('open', open);
    }, [open]);
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
        // setOpen(type);
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
                                    navigate('/setting', {
                                        state: {
                                            tab: 'profile',
                                        },
                                    });
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
                <Dialog
                    open={Boolean(open)}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <Box
                        sx={{
                            width: 400,
                            height: 700,
                            backgroundColor: 'background.default',
                            padding: 2,
                        }}>
                        {open && (
                            <>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {open.type}
                                </Typography>
                                {open.data.map((user, index) => {
                                    return (
                                        <Box sx={{ width: '100%' }} key={user.followId}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    paddingX: 1,
                                                    paddingY: 1,
                                                }}>
                                                <Avatar sx={{ width: 40, height: 40 }} />
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ marginLeft: 4, flexGrow: 1 }}>
                                                    {user.nickname}
                                                </Typography>
                                                {open.type === 'following' && (
                                                    <Button
                                                        variant="contained"
                                                        sx={{ backgroundColor: 'grey' }}>
                                                        취소
                                                    </Button>
                                                )}
                                            </Box>
                                            {index !== open.length - 1 && <Divider />}
                                        </Box>
                                    );
                                })}
                            </>
                        )}
                    </Box>
                </Dialog>
            </Box>
        )
    );
}
