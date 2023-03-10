import { Box, Button, Dialog } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import authService from '../../services/auth_api';
import UserImage from '../Common/userImage';
import { useNavigate } from 'react-router-dom';

export default function HomeProfile(props) {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (props.userId) {
            authService.getUserInfoById(props.userId).then((res) => {
                if (res) {
                    console.log(res);
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
                                onClick={handleClickOpen}
                                sx={{ marginRight: 3, cursor: 'pointer' }}>
                                {'팔로워 ' + user.followerCount + '명'}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                onClick={handleClickOpen}
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
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <Box sx={{ width: 500, height: 700, backgroundColor: 'primary.main' }}></Box>
                </Dialog>
            </Box>
        )
    );
}
