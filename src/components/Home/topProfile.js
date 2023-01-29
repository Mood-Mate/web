import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TopProfile() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                <Link to="/profile">
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            border: 2,
                            borderColor: 'primary.main',
                        }}
                    />
                </Link>
            </Box>
        </>
    );
}
