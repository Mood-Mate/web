import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import authService from '../../services/auth_api';
import UserImage from '../Common/userImage';

export default function ProfileBox(props) {
    const [user, setUser] = useState(null);
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
            <>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                    <UserImage userId={props.userId} width={80} profileImage={user.profileImage} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 'bold', textAlign: 'left', paddingLeft: 4 }}>
                            {user.nickname}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 1 }}>
                            <Box sx={{ width: 100 }}>{user.followerCount + '명'}</Box>
                            <Box sx={{ width: 100 }}>{user.followeeCount + '명'}</Box>
                        </Box>
                    </Box>
                </Box>
                <Typography sx={{ paddingY: 3 }}>{user.introduction}</Typography>
            </>
        )
    );
}
