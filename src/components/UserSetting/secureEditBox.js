import { useState } from 'react';

import authService from '../../services/auth_api';
import { Box, Button } from '@mui/material';

import * as React from 'react';

export default function SecureEditBox({ userId }) {
    const [editable, setEditable] = useState(false);
    const [checkPassWord, setCheckPassWord] = useState(false);
    const [content, setContent] = useState({
        password: '',
        newPassword: '',
    });

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#?])[a-zA-Z\d!@#?]{6,20}$/;

    const handleEditMode = (e) => {
        if (editable) {
            e.preventDefault();
            if (e.target.id === 'newPassword' && checkPassWord) {
                handleSubmit('newPassword');
            }
            if (e.target.id === 'password') {
                handleSubmit('password');
            }
        } else {
            setEditable(true);
        }
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        setContent((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const handleSubmit = (keyValue) => {
        if (passwordRegex.test(content[keyValue])) {
            //대충 보낸다는 뜻.
            if (keyValue === 'newPassword' && checkPassWord) {
                authService.editUser(userId, 'password', content.newPassword).then((res) => {
                    if (res) {
                        setEditable(false);
                        setContent({
                            password: '',
                            newPassword: '',
                        });
                    } else {
                        alert('수정 실패');
                    }
                });
            } else if (keyValue === 'password') {
                authService.verifyPassword(content.password).then((res) => {
                    if (res) {
                        setCheckPassWord(true);
                    } else {
                        alert('비밀번호가 일치하지 않습니다.');
                    }
                });
            } else {
                alert('현재 비밀번호를 먼저 인증해야합니다.');
            }
        }
    };

    return (
        <Box sx={contentBoxStyle}>
            <h3 style={{ width: 200, paddingLeft: 10 }}>보안</h3>
            <Box sx={{ flexGrow: 1, color: 'gray', paddingLeft: 1 }}>
                {editable ? EditableInput() : ImmutableComponent()}
            </Box>
            {!editable && (
                <Button id="editPassword" onClick={handleEditMode}>
                    수정
                </Button>
            )}
        </Box>
    );

    function EditableInput() {
        return (
            <>
                <p>
                    비밀번호는 6자에서 20자 사이여야하며 영문, 숫자, 특수문자를 모두 포함해야합니다.
                </p>
                <div>
                    <input
                        id="password"
                        type="password"
                        value={content.password}
                        onChange={handleChange}
                        style={{
                            borderStyle: 'solid',
                            borderColor: checkPassWord
                                ? 'green'
                                : passwordRegex.test(content.password)
                                ? 'black'
                                : 'red',
                        }}
                    />
                    <Button id="password" onClick={handleEditMode}>
                        비밀번호 확인
                    </Button>
                </div>
                <div>
                    <input
                        id="newPassword"
                        type="password"
                        value={content.newPassword}
                        onChange={handleChange}
                        style={{
                            borderStyle: 'solid',
                            borderColor: passwordRegex.test(content.newPassword) ? 'black' : 'red',
                        }}
                        disabled={!checkPassWord}
                    />
                    <Button id="newPassword" onClick={handleEditMode}>
                        비밀번호 변경
                    </Button>
                </div>
            </>
        );
    }

    function ImmutableComponent() {
        return <h4 style={{ flexGrow: 1, color: 'gray', paddingLeft: 10 }}>🔒 비밀번호 수정</h4>;
    }
}

const contentBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
