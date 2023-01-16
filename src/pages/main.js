import AppBar from '../components/appbar';
import Guestbook from '../components/Mainpage/guestbook';
import Topbutton from '../components/Mainpage/topbutton';
import Diary from '../components/Mainpage/diary';
import TopProfile from '../components/Mainpage/topProfile';
import TopGuestbook from '../components/Mainpage/topGuestbook';
import { Box } from '@mui/system';

export default function Mainpage() {
	const boxStyle = {
		borderRadius: 2,
		border: 2,
		borderColor: 'primary.main',
		backgroundColor: 'background.default',
		width: '60%',
		padding: 1,
	};
	return (
		<>
			<AppBar />
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '5fr  3fr 2fr',
					alignItems: 'center',
					margin: 2,
				}}
			>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<TopProfile></TopProfile>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'end' }}>
					<TopGuestbook />
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'end' }}>
					<Topbutton></Topbutton>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					justifyItems: 'center',
				}}
			>
				<Box sx={{ ...boxStyle }}>
					<Diary></Diary>
				</Box>
				<Box sx={{ ...boxStyle }}>
					<Guestbook></Guestbook>
				</Box>
			</Box>
		</>
	);
}
