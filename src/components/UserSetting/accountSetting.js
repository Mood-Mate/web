import { Avatar, Box, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../atom/auth';
import authService from '../../services/auth_api';
import CommonEditBox from './commonEditBox';
import SecureEditBox from './secureEditBox';

export default function AccountSetting() {
    const [user, setUser] = useRecoilState(userState);

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            authService.editUserPicture(e.target.files[0]).then((res) => {
                if (res) {
                    setUser((prev) => ({
                        ...prev,
                        picture: res,
                    }));
                } else {
                    alert('수정 실패');
                }
            });
        }
    };
    return (
        <>
            <Box sx={{ marginBottom: 6 }}>
                <Box sx={{ height: 150, width: 150, position: 'relative', margin: 'auto' }}>
                    <Avatar
                        sx={{ height: '100%', width: '100%' }}
                        src={process.env.REACT_APP_API_URL + user.picture}
                    />
                    <ImageInputLabel htmlFor="user-image">
                        <EditIcon />
                    </ImageInputLabel>
                    <input
                        type="file"
                        id="user-image"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </Box>
            </Box>

            <Box id="SettingContent" sx={boxStyle}>
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>이메일</h3>
                    <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                        <h4>{user.email}</h4>
                    </Box>
                </Box>
                <Divider />
                <CommonEditBox keyValue={'name'} title={'이름'} />
                <Divider />
                <CommonEditBox keyValue={'nickname'} title={'닉네임'} />
                <Divider />
                <CommonEditBox keyValue={'dateOfBirth'} title={'생일'} />
                <Divider />
                <CommonEditBox keyValue={'gender'} title={'성별'} />
                <Divider />
                <CommonEditBox keyValue={'introduce'} title={'소개'} />
                <Divider />
                <SecureEditBox userId={user.id} />
            </Box>
        </>
    );
}

const boxStyle = {
    borderRadius: 2,
    border: 2,
    borderColor: 'primary.main',
    backgroundColor: 'background.box',
    paddingX: 2,
    marginBottom: 12,
};

const contentBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
const ImageInputLabel = styled('label')(({ theme }) => ({
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 10,
    transform: 'translate(-50%, -50%)',
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        filter: 'brightness(85%)',
    },
}));
