import { useRecoilState } from 'recoil';
import { userState } from '../../atom/auth';
import { useState } from 'react';
import authService from '../../services/auth_api';
import { Box, Button, InputBase } from '@mui/material';
import Typography from '@mui/material/Typography';
import { parseDate } from '../util/util';

export default function CommonEditBox({ keyValue, title }) {
    const [editable, setEditable] = useState(false);
    const [user, setUser] = useRecoilState(userState);
    const [content, setContent] = useState('');
    const handleEditMode = (e) => {
        if (editable) {
            e.preventDefault();
            handleSummit();
            setEditable(false);
        } else {
            setEditable(true);
            setContent(user[keyValue].toString());
        }
    };
    const handleSummit = () => {
        authService.editUser(user.id, keyValue, content).then((res) => {
            if (res) {
                setUser((prev) => ({
                    ...prev,
                    [keyValue]: content,
                }));
                setContent('');
            } else {
                alert('수정 실패');
            }
        });
    };
    return (
        <Box sx={contentBoxStyle}>
            <h3 style={{ width: 200, paddingLeft: 10 }}>{title}</h3>
            <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                {editable ? EditableInput(keyValue) : ImmutableComponent(keyValue)}
            </Box>
            <Button id={keyValue} onClick={handleEditMode}>
                {editable ? '변경' : '수정'}
            </Button>
        </Box>
    );

    function EditableInput(keyValue) {
        if (keyValue === 'introduce') {
            return (
                <InputBase
                    id={keyValue}
                    type="text"
                    value={content}
                    sx={{ width: '100%', border: 'solid', borderRadius: 2, marginY: 1 }}
                    multiline={true}
                    onChange={(e) => setContent(e.currentTarget.value)}
                />
            );
        } else if (keyValue === 'gender') {
            return (
                <>
                    <input
                        id="MAN"
                        type="radio"
                        value="MAN"
                        checked={content === 'MAN'}
                        onChange={() => setContent('MAN')}
                    />
                    <label htmlFor="MAN">남</label>
                    <input
                        id="WOMAN"
                        type="radio"
                        value="WOMAN"
                        checked={content === 'WOMAN'}
                        onChange={() => setContent('WOMAN')}
                    />
                    <label htmlFor="MAN">여</label>
                </>
            );
        } else {
            return (
                <input
                    id={keyValue}
                    type={keyValue === 'dateOfBirth' ? 'date' : 'text'}
                    value={keyValue === 'dateOfBirth' ? parseDate(content, 'date') : content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                />
            );
        }
    }
    function ImmutableComponent(keyValue) {
        if (keyValue === 'introduce') {
            return (
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
            );
        } else if (keyValue === 'gender') {
            return <h4>{user.gender === 'WOMAN' ? '여' : '남'}</h4>;
        } else {
            return (
                <h4>
                    {keyValue === 'dateOfBirth'
                        ? parseDate(user.dateOfBirth, 'birth')
                        : user[keyValue]}
                </h4>
            );
        }
    }
}

const contentBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
