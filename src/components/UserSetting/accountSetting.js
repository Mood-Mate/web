import { Avatar, Box, Button, Divider, InputBase } from '@mui/material';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../atom/auth';
import { parseDate } from '../util/util';
import authService from '../../services/auth_api';

function EditMode(editable, value) {
    this.editable = editable;
    this.value = value ?? '';
}
export default function AccountSetting() {
    const [user, setUser] = useRecoilState(userState);
    const [edit, setEdit] = useState({
        name: new EditMode(false),
        nickname: new EditMode(false),
        email: new EditMode(false),
        dateOfBirth: new EditMode(false),
        gender: new EditMode(false),
        introduce: new EditMode(false),
    });
    const [image, setImage] = useState(null);
    const handleEditMode = (e) => {
        console.log(e.currentTarget.id);
        const key = e.currentTarget.id;
        const value = edit[key].value;
        console.log('handleEditMode', key, value);
        if (edit[key].editable !== false) {
            if (user[key] !== value) {
                authService.editUser(user.id, key, value).then((res) => {
                    if (res) {
                        setUser((prev) => ({
                            ...prev,
                            [key]: value,
                        }));
                    } else {
                        alert('수정 실패');
                    }
                });
            }
            setEdit((prev) => ({
                ...prev,
                [key]: new EditMode(false),
            }));
        } else {
            setEdit((prev) => ({
                ...prev,
                [key]: new EditMode(true, user[key]),
            }));
        }
    };
    const handelChange = (e) => {
        const id = e.currentTarget.id;
        const value = e.currentTarget.value;
        console.log('handelChange', id, value);
        setEdit((prev) => ({
            ...prev,
            [id]: new EditMode(true, value),
        }));
    };
    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                //console.log('reader.result', reader.result);
                setImage({
                    ref: e.target.files[0],
                    url: reader.result,
                });
            };
            authService.editUser(user.id, 'picture', e.target.files[0]).then((res) => {
                if (res) {
                    setUser((prev) => ({
                        ...prev,
                        picture: e.target.files[0],
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
                        src={image ? image.url : process.env.REACT_APP_API_URL + '/' + user.picture}
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
                    <h3 style={{ width: 200, paddingLeft: 10 }}>이름</h3>
                    <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                        {edit.name.editable ? (
                            <input
                                id="name"
                                type="text"
                                value={edit.name.value}
                                onChange={handelChange}></input>
                        ) : (
                            <h4>{user.name}</h4>
                        )}
                    </Box>
                    <Button id="name" onClick={handleEditMode}>
                        {edit.name.editable ? '변경' : '수정'}
                    </Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>닉네임</h3>
                    <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                        {edit.nickname.editable ? (
                            <input
                                id="nickname"
                                type="text"
                                value={edit.nickname.value}
                                onChange={handelChange}></input>
                        ) : (
                            <h4>{user.nickname}</h4>
                        )}
                    </Box>
                    <Button id="nickname" onClick={handleEditMode}>
                        {edit.nickname.editable ? '변경' : '수정'}
                    </Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>이메일</h3>
                    <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                        {edit.email.editable ? (
                            <input
                                id="email"
                                type="email"
                                value={edit.email.value}
                                onChange={handelChange}></input>
                        ) : (
                            <h4>{user.email}</h4>
                        )}
                    </Box>
                    <Button id="email" onClick={handleEditMode}>
                        {edit.email.editable ? '변경' : '수정'}
                    </Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>생일</h3>
                    <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                        {edit.dateOfBirth.editable ? (
                            <input
                                id="dateOfBirth"
                                type="date"
                                value={edit.dateOfBirth.value}
                                onChange={handelChange}></input>
                        ) : (
                            <h4>{parseDate(user.dateOfBirth, 'birth')}</h4>
                        )}
                    </Box>
                    <Button id="dateOfBirth" onClick={handleEditMode}>
                        {edit.dateOfBirth.editable ? '변경' : '수정'}
                    </Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>성별</h3>
                    <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                        {edit.gender.editable ? (
                            <input
                                id="gender"
                                type="text"
                                value={edit.gender.value}
                                onChange={handelChange}></input>
                        ) : (
                            <h4>{user.gender}</h4>
                        )}
                    </Box>
                    <Button id="gender" onClick={handleEditMode}>
                        {edit.gender.editable ? '변경' : '수정'}
                    </Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>보안</h3>
                    <h4 style={{ flexGrow: 1, color: 'gray', paddingLeft: 10 }}>
                        🔒 비밀번호 수정
                    </h4>
                    <Button>수정</Button>
                </Box>
                <Divider />
                <Box sx={contentBoxStyle}>
                    <h3 style={{ width: 200, paddingLeft: 10 }}>소개</h3>
                    <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                        {edit.introduce.editable ? (
                            <InputBase
                                id="introduce"
                                type="text"
                                value={edit.introduce.value}
                                sx={{ width: '100%', border: 'solid', borderRadius: 2, marginY: 1 }}
                                multiline={true}
                                onChange={handelChange}></InputBase>
                        ) : (
                            <Typography
                                sx={{
                                    whiteSpace: 'pre-line',
                                    flexGrow: 1,
                                    color: 'gray',
                                    paddingLeft: 1,
                                    paddingY: 1,
                                    fontWeight: 'bold',
                                }}>
                                {user.introduce}
                            </Typography>
                        )}
                    </Box>
                    <Button id="introduce" onClick={handleEditMode}>
                        {edit.introduce.editable ? '변경' : '수정'}
                    </Button>
                </Box>
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
