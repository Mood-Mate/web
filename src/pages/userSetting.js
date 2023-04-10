import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PrimarySearchAppBar from '../components/header';
import AccountSetting from '../components/UserSetting/accountSetting';
import ProfileSetting from '../components/UserSetting/profileSetting';
import { useLocation } from 'react-router-dom';

export default function UserSettings() {
    const [isAccountSettings, setIsAccountSettings] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.tab === 'profile') setIsAccountSettings(false);
    }, [location.state]);

    return (
        <>
            <PrimarySearchAppBar />
            <Box sx={{ minWidth: 700, maxWidth: 900, margin: 'auto', paddingTop: 1 }}>
                <Box sx={{ width: '100%', margin: 2 }}>
                    <Box sx={contentBoxStyle}>
                        <h1
                            style={{
                                paddingLeft: 10,
                                paddingRight: 20,
                                cursor: 'pointer',
                            }}>
                            {isAccountSettings ? '계정 설정' : '프로필 설정'}
                        </h1>
                    </Box>
                    {isAccountSettings ? <AccountSetting /> : <ProfileSetting />}
                </Box>
            </Box>
        </>
    );
}
const contentBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
