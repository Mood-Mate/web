import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Data from './GuestbookData';
import {
	ListItemText,
	Typography,
	ListItem,
	ListItemAvatar,
	Avatar,
} from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	overflow: 'auto',
	width: '100%',
	whiteSpace: 'pre-line',
}));

export default function Diary() {
	let DATA = [...Data];
	const ScrollDiv = styled(Box)`
		overflow-y: auto;
		&::-webkit-scrollbar {
			width: 4px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 2px;
			background: tertiary.main;
		}
	`;

	return (
		<ScrollDiv
			sx={{
				width: '100%',
				height: '40rem',
				overflow: 'scroll',
				overflowX: 'hidden',
			}}
		>
			<Stack spacing={3}>
				{DATA.map((data) => (
					<Item>
						<ListItem alignItems='flex-start'>
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: deepPurple[500], fontSize: '90%' }}>
									{data.user}
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={data.title}
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'inline' }}
											component='span'
											variant='body2'
											color='text.primary'
										>
											{data.user}
											<br></br>
										</Typography>
										{data.content}
									</React.Fragment>
								}
							/>
						</ListItem>
					</Item>
				))}
			</Stack>
		</ScrollDiv>
	);
}
