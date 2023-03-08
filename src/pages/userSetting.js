import { useEffect, useState } from 'react';
import { Box, Button, Divider } from '@mui/material';
import PrimarySearchAppBar from '../components/header';
import AccountSetting from '../components/UserSetting/accountSetting';
import ProfileSetting from '../components/UserSetting/profileSetting';
import { useLocation } from 'react-router-dom';

export default function UserSettings() {
    // Set initial state for user settings
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [isAccountSettings, setIsAccountSettings] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.tab === 'profile') setIsAccountSettings(false);
    }, [location.state]);
    // Handle input changes
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Image:', image);
    };
    //min 700,max 1000

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
                                ...unselectedSettingStyle(!isAccountSettings),
                            }}
                            onClick={() => setIsAccountSettings(true)}>
                            계정 설정
                        </h1>
                        <h1
                            style={{
                                cursor: 'pointer',
                                ...unselectedSettingStyle(isAccountSettings),
                            }}
                            onClick={() => setIsAccountSettings(false)}>
                            프로필 설정
                        </h1>
                    </Box>
                    {isAccountSettings ? <AccountSetting /> : <ProfileSetting />}
                </Box>
                {/*<h1>User Settings</h1>*/}
                {/*<form onSubmit={handleSubmit}>*/}
                {/*    <label htmlFor="name">Name:</label>*/}
                {/*    <input type="text" id="name" value={name} onChange={handleNameChange} />*/}

                {/*    <label htmlFor="email">Email:</label>*/}
                {/*    <input type="email" id="email" value={email} onChange={handleEmailChange} />*/}

                {/*    <label htmlFor="password">Password:</label>*/}
                {/*    <input*/}
                {/*        type="password"*/}
                {/*        id="password"*/}
                {/*        value={password}*/}
                {/*        onChange={handlePasswordChange}*/}
                {/*    />*/}

                {/*    <label htmlFor="image">Profile Picture:</label>*/}
                {/*    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />*/}

                {/*    <button type="submit">Save</button>*/}
                {/*</form>*/}
            </Box>
        </>
    );
}
const contentBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};

const unselectedSettingStyle = (value) => {
    if (value) {
        return {
            color: 'gray',
            fontSize: '1.5em',
            fontWeight: 'bold',
        };
    }
    return null;
};
