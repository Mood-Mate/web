import { Avatar, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function ProfileBox(props) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (props.userId) {
            authService.getUserInfoById(props.userId).then((res) => {
                if (res) {
                    console.log(res);
                    setUser(res);
                } else {
                    alert('유저 정보를 불러오는데 실패했습니다.');
                }
            });
        }
    }, [props.userId]);
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
                <Avatar sx={{ width: 80, height: 80 }} src={'https://source.unsplash.com/random'} />
                <Box sx={{ width: 100 }}>100명</Box>
                <Box sx={{ width: 100 }}>100명</Box>
            </Box>
            <Typography sx={{ paddingY: 3 }}>앙버터의 일기장에 오신 것을 환영합니다.</Typography>
        </>
    );
}
