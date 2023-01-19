import { Avatar, Box, Typography } from '@mui/material';

export default function TopGuestbook() {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<Box
					sx={{
						width: 100,
						height: 100,
						borderRadius: '50%',
						border: 2,
						borderColor: 'primary.main',
						overflow: 'hidden',
					}}
				></Box>
			</Box>
		</>
	);
}
