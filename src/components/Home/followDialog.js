import { Box, Button, Dialog, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import UserImage from '../Common/userImage';

export default function FollowDialog(props) {
    return (
        <Dialog
            open={Boolean(props.open)}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Box
                sx={{
                    width: 400,
                    height: 700,
                    backgroundColor: 'background.default',
                    padding: 2,
                }}>
                {props.open && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {props.open.type}
                        </Typography>
                        {props.open.data.map((user, index) => {
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
                                        <UserImage
                                            width={40}
                                            userId={
                                                props.open.type === 'following'
                                                    ? user.followingMemberId
                                                    : user.followerMemberId
                                            }
                                            profileImage={user.picture}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ marginLeft: 4, flexGrow: 1 }}>
                                            {user.nickname}
                                        </Typography>
                                        {props.open.type === 'following' && (
                                            <Button
                                                variant="contained"
                                                sx={{ backgroundColor: 'grey' }}>
                                                취소
                                            </Button>
                                        )}
                                    </Box>
                                    {index !== props.open.length - 1 && <Divider />}
                                </Box>
                            );
                        })}
                    </>
                )}
            </Box>
        </Dialog>
    );
}
